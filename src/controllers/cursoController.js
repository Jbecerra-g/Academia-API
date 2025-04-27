
const { Curso } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Obtener todos los cursos
exports.getAllCursos = async (req, res) => {
  try {
    const cursos = await Curso.findAll();
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un curso por ID
exports.getCursoById = async (req, res) => {
  try {
    const curso = await Curso.findByPk(req.params.id);
    if (curso) {
      res.status(200).json(curso);
    } else {
      res.status(404).json({ message: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo curso
exports.createCurso = async (req, res) => {
  try {
    const nuevoCurso = await Curso.create(req.body);
    res.status(201).json(nuevoCurso);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un curso
exports.updateCurso = async (req, res) => {
  try {
    const [updated] = await Curso.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCurso = await Curso.findByPk(req.params.id);
      res.status(200).json(updatedCurso);
    } else {
      res.status(404).json({ message: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un curso
exports.deleteCurso = async (req, res) => {
  try {
    const deleted = await Curso.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send(); // 204 No Content para eliminación exitosa
    } else {
      res.status(404).json({ message: 'Curso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};