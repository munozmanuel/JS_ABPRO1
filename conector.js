//Este código realiza una conexión con una base de datos Mysql y realiza una consulta 
// para obtener los datos de una tabla llamada Usuarios. Después de realizar la consulta,
//  recorre los resultados para obtener los elementos de cada fila y después los muestra 
// en un elemento HTML con ID cons_res. Si alguien desea modificar o copiar este código, 
// necesita asegurarse de entender el proceso de conexión a la base de datos, realizar la
//  consulta y recorrer los resultados para obtener los elementos de cada fila.


var ClauBal = (() => {
  var mysql = require('mysql2');

  //Establece la conexión con la base de datos:
  var connection = mysql.createConnection({
    host: 'index.html',
    user: 'root',
    password: 'PASSWORD',
    database: 'bd.js'
  });

  return {
    conexion: () => {
      connection.connect();

      //Realiza la consulta para obtener los datos de la tabla Usuarios:
      connection.query('SELECT * from Usuarios', function (err, rows, fields) {
        if (!err) {
          console.log('The solution is: ', rows);
          var llaves = Object.keys(rows)
          var valores = Object.values(rows)

          //Realiza la consulta para obtener los datos de la tabla Usuarios:
          for (el of llaves) {
            console.log(el)
            var llaves2 = Object.keys(rows[el])
            console.log(llaves2)
            for (el2 of llaves2) {
              var elementop = rows[el][el2]


              //Muestra los elementos en un elemento HTML con ID cons_res:
              document.querySelector("#cons_res").textContent += elementop
            }
          }
        }
        else {
          console.log('Error while performing Query.');
          console.log(err);
        }
      });

      connection.end();
    }
  }
});

