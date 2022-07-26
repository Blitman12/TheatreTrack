const express = require('express');
const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Act = require('../models/acts');
const Project = require('../models/project')
const Scene = require('../models/scene');

const router = express.Router();

router.get('/act', async (req, res) => {
    try {
        const act = await Act.find({}).populate({ path: 'scenes', populate: [{ path: 'actors' }] });
        res.status(200).send(act);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/act/:id', async (req, res) => {
    try {
        const actId = req.params.id
        const act = await Act.findById(actId).populate({ path: 'scenes', populate: [{ path: 'actors' }] });
        res.status(200).send(act);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/act', async (req, res) => {
    try {
        const act = new Act(req.body);
        await act.save();
        res.status(200).send(act);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/act/project/:id', async (req, res) => {
    try {
        const projectId = req.params.id;
        const act = new Act(req.body);
        await act.save();
        const addAct = await Act.findById(act._id.toString());
        await Project.findByIdAndUpdate(projectId, { $push: { acts: addAct } }, { new: true }).then(dbActData => {
            res.status(200).send(dbActData);
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/act/:id', async (req, res) => {
    try {
        const actId = req.params.id;
        await Act.findByIdAndUpdate(actId, req.body, { new: true }).populate({ path: 'scenes', populate: [{ path: 'actors' }] }).then(dbActData => {
            res.status(200).send(dbActData);
        })
    } catch (error) {
        res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.delete('/act/:id', async (req, res) => {
    try {
        const actId = req.params.id;
        const act = await Act.findByIdAndDelete(actId);
        res.status(200).send(act)
    } catch (error) {
        res.status(404).send('An error ocurred');
    }
})

module.exports = router;
