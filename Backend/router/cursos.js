const express = require('express');
const router = express.Router();

const {
    mostrarCursos,
    crearCurso,
    editarCurso,
    eliminarCurso
} = require('../controllers/cursos');

router.get("/", mostrarCursos);        // Listar todos
router.post("/", crearCurso);          // Crear nuevo
router.put("/:id", editarCurso);       // Editar
router.delete("/:id", eliminarCurso);  // Eliminar

module.exports = router;
