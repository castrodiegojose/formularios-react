import { useState } from "react";
import Swal from "sweetalert2";

const Formulario = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    state: "",
    priority: true,
  });

  const { title, description, state, priority } = todo;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Titulo y descripción obligatorios",
      });
    }

    addTodo({
      id: Date.now(),
      ...todo,
      state: state === "complete",
    });

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Todo agregado Correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(e.target.name, e.target.value);
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ingrese Todo"
        className="form-control mb-2"
        name="title"
        value={title}
        onChange={handleChange}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Ingrese Descripcion"
        name="description"
        value={description}
        onChange={handleChange}
      />

      <div className="form-check mb-2">
        <input
          type="checkbox"
          name="priority"
          id="inputCheck"
          className="form-check-input"
          checked={priority}
          onChange={handleChange}
        />
        <label htmlFor="inputCheck">Dar Prioridad</label>
      </div>

      <select
        className="form-select mb-2"
        name="state"
        value={state}
        onChange={handleChange}
      >
        <option value="pendiente">Pendiente</option>
        <option value="completado">Completado</option>
      </select>

      <button type="submit" className="btn btn-primary">
        Agregar
      </button>
    </form>
  );
};

export default Formulario;
