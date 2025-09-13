const { connection } = require('../config/dataBase');

// --- Mostrar todos los cursos ---
const mostrarCursos = (req, res) => {
    connection.query('SELECT * FROM cursos', (error, results) => {
        if (error) return res.status(500).json({ error: 'Error al obtener los cursos' });
        res.json(results);
    });
};

// --- Crear un curso ---
const crearCurso = (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    connection.query(
        'INSERT INTO cursos (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion],
        (error, results) => {
            if (error) return res.status(500).json({ error: 'Error al crear el curso' });
            res.json({ message: "Curso creado correctamente", id_curso: results.insertId });
        }
    );
};

// --- Editar un curso ---
const editarCurso = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    connection.query(
        'UPDATE cursos SET nombre = ?, descripcion = ? WHERE id_curso = ?',
        [nombre, descripcion, id],
        (error, results) => {
            if (error) return res.status(500).json({ error: 'Error al editar el curso' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Curso no encontrado' });
            res.json({ id, nombre, descripcion });
        }
    );
};

// --- Eliminar un curso ---
const eliminarCurso = (req, res) => {
    const { id } = req.params;

    connection.query(
        'DELETE FROM cursos WHERE id_curso = ?',
        [id],
        (error, results) => {
            if (error) return res.status(500).json({ error: 'Error al eliminar el curso' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Curso no encontrado' });
            res.status(204).send();
        }
    );
};

// --- Buscar cursos por nombre o descripcion ---
const buscarCursos = (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: "Falta el parámetro de búsqueda" });
    }

    const searchTerm = `%${q}%`;
    const query = 'SELECT * FROM cursos WHERE nombre LIKE ? OR descripcion LIKE ?';

    connection.query(query, [searchTerm, searchTerm], (error, results) => {
        if (error) return res.status(500).json({ error: "Error al buscar cursos" });
        res.json(results);
    });
};

module.exports = {
    mostrarCursos,
    crearCurso,
    editarCurso,
    eliminarCurso,
    buscarCursos
};
