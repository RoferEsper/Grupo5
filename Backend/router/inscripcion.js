const express = require('express');
const router = express.Router();

const {
    mostrarInscripcion,
    crearInscripcion,
    eliminarInscripcion,
    buscarInscripcion // <-- agregamos búsqueda
} = require('../controllers/inscripcion');

// Listar todas las inscripciones (con join estudiante+curso)
router.get("/", mostrarInscripcion);

// Buscar inscripciones por estudiante, curso o fecha
router.get("/buscar/query", buscarInscripcion); // <-- endpoint para buscador

// Crear nueva inscripción
router.post("/", crearInscripcion);

// Eliminar inscripción por ID
router.delete("/:id", eliminarInscripcion);

module.exports = router;
