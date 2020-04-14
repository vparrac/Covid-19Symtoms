//juan camilo:algunos errores de identacion y comillas, tambien faltaron los propTypes

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import NoAutorizado from "./NoAutorizado";
import Menu from "./Menu";
import RegistroExitoso from './RegistroExitoso';
export const RegistrarDiarrea = (props) => {
  //deberia ser una constante
  const [maxFecha, setMaxFecha] = useState(new Date());

  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [tratamiento, setTratamiento] = useState("");
  const [fecha, setCalendarFecha] = useState(new Date());
  const [frecuencia, setFrecuencia] = useState(0);
  const [color, setColor] = useState("");
  const [contextura, setContextura] = useState("");
  const [exito, setexito] = useState("");
  function handleSubmit(data) {
    const body = {
      user: props.user,
      frecuencia: frecuencia,
      minutos: minutos,
      horas: horas,
      tratamiento: tratamiento,
      fecha: fecha,
    };
    data.preventDefault();
    return fetch("/registrar/RegistrarDiarrea", {
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
        exito !== "exito" ? (
          <div>
            <div className="container-fluid">
              <Menu></Menu>
              <h1>Registrar diarrea</h1>
              <div className="row justify-content-center h-100">
                <div className="col-lg-10 col-12">
                  <form onSubmit={handleSubmit} className="gridForm">
                    <label className="form-group">
                      <span>¿Cuántas deposiciones ha hecho hoy?</span>
                      <input
                        min="1"
                        max="99"
                        value={frecuencia}
                        onChange={(e) => setFrecuencia(e.target.value)}
                        type="number"
                        className="input-form form-control"
                        placeholder="Frecuencia de sonado"
                      ></input>
                    </label>

                    <label className="form-group">
                      <span>Color</span>
                      <input
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        type="text"
                        className="input-form form-control"
                        placeholder="Color"
                      ></input>
                    </label>

                    <label className="form-group">
                      <span>Contextura</span>
                      <input
                        value={contextura}
                        onChange={(e) => setContextura(e.target.value)}
                        type="text"
                        className="input-form form-control"
                        placeholder="Contextura"
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
            </div>
          </div>
        ) : (
          <div>
            <Menu></Menu>
            <RegistroExitoso></RegistroExitoso>
          </div>
        )
      ) : (
        <div>
          <NoAutorizado></NoAutorizado>
        </div>
      )}
    </div>
  );
};

export default RegistrarDiarrea;
