const mongoose = require('mongoose');

const bicycleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  promo: { type: String },
  price: { type: Number },
  category: { type: String },
  quantity: { type: Number },
  moreImage: { type: Array },
});

module.exports = mongoose.model('Bicycle', bicycleSchema);
