
const express = require('express');
const { sequelize } = require('./src/models'); // Importa la instancia de Sequelize

const cursoRoutes = require('./src/routes/cursoRoutes');
const estudianteRoutes = require('./src/routes/estudianteRoutes');
const matriculaRoutes = require('./src/routes/matriculaRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/cursos', cursoRoutes);
app.use('/estudiantes', estudianteRoutes);
app.use('/matriculas', matriculaRoutes);

sequelize.sync({ force: false }) // Sincroniza los modelos con la base de datos
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
  