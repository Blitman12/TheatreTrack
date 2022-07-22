const express = require('express');
const router = express.Router();

router.use(require('./projectRoutes'));
router.use(require('./actorRoutes'));
router.use(require('./staffRoutes'));
router.use(require('./actRoutes'));
router.use(require('./sceneRoutes'));

module.exports = router;
