"use strict";


/*El use strict hace que se deba codificar de manera correcta, siendo estricto
 * a la hora de compilar el codigo ejemplo: 
 * x = 3.14; // This will cause an error (x is not defined)*/



/* global app */


/*************servicio vs factory vs provider***************/
/*Todas son SINGLETON (Unicamente puede ser instanciada una vez en el contexto
 * en el cual se encuentre)*/


/*Se define el servicio (app.service(nombre servicio, funcionalidad))*/
/*El $http es un servicio por defecto para consumir GET,POST,ETC. El 
 * $httpParamSerializerJQLike es necesario, debido a que angular empaqueta los
 * datos diferente a como se hacia en jquery  y muchos webservices no encuentran
 * los datos que les llega, por lo que se hace necesario serializarlos como 
 * jquery para que lleguen al servidor*/
app.service('cervezaService', function ($http, $httpParamSerializerJQLike) {
    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
    this.guardar = function (identificacion) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        alert(identificacion.porcentaje);
        var promise = $http({
            method: "post",
            url: "/crearTipoCerveza",
            data: $httpParamSerializerJQLike({
                nombre: identificacion.nombre,
                descripcion: identificacion.descripcion,
                porcentaje: identificacion.porcentaje
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            
            return response.data;
        }, function myError(response) {
            alert("Error");
        });

        /*Luego se retorna la promesa*/
        return promise;
    };

    //Eliminar

    this.eliminar = function (codigo) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/

        var promise = $http({
            method: "post",
            url: "/eliminarTipoCerveza",
            data: $httpParamSerializerJQLike({
                codigo: codigo
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            return response.data;
        });

        /*Luego se retorna la promesa*/
        return promise;
    };

    //Modificar
    this.modificar = function (identificacion) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/

       
        var promise = $http({
            method: "post",
            url: "/updateCervezas",
            data: $httpParamSerializerJQLike({
                codigo: identificacion.codigo,
                nombre: identificacion.nombre,
                descripcion: identificacion.descripcion,
                porcentaje: identificacion.porcentaje
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };

    //Listar
    this.listar = function (identificacion) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "post",
            url: "/listarTiposCerveza",
            data: $httpParamSerializerJQLike({
            }),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            /*Todos los datos se almacenan en .data*/
            return response.data;
        }, function myError(response) {
            alert("Error");
        });

        /*Luego se retorna la promesa*/
        return promise;
    };
});