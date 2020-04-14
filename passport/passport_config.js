const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const MongoUtils = require("../db");
//juan camilo: no estan usando el bcrypt
const bcrypt = require("bcrypt-nodejs");

function configurePassport(app) {
  const flash = require("connect-flash");
  app.use(flash());
  const cookieParser = require("cookie-parser");
  app.use(cookieParser());
  const bodyParser = require("body-parser");
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: false,
    })
  );
  app.use(
    require("express-session")({
      secret: process.env.SECRETKEY || "prueba",
      resave: true,
      cookie: {
        expires: false,        
      },
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

passport.serializeUser((user, done) => {  
  done(null, { id: user[0]._id });
});

passport.deserializeUser(async (user, done) => {  
  const usuario = await MongoUtils.getDocById(user.id, "login");
  done(null, usuario);
});

//juan camilo: me parecion muy chevere que generaran sus propias estrategias y personalizaran los metodos de passport
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const userdb = await MongoUtils.getLoginByUsername(username);
      
      if (userdb.length >= 1) {
        return done(null, false, {
          mensaje: "El correo ingresado ya está en uso",
        });
      } else {
        const p =password;
        
        
        const nombre = req.body.nombre;
        const username = req.body.username;
        const genero = req.body.genero;
        const tipoSangre = req.body.tipoSangre;
        const rh = req.body.rh;
        const nacimiento = req.body.nacimiento;
        const edad = req.body.edad;

        const usuario = {
          nombre,
          username,
          genero,
          tipoSangre,
          rh,
          nacimiento,
          edad,
        };

        const usuarioDB = await MongoUtils.insertOneDoc(usuario, "usuarios");

        if (usuarioDB) {
          const user = await MongoUtils.insertOneDoc(
            { username, password: p },
            "login"
          );
          done(null, [
            {
              username: user.ops[0].email,
              _id: user.ops[0]._id,
            },
          ]);
        } else {
          return done(null, false, { mensaje: "error" });
        }
      }
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const userdb = await MongoUtils.getLoginByUsername(username);

      if (userdb.length < 1) {
        return done(
          null,
          false,
          req.flash("signinMessage", "Usuario o contraseña incorrectos")
        );
      } if (password !== userdb[0].password) {
        return done(
          null,
          false,
          req.flash("signinMessage", "Usuario o contraseña incorrectos")
        );
      }
      done(null, userdb);
    }
  )
);

module.exports = configurePassport;
