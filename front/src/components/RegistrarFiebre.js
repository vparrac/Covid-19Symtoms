//juan camilo:algunos errores de comillas, tambien faltaron los propTypes
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Menu from "./Menu";
import RegistroExitoso from './RegistroExitoso';
import NoAutorizado from "./NoAutorizado";
export const RegistrarFiebre = (props) => {
  //deberia ser una constante
  const [maxFecha, setMaxFecha] = useState(new Date());

  const [temperatura, setTemperatura] = useState(35);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [tratamiento, setTratamiento] = useState("");
  const [fecha, setCalendarFecha] = useState(new Date());
  const [exito, setexito] = useState("");
  function handleSubmit(data) {
    const body = {
      user: props.user,
      temperatura: temperatura,
      minutos: minutos,
      horas: horas,
      tratamiento: tratamiento,
      fecha: fecha,
    };
    data.preventDefault();
    return fetch("/registrar/RegistrarFiebre", {
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
      {props.user !== null ? (
        exito !== "exito" ? (
          <div className="container-fluid">
            <Menu></Menu>
            <h1>Registrar fiebre</h1>
            <div className="row justify-content-center h-100">
              <div className="col-lg-10 col-12">
                <form onSubmit={handleSubmit} className="gridForm">
                  <label className="form-group">
                    <span>Temperatura</span>
                    <input
                      min="35"
                      max="45"
                      value={temperatura}
                      onChange={(e) => setTemperatura(e.target.value)}
                      type="number"
                      className="input-form form-control"
                      placeholder="Temperatura (°C)"
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
        ) : (
          <div>
            {" "}
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

export default RegistrarFiebre;
