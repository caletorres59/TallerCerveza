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
        alert($scope.identificacion.nombre);
        alert($scope.identificacion.descripcion);
        alert($scope.identificacion.porcentaje);
        /*Si el formulario esta bien validado*/
        if (form) {


            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
            cervezaService.modificar($scope.identificacion).then(function (response) {
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
        // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
        //  * el cual esta asociado a los input*/
        cervezaService.eliminar(codigo).then(function (response) {
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
        var cervezasV = $scope.cervezas;
        var cervesa;
        angular.forEach(cervezasV, function (obj)
        {
            if (obj.codigo === codigo)
            {
                cervesa = obj;
            }

        });
        //Seteo los campos
        $scope.identificacion = cervesa;
        $('#btnEliminar').removeAttr('disabled');
        $('#btnEditar').removeAttr('disabled');

    };
    $scope.listar();
});