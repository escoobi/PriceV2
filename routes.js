const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'price.app.br',
  user: 'priceapp_admin',
  password: 'DtAnSXCRcD3r',
  database: 'priceapp_banco'
});

con.connect((err) => {
  if (err) {
    console.log('Erro connecting to database...', err)
    return
  }
  console.log('Connection established!')
  
})

con.query('SELECT * FROM emp where emp="TIM PARTICIPACOES S.A."', (err, rows) => {
  if (err) throw err

  //console.log('emp: ', rows, '\n\n')

  rows.forEach(row => {
    console.log(`${row.emp} by ${row.pl}, ${row.vpa}`)
  });



})

con.end((err) => {
  if (err) {
    console.log('Erro to finish connection...', err)
    return
  }
  console.log('The connection was finish...')
})