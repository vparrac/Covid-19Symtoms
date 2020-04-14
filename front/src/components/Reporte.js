//juan camilo:algunos errores de identacion y comillas, tambien faltaron los propTypes
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Menu from './Menu';
import NoAutorizado from './NoAutorizado';
import RegistroExitoso from './RegistroExitoso';

export const Reporte = (props) => {
  //deberia ser constante
  const [maxFecha, setMaxFecha] = useState(new Date());
  const [calendarFecha, setCalendarFecha] = useState(new Date());
  // nunca se usa el set
  const [exito, setexito] = useState('');
  const [showResults, setResults] = useState(false);
  const [showCalendar, setCalendar] = useState(true);
  return (
    <div>
      {props.user ? (
        exito !== 'exito' ? (
          <div className="container-fluid">
            <Menu></Menu>
            <h1>Reporte</h1>
            <div className="row justify-content-center h-100">
              <div className="col-lg-10 col-12">
                {showCalendar ? (
                  <Calendar
                    maxDate={maxFecha}
                    onChange={(date) => {
                      setCalendarFecha(date);
                      setResults(true);
                      setCalendar(false);
                    }}
                    selectRange={true}
                  />
                ) : null}

                {showResults ? (
                  <Results user={props.user} fecha={calendarFecha}></Results>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div>
            {' '}
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

const Results = (props) => {
  const [resultado, setResultado] = useState(null);
  const [hayResultados, setHayResultados] = useState(false);

  useEffect(() => {
    fetch('/registrar/Reporte', {
      method: 'POST',
      body: JSON.stringify(props),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((results) => {
        setResultado(results);
        setHayResultados(true);
      });
  }, []);

 

  return (
    <div>
      <h3>Número de incidencias</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col"># Congestiones</th>
              <th scope="col"># Dolores</th>
              <th scope="col"># Fatigas</th>
              <th scope="col"># Ahogos</th>
              <th scope="col"># Fiebres</th>
              <th scope="col"># Tos</th>
              <th scope="col"># Dolores de cabeza</th>
              <th scope="col"># Diarreas</th>
              <th scope="col"># Medicinas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{resultado[0].congestion.length}</td>
              <td>{resultado[0].dolor.length}</td>
              <td>{resultado.length}</td>
              <td>{resultado[0].dificultadRespirar.length}</td>
              <td>{resultado[0].fiebre.length}</td>
              <td>{resultado[0].tos.length}</td>
              <td>{resultado[0].dolorCabeza.length}</td>
              <td>{resultado[0].diarrea.length}</td>
              <td>{resultado[0].medicina.length}</td>
            </tr>
          </tbody>
        </table>
      ) : null}

      <h3>Congestiones</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Frecuencia</th>
              <th scope="col">Mins</th>
              <th scope="col">Horas</th>
              <th scope="col">Tratamiento </th>
            </tr>
          </thead>
          <tbody>
              {resultado[0].congestion.map((el, i) => (
                <tr key={"row1" + i}>
                  <td key={"congestion" + i}>{el.frecuencia}</td>
                  <td key={"congestion" + i + "2"}>{el.minutos}</td>
                  <td key={"congestion" + i + "3"}>{el.horas}</td>
                  <td key={"congestion" + i + "4"}>{el.tratamiento}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}

      <h3>Dolores</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Número</th>
              <th scope="col">Mins</th>
              <th scope="col">Horas</th>
              <th scope="col">Tratamiento </th>
              <th scope="col">Dónde </th>
            </tr>
          </thead>
          <tbody>
              {resultado[0].dolor.map((el, i) => (
                <tr key={"row2" + i}>
                  <td key={"dolor1" + i}>{el.numeroDolor}</td>
                  <td key={"dolor2" + i}>{el.minutos}</td>
                  <td key={"dolor3" + i}>{el.horas}</td>
                  <td key={"dolor4" + i}>{el.tratamiento}</td>
                  <td key={"dolor5" + i}>{el.donde}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}

      <h3>Fatiga</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Número</th>
              <th scope="col">Mins</th>
              <th scope="col">Horas</th>
              <th scope="col">Tratamiento </th>
              <th scope="col">Dónde </th>
            </tr>
          </thead>
          <tbody>
              {resultado.map((el, i) => (
                <tr key={"row3" + i}>
                  <td key={"fatiga1" + i}>{el.numeroFatiga}</td>
                  <td key={"fatiga2" + i}>{el.minutos}</td>
                  <td key={"fatiga3" + i}>{el.horas}</td>
                  <td key={"fatiga4" + i}>{el.tratamiento}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}

      <h3>Ahogo</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Frecuencia</th>
              <th scope="col">Dificultad</th>
              <th scope="col">Mins</th>
              <th scope="col">Horas</th>
              <th scope="col">Tratamiento </th>
            </tr>
          </thead>
          <tbody>
              {resultado[0].dificultadRespirar.map((el,i) => (
                <tr key={"row4" + i}>
                  <td key={"dificultadR1" + i}>{el.frecuencia}</td>
                  <td key={"dificultadR2" + i}>{el.dificultad}</td>
                  <td key={"dificultadR3" + i}>{el.minutos}</td>
                  <td key={"dificultadR4" + i}>{el.horas}</td>
                  <td key={"dificultadR5" + i}>{el.tratamiento}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}
      <h3>Fiebre</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Temperatura</th>
              <th scope="col">Mins</th>
              <th scope="col">Horas</th>
              <th scope="col">Tratamiento </th>
            </tr>
          </thead>
          <tbody>
              {resultado[0].fiebre.map((el, i) => (
                <tr key={"row5" + i}>
                  <td key={"dificultadT1" + i}>{el.temperatura}</td>
                  <td key={"dificultadT2" + i}>{el.minutos}</td>
                  <td key={"dificultadT3" + i}>{el.horas}</td>
                  <td key={"dificultadT4" + i}>{el.tratamiento}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null}
      <h3>Tos</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Tipo</th>
              <th scope="col">Mins</th>
              <th scope="col">Horas</th>
              <th scope="col">Tratamiento </th>
            </tr>
          </thead>
          <tbody>
              {resultado[0].tos.map((el ,i) => (
                <tr key={"row6" + i}>
                  <td key={"tos1" + i}>{el.tipo}</td>
                  <td key={"tos2" + i}>{el.minutos}</td>
                  <td key={"tos3" + i}>{el.horas}</td>
                  <td key={"tos4" + i}>{el.tratamiento}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null} 
      <h3>Diarrea</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Frecuencia</th>
              <th scope="col">Mins</th>
              <th scope="col">Horas</th>
              <th scope="col">Tratamiento </th>
            </tr>
          </thead>
          <tbody>
              {resultado[0].diarrea.map((el,i) => (
                <tr key={"row7" + i}>
                  <td key={"diarrea1" + i}>{el.frecuencia}</td>
                  <td key={"diarrea2" + i}>{el.minutos}</td>
                  <td key={"diarrea3" + i}>{el.horas}</td>
                  <td key={"diarrea4" + i}>{el.tratamiento}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null} 
      <h3>Medicina</h3>
      {hayResultados ? (
        <table className="table table-responsive">
          <thead>
            <tr>
              <th scope="col">Droga</th>
              <th scope="col">Unidad</th>
              <th scope="col">Cantidad</th>
            </tr>
          </thead>
          <tbody>
              {resultado[0].medicina.map((el,i) => (
                <tr key={"row8" + i}>
                  <td key={"med1" + i}>{el.droga}</td>
                  <td key={"med2" + i}>{el.unidad}</td>
                  <td key={"med3" + i}>{el.cantidad}</td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : null} 
    </div>
  );
};

export default Reporte;
