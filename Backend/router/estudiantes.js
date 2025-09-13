const express = require('express');
const router = express.Router();

const {
    mostrarEstudiantes,
    mostrarEstudiante,
    crearEstudiante,
    editarEstudiante,
    eliminarEstudiante,
    buscarEstudiantes   // 👈 importamos la nueva función
} = require('../controllers/estudiantes');

// Rutas CRUD
router.get("/", mostrarEstudiantes);        // Listar todos
router.get("/:id", mostrarEstudiante);      // Buscar por id
router.post("/", crearEstudiante);          // Crear nuevo
router.put("/:id", editarEstudiante);       // Editar
router.delete("/:id", eliminarEstudiante);  // Eliminar

// 🔍 Nueva ruta de búsqueda
// Ejemplo: GET /estudiantes/buscar?q=juan
router.get("/buscar/query", buscarEstudiantes);

module.exports = router;
