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
      if(entity === null) {
        const error = new Error('Entity not found');
        error.status = 404;
        throw error;
      } 
      Object.assign(entity, input);
      return await entity.save();
    }
  
    async deleteById(id) {
      return await this.model.findByIdAndDelete(id);
    }
  }
  
  module.exports = Service;