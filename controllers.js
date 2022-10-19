const Ticket = require('./models');

function getTickets(req, res, next) {
    Ticket.find({})
    .then((tickets) => res.status(200).send(tickets))
    .catch(next);
}

function postTicket(req, res, next) {
    const { title, description = '', tags, status } = req.body;
    Ticket.create({title, description, tags, status})
    .then((card) => res.status(200).send(card))
    .catch(next)
}

function getTicket(req, res, next) {
    Ticket.findById(req.params.id)
    .then((card) => res.status(200).send(card))
    .catch(next);
}

function putTicket(req, res, next) {
    const { title, description, tags, comments, status } = req.body;
    Ticket.findByIdAndUpdate(
        req.params.id, { $set: {
            title: title,
            description: description,
            tags: tags,
            comments: comments,
            status: status
        }}
    ).then((card) => res.status(200).send(card)).catch(err => console.log(err));
}

function deleteTicket(req, res, next) {
    Ticket.findById(req.params.id)
        .then((card) => {
            return card.remove().then(() => res.send({ message: 'Карточка удалена' }));
        })
        .catch(next);
}

module.exports = {
    getTicket,
    getTickets,
    postTicket,
    putTicket,
    deleteTicket
}