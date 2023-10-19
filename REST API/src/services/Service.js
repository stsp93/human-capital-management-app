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
      const item = await this.model.findById(id);
      Object.assign(item, input);
      return await item.save();
    }
  
    async deleteById(id) {
      return await this.model.findByIdAndDelete(id);
    }
  }
  
  module.exports = Service;