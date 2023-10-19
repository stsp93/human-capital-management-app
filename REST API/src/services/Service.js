const CustomError = require("../utilities/CustomError");

class Service {
    constructor(model) {
      this.model = model;
    }
  
    async getAll() {
      return await this.model.find();
    }
  
    async getById(id) {
      return await this.model.findById(id);
    }
  
    async create(input) {
      return await this.model.create(input);
    }
  
    async update(id, input) {
      const entity = await this.model.findById(id);
      if(entity === null) throw new CustomError('Entity not found', 404)
  
      Object.assign(entity, input);
      return await entity.save();
    }
  
    async deleteById(id) {
      return await this.model.findByIdAndDelete(id);
    }
  }
  
  module.exports = Service;