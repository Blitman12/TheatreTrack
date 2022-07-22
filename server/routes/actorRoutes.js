const express = require('express');
const Actor = require('../models/actor');

const router = express.Router();

router.get('/actors', async (req, res) => {
    try {
        const actors = await Actor.find({});
        return res.status(200).send(actors);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/actors/:id', async (req, res) => {
    try {
        const actors = await Actor.findById(req.params.id);
        return res.status(200).send(actors);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/actors', async (req, res) => {
    try {
        const actor = new Actor(req.body);
        await actor.save();
        return res.send(actor);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
});

router.put('/actors/:id', async (req, res) => {
    const actorId = req.params.id;
    try {
        await Actor.findByIdAndUpdate(actorId, req.body, {new: true}).then(dbActorData => {
            return res.status(200).send(dbActorData);
        })
    } catch (error) {
        return res.status(400).send(`An Error Ocurred: ${error}`);
    }
})

router.put('/actors/newCharacter/:id', async (req, res) => {
    const actorId = req.params.id;
    const currentCharacter = req.body.currentCharacter;
    try {
        const actor =  await Actor.findById(actorId);
        const oldCharacter = actor.currentCharacter;
        if (!oldCharacter) {
            actor.currentCharacter = currentCharacter;
            await actor.save();
            return res.status(200).send(actor);
        } else {
            actor.currentCharacter = currentCharacter;
            actor.pastCharacters.push(oldCharacter);
            await actor.save();
            return res.status(200).send(actor);
        }
    } catch (error) {
        return res.status(400).send(`An Error Ocurred: ${error}`);
    }
})

router.delete('/actors/:id', async (req, res) => {
    const actorId = req.params.id;
    try {
        await Actor.findByIdAndDelete(actorId);
        return res.status(200).send(`The actor with ID: ${actorId} was deleted`)
    } catch (error) {
        return res.status(404).send('An error ocurred');
    }
})

module.exports = router;