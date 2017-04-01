/* global app */
//CREO MI VARIABLE APP

var app = angular.module("appControladorProduccion", []);

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlProduccion', function ($scope, produccionService) {

    /*Se inicializa el modelo*/
    $scope.identificacion = "";
    $scope.producciones = [];
    $scope.cervezas = [];
    $scope.presentaciones = [];
    var msg = "";

    /*Se define una funcion en el controlador*/
    $scope.guardar = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/

        //  alert($scope.identificacion.fecha);
        //  alert($scope.identificacion.selTipo.codigo);
        // alert($scope.identificacion.selPresentacion.codigo);
        // alert($scope.identificacion.comentarios);
        /*Si el formulario esta bien validado*/
        if (form) {


            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            produccionService.guardar($scope.identificacion).then(function (response) {
                if (response == "OK")
                {

                    $('.msgServidor').html("<div id='msg' class='alert alert-success'>El tipo de cerveza fue registrado <span class='glyphicon glyphicon-ok'></span></div>");
                    setTimeout(function () {
                        $('#msg').attr("display", "none");
                    }, 5000);

                } else {
                    $('.msgServidor').html("<div id='msg' class='alert alert-danger'>Error en el registro <span class='glyphicon glyphicon-ok'></span></div>");
                    setTimeout(function () {
                        $('#msg').attr("display", "none");
                    }, 5000);
                }
                // $('#msgconfirmar').html("<h1 class='bg-success'>La producción fue guardada</h2>");
                // setTimeout(function(){ $('#msgconfirmar').addATTr ; }, 3000);

                $scope.identificacion = "";
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    //modificar////////////////////////////////////////////
    $scope.modificar = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if (form) {


            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
             produccionService.modificar($scope.identificacion).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
             if(response.data == "OK")
                {

                    $('.msgServidor').html("<div id='msg' class='alert alert-success'>La produccion fue modificada <span class='glyphicon glyphicon-ok'></span></div>");
                    setTimeout(function () {
                        $('#msg').attr("display", "none");
                    }, 5000);

                } else {
                    $('.msgServidor').html("<div id='msg' class='alert alert-danger'>Error al modificar <span class='glyphicon glyphicon-ok'></span></div>");
                    setTimeout(function () {
                        $('#msg').attr("display", "none");
                    }, 5000);
                }
              
              $scope.identificacion = "";
             });
        } else {
            alert("Verifique los datos ingresados");
        }
    };
    ///Eliminar/////////////////////////////////////////////
    $scope.eliminar = function (codigo) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/



        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        produccionService.eliminar(codigo).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response == "OK")
            {

                $('.msgServidor').html("<div id='msg' class='alert alert-success'>La produccion fue eliminada  <span class='glyphicon glyphicon-ok'></span></div>");
                setTimeout(function () {
                    $('#msg').attr("display", "none");
                }, 5000);

            } else {
                $('.msgServidor').html("<div id='msg' class='alert alert-danger'>Error al eliminar <span class='glyphicon glyphicon-ok'></span></div>");
                setTimeout(function () {
                    $(".msgServidor").attr("display", "none");
                }, 5000);
            }
            $scope.identificacion = "";
        });

    };

    //listar//////////////////////////////////////////
    $scope.listar = function () {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/

        /*Si el formulario esta bien validado*/



        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        produccionService.listar($scope.identificacion).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            //    * asociados*/
            if (response.length > 0)

            {

                for (var i = 0; i < response.length; i++)
                {

                    $scope.producciones.push({
                        codigo: response[i].CODIGO,
                        fecha: response[i].FECHA,
                        tipo: response[i].NOMBRE,
                        presentacion: response[i].CANTIDAD,
                        comentarios: response[i].COMENTARIOS,
                        tipoCerveza: response[i].TCID,
                        tipoPresentacion: response[i].PREID

                    });
                }
            } else
            {
                alert("No hay registros en la base de datos");
            }

            $scope.identificacion = "";
        });

    };


    ///////////Listar Cervezas

    $scope.listarCervezas = function () {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/

        /*Si el formulario esta bien validado*/



        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        produccionService.listarCervezas($scope.identificacion).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            if (response.length > 0)
            {
                for (var i = 0; i < response.length; i++)
                {
                    $scope.cervezas.push({
                        codigo: response[i].ID,
                        nombre: response[i].NOMBRE,
                        descripcion: response[i].DESCRIPCION,
                        porcentaje: response[i].GRADOALCOHOL
                    });
                }
            } else
            {
                alert("No hay registros en la base de datos");
            }

            // //      * asociados*/
            $scope.identificacion = "";
        });

    };

    ///////////////Listar las presentaciones

    $scope.listarPresentaciones = function () {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/

        /*Si el formulario esta bien validado*/



        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        produccionService.listarPresentaciones($scope.identificacion).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            if (response.length > 0)
            {
                for (var i = 0; i < response.length; i++)
                {
                    $scope.presentaciones.push({
                        codigo: response[i].ID,
                        cantidad: response[i].ML,
                        precio: response[i].VALOR


                    });
                }
            } else
            {
                alert("No hay registros en la base de datos");
            }

            // //      * asociados*/
            $scope.identificacion = "";
        });

    };

    //Ordenar Campos////////////////////////////////////////
    $scope.ordenarPorParametro = function (tipo)
    {
        $scope.ordenSeleccionado = tipo;
    };
    //Mostrar Campos
    $scope.mostrarCampos = function (codigo)
    {

        var produccionesV = $scope.producciones;
        var produccion;
        angular.forEach(produccionesV, function (obj)
        {
            if (obj.codigo === codigo)
            {
                produccion = obj;
                
                var st = obj.fecha;
                var fechaReplace = ''+st;
                var pattern = /(\d{4})(\d{2})(\d{2})/;
                produccion.fecha = new Date(fechaReplace.replace(pattern,'$1-$2-$3'));
                produccion.codigo = obj.codigo;
                produccion.selPresentacion = obj.tipoPresentacion;
                produccion.selTipo =obj.tipoCerveza;

            }

        });
        //Seteo los campos
        // alert(produccion.tipo.nombre);
        $scope.identificacion = produccion;
        $('#btnEditar').removeAttr('disabled');
        $('#codigoPro').prop('disabled', true);

    };


    $scope.listarCervezas();
    $scope.listarPresentaciones();
    $scope.listar();

});







