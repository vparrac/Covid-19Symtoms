import React, { useRef, useState } from "react";
import "../css/login.css";

import { Redirect } from "react-router-dom";

const Login = (props) => {


  const formRef = useRef();
  const [message, setMessage] = useState("");
  


  const onLogin = (evt) => {

  
    evt.preventDefault();
    const username = formRef.current.username.value;
    const password = formRef.current.password.value;
    const credentials = { username, password };
    fetch("/singin", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    }).then((a) => {
      console.log("llega front");
      console.log(a);
      if (a.status === 400) {
        setMessage(a.statusText);
      }
      if (a.status === 200) {
        console.log("asds");
        
        console.log("Nu");
        props.setUser(a.statusText);
      }
    });
  };
  //juan camilo: genera algunos errores por identacion
  return (
    <div>{ 
      props.user==null?(
      <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-headerLogin">
              <h3>Inicia sesión</h3>
            </div>
            <div className="card-body">
              <form ref={formRef} onSubmit={onLogin}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Usuario"
                    name="username"
                  />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-key"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                  />
                </div>
                <div>
                  <div className="err">{message}</div>
                </div>
                <button type="submit" className="btn float-right btnLoginIn">
                  Inicio Sesión
                </button>
              </form>
            </div>
          </div>
        </div>
         
      </div>):(<Redirect to="/registrarfiebre"></Redirect>)}
    </div>
  );
};

//juan camilo:seria bueno si definir los proptypes para evitar errores

// Login.propTypes = {

// };

export default Login;
