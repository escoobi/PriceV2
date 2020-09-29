
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000; //porta padrão
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);

app.listen(port);
console.log('API funcionando!');



function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: 'XXX',
    port: XXX,
    user: 'XXX',
    password: 'XXX',
    database: 'XXX'
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error)
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('executou!');
  });
}

function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: 'price.app.br',
    user: 'priceapp_admin',
    password: 'DtAnSXCRcD3r',
    database: 'priceapp_banco'
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error)
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('executou!');
  });
}


/*
router.get('/clientes/:emp?', (req, res) =>{
    let filter = '';
    console.log(req.params.emp)
    if(req) filter = " WHERE emp LIKE '%"+ req.params.emp;
    execSQLQuery("SELECT * FROM emp "+ filter +"%'", res);
})
*/
router.get('/empresa/', (req, res) =>{
  execSQLQuery("SELECT * FROM emp ", res);
})