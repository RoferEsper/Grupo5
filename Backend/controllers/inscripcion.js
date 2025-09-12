const { connection } = require('../config/dataBase');

// Obtener todas las inscripciones con info de estudiante y curso
const mostrarInscripciones = (req, res) => {
    connection.query(
        `SELECT i.id_inscripcion, e.nombre AS estudiante, e.apellido AS apellido, c.nombre AS curso, i.fecha_inscripcion
         FROM inscripcion i
         INNER JOIN estudiantes e ON i.id_estudiante = e.id_estudiante
         INNER JOIN cursos c ON i.id_curso = c.id_curso`,
        (error, results) => {
            if (error) return res.status(500).json({ error: 'Error al obtener inscripciones' });
            res.json(results);
        }
    );
};

// Crear inscripción
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

// Eliminar inscripción
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

module.exports = {
    mostrarInscripciones,
    crearInscripcion,
    eliminarInscripcion
};
