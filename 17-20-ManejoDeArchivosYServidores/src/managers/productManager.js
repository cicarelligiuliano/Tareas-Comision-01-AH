const fs = require('fs');
//En este archivo crearemos una clase que se encargará de manejar los productos pero trabajando con archivos
//Esta clase alamacenara los productos en un archivo JSON dentro de la carpeta db en src.

//Iniciaremos creando el constructor de la clase, el cual recibira como parametro el nombre del archivo donde se almacenaran los productos en la variable path, creara un array vacio de productos en la variable products y un lastId inicialmente en 0 que utilizara para setear el id de los productos.

//Primero crearemos el metodo initialize el cual leera el archivo dentro de la carpeta db de existir y almacenara los productos en la variable products, en el caso de que no exista el archivo creara el archivo, almacenara un array vacio en la variable products. Recordar utilizar la siguiente sintanxis para el path, __dirname nos devuelve la ruta absoluta de la carpeta donde se encuentra el archivo que lo contiene, por lo que si queremos acceder a la carpeta db debemos utilizar la siguiente sintaxis: path.join(__dirname, '../db/products.json'). Pero utilizando la variable path que recibimos como parametro en el constructor. (La instancia del a clase se realizara de la siguiente manera, const productManager = new ProductManager('products.json')". Tambien debe configurar el lastId para que sea el ultimo id de los productos almacenados en el archivo.

//Recordar utilizar JSON.stringify para guardar y JSON.parse al leer el archivo.

//El metodo initialize debe ser llamado en el constructor de la clase.

//Crearemos le metodo save el cual guardara los productos en nuestro archivo, este recibira como parametro un array de productos y los guardara en el archivo.

//Crearemos el metodo getProducts el cual devolvera los productos almacenados en la variable products.

//Crearemos el metodo addProduct el cual recibira un objeto con los siguientes parametros {title, description, price, stock, code}, al igual que en el ejercicio de la semana pasada se debera verificar la existencia de los elementos y devolver los mensajes correspondientes, en el caso de que no exista ningun error se debera agregar el producto al array de productos y guardarlos en el archivo, recordar que el id debe ser incremental y unico, por lo que se debera utilizar el lastId para asignarle el id al producto, luego se debe guardar el producto en el archivo y devolver el mensaje "El producto se agrego correctamente". En el caso de que no esten todos los datos necesarios se enviara el mensaje "Faltan datos necesarios", en el caso de que el code se repita se enviara el mensaje "El code ${code} ya existe en la base de datos".

//Crearemos el metodo getProductById el cual recibira un id y devolvera el producto que tenga el id enviado, en el caso de que se envie un id que no exista devolvera el mensaje "Not Found".

//Crearemos el metodo editProduct el cual recibira un id y un objeto con la nueva estructura del producto, en el caso de que no exista el producto se enviara el mensaje "Not found", en el caso de si existir es importante saber que podemos enviar una o todas las propiedades por lo que no siempre modificaremos todos los elementos, como ayuda se deja el operador "??" al igual que los ejercicios anteriores.
//Tener en cuenta que el code no se debe repetir en el caso de que se cambie por lo que es necesario verificarlo y devolver el mensaje  "El code ${code} ya existe en la base de datos, recordar tambien que si se envia el mismo code del producto no debe verificarlo ya que en este caso siempre daria error por que ya existe en la DB"
//Debe retornar "El producto con el id ${id} ha sido modificado con exito" luego de actualizar el archivo.

//Crearemos el metodo deleteProduct el cual recibira un id y devolvera el mensaje "Se borro el elemento con el id ${id}", en el caso de que se envie un id que no exista devolvera el mensaje "Not Found".



class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.lastId = 0;
        this.initialize();
    }

    initialize = () => {
        if (fs.existsSync(path.join(__dirname, `../db/${this.path}`))) {
            this.products = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/products.json'), 'utf-8'));

            if (this.products.length > 0) {
                this.lastId = Math.max(...this.products.map((p) => p.id));
            }
        } else {
            fs.writeFileSync(path.join(__dirname, `../db/${this.path}`), JSON.stringify(this.products));
        }
    };

    save = (products) => {
        fs.writeFileSync(path.join(__dirname, `../db/${this.path}`), JSON.stringify(products));
    };
}

module.exports = { ProductManager };
