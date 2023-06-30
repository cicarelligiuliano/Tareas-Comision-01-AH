# Homework

#### En esta tarea se realizara un CRUD con Express, utilizando express router, controladores, managers y todo lo necesario. Se detallara paso a paso todo lo que es necesario crear y los test que se deben pasar para que la tarea sea correcta.

### ProductManager

Para ejecutar los test de esta parte ejecutar el siguiente comando:

    npm test 01

En esta clase se debe crear un CRUD de productos, para esto se debe crear un archivo llamado ProductManager.js en la carpeta managers, en este archivo se debe crear una clase llamada ProductManager, esta clase debe tener en los siguientes items (Igual que en tareas anteriores):

-   La instancia de la clase debe tener los atributos path, products y lastId, donde path es el path del archivo json donde se guardaran los productos, products es un array donde se guardaran los productos y lastId es el ultimo id que se le asigno a un producto.
-   Debemos crear un metodo **initialize** el cual debe leer el archivo json y cargar los productos en el array products, ademas debe asignar el ultimo id que se le asigno a un producto. De no existir el archivo json, debe crearlo y asignarle el valor 0 al atributo lastId. PARA DECLARAR ESTE METODO HAGALO COMO FUNCION NORMAL initialize(){} y No como funcion flecha ~~initialize = () => {}~~. Este metodo sera llamado en el constructor de la clase.
-   Debemos crear el metodo **save** el cual guarda el array products en el archivo json.
-   Debemos crear el metodo **getProducts** el cual retorna el array products.
-   Debemos crear el metodo **getProductById** el cual retorna el producto que tenga el id que se le pasa por parametro, en caso de no existir retornara un error "Not Found".
-   Debemos crear el metodo **addProduct** el cual agregar un nuevo producto en el arreglo y en el archivo, este tendra los mensajes de error correspondientes en la falta de algun atributo o code repetido (Revisar los test) (El formato de los productos es el mismo que en la tarea anterior, {title, description, code, price, stock})
-   Debemos crear el metodo **editProduct** el cual editara cualquier producto que tenga el mismo id que el que se le pasa por parametro, este tendra los mensajes de error correspondientes (Revisar los test)
-   Debemos crear el metodo **deleteProduct** el cual eliminara un producto enviado por id y manejara errores de Not Found

### CartManager

Para ejecutar los test de esta parte ejecutar el siguiente comando:

    npm test 02

En esta clase se debe crear un CRUD de carrito, para esto se debe crear un archivo llamado CartManager.js en la carpeta managers, en este archivo se debe crear una clase llamada CartManager, esta clase debe tener en los siguientes items:

-   Su instancia debera tener los atributos path, carts y lastId, donde path es el path del archivo json donde se guardaran los carritos, carts es un array donde se guardaran los carritos y lastId es el ultimo id que se le asigno a un carrito.
-   Debemos crear el metodo **initiliaze** el cual debe leer el archivo json y cargar los carritos en el array carts, ademas debe asignar el ultimo id que se le asigno a un carrito. De no existir el archivo json, debe crearlo y asignarle el valor 0 al atributo lastId. PARA DECLARAR ESTE METODO HAGALO COMO FUNCION NORMAL initialize(){} y No como funcion flecha ~~initialize = () => {}~~. Este metodo sera llamado en el constructor de la clase.
-   Debemos crear el metodo **save** el cual guarda el array carts en el archivo json.
-   Debemos crear el metodo **getCarts** el cual retorna el array carts.
-   Debemos crear el metodo **createCart** el cual creara un carrito con la estructura {id, products:[]} este no recibira ningun argumento y lo guardara dentro del arreglo "carts", tambien actualizara el archivo json.
-   Debemos crear el metodo **getCartById** el cual recibira un id por parametro y retornara el carrito que tenga ese id, en caso de no existir retornara un error.
-   Debemos crear el metodo **addProductToCart** el cual recibira un id de carrito y un product, este agregara el producto al carrito, en caso de no existir el carrito retornara un error "Not Found", al agregar el producto se cargara un objeto por producto de la siguiente forma:

```
{
    id: idProduct,
    quantity: cantidadDeElementos
}


```

Por lo que si agregamos un producto con id 1 y un producto con id 2 a un carrito especifico deberiamos tener algo como esto:

```
{
    id: 1,
    products: [
        {
            id: 1,
            quantity: 1
        },
        {
            id: 2,
            quantity: 1
        }
    ]
}
```

A la hora de agregar nuevamente un producto de id 1 se deberia aumentar la quantity en 1 y quedar de la siguiente manera:

```
{
    id: 1,
    products: [
        {
            id: 1,
            quantity: 2
        },
        {
            id: 2,
            quantity: 1
        }
    ]
}
```

-   Debemos crear el metodo "removeProductFromCart" el cual recibira un id de carrito y un id de producto, este eliminara el producto del carrito, en caso de no existir el carrito o el producto retornara un error "Not Found", al eliminar el producto se debera eliminar el objeto del producto del array de productos del carrito, en caso de que la cantidad del producto sea mayor a 1 se debera disminuir la cantidad en 1, en caso de que la cantidad sea 1 se debera eliminar el objeto del producto del array de productos del carrito.
-   Debemos crear el metodo "deleteProductFromCart" el cual eliminara el producto del carrito sea cual sea la cantidad que posea, en caso de no existir el carrito o el producto retornara un error "Not Found", al eliminar el producto se debera eliminar el objeto del producto del array de productos del carrito.
-   Debemos crear el metodo 'clearCart' el cual recibira un id de carrito y eliminara todos los productos del carrito, en caso de no existir el carrito retornara un error "Not Found", al eliminar los productos se debera eliminar el contenido del array de productos del carrito.

## Servidor express

### Estructura Principal

Para ejecutar los test de esta parte ejecutar el siguiente comando:

    npm test 03

En esta parte se debe crear un servidor express con las siguientes caracteristicas:

-   Debe tener un archivo llamado app.js en la carpeta src
-   Se debe exportar el servidor express desde el archivo app.js
-   Debe tener una ruta POST a "/" la cual debe retornar el json con el req.body (Esta se utilizara para verificar middlewares)
-   El servidor debe utilizar express.json() y express.urlencoded({ extended: true })
-   El servidor debe utilizar un router general llamado "router" el cual debe usarse apartir del a ruta raiz "/api"
-   Se debe contar con un router principal en un archivo "index.js".
-   El router principal debe utilizar el router de productos en la ruta "/products"
-   El router principal debe utilizar el router de carts en la ruta "/carts"
-   Debe crearse los archivos productsRoutes.js y cartsRoutes.js dentro de la carpeta routes
-   Debe crearse los archivos productsControllers.js y cartsControllers.js dentro de la carpeta controllers
-   El servidor debe importarse en el archivo index.js y dentro de este debe inicializarse el servidor en el puerto 8080.

### Products

Para ejecutar los test de esta parte ejecutar el siguiente comando:

    npm test 04

Todas las respuestas seguiran la siguiente estructura,

-   Para rutas que funcionan correctamente enviaran:

    ```
    {
        status: "success",
        data: data
    }
    ```

-   Para rutas que no funcionan correctamente enviaran:

    ```
    {
        status: "error",
        message: message
    }
    ```

En esta unidad se verificara que el servidor maneje las siguientes rutas:

-   GET "/api/products" el cual debe retornar el array de productos, esta debe manejar la query "limit" la cual limitara la cantidad de elementos
-   GET "/api/products/:id" el cual debe retornar el producto que tenga el id que se le pasa por parametro, en caso de no existir retornara un error "Not Found"
-   POST "/api/products" el cual debe agregar un nuevo producto en el arreglo y en el archivo, este tendra los mensajes de error correspondientes en la falta de algun atributo o code repetido (Revisar los test) (El formato de los productos es el mismo que en la tarea anterior, {title, description, code, price, stock})
-   PUT "/api/products/:id" el cual editara cualquier producto que tenga el mismo id que el que se le pasa por parametro, este tendra los mensajes de error correspondientes (Revisar los test)
-   DELETE "/api/products/:id" el cual eliminara un producto enviado por id y manejara errores de Not Found

Recordar utilizar controladores en la carpeta controllers, con los respectivos nombres **getProducts, getProductById, createProduct, editProduct, deleteProduct**.

### Carts

Para ejecutar los test de esta parte ejecutar el siguiente comando:

    npm test 05

Todas las respuestas seguiran la siguiente estructura:

-   Para rutas que funcionan correctamente enviaran:

    ```
    {
        status: "success",
        data: data
    }
    ```

-   Para rutas que no funcionan correctamente enviaran:

    ```
    {
        status: "error",
        message: message
    }
    ```

En esta unidad se verificara que el servidor maneje las siguientes rutas:

-   GET "/api/carts" el cual debe retornar el array de carritos, esta debe manejar la query "limit" la cual limitara la cantidad de elementos
-   GET "/api/carts/:id" el cual debe retornar el carrito que tenga el id que se le pasa por parametro, en caso de no existir retornara un error "Not Found"
-   POST "/api/carts" el cual debe crear un carrito con la estructura {id, products:[]} este no recibira ningun argumento y devolvera la id del nuevo carrito.
-   POST "/api/carts/:idCart/products/:idProduct " el cual agregara un producto al carrito, en caso de no existir el carrito devolver el mensaje "Not Found", al igual que si no existiese le producto, recordar que esta ruta utilizara el productManager creado dentro de los controladores de productManager para no crear varias instancias de la clase y mantener un unico arreglo y que no existan inconsistencias.
-   DELETE "/api/carts/:idCart/products/:idProduct " el cual eliminara un producto del carrito, en caso de no existir el carrito devolver el mensaje "Not Found", al igual que si no existiese le producto, recordar que esta ruta utilizara el productManager creado dentro de los controladores de productManager para no crear varias instancias de la clase y mantener un unico arreglo y que no existan inconsistencias. Este manejara la query "option" que podra ser "allAmount" en caso de ser "allAmount" se eliminara todo el producto del carrito, si no se envia esta opcion se eliminara solo una unidad del producto del carrito.
-   DELETE "/api/carts/:id" la cual vaciara todo los elementos del carrito, en caso de no existir el carrito devolver el mensaje "Not Found".

Recordar utilizar controladores en la carpeta controllers, con los respectivos nombres **getCarts, getCartById, createCart, addProductToCart, deleteProductFromCart, clearCart**.
