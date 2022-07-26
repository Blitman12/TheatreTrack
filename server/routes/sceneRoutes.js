const express = require('express');
const Actor = require('../models/actor');
const Act = require('../models/acts');
const Scene = require('../models/scene');

const router = express.Router();

router.get('/scene', async (req, res) => {
    try {
        const scene = await Scene.find({}).populate('actors').exec();
        res.status(200).send(scene);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/scene/:id', async (req, res) => {
    try {
        const sceneId = req.params.id
        const scene = await Scene.findById(sceneId).populate('actors').exec();
        res.status(200).send(scene);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/scene', async (req, res) => {
    try {
        const scene = new Scene(req.body);
        await scene.save();
        res.status(200).send(scene);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/scene/:id', async (req, res) => {
    try {
        const sceneId = req.params.id;
        await Scene.findByIdAndUpdate(sceneId, req.body, {new: true}).then(dbSceneData => {
        res.status(200).send(dbSceneData);
        })
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.put('/scene/:sceneId/addactor/:actorId', async (req, res) => {
    const actorId = req.params.actorId;
    const sceneId = req.params.sceneId;
    try {
        const actor = await Actor.findById(actorId);
        await Scene.findByIdAndUpdate(sceneId, {$push: {actors: actor}}, {new: true}).then(dbSceneData => {
        res.status(200).send(dbSceneData);
        })
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.put('/scene/:sceneId/removeactor/:actorId', async (req, res) => {
    const actorId = req.params.actorId;
    const sceneId = req.params.sceneId;
    try {
        await Scene.findByIdAndUpdate(sceneId, {$pull: {actors: actorId}}, {new: true}).then(dbSceneData => {
        res.status(200).send(dbSceneData);
        })
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.delete('/scene/:id', async (req, res) => {
    try {
        const sceneId = req.params.id;
        await Scene.findByIdAndDelete(sceneId);
        res.status(200).send(`The scene with ID: ${sceneId} was deleted`)
    } catch (error) {
        res.status(404).send('An error ocurred');
    }
})

module.exports = router;
