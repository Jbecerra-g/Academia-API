
const express = require('express');
const matriculaController = require('../controllers/matriculaController');
const router = express.Router();

router.post('/', matriculaController.createMatricula);
router.get('/', matriculaController.getAllMatriculas);
router.get('/estudiantes/:id/cursos', matriculaController.getCursosDeEstudiante);
router.get('/cursos/:id/estudiantes', matriculaController.getEstudiantesDeCurso);

module.exports = router;