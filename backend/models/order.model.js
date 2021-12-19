const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderContent: [
    // tutaj musi być _id z generatorem Id, bo inaczej wyskakuje błąd 500 połączenia TIPS i don't know why
    {
      _id: { type: ObjectId },
      // id: { type: Number }, i nie może być tutaj id, bo wyskakuje błąd, ale nie wiem dlaczego
      title: { type: String, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      comment: { type: String },
    },
  ],
  personalData: {
    email: { type: String, minlength: 2, maxlength: 20, required: true },
    phone: { type: String, minlength: 2, maxlength: 20, required: true },
    name: { type: String, minlength: 2, maxlength: 20, required: true },
    surname: { type: String, minlength: 2, required: true },
    payment: { type: String, minlength: 2, maxlength: 20, required: true },
    address: { type: String, minlength: 5, maxlength: 18, required: true },
    city: { type: String, minlength: 5, maxlength: 18, required: true },
  },
});

module.exports = mongoose.model('Order', orderSchema);
