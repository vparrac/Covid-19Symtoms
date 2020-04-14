// jaun camilo: genera error por comillas
import React from 'react';
// import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
//juan camilo: hiciron falta alt's dicientes en la imagenes
const BodyHome = () => {
  return (
    <div className="container-fluid">
      <h1>Covid 19 - Symptoms</h1>
      
      <div className="paragraph">
        Covid-19 Symptoms es una aplicación cuyo objetivo es que cualquier
        persona que pueda presentar sintomas de COVID-19 puedan reportarlos e ir
        llevando un control de todo lo relacionado con estos. Lo único que hay
        que hacer es registrate y en la aplicación podrás ir colocando todo lo
        relacionado con el coronavirus.
      </div>
      <h2>Sintomas del coronavirus</h2>
      <div className="paragraph">
        Aunque hay pacientes con COVID-19 asintomáticas, la gran mayoría
        presentan una sintomatología común. Entre los sintomas más frecuentes se
        encuentran:
        <div className="containerImagenes">
          <div className="row">
            <div className="col">
              <img src="./fever.png" alt="..." className="img-symtoms"></img>
              <div className="overlay">
                <div className="text">Fiebre</div>
              </div>
            </div>
            <div className="col">
              <img src="./tos.svg" alt="..." className="img-symtoms"></img>
              <div className="overlay">
                <div className="text">Tos</div>
              </div>
            </div>
            <div className="col">
              <img src="./respirar.svg" alt="..." className="img-symtoms "></img>
              <div className="overlay">
                <div className="text">Ahogo</div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img src="./dolor.svg" alt="..." className="img-symtoms"></img>
              <div className="overlay">
                <div className="text">Dolor</div>
              </div>
            </div>
            <div className="col">
              <img src="./congestion.svg" alt="..." className="img-symtoms"></img>
              <div className="overlay">
                <div className="text">Congestion</div>
              </div>
            </div>
            <div className="col">
              <img src="./fatiga.svg" alt="..." className="img-symtoms "></img>
              <div className="overlay">
                <div className="text">Fatiga</div>
              </div>
            </div>
          </div>
        </div>
        Si tienes uno de estos sintomas comienza a registrarlos{' '}
        <Link className="red" to="/login">
          Aquí
        </Link>
      </div>
    </div>
  );
};

export default BodyHome;
