const { json } = require('express');
var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();
const sql = require("../dboperation");

// pagina incial do express
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//Aqui testamos a configuracao
router.get('/test', function(req, res, next) {
  sql.getdata();
  res.render('index', { title: 'Express' });
});


// essa rota nos retorna caso passe na condicao dentro dela o status do usuario e o codigo digitado
router.get("/getdata", function (req, res, next) {
  //essa condicao valida a senha digitada
  if((req.body.senha) == '12345'){
    sql.getdata_withQuery(req.body.codigo).then((result) => {
      res.json(result[0].map(p => {
        return `STATUS: ${p.STATUS}`;
      }));
    });
  }
  //caso a autenticacao falhe, sera retornado um array vazio
  else{
    res.send([]);
  }


});


module.exports = router;
