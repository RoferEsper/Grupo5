// Buscador.jsx
import React, { useState } from "react";
import "./Buscador.css";

export default function Buscador() {
  const [q, setQ] = useState("");
  const [resultados, setResultados] = useState({
    estudiantes: [],
    cursos: [],
    inscripcion: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchResults = async (term) => {
    try {
      setLoading(true);
      setError(null);

      const urls = {
        estudiantes: `http://localhost:3000/estudiantes/buscar/query?q=${encodeURIComponent(term)}`,
        cursos: `http://localhost:3000/cursos/buscar/query?q=${encodeURIComponent(term)}`,
        inscripcion: `http://localhost:3000/inscripcion/buscar/query?q=${encodeURIComponent(term)}`
      };

      const [resEst, resCur, resIns] = await Promise.all([
        fetch(urls.estudiantes),
        fetch(urls.cursos),
        fetch(urls.inscripcion)
      ]);

      if (!resEst.ok) throw new Error("Error en estudiantes");
      if (!resCur.ok) throw new Error("Error en cursos");
      if (!resIns.ok) throw new Error("Error en inscripcion");

      const dataEst = await resEst.json();
      const dataCur = await resCur.json();
      const dataIns = await resIns.json();

      setResultados({ estudiantes: dataEst, cursos: dataCur, inscripcion: dataIns });
    } catch (err) {
      setError(err.message || "Error en la búsqueda");
      setResultados({ estudiantes: [], cursos: [], inscripcion: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchResults(q);
  };

  const handleClear = () => {
    setQ("");
    setResultados({ estudiantes: [], cursos: [], inscripcion: [] });
    setError(null);
  };

  return (
    <div className="buscador-container">
      <form className="buscador-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" className="btn-clear" onClick={handleClear}>
          Borrar
        </button>
      </form>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Resultados Estudiantes */}
      {resultados.estudiantes.length > 0 && (
        <>
          <h4>Estudiantes</h4>
          <ul className="resultados-lista">
            {resultados.estudiantes.map((e) => (
              <li key={e.id_estudiante}>
                {e.id_estudiante} — {e.nombre} {e.apellido} — {e.email}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Resultados Cursos */}
      {resultados.cursos.length > 0 && (
        <>
          <h4>Cursos</h4>
          <ul className="resultados-lista">
            {resultados.cursos.map((c) => (
              <li key={c.id_curso}>
                {c.id_curso} — {c.nombre} — {c.descripcion}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Resultados Inscripciones */}
      {resultados.inscripcion.length > 0 && (
        <>
          <h4>Inscripciones</h4>
          <ul className="resultados-lista">
            {resultados.inscripcion.map((i) => (
              <li key={i.id_inscripcion}>
                {i.id_inscripcion} — Estudiante: {i.estudiante} {i.apellido} — Curso: {i.curso} — Fecha: {i.fecha_inscripcion}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
