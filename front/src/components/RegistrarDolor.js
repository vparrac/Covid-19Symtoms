//juan camilo:algunos errores de comillas, tambien faltaron los propTypes

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Menu from "./Menu";
import NoAutorizado from "./NoAutorizado";
import RegistroExitoso from './RegistroExitoso';
export const RegistrarDolor = (props) => {
  //deberia ser constante
  const [maxFecha, setMaxFecha] = useState(new Date());

  const [fecha, setCalendarFecha] = useState(new Date());

  const [numeroDolor, setNumeroDolor] = useState(1);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [tratamiento, setTratamiento] = useState("");
  const [donde, setDonde] = useState("");
  const [exito, setexito] = useState("");
  function handleSubmit(data) {
    const body = {
      user: props.user,
      numeroDolor: numeroDolor,
      minutos: minutos,
      horas: horas,
      tratamiento: tratamiento,
      fecha: fecha,
      donde: donde,
    };
    data.preventDefault();
    return fetch("/registrar/RegistrarDolor", {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // no se usa res
      setexito("exito");
    });
  }

  return (
    <div>
      {props.user ? (
        exito !== "exito" ? (
          <div className="container-fluid">
            <Menu></Menu>
            <h1>Registrar dolor</h1>
            <div className="row justify-content-center h-100">
              <div className="col-lg-10 col-12">
                <form onSubmit={handleSubmit} className="gridForm">
                  <label className="form-group">
                    <span>¿Cuanto dolor sintió en una escala del 1 al 10?</span>
                    <input
                      value={numeroDolor}
                      onChange={(e) => setNumeroDolor(e.target.value)}
                      min="1"
                      max="10"
                      type="number"
                      className="input-form form-control"
                      placeholder="Fatiga"
                    ></input>
                  </label>

                  <label className="form-group">
                    <span>¿Dónde?</span>
                    <input
                      value={donde}
                      onChange={(e) => setDonde(e.target.value)}
                      type="text"
                      className="input-form form-control"
                      placeholder="Dónde"
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
                      value={horas}
                      onChange={(e) => setHoras(e.target.value)}
                      type="number"
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

export default RegistrarDolor;
