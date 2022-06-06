require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const currenciesRoutes = require('./routes/currencies');
const ordersRoutes = require('./routes/orders');

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/currencies', currenciesRoutes);

app.use('/orders', ordersRoutes);

module.exports = app;
