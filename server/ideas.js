const ideasRouter = require('express').Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db.js');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

ideasRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('ideas'));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res) => {
    res.status(200).send(req.idea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    const updateIdea = updateInstanceInDatabase('ideas', req.body);
    res.status(200).send(updateIdea);
});

ideasRouter.delete('/:ideaId', (req, res) => {
    deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send();
});

module.exports = ideasRouter;