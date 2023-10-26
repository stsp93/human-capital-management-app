const CustomError = require("../utilities/CustomError");

class Service {
  constructor(model) {
    this.model = model;
  }

  async getAll(query) {
    const { page = 1, limit = 1, ...filters } = query;
    const pagination = await this.createPagination(page, limit, query);

    const results = await this.model
      .find(filters || {})
      .limit(+limit)
      .skip((page - 1) * limit);
    return { results, ...pagination }
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async create(input, user) {
    return await this.model.create(input, user);
  }

  async update(id, input) {
    const entity = await this.model.findById(id);
    if (entity === null) throw new CustomError('Entity not found', 404)

    Object.assign(entity, input);
    return await entity.save();
  }

  async deleteById(id) {
    return await this.model.deleteOne({ _id: id });
  }

  async createPagination(page, limit, filters) {
    const docsCount = await this.model.countDocuments(filters);
    const totalPages = Math.ceil(docsCount / limit);
    const nextPage = +page < totalPages ? +page + 1 : null;
    const prevPage = +page > 1 ? +page - 1 : null;

    return { totalPages, currentPage: +page, nextPage, prevPage }
  }
}

module.exports = Service;