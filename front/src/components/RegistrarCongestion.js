//juan camilo:algunos errores de identacion y comillas, tambien faltaron los propTypes
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Menu from "./Menu";
import NoAutorizado from './NoAutorizado';
import RegistroExitoso from "./RegistroExitoso";
export const RegistrarCongestion = (props) => {
  //juan camilo: si no se va a modificar nunca yo lo dejaria como una constante
  const [maxFecha, setMaxFecha] = useState(new Date());
  console.log(props);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [tratamiento, setTratamiento] = useState("");
  const [fecha, setCalendarFecha] = useState(new Date());
  const [frecuencia, setFrecuencia] = useState(0);
  const [exito, setexito] = useState("");
  function handleSubmit(data) {
    
    const body = {
      user:props.user,
      frecuencia:frecuencia,
      minutos:minutos,
      horas:horas,
      tratamiento:tratamiento,
      fecha:fecha,
    };
    data.preventDefault();
    return fetch("/registrar/RegistrarCongestion", {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setexito("exito");
    });
  }

  return (
    <div>
      {props.user ? (
        exito !== "exito"?
        (<div className="container-fluid">
        <Menu></Menu>
          <h1>Registrar congestión</h1>
          <div className="row justify-content-center h-100">
            <div className="col-lg-10 col-12">
              <form onSubmit={handleSubmit} className="gridForm">
                <label className="form-group">
                  <span>¿Con qué frecuencia tiene que sonarse la nariz?</span>
                  <input
                    min="1"
                    max="10"
                    value={frecuencia}
                    onChange={(e) => setFrecuencia(e.target.value)}
                    type="number"
                    className="input-form form-control"
                    placeholder="Frecuencia de sonado"
                  ></input>
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
        </div>):(<div>
        <Menu></Menu>
        <RegistroExitoso></RegistroExitoso></div>)
      ) : (
        <div><NoAutorizado></NoAutorizado></div>
      )}
    </div>
  );
};

export default RegistrarCongestion;
