const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const engine = require("ejs-mate");
const indexRouter = require("./routes/index");
const registrarRouter = require("./routes/registrar")
const flash = require("connect-flash");
const session = require("express-session");
const bodyParser = require("body-parser");

const configurePassport = require("./passport/passport_config.js");
const authenticationRouter = require("./routes/authentication");

const app = express();
// view engine setup
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

app.use(morgan("dev"));

app.use(express.json());

/**
 * Esta configuración nos permite recibir los datos desde el cliente
 * Recibe un objeto con los atributos a modificar. En este caso el extended
 * en false nos indica que no recibiremos archivos pesados como imagenes o documentos
 */
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

configurePassport(app);
app.use("/", indexRouter);
app.use("/registrar", registrarRouter);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, content-Type, Accept, credentials, cache" 
  );
  
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});
app.use("/", indexRouter);
app.use("/", authenticationRouter);

module.exports = app;
