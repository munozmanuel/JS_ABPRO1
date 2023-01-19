var ClauBal=(()=>{
    var mysql      = require('mysql2');
    var connection = mysql.createConnection({
      host     : 'index.html',
      user     : 'root',
      password : 'PASSWORD',
      database : 'bd.js'
    });
    
    return{
    conexion:()=>{
      connection.connect();
       connection.query('SELECT * from Usuarios', function(err, rows, fields) {
         if (!err){
           console.log('The solution is: ', rows);
            var llaves= Object.keys(rows)
            var valores= Object.values(rows)
            for ( el of llaves)
              {
                console.log(el)
                var llaves2=Object.keys(rows[el])
                console.log(llaves2)
                for (el2 of llaves2){
                  var elementop=rows[el][el2]
                  document.querySelector("#cons_res").textContent+=elementop
                } 
              }
          }
          else
            {
              console.log('Error while performing Query.');
              console.log(err);
            }
        });
    
        connection.end();
        }
    }
});