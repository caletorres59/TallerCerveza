/* global app */
//CREO MI VARIABLE APP

var app = angular.module("appControladorCerveza", []);

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlCerveza', function ($scope, cervezaService) {

    /*Se inicializa el modelo*/
    $scope.identificacion = "";
    $scope.cervezas = [];
    //$scope.identificacion = "";

    /*Se define una funcion en el controlador*/
    $scope.guardar = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        /*Si el formulario esta bien validado*/
        if (form) {
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            cervezaService.guardar($scope.identificacion).then(function (response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input 
                // //      * asociados*/
                
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

                $scope.identificacion = "";

            });
        } else {
            alert("Verifique los datos ingresados");
        }
        $scope.listar();
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
            cervezaService.modificar($scope.identificacion).then(function (response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input 
                // //      * asociados*/
                if (response == "OK")
                {

                    $('.msgServidor').html("<div id='msg' class='alert alert-success'>El tipo de cerveza fue modificado <span class='glyphicon glyphicon-ok'></span></div>");
                    setTimeout(function () {
                        $('#msg').attr("display", "none");
                    }, 5000);
                    $scope.listar();
                } else {
                    $('.msgServidor').html("<div id='msg' class='alert alert-danger'>Error al modificar <span class='glyphicon glyphicon-ok'></span></div>");
                    setTimeout(function () {
                        $('#msg').attr("display", "none");
                    }, 5000);
                }
                $scope.identificacion = "";
            });
        }
    };
    ///Eliminar/////////////////////////////////////////////
    $scope.eliminar = function (codigo) {
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        cervezaService.eliminar(codigo).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            if (response == "OK")
            {

                $('.msgServidor').html("<div id='msg' class='alert alert-success'>El tipo de cerveza fue eliminado  <span class='glyphicon glyphicon-ok'></span></div>");
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
            $scope.listar();
        });

    };

    //listar//////////////////////////////////////////
    $scope.listar = function () {
        $scope.cervezas = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        cervezaService.listar($scope.identificacion).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
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
                $('.msgServidor').html("<div id='msg' class='alert alert-danger'>No hay registros de tipos de cerveza <span class='glyphicon glyphicon-ok'></span></div>");
                setTimeout(function () {
                    $('.msgServidor').attr("display", "none");
                }, 5000);
            }

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
        var cervezasV = $scope.cervezas;
        var cervesa;
        angular.forEach(cervezasV, function (obj)
        {
            if (obj.codigo === codigo)
            {
                cervesa = obj;
                cervesa.porcentaje=parseInt(obj.porcentaje);
            }

        });
        //Seteo los campos
        $scope.identificacion = cervesa;
        $('#btnEditar').removeAttr('disabled');


    };
    $scope.listar();
});