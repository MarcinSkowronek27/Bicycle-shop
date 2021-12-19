// const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderContent: [
    {
      // _id: { type: ObjectId },
      id: { type: Number },
      title: { type: String },
      image: { type: String },
      price: { type: Number },
      quantity: { type: Number },
      comment: { type: String },
    },
  ],
  personalData: {
    email: { type: String, minlength: 2, maxlength: 20 },
    phone: { type: String, minlength: 2, maxlength: 20 },
    // name: { type: String, minlength: 2, maxlength: 20, required: true },
    // surname: { type: String, maxlength: 16, required: true },
    // payment: { type: String, minlength: 2, maxlength: 20, required: true },
    // address: { type: String, minlength: 5, maxlength: 18, required: true },
    // city: { type: String, minlength: 5, maxlength: 18, required: true },
  },
});

module.exports = mongoose.model('Order', orderSchema);
