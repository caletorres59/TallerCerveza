/*Modulo para la captura de variables GET y POST*/
var querystring = require('querystring');
/*Se importa el modulo npm MYSQL*/
var mysql = require('mysql');

var constantes = require('./constantes');
function conectardb() {

    //Se hace una conexion a la base de datos
    conexion = mysql.createConnection({
        host: constantes.host,
        user: constantes.user,
        password: constantes.pass,
        database: constantes.database
    });
    //Se conecta a la base de datos
    conexion.connect(function (error) {
        if (error) {
            console.log('Problemas de conexion con mysql');
        } else {
            console.log('Conexion exitosa');
        }
    });
}



//Crear tabla
function crear(respuesta) {
    var sql = "drop table if exists articulos";
    //Ejecuta la consulta, a partir de la conexion a la base de datos
    conexion.query(sql, function (error, resultado) {
        if (error) {
            console.log(error);
            return;
        }
    });

    var sql2 = 'create table articulos (' +
            'codigo int primary key auto_increment,' +
            'descripcion varchar(50),' +
            'precio float' +
            ')';

    conexion.query(sql2, function (error, resultado) {
        if (error) {
            console.log(error);
        }
    });
    //Se construye la respuesta al cliente
    respuesta.writeHead(200, {'Content-Type': 'text/html'});
    respuesta.write('<!doctype html><html><head></head><body>' +
            'Se creo la tabla<br><a href="index.html">Retornar</a></body></html>');
    respuesta.end();
}


/**
 * Función que elimina un tipo de cerveza
 * @param {type} pedido
 * @param {type} respuesta
 * @returns {undefined}
 */
function eliminarTipoCerveza(pedido, respuesta) {
    var info = '';
    pedido.on('data', function (datosparciales) {
        info += datosparciales;
    });
    pedido.on('end', function () {
        //Se obtiene el codigo
        var datos = querystring.parse(info);
        var codigo = [datos['ID']];
        //Se manda el codigo en la busqueda
        var sql = 'delete from tiposcerveza where codigo= ?';
        conexion.query(sql, codigo, function (error, filas) {
            if (error) {
                console.log('error en la consulta');
                return;
            }
            //Se responde
            respuesta.writeHead(200, {'Content-Type': 'text/html'});
            //Se lee el registro obtenido y se sacan sus datos
            var datos = '';
            if (filas.length > 0) {
                datos += 'El articulo' + datos['codigo'] + ' fue eliminado correctamente';
            }
            //Se responde
            respuesta.write(datos);
            respuesta.end();
        });
    });
}

/**
 * Funcion que crea un tipo de cerveza
 * @param {type} pedido
 * @param {type} respuesta
 * @returns {undefined}
 */
function crearTipoCerveza(pedido, respuesta) {
    //Se obtienen los datos que se enviaron por post
    var info = '';
    pedido.on('data', function (datosparciales) {
        info += datosparciales;
    });
    //Cuando termina de capturar y pasar los datos a JSON
    pedido.on('end', function () {
        var datos = querystring.parse(info);
        //Se crea un objeto con la informacion capturada
        var registro = {
            NOMBRE: datos['ML'],
            DESCRIPCION: datos['VALOR'],
            GRADOALCOHOL: datos['GRADOALCOHOL']
        };
        var sql = 'insert into tiposcerveza set ?';
        //Se hace un insert mandado el objet completo
        conexion.query(sql, registro, function (error, resultado) {
            if (error) {
                console.log(error);
                return;
            }
        });
        //Se responde al usuario
        respuesta.writeHead(200, {'Content-Type': 'text/html'});
        respuesta.write('<!doctype html><html><head></head><body>' +
                'Guardado correctamente<br><a href="index.html">Retornar</a></body></html>');
        respuesta.end();
    });
}

/**
 *  Funcion que lista los tipos de cerveza los retorna como un String
 * @param {type} respuesta
 * @returns {undefined}
 */
function listarTiposCerveza(respuesta) {
    var sql = 'select ID,ML,VALOR from presentaciones';
    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.         
    conexion.query(sql, function (error, filas) {
        if (error) {
            console.log('error en el listado');
            return;
        }
        respuesta.writeHead(200, {'Content-Type': 'text/plain'});
        //Se recorren los registros obtenidos
        var datos = '';
        for (var f = 0; f < filas.length; f++) {
            datos += filas[f].ID + ',';
            datos += filas[f].NOMBRE + ',';
            datos += filas[f].DESCRIPCION + ',';
            datos += filas[f].GRADOALCOHOL + ';';
        }

        //Se responde
        respuesta.write(datos.substring(0, datos.length - 1));
        respuesta.end();
    });
}


function buscarTipoCerveza(pedido, respuesta) {
    //Se obtienen datos
    var info = '';
    pedido.on('data', function (datosparciales) {
        info += datosparciales;
    });
    pedido.on('end', function () {
        //Se obtiene el codigo
        var datos = querystring.parse(info);
        var codigo = [datos['codigo']];
        //Se manda el codigo en la busqueda
        var sql = 'select ID,NOMBRE,DESCRIPCION,GRADOALCOHOL from tiposcerveza where ID=?';
        conexion.query(sql, codigo, function (error, filas) {
            if (error) {
                console.log('error en la consulta');
                return;
            }
            //Se responde
            respuesta.writeHead(200, {'Content-Type': 'text/html'});
            //Se lee el registro obtenido y se sacan sus datos
            var datos = '';
            if (filas.length > 0) {
                datos += filas[0].ID + ',';
                datos += filas[0].NOMBRE + ',';
                datos += filas[0].DESCRIPCION + ',';
                datos += filas[0].GRADOALCOHOL;
            } else {
                datos = 'No existe un tipo cerveza con dicho codigo.';
            }
            //Se responde
            respuesta.write(datos);
            respuesta.end();
        });
    });
}

//Habilita a las funciones para que sean llamadas o exportadas desde otros archivos 
exports.conectardb = conectardb;
exports.crearTipoCerveza = crearTipoCerveza;
exports.buscarTipoCerveza = buscarTipoCerveza;
exports.listarTiposCerveza = listarTiposCerveza;
exports.eliminarTipoCerveza = eliminarTipoCerveza;