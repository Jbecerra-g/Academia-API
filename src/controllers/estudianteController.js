
const { Estudiante } = require('../models');
const { v4: uuidv4 } = require('uuid');

// Obtener todos los estudiantes
exports.getAllEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll();
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un estudiante por ID
exports.getEstudianteById = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByPk(req.params.id);
    if (estudiante) {
      res.status(200).json(estudiante);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo estudiante
exports.createEstudiante = async (req, res) => {
  try {
    const nuevoEstudiante = await Estudiante.create(req.body);
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un estudiante
exports.updateEstudiante = async (req, res) => {
  try {
    const [updated] = await Estudiante.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedEstudiante = await Estudiante.findByPk(req.params.id);
      res.status(200).json(updatedEstudiante);
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un estudiante
exports.deleteEstudiante = async (req, res) => {
  try {
    const deleted = await Estudiante.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Estudiante no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};