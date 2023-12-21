const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const campaignSchema = new Schema(
  {
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    dateRange: {
      type: String,
      required: true,
    },
    clicks: {
      type: Number,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);
