const express = require('express');
const router = express.Router();

router.use(require('./projectRoutes'));
router.use(require('./actorRoutes'));
router.use(require('./staffRoutes'));

module.exports = router;
