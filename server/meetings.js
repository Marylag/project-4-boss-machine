const meetingsRouter = require('express').Router();
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

meetingsRouter.get('/', (req, res) => {
    res.send(getAllFromDatabase('meetings'));
});

meetingsRouter.post('/', (req, res) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});

module.exports = meetingsRouter;