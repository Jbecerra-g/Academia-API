
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const Matricula = sequelize.define('Matricula', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4,
    },
    fecha_matricula: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    estudianteId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Estudiantes', // Nombre de la tabla
        key: 'id',
      },
    },
    cursoId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Cursos', // Nombre de la tabla
        key: 'id',
      },
    },
  });
  return Matricula;
};