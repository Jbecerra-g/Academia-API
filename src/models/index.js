
const { Sequelize } = require('sequelize');
const config = require('../config/config.json')['development']; // se puede Cambiar 'development' en caso de que se use otra configuracion 

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Curso = require('./curso')(sequelize, Sequelize.DataTypes);
const Estudiante = require('./estudiante')(sequelize, Sequelize.DataTypes);
const Matricula = require('./matricula')(sequelize, Sequelize.DataTypes);

// Definir relaciones/asociaciones
Curso.belongsToMany(Estudiante, { through: Matricula, foreignKey: 'cursoId' }); // Un Curso puede tener muchos Estudiantes a través de la tabla Matricula
Estudiante.belongsToMany(Curso, { through: Matricula, foreignKey: 'estudianteId' }); // Un Estudiante puede estar en muchos Cursos a través de la tabla Matricula
Matricula.belongsTo(Curso, { foreignKey: 'cursoId' }); // Una Matrícula pertenece a un Curso
Matricula.belongsTo(Estudiante, { foreignKey: 'estudianteId' }); // Una Matrícula pertenece a un Estudiante

module.exports = {
  sequelize,
  Curso,
  Estudiante,
  Matricula,
};