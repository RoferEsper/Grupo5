import axios from "axios";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import {
  ENDPOINTS,
  HOME_ESTUDIANTES,
  HOME_CURSOS,
  HOME_INSCRIPCION, // esta es la tabla inscripcion
} from "../endpoints/endpoints";
import "./Home.css";

const Home = () => {
  // Estados para cada tabla
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);

  // --- FUNCIONES DE FETCH ---
  const getEstudiantes = async () => {
    try {
      const response = await axios.get(ENDPOINTS + HOME_ESTUDIANTES);
      if (response.status === 200) setEstudiantes(response.data);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
    }
  };

  const getCursos = async () => {
    try {
      const response = await axios.get(ENDPOINTS + HOME_CURSOS);
      if (response.status === 200) setCursos(response.data);
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  const getInscripciones = async () => {
    try {
      const response = await axios.get(ENDPOINTS + HOME_INSCRIPCION);
      if (response.status === 200) setInscripciones(response.data);
    } catch (error) {
      console.error("Error al obtener las inscripciones:", error);
    }
  };

  // useEffect para traer todos los datos al montar el componente
  useEffect(() => {
    getEstudiantes();
    getCursos();
    getInscripciones();
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-3">Tablero General</h2>
      <hr />

      {/* --- ESTUDIANTES --- */}
      <h4>Estudiantes</h4>
      <Table striped bordered hover responsive className="mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((e) => (
            <tr key={e.id_estudiante}>
              <td>{e.id_estudiante}</td>
              <td>{e.nombre}</td>
              <td>{e.apellido}</td>
              <td>{e.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />

      {/* --- CURSOS --- */}
      <h4>Cursos</h4>
      <Table striped bordered hover responsive className="mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Curso</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {cursos.map((c) => (
            <tr key={c.id_curso}>
              <td>{c.id_curso}</td>
              <td>{c.nombre}</td>
              <td>{c.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />

      {/* --- INSCRIPCIONES --- */}
      <h4>Inscripciones</h4>
      <Table striped bordered hover responsive className="mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Curso</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {inscripciones.map((i) => (
            <tr key={i.id_inscripcion}>
              <td>{i.id_inscripcion}</td>
              <td>{i.estudiante}</td>
              <td>{i.apellido}</td>
              <td>{i.curso}</td>
              <td>{i.fecha_inscripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Home;
