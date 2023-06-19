const path = require('path');
const { ProductManager } = require('../src/managers/productManager');
const fs = require('fs');

describe('ProductManager', () => {
    let productManager;
    beforeEach(() => {
        if (fs.existsSync(path.join(__dirname, '../src/db/products.json')))
            fs.unlinkSync(path.join(__dirname, '../src/db/products.json'));

        productManager = new ProductManager('products.json');
    });
    describe('Constructor', () => {
        it('La instancia de la clase debe tener la propiedad path que se enviara como parametro', () => {
            expect(productManager.path).toBe('products.json');
        });
        it('La instancia de la clase debe tener la propiedad products que se inicializara como un array vacio', () => {
            expect(productManager.products).toEqual([]);
        });
        it('La instancia de la clase debe tener la propiedad lastId que se inicializara en 0', () => {
            expect(productManager.lastId).toBe(0);
        });
    });
    describe('Initialize', () => {
        it('Debe existir el metodo initialize() ', () => {
            expect(productManager.initialize).toBeDefined();
        });
        it('De no existir el archivo debe crearlo y guardar un array vacio en la variable products', () => {
            productManager.initialize();
            expect(fs.existsSync(path.join(__dirname, '../src/db/products.json'))).toBe(true);
        });
        it('De existir el archivo debe leerlo y almacenar los productos en la variable products', () => {
            fs.writeFileSync(
                path.join(__dirname, '../src/db/products.json'),
                JSON.stringify([{ id: 1, title: 'Producto 1' }])
            );
            productManager.initialize();
            expect(productManager.products).toEqual([{ id: 1, title: 'Producto 1' }]);
        });
        it('De existir el archivo debe setear el lastId con el ultimo id de los productos', () => {
            fs.writeFileSync(
                path.join(__dirname, '../src/db/products.json'),
                JSON.stringify([{ id: 1, title: 'Producto 1' }])
            );
            productManager.initialize();
            expect(productManager.lastId).toBe(1);
        });
    });
    describe('Save', () => {
        it('Debe existir el metodo save() ', () => {
            expect(productManager.save).toBeDefined();
        });
        it('Debe guardar los productos en el archivo', () => {
            productManager.initialize();
            productManager.save([{ id: 1, title: 'Producto 1' }]);
            expect(fs.readFileSync(path.join(__dirname, '../src/db/products.json'), 'utf-8')).toBe(
                JSON.stringify([{ id: 1, title: 'Producto 1' }])
            );
        });
    });
    describe('getProducts', () => {
        it('Debe existir el metodo getProducts() ', () => {
            expect(productManager.getProducts).toBeDefined();
        });
        it('Debe devolver los productos almacenados en la variable products que son cargados utilizados los metodos anteriores', () => {
            productManager.initialize();
            productManager.save([{ id: 1, title: 'Producto 1' }]);
            productManager.initialize();
            expect(productManager.getProducts()).toEqual([{ id: 1, title: 'Producto 1' }]);
        });
    });
    describe('addProduct', () => {
        it('Debe existir el metodo addProduct() ', () => {
            expect(productManager.addProduct).toBeDefined();
        });
        it('Debe agregar un producto al array de productos y guardarlos en el archivo', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            expect(productManager.getProducts()).toEqual([
                { id: 1, title: 'Producto 1', description: 'Descripcion 1', price: 100, stock: 10, code: 'P1' },
            ]);
            expect(JSON.parse(fs.readFileSync(path.join(__dirname, '../src/db/products.json'), 'utf-8'))).toMatchObject(
                [{ id: 1, title: 'Producto 1', description: 'Descripcion 1', price: 100, stock: 10, code: 'P1' }]
            );
        });
        it('Debe devolver el mensaje "El producto se agrego correctamente" en el caso de que no exista ningun error', () => {
            productManager.initialize();
            expect(
                productManager.addProduct({
                    title: 'Producto 1',
                    description: 'Descripcion 1',
                    price: 100,
                    stock: 10,
                    code: 'P1',
                })
            ).toBe('El producto se agrego correctamente');
        });
        it('Debe devolver el mensaje "Faltan datos necesarios" en el caso de que no esten todos los datos necesarios', () => {
            productManager.initialize();
            expect(
                productManager.addProduct({
                    title: 'Producto 1',
                    description: 'Descripcion 1',
                    price: 100,
                    stock: 10,
                })
            ).toBe('Faltan datos necesarios');
        });
        it('Debe devolver el mensaje "El code ${code} ya existe en la base de datos" en el caso de que el code se repita', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            expect(
                productManager.addProduct({
                    title: 'Producto 2',
                    description: 'Descripcion 2',
                    price: 200,
                    stock: 20,
                    code: 'P1',
                })
            ).toBe('El code P1 ya existe en la base de datos');
        });
    });

    describe('getProductById', () => {
        it('Debe existir el metodo getProductById() ', () => {
            expect(productManager.getProductById).toBeDefined();
        });
        it('Debe devolver el producto que tenga el id enviado', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            expect(productManager.getProductById(1)).toEqual({
                id: 1,
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
        });
        it('Debe devolver el mensaje "Not Found" en el caso de que se envie un id que no exista', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            expect(productManager.getProductById(2)).toBe('Not Found');
        });
    });
    describe('editProduct', () => {
        it('Debe existir el metodo editProduct() ', () => {
            expect(productManager.editProduct).toBeDefined();
        });
        it('Debe devolver el mensaje "Not found" en el caso de que no exista el producto', () => {
            productManager.initialize();
            expect(productManager.editProduct(1, {})).toBe('Not Found');
        });
        it('Debe devolver el mensaje "El producto con el id ${id} ha sido modificado con exito" luego de actualizar el archivo', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            expect(
                productManager.editProduct(1, {
                    title: 'Producto 2',
                    description: 'Descripcion 2',
                    price: 200,
                    stock: 20,
                    code: 'P2',
                })
            ).toBe('El producto con el id 1 ha sido modificado con exito');
            expect(productManager.getProducts()).toEqual([
                {
                    id: 1,
                    title: 'Producto 2',
                    description: 'Descripcion 2',
                    price: 200,
                    stock: 20,
                    code: 'P2',
                },
            ]);
            expect(JSON.parse(fs.readFileSync(path.join(__dirname, '../src/db/products.json'), 'utf-8'))).toMatchObject(
                [
                    {
                        id: 1,
                        title: 'Producto 2',
                        description: 'Descripcion 2',
                        price: 200,
                        stock: 20,
                        code: 'P2',
                    },
                ]
            );
        });
        it('Debe devolver el mensaje "El code ${code} ya existe en la base de datos" en el caso de que el code se repita', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            productManager.addProduct({
                title: 'Producto 2',
                description: 'Descripcion 2',
                price: 200,
                stock: 20,
                code: 'P2',
            });
            expect(
                productManager.editProduct(1, {
                    title: 'Producto 2',
                    description: 'Descripcion 2',
                    price: 200,
                    stock: 20,
                    code: 'P2',
                })
            ).toBe('El code P2 ya existe en la base de datos');
        });

        it('Debe permitir modificar solo algunas de las propiedades del producto', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            productManager.editProduct(1, {
                title: 'Producto 2',
                description: 'Descripcion 2',
            });
            expect(productManager.getProducts()).toEqual([
                {
                    id: 1,
                    title: 'Producto 2',
                    description: 'Descripcion 2',
                    price: 100,
                    stock: 10,
                    code: 'P1',
                },
            ]);
        });
    });
    describe('deleteProduct', () => {
        it('Debe existir el metodo deleteProduct() ', () => {
            expect(productManager.deleteProduct).toBeDefined();
        });
        it('Debe devolver el mensaje "Se borro el elemento con el id ${id}"', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            expect(productManager.deleteProduct(1)).toBe('Se borro el elemento con el id 1');
        });
        it('Debe devolver el mensaje "Not Found" en el caso de que se envie un id que no exista', () => {
            productManager.initialize();
            productManager.addProduct({
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            expect(productManager.deleteProduct(2)).toBe('Not Found');
        });
        it('Debe eliminar el producto del array de productos y guardarlos en el archivo', () => {
            productManager.initialize();
            productManager.addProduct({
                id: 1,
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            productManager.addProduct({
                id: 2,
                title: 'Producto 2',
                description: 'Descripcion 2',
                price: 200,
                stock: 20,
                code: 'P2',
            });
            productManager.deleteProduct(1);
            expect(productManager.getProducts()).toEqual([
                {
                    id: 2,
                    title: 'Producto 2',
                    description: 'Descripcion 2',
                    price: 200,
                    stock: 20,
                    code: 'P2',
                },
            ]);
            expect(JSON.parse(fs.readFileSync(path.join(__dirname, '../src/db/products.json'), 'utf-8'))).toMatchObject(
                [
                    {
                        id: 2,
                        title: 'Producto 2',
                        description: 'Descripcion 2',
                        price: 200,
                        stock: 20,
                        code: 'P2',
                    },
                ]
            );
        });
    });
});

describe('Express', () => {
    const { app, productManager } = require('../src/app');
    const supertest = require('supertest');

    describe('Exportacion', () => {
        it('Debe ser una instancia de express', () => {
            expect(app.request).toBeDefined();
        });
    });

    describe('GET /', () => {
        it('Debe devolver el mensaje "Bienvenidos a la pagina principal"', async () => {
            const response = await supertest(app).get('/');
            expect(response.status).toBe(200);
            expect(response.text).toBe('Bienvenidos a la pagina principal');
        });
    });

    describe('GET /products', () => {
        it('Debe devolver todos los productos almacenados en el archivo products.json', async () => {
            if (fs.existsSync(path.join(__dirname, '../src/db/products.json'))) {
                fs.unlinkSync(path.join(__dirname, '../src/db/products.json'));
            }
            productManager.addProduct({
                id: 1,
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            productManager.addProduct({
                id: 2,
                title: 'Producto 2',

                description: 'Descripcion 2',
                price: 200,
                stock: 20,
                code: 'P2',
            });
            productManager.addProduct({
                id: 3,
                title: 'Producto 3',

                description: 'Descripcion 3',
                price: 300,
                stock: 30,
                code: 'P3',
            });
            productManager.addProduct({
                id: 4,
                title: 'Producto 4',

                description: 'Descripcion 4',
                price: 300,
                stock: 30,
                code: 'P4',
            });
            const response = await supertest(app).get('/products');
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject([
                {
                    id: 1,
                    title: 'Producto 1',
                    description: 'Descripcion 1',
                    price: 100,
                    stock: 10,
                    code: 'P1',
                },
                {
                    id: 2,
                    title: 'Producto 2',
                    description: 'Descripcion 2',
                    price: 200,
                    stock: 20,
                    code: 'P2',
                },
                {
                    id: 3,
                    title: 'Producto 3',
                    description: 'Descripcion 3',
                    price: 300,
                    stock: 30,
                    code: 'P3',
                },
                {
                    id: 4,
                    title: 'Producto 4',
                    description: 'Descripcion 4',
                    price: 300,
                    stock: 30,
                    code: 'P4',
                },
            ]);
        });
    });

    describe('GET /randomProduct', () => {
        it('Debe devolver un producto aleatorio de los productos almacenados en el archivo products.json', async () => {
            if (fs.existsSync(path.join(__dirname, '../src/db/products.json'))) {
                fs.unlinkSync(path.join(__dirname, '../src/db/products.json'));
            }
            productManager.addProduct({
                id: 1,
                title: 'Producto 1',
                description: 'Descripcion 1',
                price: 100,
                stock: 10,
                code: 'P1',
            });
            productManager.addProduct({
                id: 2,
                title: 'Producto 2',

                description: 'Descripcion 2',
                price: 200,
                stock: 20,
                code: 'P2',
            });
            productManager.addProduct({
                id: 3,
                title: 'Producto 3',

                description: 'Descripcion 3',
                price: 300,
                stock: 30,
                code: 'P3',
            });
            productManager.addProduct({
                id: 4,
                title: 'Producto 4',

                description: 'Descripcion 4',
                price: 300,
                stock: 30,
                code: 'P4',
            });
            const response = await supertest(app).get('/randomProduct');
            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                id: expect.any(Number),
                title: expect.any(String),
                description: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number),
                code: expect.any(String),
            });
        });
    });
    
});

