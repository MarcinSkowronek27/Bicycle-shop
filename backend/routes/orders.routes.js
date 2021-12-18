const express = require('express');
const router = express.Router();

const Order = require('../models/order.model');

router.get('/orders', async (req, res) => {
  try {
    const result = await Order.find();
    if(!result) res.status(404).json({ orders: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/orders', async (req, res) => {
  try {
    const { orderContent, personalData } = req.body;
    const newPost = new Order({ orderContent, personalData });
    await newPost.save();
    //res.json({ message: 'OK' });
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
