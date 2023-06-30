const request = require('supertest');
const app = require('../src/app');
const path = require('path');
const fs = require('fs');

describe('productsRouter', () => {
    let productsPath = path.join(__dirname, '../src/db/products.json');
    let productsManager;
    const products = [
        { title: 'Producto 1', code: 'PD01', description: 'Description 1', stock: 120, price: 100 },
        { title: 'Producto 2', code: 'PD02', description: 'Description 2', stock: 120, price: 100 },
        { title: 'Producto 3', code: 'PD03', description: 'Description 3', stock: 120, price: 100 },
    ];

    beforeEach(() => {
        if (fs.existsSync(productsPath)) {
            fs.unlinkSync(productsPath);
        }

        productsManager = require('../src/controllers/productsControllers').productsManager;

        if (productsManager) {
            productsManager.initialize();
        }
    });

    afterEach(() => {
        if (fs.existsSync(productsPath)) {
            fs.unlinkSync(productsPath);
        }
    });

    describe('Preparacion', () => {
        it('Debe crearse una instancia de ProductManager y exportarse como productsManager en los controladores utilizando como path "products.json"', () => {
            const { productsManager } = require('../src/controllers/productsControllers.js');
            expect(productsManager).toBeDefined();
            expect(productsManager instanceof require('../src/managers/ProductManager')).toBe(true);
            expect(productsManager.path).toBe('products.json');
        });
    });
    describe('GET /api/products', () => {
        it('Debe existir la ruta y responder con un status 200', async () => {
            return await request(app).get('/api/products').expect(200);
        });
        it('Debe devolver un array vacio si no hay productos', async () => {
            const response = await request(app).get('/api/products');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ status: 'success', data: [] });
        });
        it('Debe devolver un array con los productos si hay productos', async () => {
            products.forEach((p) => productsManager.addProduct(p));

            const response = await request(app).get('/api/products');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data).toMatchObject(products);
        });

        it('Debe manejar una query "limit" para limitar la cantidad de productos a devolver', async () => {
            products.forEach((p) => productsManager.addProduct(p));

            const response = await request(app).get('/api/products?limit=2');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data).toMatchObject(products.slice(0, 2));
        });
    });

    describe('GET /api/products/:id', () => {
        it('Debe existir la ruta y responder con un status 200', async () => {
            return await request(app).get('/api/products/1').expect(200);
        });
        it('Debe devolver un status 404 si no existe el producto', async () => {
            const response = await request(app).get('/api/products/5');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });
        it('Debe devolver un status 200 y el producto si existe', async () => {
            products.forEach((p) => productsManager.addProduct(p));

            const response = await request(app).get('/api/products/1');

            expect(response.status).toBe(200);
            expect(response.body.status).toBe('success');

            expect(response.body.data).toMatchObject(products[0]);
        });
    });

    describe('POST /api/products', () => {
        it('Debe existir la ruta', async () => {
            const response = await request(app).post('/api/products');

            expect(response.status).not.toBe(404);
        });
        it('Debe devolver un status 400 si faltan datos', async () => {
            const response = await request(app).post('/api/products');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ status: 'error', message: 'Faltan datos necesarios' });
        });
        it('Debe devolver un status 400 si el code ya existe', async () => {
            products.forEach((p) => productsManager.addProduct(p));

            const response = await request(app).post('/api/products').send(products[0]);

            expect(response.status).toBe(400);
            expect(response.body).toEqual({
                status: 'error',
                message: `El code ${products[0].code} ya existe en la base de datos`,
            });
        });
        it('Debe devolver un status 201 y el producto si se creo correctamente', async () => {
            const response = await request(app)
                .post('/api/products')
                .send({ title: 'Producto 4', code: 'PD04', description: 'Description 4', stock: 120, price: 100 });

            expect(response.status).toBe(201);
            expect(response.body).toMatchObject({
                status: 'success',
                data: { title: 'Producto 4', code: 'PD04', description: 'Description 4', stock: 120, price: 100 },
            });
        });
    });

    describe('PUT /api/products/:id', () => {
        it('Debe existir la ruta', async () => {
            const response = await request(app).put('/api/products/1');

            expect(response.status).not.toBe(404);
        });
        it('Debe devolver un status 404 si no existe el producto y el mensaje "Not Found"', async () => {
            const response = await request(app).put('/api/products/5');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });
        it('Debe devolver un status 200 y el producto modificado si se realizo sin problemas', async () => {
            products.forEach((p) => productsManager.addProduct(p));

            const response = await request(app).put('/api/products/1').send({ title: 'Producto 1 Modificado' });

            const response2 = await request(app).get('/api/products/1');

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                status: 'success',
                data: {
                    title: 'Producto 1 Modificado',
                    code: 'PD01',
                    description: 'Description 1',
                    stock: 120,
                    price: 100,
                },
            });

            expect(response2.status).toBe(200);
            expect(response2.body).toMatchObject({
                status: 'success',
                data: {
                    id: 1,
                    title: 'Producto 1 Modificado',
                    code: 'PD01',
                    description: 'Description 1',
                    stock: 120,
                    price: 100,
                },
            });
        });
    });

    describe('DELETE /api/products/:id', () => {
        it('Debe existir la ruta', async () => {
            const response = await request(app).delete('/api/products/1');

            expect(response.status).not.toBe(404);
        });

        it('Debe devolver un status 404 si no existe el producto y el mensaje "Not Found"', async () => {
            const response = await request(app).delete('/api/products/5');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ status: 'error', message: 'Not Found' });
        });

        it('Debe devolver un status 200 y el producto eliminado si se realizo sin problemas', async () => {
            products.forEach((p) => productsManager.addProduct(p));

            const response = await request(app).delete('/api/products/2');

            const response2 = await request(app).get('/api/products/2');
            console.log(response.body);

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                status: 'success',
                data: {
                    title: 'Producto 2',
                    code: 'PD02',
                    description: 'Description 2',
                    stock: 120,
                    price: 100,
                },
            });

            expect(response2.status).toBe(404);
            expect(response2.body).toEqual({ status: 'error', message: 'Not Found' });
        });
    });
});
