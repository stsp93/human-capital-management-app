const { QUERY_DEFAULTS } = require("../config/constants");
const CustomError = require("../utilities/CustomError");
const isAuthorizedUser = require("../utilities/isAuthorizedUser");

class Service {
  constructor(model) {
    this.model = model;
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
    if (input.password) input = { password: input.password };
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

  async getAll(query) {
    const queryObj = this.formatQuery(query)
    
    queryObj.filters.name = { $regex: new RegExp(queryObj.search, 'i') }

    return await this.querySearch(queryObj);
  }



  async querySearch(queryObj) {
    const pagination = await this.createPagination(queryObj.page, queryObj.limit, queryObj.filters);

     const results = await this.model
        .find(queryObj.filters)
        .sort({ [queryObj.sort]: queryObj.order })
        .limit(+queryObj.limit)
        .skip((queryObj.page - 1) * queryObj.limit)
    
    return { results, ...pagination }
  }

  /**
   * 
   * @param {*} queryObj 
   * Performs aggregation to search by entry's employeeId
   */ 
  async employeeRefNameSearch(queryObj) {
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
          'employee.name': { '$regex': new RegExp(queryObj.search, 'i') }
        }
      }, {
        '$facet': {
          'count': [{ '$count': 'total' }],
          'results': [{ '$skip': (queryObj.page - 1) * queryObj.limit }, { '$limit': queryObj.limit }]
        }
      }, {
        '$project': { 'count': { '$arrayElemAt': ['$count', 0] }, 'results': 1 }
      }
    ]

    let [{ results, count }] = await this.model.aggregate(aggregationPipeline);

    const pagination = await this.createPagination(queryObj.page, queryObj.limit, queryObj.filters, count?.total || results.length)

    return { results, ...pagination };
  }


  formatQuery(query) {
    let { page = QUERY_DEFAULTS.page,
      limit = QUERY_DEFAULTS.limit,
      sort = QUERY_DEFAULTS.sort,
      order = QUERY_DEFAULTS.order,
      search = QUERY_DEFAULTS.search,
      ...filters } = query;

      if (QUERY_DEFAULTS.minSearchChars > search.length) search = '';

    return {
      page,
      limit,
      sort,
      order,
      search,
      filters,
    }
  }

  async createPagination(page, limit, filters, count) {

    let docsCount = count;
    if(typeof docsCount !== 'number') {
      docsCount = await this.countDocs(filters);
    }
    const totalPages = Math.ceil(docsCount / limit);
    const nextPage = +page < totalPages ? +page + 1 : null;
    const prevPage = +page > 1 ? +page - 1 : null;

    return { totalPages, currentPage: +page, nextPage, prevPage }
  }

  async countDocs(query) {
    const docsCount = await this.model.countDocuments(query);
    return docsCount;
  }
}

module.exports = Service;