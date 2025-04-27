
const express = require('express');
const cursoController = require('../controllers/cursoController');
const router = express.Router();

router.get('/cursos', cursoController.getAllCursos);
router.get('/cursos/:id', cursoController.getCursoById);
router.post('/cursos', cursoController.createCurso);
router.put('/cursos/:id', cursoController.updateCurso);
router.delete('/cursos/:id', cursoController.deleteCurso);

module.exports = router;