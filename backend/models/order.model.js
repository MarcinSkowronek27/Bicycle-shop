const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderContent: [
    // tutaj musi być _id z generatorem Id, bo inaczej wyskakuje błąd 500 połączenia TIPS
    {
      _id: { type: ObjectId },
      // id: { type: Number },
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
    name: { type: String, minlength: 2, maxlength: 20 },
    surname: { type: String, maxlength: 16 },
    payment: { type: String, minlength: 2, maxlength: 20 },
    address: { type: String, minlength: 5, maxlength: 18 },
    city: { type: String, minlength: 5, maxlength: 18 },
  },
});

module.exports = mongoose.model('Order', orderSchema);
