const express = require('express');
const Project = require('../models/project');
const Actor = require('../models/actor');
const Staff = require('../models/staff');
const Act = require('../models/acts');

const router = express.Router();

router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find({})
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}});
        return res.status(200).send(projects);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get('/projects/:projectId', async (req, res) => {
    const projectId = req.params.projectId
    try {
        const projects = await Project.findById(projectId)
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}});
        return res.status(200).send(projects);
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.post('/projects', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        return res.status(200).send(project);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
});

router.put('/projects/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    try {
        await Project.findByIdAndUpdate(projectId, req.body, {new: true})
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}})
        .then(dbProjectData => {
            return res.status(200).send(dbProjectData)
        })
    } catch (error) {
        return res.status(400).send(error);
    }
})

router.delete('/projects/:projectId', async (req, res) => {
    const projectId = req.params.projectId;
    try {
        await Project.findByIdAndDelete(projectId)
        return res.status(200).send(`Your project with ID: ${projectId} - has been deleted`)
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.put('/projects/:projectId/addactor/:actorId', async (req, res) => {
    const actorId = req.params.actorId;
    const projectId = req.params.projectId;
    try {
        const actor = await Actor.findById(actorId);
        await Project.findByIdAndUpdate(projectId, {$push: {actors: actor}}, {new: true})
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}})
        .then(dbProjectData => {
            return res.status(200).send(dbProjectData);
        })
    } catch (error) {
        return res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.put('/projects/:projectId/removeactor/:actorId', async (req, res) => {
    const actorId = req.params.actorId;
    const projectId = req.params.projectId;
    try {
        await Project.findByIdAndUpdate(projectId, {$pull: {actors: actorId}}, {new: true})
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}})
        .then(dbProjectData => {
            return res.status(200).send(dbProjectData);
        })
    } catch (error) {
        return res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.put('/projects/:projectId/addstaff/:staffId', async (req, res) => {
    const staffId = req.params.staffId;
    const projectId = req.params.projectId;
    try {
        const staff = await Staff.findById(staffId);
        await Project.findByIdAndUpdate(projectId, {$push: {staff: staff}}, {new: true})
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}})
        .then(dbStaffData => {
            return res.status(200).send(dbStaffData);
        })
    } catch (error) {
        return res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.put('/projects/:projectId/removestaff/:staffId', async (req, res) => {
    const staffId = req.params.staffId;
    const projectId = req.params.projectId;
    try {
        await Project.findByIdAndUpdate(projectId, {$pull: {staff: staffId}}, {new: true})
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}})
        .then(dbStaffData => {
            return res.status(200).send(dbStaffData);
        })
    } catch (error) {
        return res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.put('/projects/:projectId/addact/:actId', async (req, res) => {
    const actId = req.params.actId;
    const projectId = req.params.projectId;
    try {
        const act = await Act.findById(actId);
        await Project.findByIdAndUpdate(projectId, {$push: {acts: act}}, {new: true})
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}})
        .then(dbActData => {
            return res.status(200).send(dbActData);
        })
    } catch (error) {
        return res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

router.put('/projects/:projectId/removeact/:actId', async (req, res) => {
    const actId = req.params.actId;
    const projectId = req.params.projectId;
    try {
        await Project.findByIdAndUpdate(projectId, {$pull: {acts: actId}}, {new: true})
        .populate('actors')
        .populate('staff')
        .populate({path:'acts', populate: {path:'scenes', populate: {path:'actors'}}})
        .then(dbActData => {
            return res.status(200).send(dbActData);
        })
    } catch (error) {
        return res.status(400).send(`An Error Ocurred: ${error}`);
    }
});

module.exports = router;