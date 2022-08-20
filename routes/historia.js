var express = require('express');
var router = express.Router();


router.get('/historia', async function (req, res, next) {
  
  res.render('historia', {
    layout: 'layout'
  });
});



module.exports = router;