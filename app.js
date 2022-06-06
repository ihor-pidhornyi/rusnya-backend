require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const currenciesRoutes = require('./routes/currencies');
const ordersRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/currencies', currenciesRoutes);

app.use('/orders', ordersRoutes);

module.exports = app;
