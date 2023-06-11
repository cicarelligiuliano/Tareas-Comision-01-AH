//"a" debe ser un string con cualquier palabra

let a = 'hola';

//"b" debe ser un numero

let b = 12;

// "c" debe ser un booleano

let c = true;

// "d" debe ser "null"

let d;

// "e" debe ser undefined

let e = 'Debo ser undefined!!!!!';

// Declara una variable con el formato de fecha

let date;

// Crear una variable de tipo "error"

let error;

// Siendo frase1 y frase2 string, se debe modificar la declaracion de frase para que sea la combinacion de frase1 y frase2 junto con una variable "nombre" que sera el nombre del alumno

const frase1 = 'Hola ';
const frase2 = 'como estas? Mi nombre es Giuliano';

let nombre;
let frase;

//Siendo numero1 y numero2 numeros proporcionados, escribir las variables
// sum que sera la suma de numero1 y numero2
// mult que sera la multiplicacion de numero1 y numero2
// div que sera la division entre numero1 y numero2
// op que sera la multiplicacion entre numero1 y numero2 dividida la resta entre numero 1 y numero2, y a ese resultado sumarle 4 veces el numero1

let numero1 = 10;
let numero2 = 2;

let sum;
let mult;
let div;
let op;

//Se creara una funcion que enviara un mensaje modificando "respuesta" siguiendo la siguiente logica:
//Si a es mayor o igual a 20 enviara el mensaje "A es mayor o igual a 20"
//Si a es menor a 20 y b es mayor o igual a 15 "A es menor a 20 y b es mayor o igual a 15"
//Si C es negativo "No se puede continuar C es negativo"
//Si C es positivo, a es menor a 20 y b es menor a 15 el mensaje dira "Salchipapa"
// En cualquier otro caso devolver "Otra cosa"

const condicionalIf = (a, b, c) => {
    let respuesta = '';

    //Escribir la logica a partir de este punto

    //No modificar la respuesta
    return respuesta;
};

//Crearemos una calculadora, la cual recibira 2 numeros y un tercer parametro que definira la operacion a realizar, las cuales seran "SUMA", "RESTA", "DIVIDIR", y "MULTIPLICAR" en cualquier otro caso devolver "Error". (Utilizar "switch" para este ejercicio)

const calculadora = (a, b, c) => {};

//Bucle for
//Esta funcion recibira 2 numeros, el primero representara el valor inicial y el segundo la cantidad de veces que se multiplicara por 4 consecutivamente el resultado, es decir:
//Si recibo 4 y 3 tendra en la primer iteracion 4*4=16, luego 16*4=64 y por ultimo 64*4=256

const bucleFor = (a, b) => {
    //No modificar luego de este punto
    return a;
};
//Bucle While
//Crear una funcion que respete la siguiente logica, recibira 2 numeros a y b entonces:
//- Si b es mayor o igual a "a" enviara el mensaje de "b debe ser menor a a"
//- Cuando b sea menor a "a" entonces iremos sumando a (a-b) la suma de (a+b)*x, (a-b) veces, donde x es (a-b)+i donde i es el numero del ciclo que empieza en 0 hasta que esa suma sea igual a "a" es decir i=b, por ejemplo:

//Supongamos que a = 9 y b = 4 entonces empezamos el primer ciclo con c = 5, en este caso se le suma (9-4)+0, dando como resultado 10, en el segundo ciclo se le suma (9-4)+1 entonces tenemos como resultado 16, luego (9-4)+2 entonces 23, luego c+(9-4)+3=31 y por ultimo c+(9-4)+4=40

//Si a=10 b=7 entonces
//c=3
//c+(10-7)+0=6
//c+(10-7)+1=10
//c+(10-7)+2=15
//c+(10-7)+3=21
//c+(10-7)+4=28
//c+(10-7)+5=36
//c+(10-7)+6=45
//c+(10-7)+7=55

const bucleWhile = (a, b) => {
    let respuesta;

    // Codear apartir de aca

    //No tocar el return, utilizar respuesta para el valor que devolveremos
    return respuesta;
};

//NO CAMBIAR NADA DE ACA EN ADELANTE
module.exports = {
    a,
    b,
    c,
    d,
    e,
    date,
    error,
    nombre,
    frase,
    sum,
    mult,
    div,
    op,
    condicionalIf,
    bucleFor,
    bucleWhile,
    calculadora,
};
