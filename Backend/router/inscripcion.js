const express = require('express');
const router = express.Router();

const {
    mostrarInscripciones,
    crearInscripcion,
    eliminarInscripcion
} = require('../controllers/inscripcion');

// Listar todas las inscripciones (con join estudiante+curso)
router.get("/", mostrarInscripciones);

// Crear nueva inscripción
router.post("/", crearInscripcion);

// Eliminar inscripción por ID
router.delete("/:id", eliminarInscripcion);

module.exports = router;
