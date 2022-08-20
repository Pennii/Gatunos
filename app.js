var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
require('dotenv').config();
var nodemailer = require('nodemailer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/admin/login');
var novedadesRouter = require('./routes/admin/novedades');
var novrouter = require('./routes/nov');
var histrouter = require('./routes/historia');
var contactorouter = require('./routes/contacto');

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
  resave: true,
  saveUninitialized: true
}));

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
app.use('/', indexRouter);
app.use('/admin/novedades', secured, novedadesRouter);
app.use('/admin/login', loginRouter);
app.use('/users', usersRouter);
app.get('/nov', novrouter);
app.get('/historia', histrouter);
app.get('/contacto', contactorouter);

app.post('/contact', async (req, res, next) =>{
  var nombre = req.body.nombre;
  var mail = req.body.mail;
  var mensaje = req.body.mensaje;
  var obj = {
    to: 'matiasspennino@gmail.com',
    subject: 'mail de contcto',
    html: nombre + "se contacta con el mail " + mail + " con el siguiene mensaje: " + mensaje 
  }
  var transport = nodemailer.createTransport({
    host: "smtp.mailtap.io",
    port: 2525,
    auth: {
      user: "0fa0f229b6bdd0",
      pass: "0bdf8f439d1fe0"
    }
  });
  var info = await transport.sendMail(obj);
  res.render('contacto', {
    msj: "mensaje enviado correctamente"
  })
}) 


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
