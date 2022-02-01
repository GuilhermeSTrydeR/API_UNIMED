const { json } = require('express');
var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();
const sql = require("../dboperation");

// pagina incial do express
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post('/login', (req, res) => {
//   if(req.body.user === 'teste' && req.body.password === '12345'){
//     return res.end();
//   }
//   res.status(401).end();
// })


// essa rota nos retorna caso passe na condicao dentro dela o status do usuario e o codigo digitado
router.get("/query", function (req, res, next) {
  //essa condicao valida a senha digitada, devera sair assim que implementar o JWT
  if((req.body.chave) == "12345"){
    sql.getdata_withQuery(req.body.codigo).then((result) => {
      res.json(result[0].map(p => {
        //apos recebido os dados via corpo de requisicao na funcao, eh criado um JSON para retornar mais abaixo as informacoes no endpoint
        let jsonResult = {
          "codigo" : p.CODIGO,
          "status" : p.STATUS
        }
        //aqui eh o retorno da funcao que contem o JSON 
        return jsonResult;
      }));
    });
  }
});

module.exports = router;
