var express = require('express');
var router = express.Router();
var novedadesmodel = require('../../models/novedades');
const { route } = require('./login');


router.get('/', async function (req, res, next) {
  var novedades = await novedadesmodel.getnovedades();
  res.render('admin/novedades', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades
  });
});
router.get('/eliminar/:id', async (req,res,next)=> {
  var id= req.params.id;
  await novedadesmodel.deletenovedadesbyid(id);
  res.redirect('/admin/novedades')
});
router.get('/agregar', (req, res, next)=> {
  res.render('admin/agregar', {
    layout: 'admin/layout'
  });
});
router.post('/agregar', async (req, res, next)=> {
  try {
    if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){
      await novedadesmodel.addnovedad(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: 'todos los campos son requeridos'
      })
    }
  } catch (error) {
    console.log(error)
    res.render('admin/agregar', {
      layout: 'admin/layout',
      error: true, message: 'no se cargo la novedad'
    });
  }
});
router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesmodel.getnovedadesbyid(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});
router.post('/modificar', async (req, res, next) => {
  try {
    let obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }
    await novedadesmodel.editnovedadbyid(obj, req.body.id);
    res.redirect('/admin/novedades');
  }
  catch (error) {
    console.log(error)
    res.render('admin/modificar', {
      layout: 'admin/layout',
      error: true, message: "no se modifico la novedad"
    })
  }
})


module.exports = router;
