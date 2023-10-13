const { Schema, model, Types } = require("mongoose");

const performanceReviewSchema = new Schema({
  employee: {
    type: Types.ObjectId,
    ref: 'Employee',
    required: [true, 'Please specify the reviewed employee'],
  },
  reviewer: {
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('PerformanceReview', performanceReviewSchema);
