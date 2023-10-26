const CustomError = require("../utilities/CustomError");

class Service {
  constructor(model) {
    this.model = model;
  }

  async getAll(user, query) {
    const { page = 1, limit = 1, ...filters } = query;
    console.log(query);
    const count = await this.model.countDocuments(filters);
    const totalPages = Math.ceil(count / limit);
    const nextPage = +page < totalPages ? +page + 1 : null;
    const prevPage = +page > 1 ? +page - 1 : null;

    const results = await this.model
      .find(filters || {})
      .limit(+limit)
      .skip((page - 1) * limit);
    return { results, totalPages, currentPage: +page, nextPage, prevPage }
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async create(input) {
    return await this.model.create(input);
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
}

module.exports = Service;