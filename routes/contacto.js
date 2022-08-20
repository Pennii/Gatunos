var express = require('express');
var router = express.Router();
var usuarioscontModel = require('../models/usuarioscontModel');


router.get('/contacto', async function (req, res, next) {
  
  res.render('contacto', {
    layout: 'layout'
  });
});



module.exports = router;