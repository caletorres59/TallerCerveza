/*Modulo para la captura de variables GET y POST*/
var querystring = require('querystring');
/* Se importa el modulo npm MYSQL */
var mysql = require('mysql');

var constantes = require('./constantes');
function conectardb() {

    // Se hace una conexion a la base de datos
    conexion = mysql.createConnection({
        host: constantes.host,
        user: constantes.user,
        password: constantes.pass,
        database: constantes.database
    });
    // Se conecta a la base de datos
    conexion.connect(function (error) {
        if (error) {
            console.log(error);
            console.log('Problemas de conexion con mysql');
        } else {
            console.log('Conexion exitosa');
        }
    });
}

// Crear tabla
function crear(respuesta) {
    var sql = "drop table if exists articulos";
    // Ejecuta la consulta, a partir de la conexion a la base de datos
    conexion.query(sql, function (error, resultado) {
        if (error) {
            console.log(error);
            return;
        }
    });

    var sql2 = 'create table articulos ('
            + 'codigo int primary key auto_increment,'
            + 'descripcion varchar(50),' + 'precio float' + ')';

	conexion.query(sql2, function(error, resultado) {
		
		if (error) {
			console.log(error);
			respuesta.writeHead(200, {
			'Content-Type' : 'text/plain'
		});
			respuesta.write(constantes.ERROR);
		} else {
			respuesta.writeHead(200, {
			'Content-Type' : 'text/plain'
		});
			respuesta.write(constantes.OK);
		}
		respuesta.end();
	});
	// Se construye la respuesta al cliente

}

/**
 * Función que elimina una produccion
 * 
 * @param {type}
 *            pedido
 * @param {type}
 *            respuesta
 * @returns {undefined}
 */
function eliminarProduccion(pedido, respuesta) {

    

  

        // Se obtiene el codigo
        var datos = pedido.body;

		var codigo = [ datos['codigo'] ];
		// Se manda el codigo en la busqueda
		var sql = 'delete from producciones where CODIGO = ?';
		conexion.query(sql, codigo, function(error, filas) {
			
			if (error) {
                respuesta.send(constantes.ERROR);
			
			} else {
                respuesta.send(constantes.OK);
				
			}
			
		});
	
}

/**
 * Funcion que crea una produccion
 * 
 * @param {type}
 *            pedido
 * @param {type}
 *            respuesta
 * @returns {undefined}
 */

function crearProduccion(pedido, respuesta) {
    // Se obtienen los datos que se enviaron por post
    var datos = pedido.body;
    // Cuando termina de capturar y pasar los datos a JSON
            console.log("estoy en el dao crear");
		// Se crea un objeto con la informacion capturada
		var registro = {
			CODIGO : datos['codigo'],
			FECHA : datos['fecha'],
			TIPOCERVEZA : datos['tipo'],
			PRESENTACION : datos['presentacion'],
			COMENTARIOS : datos['comentarios']
		};
		var sql = 'insert into producciones set ?';
		// Se hace un insert mandado el objet completo
		conexion.query(sql, registro, function(error, resultado) {
			if (error) {
				 console.log(error);
               
                respuesta.send(constantes.ERROR);
			
			} else {
				respuesta.send(constantes.OK);
			}
		});

    
}

/**
 * Funcion que lista los tipos de cerveza los retorna como un String
 * 
 * @param {type}
 *            respuesta
 * @returns {undefined}
 */
function listarProducciones(pedido,respuesta) {

    var sql = 'SELECT pr.CODIGO, DATE_FORMAT(pr.FECHA,\'%m-%d-%Y\') AS FECHA, tc.NOMBRE as NOMBRE, p.ML as CANTIDAD, p.VALOR, pr.COMENTARIOS, pr.TIPOCERVEZA, pr.PRESENTACION '
            + ', p.ID AS PREID, tc.ID AS TCID FROM producciones pr JOIN tiposcerveza tc ON pr.TIPOCERVEZA = tc.ID '
            + 'JOIN presentaciones p ON pr.PRESENTACION = p.ID';
    // Se realiza la consulta, recibiendo por parametro filas los registros de
    // la base de datos.
   
    conexion.query(sql, function (error, filas) {
        if (error) {
           respuesta.send(constantes.ERROR);
        } else {
            // Se responde
          
            respuesta.send(JSON.stringify(filas));
        }
       
    });
}

function buscarTipoCerveza(pedido, respuesta) {
    // Se obtienen datos
    var datos = pedido.body;
    
        var codigo = [datos['codigo']];
        // Se manda el codigo en la busqueda
        var sql = 'select ID,ML,VALOR from tiposcerveza where ID=?';
        conexion.query(sql, codigo, function (error, filas) {
            // Se lee el registro obtenido y se sacan sus datos
            if (error) {
              
                respuesta.send(constantes.ERROR);
            } else {
                // Se responde
                
                respuesta.send(JSON.stringify(filas));
            }
           
        });
   
}

function updateProduccion(pedido, respuesta) {
    var datos = pedido.body;
    //Cuando termina de capturar y pasar los datos a JSON
   
        //Se crea un objeto con la informacion capturada

        var codigo = datos['codigo'];

        console.log(codigo);
        var update = {
            FECHA: datos['fecha'],
            TIPOCERVEZA: datos['tipo'],
            PRESENTACION: datos['presentacion'],
            COMENTARIOS: datos['comentarios']
        };

        var sql = 'update producciones set ? where CODIGO = ?';
        //Se hace un insert mandado el objet completo
        conexion.query(sql,[update,codigo],function (error, resultado) {
           
                if (error) {
               console.log(error);
                respuesta.send(constantes.ERROR);
                
            } else {

                respuesta.send(constantes.OK);
                
            }
          
        });

   

}

// Habilita a las funciones para que sean llamadas o exportadas desde otros
// archivos
exports.conectardb = conectardb;
exports.crearProduccion = crearProduccion;
exports.buscarTipoCerveza = buscarTipoCerveza;
exports.listarProducciones = listarProducciones;
exports.eliminarProduccion = eliminarProduccion;
exports.updateProduccion = updateProduccion;