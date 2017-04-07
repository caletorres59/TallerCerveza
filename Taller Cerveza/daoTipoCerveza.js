/*Modulo para la captura de variables GET y POST*/
var querystring = require('querystring');
/*Se importa el modulo npm MYSQL*/
var mysql = require('mysql');

var constantes = require('./constantes');
function conectardb() {

    console.log(constantes.host);
    console.log(constantes.user);
    console.log(constantes.pass);
    console.log(constantes.database);
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
            console.log(error);
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
        respuesta.writeHead(200, {'Content-Type': 'text/html'});
        if (error) {
            console.log(error);
            respuesta.writeHead(200, {
                'Content-Type': 'text/json'
            });
            respuesta.write(JSON.stringify(constantes.ERROR));
        } else {
            respuesta.writeHead(200, {
                'Content-Type': 'text/json'
            });
            respuesta.write(JSON.stringify(constantes.OK));
        }
        respuesta.end();
    });
}


/**
 * Función que elimina un tipo de cerveza
 * @param {type} pedido
 * @param {type} respuesta
 * @returns {undefined}
 */
function eliminarTipoCerveza(pedido, respuesta) {
    //Se obtiene el codigo
    var datos = pedido.body;

    var codigo = datos['codigo'];

    //Se manda el codigo en la busqueda
    var sql = 'delete from tiposcerveza where ID = ?';
    conexion.query(sql, codigo, function (error) {
        if (error) {
            console.log(error);

            respuesta.send(constantes.ERROR);
        } else {

            respuesta.send(constantes.OK);
        }

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

    //Cuando termina de capturar y pasar los datos a JSON

    //Se crea un objeto con la informacion capturada
    var datos = pedido.body;
    var registro = {
        NOMBRE: datos['nombre'],
        DESCRIPCION: datos['descripcion'],
        GRADOALCOHOL: datos['porcentaje']
    };
    var sql = 'insert into tiposcerveza set ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, registro, function (error, resultado) {

        if (error) {
            console.log(error);
            respuesta.send(constantes.ERROR);
        } else {

            respuesta.send(constantes.OK);
        }
        respuesta.end();
    });
    //Se responde al usuario


}

/**
 *  Funcion que lista los tipos de cerveza los retorna como un String
 * @param {type} respuesta
 * @returns {undefined}
 */
function listarTiposCerveza(pedido, respuesta) {
    var sql = 'select ID,NOMBRE,DESCRIPCION,GRADOALCOHOL from tiposcerveza';
    //Se realiza la consulta, recibiendo por parametro filas los registros de la base de datos.         
    conexion.query(sql, function (error, filas) {
        if (error) {
            console.log(error);

            respuesta.send(constantes.ERROR);
        } else {
            //Se responde

            respuesta.send(JSON.stringify(filas));
        }

    });
}

/**
 * Función que modifica el tipo de cerveza
 * @param {type} pedido
 * @param {type} respuesta
 * @returns {undefined}
 */
function updateCervezas(pedido, respuesta) {

    //Cuando termina de capturar y pasar los datos a JSON

    var datos = pedido.body;
    //Se crea un objeto con la informacion capturada

    var codigo = [datos['codigo']];

    console.log(codigo);
    var update = {
        NOMBRE: datos['nombre'],
        DESCRIPCION: datos['descripcion'],
        GRADOALCOHOL: datos['porcentaje']
    };

    var sql = 'update tiposcerveza set ? where ID = ?';
    //Se hace un insert mandado el objet completo
    conexion.query(sql, [update, codigo], function (error, resultado) {

        if (error) {
            console.log(error);

            respuesta.send(constantes.ERROR);
        } else {

            respuesta.send(constantes.OK);
        }

    });

}


function buscarTipoCerveza(pedido, respuesta) {
    //Se obtienen datos

    //Se obtiene el codigo
    var datos = querystring.parse(info);
    var codigo = [datos['codigo']];
    //Se manda el codigo en la busqueda
    var sql = 'select ID,NOMBRE,DESCRIPCION,GRADOALCOHOL from tiposcerveza where ID=?';
    conexion.query(sql, codigo, function (error, filas) {
        //Se lee el registro obtenido y se sacan sus datos
        if (error) {
            console.log(error);

            respuesta.send(constantes.ERROR);
        } else {
            //Se responde

            respuesta.send(JSON.stringify(filas));
        }

    });
}

//Habilita a las funciones para que sean llamadas o exportadas desde otros archivos 
exports.conectardb = conectardb;
exports.crearTipoCerveza = crearTipoCerveza;
exports.buscarTipoCerveza = buscarTipoCerveza;
exports.listarTiposCerveza = listarTiposCerveza;
exports.eliminarTipoCerveza = eliminarTipoCerveza;
exports.updateCervezas = updateCervezas;