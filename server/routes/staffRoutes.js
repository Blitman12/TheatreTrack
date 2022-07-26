const express = require('express');
const Staff = require('../models/staff');

const router = express.Router();

router.get('/staff', async (req, res) => {
    try {
        const staff = await Staff.find({});
        res.status(200).send(staff);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/staff/:id', async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        res.status(200).send(staff);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/staff', async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.send(staff);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});

router.put('/staff/:id', async (req, res) => {
    const staffId = req.params.id;
    try {
        await Staff.findByIdAndUpdate(staffId, req.body, {new: true}).then(dbStaffData => {
        res.status(200).send(dbStaffData);
        })
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/staff/:id', async (req, res) => {
    const staffId = req.params.id;
    try {
        await Staff.findByIdAndDelete(staffId);
        res.status(200).send(`The staff with ID: ${staffId} was deleted`)
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;