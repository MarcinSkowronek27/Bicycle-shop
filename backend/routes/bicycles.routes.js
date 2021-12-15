const express = require('express');
const router = express.Router();

const Bicycle = require('../models/bicycle.model');

router.get('/bicycles', async (req, res) => {
  try {
    const result = await Bicycle.find();
    if(!result) res.status(404).json({ bicycle: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/bicycles/:id', async (req, res) => {
  try {
    const result = await Bicycle.findById(req.params.id);
    if(!result) res.status(404).json({ bicycles: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
