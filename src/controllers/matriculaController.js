const { Matricula, Estudiante, Curso } = require('../models');
const { Op } = require('sequelize'); // Importa el operador Op para consultas

exports.createMatricula = async (req, res) => {
  const { estudianteId, cursoId } = req.body;
  try {
    // Verifica si el estudiante y el curso existen
    const estudiante = await Estudiante.findByPk(estudianteId);
    const curso = await Curso.findByPk(cursoId);

    if (!estudiante || !curso) {
      return res.status(400).json({ message: 'Estudiante o Curso no encontrado.' });
    }

    const nuevaMatricula = await Matricula.create({ estudianteId, cursoId });
    res.status(201).json(nuevaMatricula);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllMatriculas = async (req, res) => {
  try {
    const matriculas = await Matricula.findAll({
      include: [
        { model: Estudiante, as: 'Estudiante' },
        { model: Curso, as: 'Curso' },
      ],
    });
    res.status(200).json(matriculas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCursosDeEstudiante = async (req, res) => {
  const { id: estudianteId } = req.params;
  try {
    const estudiante = await Estudiante.findByPk(estudianteId);
    if (!estudiante) {
      return res.status(404).json({ message: 'Estudiante no encontrado.' });
    }

    const cursos = await Curso.findAll({
      include: [{
        model: Estudiante,
        as: 'Estudiantes',
        where: { id: estudianteId },
        through: { attributes: [] } // Para no incluir los atributos de la tabla intermedia (Matricula)
      }]
    });
    res.status(200).json(cursos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEstudiantesDeCurso = async (req, res) => {
  const { id: cursoId } = req.params;
  try {
    const curso = await Curso.findByPk(cursoId);
    if (!curso) {
      return res.status(404).json({ message: 'Curso no encontrado.' });
    }

    const estudiantes = await Estudiante.findAll({
      include: [{
        model: Curso,
        as: 'Cursos',
        where: { id: cursoId },
        through: { attributes: [] } // Para no incluir los atributos de la tabla intermedia (Matricula)
      }]
    });
    res.status(200).json(estudiantes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};