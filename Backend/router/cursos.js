const express = require('express');
const router = express.Router();

const {
    mostrarCursos,
    crearCurso,
    editarCurso,
    eliminarCurso,
    buscarCursos // <-- agregamos la función de búsqueda
} = require('../controllers/cursos');

router.get("/", mostrarCursos);                 // Listar todos los cursos
router.get("/buscar/query", buscarCursos);     // Búsqueda por nombre o descripción
router.post("/", crearCurso);                  // Crear nuevo curso
router.put("/:id", editarCurso);               // Editar curso
router.delete("/:id", eliminarCurso);          // Eliminar curso

module.exports = router;
