var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var novedadesRouter = require('./routes/admin/novedades');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'auswighdiuawgd',
  resave: false,
  saveUninitialized: true
}));
require('dotenv').config()
secured = async (req, res, next)=> {
  try{
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login')
    }
  } catch (error) {
    console.log(error);
  }
}
//app.use('/', indexRouter);
app.use('/admin/novedades', secured, novedadesRouter);
app.use('/admin/login', loginRouter);
app.use('/users', usersRouter);
app.get('/', function(req, res){
  var cambios = Boolean(req.session.nombre);
  res.render('index',{
    nombre: req.session.nombre,
    apellido: req.session.apellido,
    cambios: cambios,
  })
})
app.post('/cambiar', function(req,res){
  if (req.body.nombre){
    req.session.nombre = req.body.nombre
    req.session.apellido = req.body.apellido
  }
  res.redirect('/');
  });
  var nodemailer = require("nodemailer");
  app.post('/', async (req, res, next )=> {
    var nombre = req.session.nombre;
    var apellido = req.session.apellido;
    var email = req.body.email;
    var mensaje = req.body.mensaje;
    var obj = {
      to: 'matiasspennino@gmail.com',
      subject: 'contacto web',
      html: nombre + " " + apellido + " se comunico con este correo " + email + ". <br> su mensaje fue el siguiente: " + mensaje
    }
    var transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  
    var info = await transport.sendMail(obj);
  
   res.render('index',{
    cambios: req.session.nombre,
    nombre: req.session.nombre,
    apellido: req.session.apellido
   });
  
  });
app.get('/salir', function(req,res){
  req.session.destroy();
  res.render('index');
})

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.render('admin/login', {
      layout: 'admin/layout'
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
