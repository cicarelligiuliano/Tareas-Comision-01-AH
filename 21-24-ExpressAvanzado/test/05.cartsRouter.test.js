const request = require('supertest');
const app = require('../src/app');
const path = require('path');
const fs = require('fs');

describe('Carts Routes', () => {
    let cartsPath = path.join(__dirname, '../src/db/carts.json');
    let cartsManager;
    let productsManager;

    const products = [
        { title: 'Producto 1', code: 'PD01', description: 'Description 1', stock: 120, price: 100 },
        { title: 'Producto 2', code: 'PD02', description: 'Description 2', stock: 120, price: 100 },
        { title: 'Producto 3', code: 'PD03', description: 'Description 3', stock: 120, price: 100 },
    ];
    beforeEach(() => {
        if (fs.existsSync(cartsPath)) {
            fs.unlinkSync(cartsPath);
        }

        cartsManager = require('../src/controllers/cartsControllers').cartsManager;
        productsManager = require('../src/controllers/productsControllers').productsManager;
        if (cartsManager) {
            cartsManager.initialize();
        }

        if (productsManager) {
            productsManager.products = [];
            productsManager.initialize();
        }
    });

    afterEach(() => {
        if (fs.existsSync(cartsPath)) {
            fs.unlinkSync(cartsPath);
        }

        if (productsManager) {
            productsManager.products = [];
            productsManager.initialize();
        }
    });

    describe('Preparacion', () => {
        it('Debe crearse una instancia de CartManager y exportarse como cartsManager en los controladores utilizando como path "carts.json"', () => {
            const { cartsManager } = require('../src/controllers/cartsControllers.js');
            expect(cartsManager).toBeDefined();
            expect(cartsManager instanceof require('../src/managers/CartManager')).toBe(true);
            expect(cartsManager.path).toBe('carts.json');
        });
    });

    describe('GET /api/carts', () => {
        it('Debe existir la ruta y responder con un status 200', async () => {
            return await request(app).get('/api/carts').expect(200);
        });
        it('Debe devolver un array vacio si no hay carritos', async () => {
            const response = await request(app).get('/api/carts');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ status: 'success', data: [] });
        });
        it('Debe devolver un array con los carritos si hay carritos', async () => {
            cartsManager.createCart();
            cartsManager.createCart();
            cartsManager.createCart();

            const response = await request(app).get('/api/carts');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data.length).toBe(3);
        });
    });

    describe('GET /api/carts/:id', () => {
        it('Debe existir la ruta y responder con un status 200', async () => {
            return await request(app).get('/api/carts/1').expect(200);
        });
        it('Debe devolver un mensaje de error si no existe el carrito', async () => {
            const response = await request(app).get('/api/carts/10');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });
        it('Debe devolver el carrito si existe', async () => {
            cartsManager.createCart();
            cartsManager.createCart();
            cartsManager.createCart();

            const response = await request(app).get('/api/carts/1');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data.id).toBe(1);
        });
    });

    describe('POST /api/carts', () => {
        it('Debe existir la ruta y responder con un status 201', async () => {
            return await request(app).post('/api/carts').expect(201);
        });
        it('Debe devolver el carrito creado', async () => {
            const response = await request(app).post('/api/carts');

            const lastCart = cartsManager.carts[cartsManager.carts.length - 1];
            expect(response.status).toBe(201);
            expect(response.body.status).toBe('success');

            expect(response.body.data).toMatchObject(lastCart);
        });
    });

    describe('POST /api/carts/:id/products/:idProduct', () => {
        it('Debe devolver un mensaje de error si no existe el producto', async () => {
            cartsManager.createCart();
            const response = await request(app).post('/api/carts/1/products/10');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });
        it('Debe devolver un mensaje de error si no existe el carrito', async () => {
            productsManager.addProduct(products[0]);

            const response = await request(app).post('/api/carts/10/products/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });
        it('Debe devolver el carrito con el producto agregado', async () => {
            products.forEach((p) => productsManager.addProduct(p));
            cartsManager.createCart();

            const response = await request(app).post('/api/carts/1/products/1');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data.products.length).toBe(1);
        });
        it('Debe devolver el carrito con el producto agregado y la cantidad actualizada si el producto ya existe', async () => {
            products.forEach((p) => productsManager.addProduct(p));
            cartsManager.createCart();
            cartsManager.createCart();

            await request(app).post('/api/carts/2/products/1');
            const response = await request(app).post('/api/carts/2/products/1');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data.products.length).toBe(1);
            expect(response.body.data.products[0].quantity).toBe(2);
        });
    });

    describe('DELETE /api/carts/:id/products/:idProduct', () => {
        it('Debe devolver un mensaje de error si no existe el producto en el carrito', async () => {
            const response = await request(app).delete('/api/carts/3/products/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });
        it('Debe devolver un mensaje de error si no existe el carrito', async () => {
            products.forEach((p) => productsManager.addProduct(p));

            const response = await request(app).delete('/api/carts/10/products/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });
        it('Debe devolver el carrito con la cantidad de los productos correcta si no se le envia ninguan opcion', async () => {
            products.forEach((p) => productsManager.addProduct(p));
            cartsManager.createCart();
            cartsManager.createCart();

            await request(app).post('/api/carts/5/products/1');
            await request(app).post('/api/carts/5/products/1');
            await request(app).post('/api/carts/5/products/1');
            await request(app).post('/api/carts/5/products/2');

            const response = await request(app).delete('/api/carts/5/products/1');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data.products).toMatchObject([
                {
                    id: 1,
                    quantity: 2,
                },
                {
                    id: 2,
                    quantity: 1,
                },
            ]);
        });
        it('Debe devolver el carrito con la cantidad de los productos correcta si se le envia la opcion "allAmount"', async () => {
            products.forEach((p) => productsManager.addProduct(p));
            cartsManager.createCart();
            cartsManager.createCart();

            await request(app).post('/api/carts/6/products/1');
            await request(app).post('/api/carts/6/products/1');
            await request(app).post('/api/carts/6/products/1');
            await request(app).post('/api/carts/6/products/2');

            const response = await request(app).delete('/api/carts/6/products/1?option=allAmount');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data.products).toMatchObject([
                {
                    id: 2,
                    quantity: 1,
                },
            ]);
        });
    });

    describe('DELETE /api/carts/:id', () => {
        it('Debe devolver un mensaje de error si no existe el carrito', async () => {
            const response = await request(app).delete('/api/carts/120');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });
        it('Debe devolver el carrito con los productos vacios si se limpia correctamente', async () => {
            const response = await request(app).delete('/api/carts/1');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.products).toMatchObject([]);
        });
    });
});
