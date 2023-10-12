const { Schema, model, Types } = require("mongoose");

const performanceReviewSchema = new Schema({
  employee_id: {
    type: Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Please specify the reviewed employee'],
  },
  reviewer_id: {
    type: Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Please specify the reviewer'],
  },
  rating: {
    type: Number,
    required: [true, 'Please enter a rating'],
    min: 1,
    max: 10,
  },
  comments: {
    type: String,
  },
});

module.exports = model('PerformanceReview', performanceReviewSchema);
