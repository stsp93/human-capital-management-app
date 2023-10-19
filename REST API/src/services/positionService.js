const Position = require("../models/Position");
const Service = require("./Service");

class PositionService extends Service {
    constructor() {
      super(Position);
    }
}
module.exports = new PositionService()