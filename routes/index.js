var express = require('express');
var router = express.Router();
var novedadesmodel = require('../models/novedades');

/* GET home page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesmodel.getnovedades();
  res.render('index', {
    layout: 'layout',
    
    novedades
  });
});



module.exports = router;
