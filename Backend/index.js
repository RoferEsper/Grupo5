

const cors = require('cors');
const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(express.json());

// Rutas
app.use('/estudiantes', require('./router/estudiantes'));
app.use('/cursos', require('./router/cursos'));
app.use('/inscripcion', require('./router/inscripcion'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});