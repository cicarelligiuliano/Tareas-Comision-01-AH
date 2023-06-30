const app = require('../src/app');
const supertest = require('supertest');
const request = require('supertest');

describe('Server', () => {
    describe('app.js', () => {
        it('Debe existir la constante app que es una instancia de express', () => {
            expect(app.request).toBeDefined();
        });
        it('Debe tener una ruta POST a "/" con un mensaje determinado', async () => {
            const response = await request(app).post('/').send({ data: 'example' });

            expect(response.status).toBe(200);
        });
        it('Debe utilizar el middleware de express.json', async () => {
            const response = await request(app).post('/').send({ data: 'example' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ data: 'example' });
        });
        it('Debe utilizar el middleware de express.urlencoded', async () => {
            const response = await request(app).post('/').type('form').send('name=John&age=30');

            expect(response.status).toBe(200);
            // Verifica si el middleware express.urlencoded({ extended: true }) se está utilizando
            expect(response.body).toEqual({ name: 'John', age: '30' });
        });
    });

    describe('Router', () => {
        it('Debe existir el archivo index.js en routes que exporta el router', () => {
            const routes = require('../src/routes/index');

            expect(routes).toBeDefined();
        });
        it('Debe utilizar un router general para la ruta /api', async () => {
            const response = await request(app).get('/api');

            expect(app._router.stack[app._router.stack.length - 1].path).toBe('/api');
            expect(app._router.stack[app._router.stack.length - 1].name).toBe('router');
        });
        it('Debe existir un router productsRouter exportado desde routes/productsRouter.js', () => {
            const productsRouter = require('../src/routes/productsRouter');

            expect(productsRouter).toBeDefined();
        });
        it('Debe existir un router cartsRouter exportado desde routes/cartsRouter.js', () => {
            const cartsRouter = require('../src/routes/cartsRouter');

            expect(cartsRouter).toBeDefined();
        });
    });

    describe('Products Controllers', () => {
        it("Debe crearse y exportarse una funcion llamada 'getProducts' desde productsControllers", () => {
            const productsControllers = require('../src/controllers/productsControllers');

            expect(productsControllers.getProducts).toBeDefined();
        });
        it("Debe crearse y exportarse una funcion llamada 'getProductById' desde productsControllers", () => {
            const productsControllers = require('../src/controllers/productsControllers');

            expect(productsControllers.getProductById).toBeDefined();
        });
        it("Debe crearse y exportarse una funcion llamada 'createProduct' desde productsControllers", () => {
            const productsControllers = require('../src/controllers/productsControllers');

            expect(productsControllers.createProduct).toBeDefined();
        });
        it("Debe crearse y exportarse una funcion llamada 'editProduct' desde productsControllers", () => {
            const productsControllers = require('../src/controllers/productsControllers');

            expect(productsControllers.editProduct).toBeDefined();
        });
        it("Debe crearse y exportarse una funcion llamada 'deleteProduct' desde productsControllers", () => {
            const productsControllers = require('../src/controllers/productsControllers');

            expect(productsControllers.deleteProduct).toBeDefined();
        });
    });

    describe('Carts Controllers', () => {
        it("Debe crearse y exportarse una funcion llamada 'getCarts' desde cartsControllers", () => {
            const cartsControllers = require('../src/controllers/cartsControllers');

            expect(cartsControllers.getCarts).toBeDefined();
        });
        it("Debe crearse y exportarse una funcion llamada 'getCartById' desde cartsControllers", () => {
            const cartsControllers = require('../src/controllers/cartsControllers');

            expect(cartsControllers.getCartById).toBeDefined();
        });
        it("Debe crearse y exportarse una funcion llamada 'createCart' desde cartsControllers", () => {
            const cartsControllers = require('../src/controllers/cartsControllers');

            expect(cartsControllers.createCart).toBeDefined();
        });
        it("Debe crearse y exportarse una funcion llamada 'addProductToCart' desde cartsControllers", () => {
            const cartsControllers = require('../src/controllers/cartsControllers');

            expect(cartsControllers.addProductToCart).toBeDefined();
        });
        it("Debe crearse y exportarse una funcion llamada 'deleteProductFromCart' desde cartsControllers", () => {
            const cartsControllers = require('../src/controllers/cartsControllers');

            expect(cartsControllers.deleteProductFromCart).toBeDefined();
        });

        it("Debe crearse y exportarse una funcion llamada 'clearCart' desde cartsControllers", () => {
            const cartsControllers = require('../src/controllers/cartsControllers');

            expect(cartsControllers.clearCart).toBeDefined();
        });
    });
});
