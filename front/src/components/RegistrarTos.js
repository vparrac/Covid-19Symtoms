//juan camilo:algunos errores de indentacion y comillas, tambien faltaron los propTypes
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Menu from './Menu';
import NoAutorizado from "./NoAutorizado";
import RegistroExitoso from './RegistroExitoso';
export const RegistrarTos = (props) => {
  //deberia ser constante
  const [maxFecha, setMaxFecha] = useState(new Date());

  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [tratamiento, setTratamiento] = useState("");
  const [fecha, setCalendarFecha] = useState(new Date());
  const [tipo, setTipo] = useState("Seca");
  // nunca se usa el set
  const [exito, setexito] = useState("");
  function handleSubmit(data) {
    const body = {
      user:props.user,
      tipo:tipo,
      minutos:minutos,
      horas:horas,
      tratamiento:tratamiento,
      fecha:fecha,
    };
    data.preventDefault();
    return fetch("/registrar/RegistrarTos", {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div>
      {props.user?(
        exito!=="exito"?( <div className="container-fluid">
      <Menu></Menu>
        <h1>Registrar tos</h1>
        <div className="row justify-content-center h-100">
          <div className="col-lg-10 col-12">
            <form onSubmit={handleSubmit} className="gridForm">
              <label className="form-group">
                <span>Tipo</span>
                <select
                  className="form-control input-form"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                >
                  <option value="Seca">Seca</option>
                  <option value="Humeda">Humeda</option>
                </select>
              </label>

              <label className="form-group">
                <span>Fecha</span>
                <Calendar
                  maxDate={maxFecha}
                  onChange={(date) => setCalendarFecha(date)}
                />
              </label>

              <label className="form-group">
                <span>Duración minutos</span>
                <input
                  min="0"
                  max="59"
                  value={minutos}
                  onChange={(e) => setMinutos(e.target.value)}
                  type="number"
                  className="input-form form-control"
                  placeholder="Duración minutos"
                ></input>
              </label>

              <label className="form-group">
                <span>Duración horas</span>
                <input
                  min="0"
                  max="23"
                  type="number"
                  value={horas}
                  onChange={(e) => setHoras(e.target.value)}
                  className="input-form form-control"
                  placeholder="Duración horas"
                ></input>
              </label>

              <label className="form-group">
                <span>¿Qué hizo para tratarla?</span>
                <input
                  type="text"
                  value={tratamiento}
                  onChange={(e) => setTratamiento(e.target.value)}
                  className="input-form form-control"
                  placeholder="Tratamiento"
                ></input>
              </label>

              <button type="submit" className="btnRegister">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>):(<div> <Menu></Menu>
            <RegistroExitoso></RegistroExitoso></div>)
        ):(<div><NoAutorizado></NoAutorizado></div>)}
      
     
    </div>
  );
};

export default RegistrarTos;
