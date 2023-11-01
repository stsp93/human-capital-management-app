const { QUERY_DEFAULTS } = require("../config/constants");
const CustomError = require("../utilities/CustomError");

class Service {
  constructor(model) {
    this.model = model;
  }

  async getAll(query) {
    const { page = QUERY_DEFAULTS.page,
      limit = QUERY_DEFAULTS.limit,
      sort = QUERY_DEFAULTS.sort,
      order = QUERY_DEFAULTS.order,
      ...filters } = query;
    const pagination = await this.createPagination(page, limit, query);

    const results = await this.model
      .find(filters || {})
      .sort({ [sort]: order })
      .limit(+limit)
      .skip((page - 1) * limit)
    return { results, ...pagination }
  }

  async getById(id) {
    const result = await this.model.findById(id);
    return result || {};
  }

  async create(input, user) {
    return await this.model.create(input, user);
  }

  async update( input, id) {
    console.log(id);
    const entity = await this.model.findById(id);
    if (entity === null) throw new CustomError('Entity not found', 404)

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
}

module.exports = Service;