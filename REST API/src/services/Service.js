const { QUERY_DEFAULTS } = require("../config/constants");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");

class Service {
  constructor(model) {
    this.model = model;
  }

  async getAll(query) {
    let { page = QUERY_DEFAULTS.page,
      limit = QUERY_DEFAULTS.limit,
      sort = QUERY_DEFAULTS.sort,
      order = QUERY_DEFAULTS.order,
      search = QUERY_DEFAULTS.search,
      ...filters } = query;
      if(QUERY_DEFAULTS.minSearchChars > search.length) search = '';
      filters.name = { $regex: new RegExp(search,'i') }
      filters.username = { $regex: new RegExp(search,'i') }

    const pagination = await this.createPagination(page, limit, filters);

    const results = await this.model
      .find(filters || {})
      .sort({ [sort]: order })
      .limit(+limit)
      .skip((page - 1) * limit);
    return { results, ...pagination }
  }

  async getById(id) {
    const result = await this.model.findById(id);
    return result || {};
  }

  async create(input) {
    return await this.model.create(input);
  }

  async update(input, id, user) {
    const entity = await this.model.findById(id);
    const employeeId = entity.employeeId ? entity.employeeId : entity._id;
    if(input.password) input = {password:input.password};
    if (!entity) {
      throw new CustomError('Employee not found', 404);
    }
    if (!isAuthorizedUser(user.role, user.employeeId, employeeId)) {
      throw new CustomError('Unauthorized: Users can only update their own records', 401);
    }
    Object.assign(entity, input);

    return await entity.save();
  }

  async deleteById(id) {

    return await this.model.deleteOne({ _id: id });
  }

  async createPagination(page, limit, filters) {
    const docsCount = await this.countDocs(filters);
    const totalPages = Math.ceil(docsCount / limit);
    const nextPage = +page < totalPages ? +page + 1 : null;
    const prevPage = +page > 1 ? +page - 1 : null;

    return { totalPages, currentPage: +page, nextPage, prevPage }
  }

  async countDocs(query) {
    const docsCount = await this.model.countDocuments(query);
    return docsCount;
  }

  async employeeNameSearch(page, limit, employeeName) {
    const aggregationPipeline = [
        {
          '$lookup': {
            'from': 'employees',
            'localField': 'employeeId',
            'foreignField': '_id',
            'as': 'employee'
          }
        }, {
          '$match': {
            'employee.name': {'$regex': new RegExp(employeeName, 'i')}
          }
        }, {
          '$facet': {
            'count': [{'$count': 'total'}],
            'results': [{ '$skip': 0}, {'$limit': 5}]
          }
        }, {
          '$project': {'count': {'$arrayElemAt': ['$count', 0]},'results': 1}
        }
      ]
  
    const [{results, count}] = await this.model.aggregate(aggregationPipeline);
    console.log(results);
    const totalPages = Math.ceil(count?.total / limit) || null;
    const pagination = {
      currentPage: page,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage:
        page < totalPages ? page + 1 : null,
    };
    return { results, ...pagination };
  }
}

module.exports = Service;