const minionsRouter = require('express').Router();
const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db.js');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/', ( req, res) => {
    res.send(getAllFromDatabase('minions'));
});

minionsRouter.post('/', (req, res) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res) => {
    res.status(200).send(req.minion);
});

minionsRouter.put('/:minionId', (req, res) => {
    let updatedMinionInstance = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinionInstance);
});

minionsRouter.delete('/:minionId', (req, res) => {
    deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send();
});

minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        next();
    } else {
        res.status(404).send();
    }
});

minionsRouter.get('/:minionId/work', (req, res) => {
    const work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId === req.params.minionId;
    });
    res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res) => {
    if(req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        updateWork = updateInstanceInDatabase('work', req.body);
        res.send(updateWork);
    }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res) => {
    deleteFromDatabasebyId('work', req.params.workId);
    res.status(204).send();
});

module.exports = minionsRouter;