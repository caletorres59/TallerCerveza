/*Con el ./ se indica que el archivo que se va a necesitar se encuentra en la 
 * misma carpeta, ademas cuando no se coloca esto NODE busca en su nucleo dicho
 * repositorio */
var funciones = require('./funciones');


funciones.configurarServidor();
funciones.iniciarServidor();

//Abrir el navegador e ingresar a localhost:8888