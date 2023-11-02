const { Schema, model, Types } = require("mongoose");

const performanceReviewSchema = new Schema({
  employeeId: {
    type: Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Please specify the reviewed employee'],
  },
  reviewerId: {
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
    minLength: 10,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const PerformanceReview = model('PerformanceReview', performanceReviewSchema);

module.exports = PerformanceReview