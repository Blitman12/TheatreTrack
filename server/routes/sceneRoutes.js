const express = require('express');
const { default: mongoose } = require('mongoose');
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

router.post('/scene/act/:actId', async (req, res) => {
    try {
        const actId = req.params.actId;
        const scene = new Scene(req.body);
        await scene.save();
        const addScene = await Scene.findById(scene._id.toString());
        await Act.findByIdAndUpdate(actId, { $push: { scenes: addScene } }, { new: true }).then(dbActData => {
            res.status(200).send(dbActData);
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

router.put('/scene/:id', async (req, res) => {
    try {
        const sceneId = req.params.id;
        await Scene.findByIdAndUpdate(sceneId, req.body, { new: true }).then(dbSceneData => {
            res.status(200).send(dbSceneData);
        })
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.put('/scene/:sceneId/addactor', async (req, res) => {
    const actorId = req.body.actorId
    const sceneId = req.params.sceneId;
    try {
        const actor = await Actor.findById(actorId);
        await Scene.findByIdAndUpdate(sceneId, { $push: { actors: actor } }, { new: true }).then(dbSceneData => {
            res.status(200).send(dbSceneData);
        })
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
});


router.put('/scene/:sceneId/removeactor', async (req, res) => {
    const actorId = req.body.actorId;
    const sceneId = req.params.sceneId;
    try {
        const actor = await Actor.findById(actorId);
        await Scene.findByIdAndUpdate(sceneId, { $pull: { actors: actor._id } }, { new: true }).then(dbSceneData => {
            res.status(200).send(dbSceneData);
        })
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.delete('/scene/:id', async (req, res) => {
    try {
        const sceneId = req.params.id;
        const scene = await Scene.findByIdAndDelete(sceneId);
        res.status(200).send(scene)
    } catch (error) {
        res.status(404).send('An error ocurred');
    }
})

module.exports = router;
