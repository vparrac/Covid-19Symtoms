import React, { useState, useEffect } from "react";
import RegisterComplete from "../components/RegisterComplete";
import {
  Route,
  Link,
} from "react-router-dom";
import RegistrarFiebre from "../components/RegistrarFiebre";
import BodyHome from "../components/BodyHome";
import Login from "../components/Login";
import Register from "../components/Register";
import RegistrarFatiga from "../components/RegistrarFatiga";
import RegistrarTos from "../components/RegistrarTos";
import RegistrarDolor from "../components/RegistrarDolor";
import RegistrarCongestion from "../components/RegistrarCongestion";
import RegistrarDiarrea from "../components/RegistrarDiarrea";
import RegistrarDolorCabeza from "../components/RegistrarDolorCabeza";
import RegistrarDificultadRespirar from "../components/RegistrarDificultadRespirar";
import CerroSesion from "../components/CerroSesion";
import NoAutorizado from "../components/NoAutorizado";
import RegistarConsumoMedicina from '../components/RegistarConsumoMedicina';
import Reporte from '../components/Reporte';
//juan camilo: esta dos veces el import de link
import {Link} from "react-router-dom";


const Navbar = () => {
  const [user, setUser] = useState(null);
  const [redirect, setredirect] = useState(false);
  useEffect(() => {
    fetch("/getUser", {
      method: "GET",      
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    }).then(res=>{
      if(res.status===200){
        console.log(res.statusText);
        setUser(res.statusText);
      }
    });
  }, []);

  if (redirect) {
    return <CerroSesion to="/"></CerroSesion>;
  }
  const onLogout = () => {
    fetch("/salir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    }).then((a) => {
      console.log("llega front");
      console.log(a);
      if (a.status === 200) {
        setUser(null);
        setredirect(true);
      }
    });
  };
  return (
    <div className="container-fluid">
      <div>
        <nav className="navbarHome">
          <Link className="navbar-brand" to="/">
            <img
              src="logo.png"
              width="70"
              height="70"
              className="d-inline-block align-top"
              alt="Logo Aplicación"
            ></img>
          </Link>
          {user === null ? (
            <div className="text-right">
              <Link className="btnLogin" to="/login">
                Ingresa
              </Link>
              <Link className="btnRegister" to="/register">
                Registrate
              </Link>
            </div>
          ) : (
            <div className="text-right">
              <button className="btnLogin" onClick={onLogout}>
                Salir
              </button>
              <Link className="btnLogin" to="/registrarfiebre">
                Menu
              </Link>
            </div>
          )}
        </nav>
      </div>
  {/* juan camilo: segun la documentacion de react-router, los componentes Route deberian estar dentro de un Switch */}
      <Route
        path="/registrarfiebre"
        exact
        component={() => <RegistrarFiebre user={user}></RegistrarFiebre>}
      ></Route>
      <Route
        path="/registrartos"
        exact
        component={() => <RegistrarTos user={user}></RegistrarTos>}
      />
      <Route
        path="/registrardolor"
        exact
        component={() => <RegistrarDolor user={user}></RegistrarDolor>}
      />
      <Route
        path="/registrarcongestion"
        exact
        component={() => (
          <RegistrarCongestion user={user}></RegistrarCongestion>
        )}
      />
      <Route path="/registrardiarrea" exact component={()=><RegistrarDiarrea user={user}></RegistrarDiarrea>} />
      <Route
        path="/registrardolorcabeza"
        exact
        component={() => (
          <RegistrarDolorCabeza user={user}></RegistrarDolorCabeza>
        )}
      />
      <Route
        path="/registrarfatiga"
        exact
        component={() => <RegistrarFatiga user={user}></RegistrarFatiga>}
      ></Route>
       <Route
        path="/reporte"
        exact
        component={() => <Reporte user={user}></Reporte>}
      ></Route>
      <Route
        path="/registrardificultadrespirar"
        exact
        component={() => (
          <RegistrarDificultadRespirar
            user={user}
          ></RegistrarDificultadRespirar>
        )}
      />
      <Route path="/" exact component={BodyHome}></Route>
      <Route
        path="/login"
        exact
        component={() => <Login setUser={setUser} user={user}></Login>}
      ></Route>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/medicine" exact component={()=><RegistarConsumoMedicina user={user}></RegistarConsumoMedicina>}></Route>
      <Route path="/noAutorizado" exact component={NoAutorizado}></Route>
      <Route
        path="/registerComplete"
        exact
        component={RegisterComplete}
      ></Route>
    </div>
  );
};


export default Navbar;
