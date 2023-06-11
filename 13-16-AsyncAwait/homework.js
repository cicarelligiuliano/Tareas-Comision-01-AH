//Para esta primera parte deberan consultar la pagina de JSONPLACEHOLDER, https://jsonplaceholder.typicode.com/ y entender como funciona.

//Crear una funcion que traiga todos los "posts" de la pagina JSONPLACEHOLDER, utilizar async await y devolver el resultado en el return.

const getPosts = () => {};

//crear una funcion que reciba un ID y busque el comment con el id enviado por parametro, si el id no es un numero debera enviarse "id debe ser un numero", si el id no existe devolver "El id enviado no existe"

const getCommentsById = () => {};

//Crear una funcion que reciba un "limite" y retorne la cantidad de elementos de la ruta "comments" de la pagina JSONPLACEHOLDER, si no recibe un limite, devolvera todos los comments

const getComments = () => {};

//Crear una funcion que reciba "start" y "elements" el cual retorne la cantidad de elementos de la ruta "posts" de JSONPLACEHOLDER pero empezando desde el elemento "start", si no se envia ningun "start" empezara desde el elemento 0, si no se ofrece ningun "limit" se enviaran 20 elementos

const getPostsLimited = () => {};

//Crear una funcion que recibe "page", "elements" y retorne un objeto que posea las propiedades {post, next, page, lastPage}, en los post se enviara el mismo resultado que en el caso anterior dependiendo de la pagina solicitada, y en next la funcion necesaria para llamar los proximos elementos, es decir que si se envia page= 1 y elements=10, se enviara un objeto con los primeros 10 posts y luego un next que de llamarlo tendra los proximos 10 elementos y otro next para los siguientes 10 elementos, en page se enviara la pagina actual y lastPage la cantidad maxima de paginas.
//Los valores por defecto siguen siendo start=0 y elements = 20
//Sera necesario para este ejercicio calcular la cantidad de paginas que posee "posts" de esta forma limitar la cantidad de "next" que vamos a tener, es necesario utilizar recursividad para resolver este ejercicio. Es muy importante utilizar el paginado para limitar la cantidad de consultas que se realizan con next, por lo cual es necesario que si la pagina actual es mayor a la "lastPage" no se debera devolver ningun next (Recordar utilizar los metodos de "Math.floor", "Math.round", "Math.ceil" para redondear las paginas), las paginas comienzan desde 1.

const getPostsPaginated = () => {};

module.exports = { getPosts, getComments, getCommentsById, getPostsLimited, getPostsPaginated };
