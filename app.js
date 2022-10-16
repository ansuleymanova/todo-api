const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const NotFoundError = require('./not-found-err');
const {getTickets, getTicket, putTicket, postTicket} = require('./controllers');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.set('toObject', { useProjection: true });
mongoose.set('toJSON', { useProjection: true });
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/tickets', getTickets);
app.post('/tickets', postTicket);
app.get('/tickets/:id', getTicket);
app.put('/tickets/:id', putTicket);


app.use('*', (req, res, next) => {
    const error = new NotFoundError('Такой страницы не существует');
    next(error);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    if (!err.statusCode) {
        res.status(500).send(err);
    }
    res.status(err.statusCode).send(err);
});

app.listen(PORT);