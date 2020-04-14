import React, { useRef, useState } from "react";
import NoAutorizado from "./NoAutorizado";
import Menu from "../components/Menu";
import RegistroExitoso from "../components/RegistroExitoso";
const RegistarConsumoMedicina = (props) => {
  const formRef = useRef();
  const [exito, setexito] = useState("");
  const onRegister = (evt) => {
    evt.preventDefault();
    const formu = formRef.current;

    const medicina = {
      droga: formu.droga.value,
      unidad: formu.unidad.value,
      cantidad: formu.cantidad.value,
      user: props.user,
    };

    fetch("/registrar/RegistrarMedicina", {
      method: "POST",
      body: JSON.stringify(medicina),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log("dsjadnsj");
      if (res.status == 200) {
        console.log(res);
        setexito("exito");
      } else {
        setexito("fracaso");
      }
    });
  };
  return (
    <div>
      {props.user ? (
        exito === "exito" ? (
          <div>
            <Menu></Menu>
            <RegistroExitoso></RegistroExitoso>
          </div>
        ) : (
          <div className="container-fluid">
            <Menu></Menu>
            <h1>Registar consumo medicina</h1>
            <div className="row justify-content-center h-100">
              <div className="col-lg-8 col-12">
                <label className="form-group">
                  <span>¿Cuál dogra consumio?</span>
                </label>
                <form className="gridForm" ref={formRef} onSubmit={onRegister}>
                  <input
                    type="text"
                    id="droga"
                    name="droga"
                    className="input-form form-control"
                    placeholder="Nombre de la droga"
                  ></input>
                  <br></br>
                  <label className="form-group">
                    <span>¿En qué cantidad?</span>
                  </label>
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="number"
                        min="0"
                        id="cantidad"
                        name="cantidad"
                        className="input-form form-control"
                        placeholder="Cantidad en mg"
                      ></input>
                    </div>

                    <div className="col-6">
                      <select
                        className="custom-select"
                        id="unidad"
                        name="unidad"
                        required
                      >
                        <option defaultValue disabled>
                          Unidades
                        </option>
                        <option value="gr">gr</option>
                        <option value="mr">mg</option>
                        <option value="mr">ug</option>
                      </select>
                    </div>
                  </div>
                  <hr></hr>
                  <button type="submit" className="btnRegister">
                    Registrar
                  </button>
                </form>
              </div>
            </div>
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
// hacen falta los propstypes

export default RegistarConsumoMedicina;
