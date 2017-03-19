/* global app */
//CREO MI VARIABLE APP

var app = angular.module("appControladorProduccion", []);

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
/*$windows servicio por defecto para poder utilizar refresco de pagina y redireccionamiento*/
/*logInService, nombre del servicio que contiene la promesa. */
app.controller('CtlProduccion', function ($scope,produccionService) {

    /*Se inicializa el modelo*/
    $scope.identificacion = "";
    $scope.producciones = [];   

    /*Se define una funcion en el controlador*/
    $scope.guardar = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
         alert($scope.identificacion.codigo);
         alert($scope.identificacion.fecha);
         alert($scope.identificacion.selTipo);
        alert($scope.identificacion.selPresentacion);
        alert($scope.identificacion.comentarios);
        /*Si el formulario esta bien validado*/
        if (form) {
          

            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
             produccionService.guardar($scope.identificacion).then(function (response) {
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
    //modificar////////////////////////////////////////////
     $scope.modificar = function (form) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
         alert($scope.identificacion.codigo);
         alert($scope.identificacion.fecha);
         alert($scope.identificacion.selTipo);
         alert($scope.identificacion.selPresentacion);
        /*Si el formulario esta bien validado*/
        if (form) {
          

            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
             produccionService.modificar($scope.identificacion).then(function (response) {
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
         alert($scope.identificacion.codigo);
         alert($scope.identificacion.fecha);
         alert($scope.identificacion.selTipo);
         alert($scope.identificacion.selPresentacion);
        /*Si el formulario esta bien validado*/
        if (form) {
          

            // /*Se ejecuta la funcion mandando por parametro el objeto identificacion, 
            //  * el cual esta asociado a los input*/
             produccionService.eliminar($scope.identificacion).then(function (response) {
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
             produccionService.listar($scope.identificacion).then(function (response) {
            // //     /*El resultado de la promesa se recibe por parametro*/
            // //     //alert(response.usuario + " " + response.password);
            // //     /*Solo con limpiar el objeto se limpian todos los input 
            // //      * asociados*/
              $scope.identificacion = "";
             });
        
    };

    //Ordenar Campos////////////////////////////////////////
    $scope.ordenarPorParametro = function(tipo)
            {
                $scope.ordenSeleccionado = tipo;
            };
    //Mostrar Campos
    $scope.mostrarCampos  = function(codigo)
            {
                
                var produccionesV = $scope.producciones;
                var produccion;
       angular.forEach(produccionesV, function (obj)
        {
            if (obj.codigo === codigo)
            {

                produccion = obj;


            }

        });
            //Seteo los campos
            $scope.identificacion.codigo = produccion.codigo;
            $scope.identificacion.fecha = produccion.fecha;
            $scope.identificacion.selTipo = produccion.tipo;
            $scope.identificacion.selPresentacion = produccion.presentacion;
            $scope.identificacion.comentarios = produccion.comentarios;
            };




});







