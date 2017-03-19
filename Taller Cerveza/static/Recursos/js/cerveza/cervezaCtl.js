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
    //$scope.identificacion = "";
    $scope.cervezas = [];

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
                alert(response);
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
    $scope.eliminar = function (form) {
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
            cervezaService.eliminar($scope.identificacion).then(function (response) {
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
        cervezaService.listar($scope.identificacion).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
            $scope.identificacion = "";
            $scope.cervezas = response;
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
            alert(obj.ID);
            if (obj.ID === codigo)
            {
                cervesa = obj;
            }

        });
        //Seteo los campos
        $scope.identificacion.codigo = cervesa.ID;
        $scope.identificacion.nombre = cervesa.NOMBRE;
        $scope.identificacion.descripcion = cervesa.DESCRIPCION;
        $scope.identificacion.porcentaje = cervesa.GRADOALCOHOL;
        alert($scope.identificacion.porcentaje);
    };
    $scope.listar();
});









