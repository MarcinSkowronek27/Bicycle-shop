const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();


const bicyclesRoutes = require('./routes/bicycles.routes');
const ordersRoutes = require('./routes/orders.routes');

const app = express();

// const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', ordersRoutes);
app.use('/api', bicyclesRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ bicycles: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
// if (NODE_ENV === 'production')
dbUri = `mongodb+srv://${process.env.USER_TEST}:${process.env.PASS_TEST}@cluster0.xxdw6.mongodb.net/bicycleDB?retryWrites=true&w=majority`;
// else dbUri = 'mongodb://localhost:27017/bicycleShop';
// console.log(process.env.PASS_TEST);
// console.log(process.env.USER_TEST);
try {
  mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
  if (process.env.debug === true) console.log(err);
  else console.log('Couldn\'t connect to db...');
}
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

// console.log('test', process.env.GITES);
