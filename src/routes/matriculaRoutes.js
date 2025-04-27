
const express = require('express');
const matriculaController = require('../controllers/matriculaController');
const router = express.Router();

router.post('/matriculas', matriculaController.createMatricula);
router.get('/matriculas', matriculaController.getAllMatriculas);
router.get('/estudiantes/:id/cursos', matriculaController.getCursosDeEstudiante);
router.get('/cursos/:id/estudiantes', matriculaController.getEstudiantesDeCurso);

module.exports = router;