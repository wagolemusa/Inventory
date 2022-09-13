const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const middlewares = require('./middlewares.js')

const app  = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: 'Korgas Inventory System'
    });
});


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

