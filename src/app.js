const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const middlewares = require('./middlewares.js')
const api = require('./api')
const project = require('./constants/projects')
const app  = express();

app.use(morgan('tiny'));
app.use(compression());
app.use(helmet());
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        message: project.message
    });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

