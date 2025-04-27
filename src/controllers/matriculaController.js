
const { Matricula, Estudiante, Curso } = require('../models');
const { Op } = require('sequelize'); // Importa el operador Op para consultas

exports.createMatricula = async (req, res) => {
    const { estudianteId, cursoId } = req.body;

    // Validaciones básicas
    if (!estudianteId || !cursoId) {
        return res.status(400).json({ message: 'estudianteId y cursoId son campos requeridos.' });
    }

    if (typeof estudianteId !== 'string' || estudianteId.trim() === '') {
        return res.status(400).json({ message: 'estudianteId debe ser un UUID válido.' });
    }

    if (typeof cursoId !== 'string' || cursoId.trim() === '') {
        return res.status(400).json({ message: 'cursoId debe ser un UUID válido.' });
    }

    try {
        // Verifica si el estudiante y el curso existen
        const estudiante = await Estudiante.findByPk(estudianteId);
        const curso = await Curso.findByPk(cursoId);

        if (!estudiante || !curso) {
            return res.status(400).json({ message: 'Estudiante o Curso no encontrado.' });
        }

        // Validación de matrícula existente
        const existingMatricula = await Matricula.findOne({
          where: {
              estudianteId: estudianteId,
              cursoId: cursoId
          }
      });

      if (existingMatricula) {
          return res.status(409).json({ message: 'La matrícula para este estudiante y curso ya existe.' }); // 409 Conflict
      }

        const nuevaMatricula = await Matricula.create({ estudianteId, cursoId });
        res.status(201).json(nuevaMatricula);
    } catch (error) {
        // Manejo de errores más específico, por ejemplo, para errores de clave foránea.
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ message: 'El estudianteId o cursoId proporcionado no son válidos.' });
        }
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

    if (!estudianteId || typeof estudianteId !== 'string' || estudianteId.trim() === '') {
        return res.status(400).json({ message: 'El ID del estudiante debe ser un UUID válido.' });
    }

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

    if (!cursoId || typeof cursoId !== 'string' || cursoId.trim() === '') {
        return res.status(400).json({ message: 'El ID del curso debe ser un UUID válido.' });
    }

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