const express = require('express');
const Actor = require('../models/actor');

const router = express.Router();

router.get('/actors', async (req, res) => {
    try {
        const actors = await Actor.find({});
        res.status(200).send(actors);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/actors/:id', async (req, res) => {
    try {
        const actors = await Actor.findById(req.params.id);
        res.status(200).send(actors);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/actors', async (req, res) => {
    try {
        const actor = new Actor(req.body);
        await actor.save();
        res.status(200).send(actor);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

router.put('/actors/:id', async (req, res) => {
    const actorId = req.params.id;
    try {
        await Actor.findByIdAndUpdate(actorId, req.body, { new: true }).then(dbActorData => {
            res.status(200).send(dbActorData);
        })
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
})

router.put('/actors/newCharacter/:id', async (req, res) => {
    const actorId = req.params.id;
    const currentCharacter = req.body.currentCharacter;
    try {
        const actor = await Actor.findById(actorId);
        const oldCharacter = actor.currentCharacter;
        if (!oldCharacter) {
            actor.currentCharacter = currentCharacter;
            await actor.save();
            res.status(200).send(actor);
        } else {
            actor.currentCharacter = currentCharacter;
            actor.pastCharacters.push(oldCharacter);
            await actor.save();
            res.status(200).send(actor);
        }
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
})

router.delete('/actors/:id', async (req, res) => {
    const actorId = req.params.id;
    try {
        const actor = await Actor.findByIdAndDelete(actorId);
        res.status(200).send(actor)
    } catch (error) {
        res.status(404).send('An error ocurred');
    }
})

module.exports = router;
