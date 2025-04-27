
const express = require('express');
const matriculaController = require('../controllers/matriculaController');
const router = express.Router();

router.post('/', matriculaController.createMatricula);

module.exports = router;