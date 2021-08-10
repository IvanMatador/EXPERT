const express = require('express');
const cards = require('./routes/cards');
const filters = require('./routes/filters');
const mkdoc = require('./routes/mkdoc');
const app = express();

app.use(require('cors')());
app.use(require('morgan')('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/cards', cards);
app.use('/api/filters', filters);
app.use('/api/make-doc', mkdoc);

module.exports = app;
