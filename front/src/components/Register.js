// algunos errores de identacion y de comillas
import React, { useRef, useState } from "react";
import { Redirect } from 'react-router';
// import PropTypes from 'prop-types';
import "../css/login.css";
const Register = () => {
  const [msg, setmsg] = useState("");
  const [redirect, setredirect] = useState(false);
  const formRef = useRef();
  const calcularEdad=(fecha)=> {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}
  const onRegister = (evt) => {
    evt.preventDefault();
    const nombre = formRef.current.nombre.value;
    const username = formRef.current.username.value;
    const genero = formRef.current.genero.value;
    const tipoSangre = formRef.current.tipoSangre.value;
    const rh = formRef.current.rh.value;
    const nacimiento = formRef.current.nacimiento.value;
    const password = formRef.current.password.value;
    const confirmPassword = formRef.current.confirmPassword.value;
    const innerDate = new Date(nacimiento);
    const now = new Date();
    const edad = calcularEdad(innerDate);
    
    const usuario={ nombre, username, genero, tipoSangre, rh, nacimiento, password, edad };

    console.log(now);
    if (confirmPassword !== password) {
      setmsg("Las contraseñas no coinciden");
    } else if (innerDate > now) {
      setmsg("La fecha de nacimiento no puede ser posterior a la fecha actual");
    } else {
      fetch("/signup", {
        method: "POST",
        body: JSON.stringify(usuario),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((a) => {
        console.log("llega front");
        console.log(a);
        if(a.status===200){
          setredirect(true);
        }
      });
    }
  };

  if (redirect) {
    return <Redirect to='/registerComplete'/>;
  }

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="cardR">
            <div className="card-headerLogin">
              <h3>Registrate</h3>
            </div>
            <div className="card-body">
              <form ref={formRef} onSubmit={onRegister}>
                <label htmlFor="nombre">Nombre completo</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src="./usr.svg"
                        height="20"
                        width="20"
                        className="ml-2 mr-4 d-inline-block"
                        alt="Nombre completo"
                      />
                    </span>
                  </div>
                  <input
                    id="nombre"
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Nombre completo"
                    required
                  />
                </div>
                <label htmlFor="correo">Correo</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src="./emailsvg.svg"
                        height="20"
                        width="20"
                        className="ml-2 mr-4 d-inline-block"
                        alt="Coreo"
                      />
                    </span>
                  </div>
                  <input
                    id="correo"
                    type="email"
                    name="username"
                    className="form-control"
                    placeholder="Correo"
                    required
                  />
                </div>
                <label htmlFor="genero">Género</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src="./gendre.svg"
                        height="20"
                        width="20"
                        className="ml-2 mr-4 d-inline-block"
                        alt="Género"
                      />
                    </span>
                  </div>
                  <select
                    className="custom-select"
                    id="genero"
                    name="genero"
                    required
                  >
                    <option defaultValue disabled>
                      Género
                    </option>
                    <option value="Femenino">Femenino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                </div>
                <label htmlFor="sangre">Tipo de sangre</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src="./blood.svg"
                        height="20"
                        width="20"
                        className="ml-2 mr-4 d-inline-block"
                        alt="Tipo de sangre"
                      />
                    </span>
                  </div>
                  <select
                    className="custom-select"
                    id="sangre"
                    name="tipoSangre"
                    required
                  >
                    <option defaultValue disabled>
                      Tipo de sangre
                    </option>
                    <option value="O">O</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                  </select>
                </div>
                <label htmlFor="rh">Factor RH</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src="./rh.svg"
                        height="20"
                        width="20"
                        className="ml-2 mr-4 d-inline-block"
                        alt="Factor RH"
                      />
                    </span>
                  </div>
                  <select className="custom-select" id="rh" name="rh" required>
                    <option defaultValue disabled>
                      Factor RH
                    </option>
                    <option value="+">+</option>
                    <option value="-">-</option>
                  </select>
                </div>
                <label htmlFor="nacimiento">Fecha de nacimiento</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src="./date.svg"
                        height="20"
                        width="20"
                        alt="Fecha de nacimiento"
                        className="ml-2 mr-4 d-inline-block"
                      />
                    </span>
                  </div>
                  <input
                    name="nacimiento"
                    type="date"
                    id="nacimiento"                    
                    min="1920-01-01"
                    className="form-control"
                    required
                  />
                </div>
                <label htmlFor="password">Constraseña</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src="./pass.svg"
                        height="20"
                        width="20"
                        className="ml-2 mr-4 d-inline-block"
                        alt="Contraseña"
                      />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Contraseña"
                    required
                  />
                </div>
                <label htmlFor="confirmPassword">Confirma tu contraseña</label>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <img
                        src="./pass2.svg"
                        height="20"
                        width="20"
                        className="ml-2 mr-4 d-inline-block"
                        alt="Logo de confirma tu contraseña"
                      />
                    </span>
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirma la contraseña"
                    required
                  />
                </div>
                <div className="err">{msg}</div>
                <button type="submit" className="btn float-right btnLoginIn">
                  Registrarse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login.propTypes = {

// };

export default Register;
