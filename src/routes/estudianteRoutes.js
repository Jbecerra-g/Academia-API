
const express = require('express');
const estudianteController = require('../controllers/estudianteController');
const router = express.Router();

router.get('/estudiantes', estudianteController.getAllEstudiantes);
router.get('/estudiantes/:id', estudianteController.getEstudianteById);
router.post('/estudiantes', estudianteController.createEstudiante);
router.put('/estudiantes/:id', estudianteController.updateEstudiante);
router.delete('/estudiantes/:id', estudianteController.deleteEstudiante);

module.exports = router;