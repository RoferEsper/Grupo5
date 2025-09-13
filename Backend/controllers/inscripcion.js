const { connection } = require('../config/dataBase');

// --- Mostrar todas las inscripciones con info de estudiante y curso ---
const mostrarInscripcion = (req, res) => {
    const query = `
        SELECT i.id_inscripcion,
               e.nombre AS estudiante,
               e.apellido AS apellido,
               c.nombre AS curso,
               i.fecha_inscripcion
        FROM inscripcion i
        INNER JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
        INNER JOIN cursos c ON i.id_curso = c.id_curso
    `;
    connection.query(query, (error, results) => {
        if (error) return res.status(500).json({ error: 'Error al obtener inscripciones' });
        res.json(results);
    });
};

// --- Crear inscripción ---
const crearInscripcion = (req, res) => {
    const { id_estudiante, id_curso, fecha_inscripcion } = req.body;

    if (!id_estudiante || !id_curso || !fecha_inscripcion) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    connection.query(
        'INSERT INTO inscripcion (id_estudiante, id_curso, fecha_inscripcion) VALUES (?, ?, ?)',
        [id_estudiante, id_curso, fecha_inscripcion],
        (error, results) => {
            if (error) return res.status(500).json({ error: 'Error al crear inscripción' });
            res.json({ message: "Inscripción creada correctamente", id_inscripcion: results.insertId });
        }
    );
};

// --- Eliminar inscripción ---
const eliminarInscripcion = (req, res) => {
    const { id } = req.params;

    connection.query(
        'DELETE FROM inscripcion WHERE id_inscripcion = ?',
        [id],
        (error, results) => {
            if (error) return res.status(500).json({ error: 'Error al eliminar inscripción' });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Inscripción no encontrada' });
            res.status(204).send();
        }
    );
};

// --- Buscar inscripciones por estudiante, curso o fecha ---
const buscarInscripcion = (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Falta el parámetro de búsqueda' });

    const searchTerm = `%${q}%`;
    const query = `
        SELECT i.id_inscripcion,
               e.nombre AS estudiante,
               e.apellido AS apellido,
               c.nombre AS curso,
               i.fecha_inscripcion
        FROM inscripcion i
        INNER JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
        INNER JOIN cursos c ON i.id_curso = c.id_curso
        WHERE e.nombre LIKE ? OR e.apellido LIKE ? OR c.nombre LIKE ? OR i.fecha_inscripcion LIKE ?
    `;

    connection.query(query, [searchTerm, searchTerm, searchTerm, searchTerm], (error, results) => {
        if (error) return res.status(500).json({ error: 'Error al buscar inscripciones' });
        res.json(results);
    });
};

module.exports = {
    mostrarInscripcion,
    crearInscripcion,
    eliminarInscripcion,
    buscarInscripcion
};
