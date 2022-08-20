var express = require('express');
var router = express.Router();
var novedadesmodel = require('../models/novedades');

router.get('/nov', async function (req, res, next) {
    var novedades = await novedadesmodel.getnovedades();
  res.render('nov', {
    layout: 'layout',
    novedades
  });
});



module.exports = router;