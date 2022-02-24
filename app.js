const express = require('express');
const path = require('path');
const logger = require('morgan');

const peopleRouter = require('./routes/people');
const countryRouter = require('./routes/countries');
const notFound = require('./middleware/notFound');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// http://localhost:3000/people
app.use('/people', peopleRouter);
// http://localhost:3000/countries
app.use('/countries', countryRouter);

app.use(notFound);

module.exports = app;
