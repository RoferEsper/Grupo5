const express = require('express');
const router = express.Router();

const {
    mostrarEstudiantes,
    mostrarEstudiante,
    crearEstudiante,
    editarEstudiante,
    eliminarEstudiante
} = require('../controllers/estudiantes');

router.get("/", mostrarEstudiantes);        // Listar todos
router.get("/:id", mostrarEstudiante);      // Buscar por id
router.post("/", crearEstudiante);          // Crear nuevo
router.put("/:id", editarEstudiante);       // Editar
router.delete("/:id", eliminarEstudiante);  // Eliminar

module.exports = router;
