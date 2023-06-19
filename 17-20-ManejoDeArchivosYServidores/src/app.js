//En este archivo crearemos la instancia de express y las rutas que utilizaremos en nuestra aplicacion.

//Primero debemos importar express utilizando require y luego ejecutarlo para crear la instancia de express como se hizo en clases
//Luego antes de continuar exportaremos la instancia de express para poder utilizarla en otros archivos. (module.exports = app;)

//Crearemos 3 rutas de tipo get, la primera sera la ruta raiz "/" la cual devolvera el mensaje "Bienvenidos a la pagina principal"

//La segunda en la ruta "/products" devolvera todos los productos almacenados en el archivo products.json utilizando la instancia de la clase ProductManager llamada productManager por lo que sera necesaria instanciarla en el archivo en cuestion y NO dentro de la ruta. Luego se exportara junto con el app (module.exports ={app, productManager}) (recordar ejecutar el metodo initialize de la instancia de la clase ProductManager para que lea el archivo)

//La tercera en la ruta "/randomProduct" devolvera un producto aleatorio de los productos almacenados en la instancia de ProductManager. Para esto utilizaremos Math.random() para obtener un numero aleatorio entre 0 y 1, luego multiplicaremos ese numero por la cantidad de productos almacenados en la instancia de ProductManager y lo redondearemos hacia abajo con Math.floor() para obtener un numero entero, luego utilizaremos ese numero para obtener el producto de la instancia de ProductManager utilizando el metodo correspondiente de la misma.


