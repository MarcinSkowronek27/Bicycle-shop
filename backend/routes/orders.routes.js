const express = require('express');
const router = express.Router();

const Order = require('../models/order.model');

router.get('/orders', async (req, res) => {
  try {
    const result = await Order.find();
    if (!result) res.status(404).json({ orders: 'Not found' });
    else res.json(result);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.post('/orders', async (req, res) => {
  console.log(req.body);
  try {
    const { email, phone} = req.body;
    // console.log('email',email);
    // console.log('phone',phone);
    const newOrder = new Order({ email, phone });
    await newOrder.save();
    if (!newOrder) res.status(404).json({ order: 'Not found' });
    else res.json(newOrder);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
