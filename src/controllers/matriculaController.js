
const { Matricula, Estudiante, Curso } = require('../models');

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