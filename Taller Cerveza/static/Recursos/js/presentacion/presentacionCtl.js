/* global app */
//CREO MI VARIABLE APP

var app = angular.module("appControladorPresentacion", []);

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlPresentacion', function ($scope, presentacionService) {

    /*Se inicializa el modelo*/
    $scope.identificacion = "";
    $scope.presentaciones = [];

    /*Se define una funcion en el controlador*/
    $scope.guardar = function (form) {
        if (form) {
            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            presentacionService.guardar($scope.identificacion).then(function (response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input 
                // //      * asociados*/
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
        alert($scope.identificacion.codigo);
        alert($scope.identificacion.cantidad);
        alert($scope.identificacion.precio);
        /*Si el formulario esta bien validado*/
        if (form) {


            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            presentacionService.modificar($scope.identificacion).then(function (response) {
                // //     /*El resultado de la promesa se recibe por parametro*/
                // //     //alert(response.usuario + " " + response.password);
                // //     /*Solo con limpiar el objeto se limpian todos los input 
                // //      * asociados*/
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
        presentacionService.eliminar(codigo).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            return response;
        });
        $scope.listar();
    };

    //listar//////////////////////////////////////////
    $scope.listar = function () {
        $scope.presentaciones = [];
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        presentacionService.listar($scope.identificacion).then(function (response) {
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

        var presentacionesV = $scope.cervezas;
        var presentacion;
        angular.forEach(presentacionesV, function (obj)
        {
            if (obj.codigo === codigo)
            {

                presentacion = obj;


            }

        });
        //Seteo los campos
        $scope.identificacion.codigo = presentacion.codigo;
        $scope.identificacion.cantidad = presentacion.cantidad;
        $scope.identificacion.precio = presentacion.precio;
    };

    $scope.listar();

});







