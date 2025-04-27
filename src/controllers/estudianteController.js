
const { Estudiante } = require('../models');
const { v4: uuidv4 } = require('uuid');
const { Op } = require('sequelize');

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
    const { nombre, apellido, email } = req.body;

    // Validaciones básicas
    if (!nombre || !apellido || !email) {
        return res.status(400).json({ message: 'Nombre, apellido y email son campos requeridos.' });
    }

    if (typeof nombre !== 'string' || nombre.trim() === '') {
        return res.status(400).json({ message: 'El nombre debe ser una cadena de texto no vacía.' });
    }

    if (typeof apellido !== 'string' || apellido.trim() === '') {
        return res.status(400).json({ message: 'El apellido debe ser una cadena de texto no vacía.' });
    }

    if (typeof email !== 'string' || email.trim() === '') {
        return res.status(400).json({ message: 'El email debe ser una cadena de texto no vacía.' });
    }

    // Validación de formato de email 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'El formato del email no es válido.' });
    }

    // Validación de email único
    try {
        const existingEstudiante = await Estudiante.findOne({ where: { email: email } });
        if (existingEstudiante) {
            return res.status(409).json({ message: 'El email ya está registrado.' }); // 409 Conflict
        }

        const nuevoEstudiante = await Estudiante.create(req.body);
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar un estudiante
exports.updateEstudiante = async (req, res) => {
    const { nombre, apellido, email } = req.body;
    const { id } = req.params;

    // Validaciones básicas (solo si los campos están presentes)
    if (nombre !== undefined) {
        if (typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({ message: 'El nombre debe ser una cadena de texto no vacía.' });
        }
    }

    if (apellido !== undefined) {
        if (typeof apellido !== 'string' || apellido.trim() === '') {
            return res.status(400).json({ message: 'El apellido debe ser una cadena de texto no vacía.' });
        }
    }

    if (email !== undefined) {
        if (typeof email !== 'string' || email.trim() === '') {
            return res.status(400).json({ message: 'El email debe ser una cadena de texto no vacía.' });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'El formato del email no es válido.' });
        }
        // Validación de email único (al actualizar, excluyendo el estudiante actual)
        const existingEstudiante = await Estudiante.findOne({
            where: {
                email: email,
                id: { [Op.ne]: id } // Excluye el estudiante que se está actualizando
            }
        });
        if (existingEstudiante) {
            return res.status(409).json({ message: 'El email ya está registrado.' });
        }
    }

    try {
        const [updated] = await Estudiante.update(req.body, {
            where: { id: id },
        });
        if (updated) {
            const updatedEstudiante = await Estudiante.findByPk(id);
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