//juan camilo: es-lint genera error por las comillas simples
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(  
    <BrowserRouter>
    <App />
    </BrowserRouter>
  ,
  document.getElementById('root')
);

