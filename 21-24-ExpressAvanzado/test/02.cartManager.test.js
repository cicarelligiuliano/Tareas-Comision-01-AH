const fs = require('fs');
const path = require('path');

const CartManager = require('../src/managers/CartManager');

describe('CartManager', () => {
    let cartManager;

    let cartPath = path.join(__dirname, '../src/db/cart.json');
    beforeEach(() => {
        if (fs.existsSync(cartPath)) {
            fs.unlinkSync(cartPath);
        }
        cartManager = new CartManager('cart.json');
    });
    afterEach(() => {
        if (fs.existsSync(cartPath)) {
            fs.unlinkSync(cartPath);
        }
    });

    describe('Constructor', () => {
        it('La instancia de la clase debe tener la propiedad path que se enviara como parametro', () => {
            expect(cartManager).toHaveProperty('path', 'cart.json');
        });
        it('La intancia de la clase debe tener la propiedad products que debe ser un array vacio', () => {
            expect(cartManager).toHaveProperty('carts', []);
        });
        it('La instancia de la clase debe tener la propiedad lastId que debe ser 0', () => {
            expect(cartManager).toHaveProperty('lastId', 0);
        });
    });

    describe('initialize', () => {
        it('Debe existir el metodo initialize', () => {
            expect(cartManager.initialize).toBeDefined();
        });
        it('Debe llamarse el metodo initialize en el constructor', () => {
            const spy = jest.spyOn(CartManager.prototype, 'initialize');
            cartManager = new CartManager('cart.json');
            expect(spy).toHaveBeenCalled();

            spy.mockRestore();
        });

        it('De no existir el archivo debe crearlo y guardar un array vacio en la variable products', () => {
            cartManager.initialize();
            expect(fs.existsSync(cartPath)).toBeTruthy();
        });
        it('De existir el archivo debe leerlo y guardar el contenido en la variable carts', () => {
            fs.writeFileSync(cartPath, JSON.stringify([{ id: 1, products: ['test'] }]));
            cartManager.initialize();
            expect(cartManager.carts).toEqual([{ id: 1, products: ['test'] }]);
        });
        it('De existir el archivo debe setear el atributo lastId con el ultimo id del archivo', () => {
            fs.writeFileSync(
                cartPath,
                JSON.stringify([
                    { id: 1, products: ['test'] },
                    { id: 2, products: ['test'] },
                ])
            );
            cartManager.initialize();
            expect(cartManager.lastId).toBe(2);
        });
    });

    describe('save', () => {
        it('Debe existir el metodo save', () => {
            expect(cartManager.save).toBeDefined();
        });
        it('Debe guardar en el archivo el contenido de la variable carts', () => {
            cartManager.carts = [{ id: 1, products: ['test'] }];
            cartManager.save();
            expect(JSON.parse(fs.readFileSync(cartPath))).toEqual([{ id: 1, products: ['test'] }]);
        });
    });

    describe('s', () => {
        it('Debe existir el metodo getCarts', () => {
            expect(cartManager.getCarts).toBeDefined();
        });
        it('Debe devolver el contenido de la variable carts', () => {
            cartManager.carts = [{ id: 1, products: ['test'] }];
            expect(cartManager.getCarts()).toEqual([{ id: 1, products: ['test'] }]);
        });
    });

    describe('createCart', () => {
        it('Debe existir el metodo createCart', () => {
            expect(cartManager.createCart).toBeDefined();
        });
        it('Debe agregar un nuevo carrito a la variable carts', () => {
            cartManager.createCart();
            expect(cartManager.carts).toEqual([{ id: 1, products: [] }]);
        });
        it('Debe devolver el carrito agregado', () => {
            expect(cartManager.createCart()).toMatchObject({ id: 1, products: [] });
        });
        it('Debe agregar un nuevo carrito con el id correcto', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.carts).toEqual([
                { id: 1, products: [] },
                { id: 2, products: [] },
                { id: 3, products: [] },
            ]);
        });
        it('Debe guardar los carritos en el archivo', () => {
            cartManager.createCart();
            expect(JSON.parse(fs.readFileSync(cartPath))).toEqual([{ id: 1, products: [] }]);
        });
    });

    describe('getCartById', () => {
        it('Debe existir el metodo getCartById', () => {
            expect(cartManager.getCartById).toBeDefined();
        });

        it('Debe devolver el carrito con el id enviado por parametro', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.getCartById(2)).toEqual({ id: 2, products: [] });
        });
        it('Debe devolver "Not Found" si no existe el carrito con el id enviado por parametro', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.getCartById(4)).toBe('Not Found');
        });
    });

    describe('addProductToCart', () => {
        it('Debe existir el metodo addProductToCart', () => {
            expect(cartManager.addProductToCart).toBeDefined();
        });
        it('Debe agregar el producto al carrito', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            expect(cartManager.getCartById(1).products).toEqual([{ id: 1, quantity: 1 }]);
        });
        it('Debe devolver el carrito con el producto agregado', () => {
            cartManager.createCart();
            expect(cartManager.addProductToCart(1, { id: 1, title: 'test' })).toEqual({
                id: 1,
                products: [{ id: 1, quantity: 1 }],
            });
        });
        it('Debe devolver "Not Found" si no existe el carrito con el id enviado por parametro', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.addProductToCart(4, { id: 1, title: 'test' })).toBe('Not Found');
        });
        it('Debe guardar los carritos en el archivo', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            expect(JSON.parse(fs.readFileSync(cartPath))).toEqual([{ id: 1, products: [{ id: 1, quantity: 1 }] }]);
        });
        it('Debe aumentar la cantidad del producto si ya existe en el carrito', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            expect(cartManager.getCartById(1).products).toEqual([
                { id: 1, quantity: 4 },
                { id: 2, quantity: 1 },
            ]);
        });
        it('Debe actualizar el archivo con el carrito actualizado', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            expect(JSON.parse(fs.readFileSync(cartPath))).toEqual([
                {
                    id: 1,
                    products: [
                        { id: 1, quantity: 4 },
                        { id: 2, quantity: 1 },
                    ],
                },
            ]);
        });
    });

    describe('removeProductFromCart', () => {
        it('Debe existir el metodo removeProductFromCart', () => {
            expect(cartManager.removeProductFromCart).toBeDefined();
        });
        it('Debe devolver "Not Found" si no existe el carrito con el id enviado por parametro', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.removeProductFromCart(4, 1)).toBe('Not Found');
        });
        it('Debe devolver "Not Found" si no existe el producto con el id enviado por parametro dentro del carrito', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.removeProductFromCart(1, 1)).toBe('Not Found');
        });
        it('Debe eliminar el producto del carrito', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });

            cartManager.removeProductFromCart(1, 1);

            expect(cartManager.getCartById(1).products).toEqual([{ id: 2, quantity: 1 }]);
        });
        it('Debe devolver el carrito con el producto eliminado', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            expect(cartManager.removeProductFromCart(1, 1)).toEqual({
                id: 1,
                products: [{ id: 2, quantity: 1 }],
            });
        });
        it('De existir mas de un producto con el mismo id, debe eliminar solo uno', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            cartManager.removeProductFromCart(1, 1);
            expect(cartManager.getCartById(1).products).toEqual([
                { id: 1, quantity: 1 },
                { id: 2, quantity: 1 },
            ]);
        });
        it('Debe actualizar el archivo con el carrito actualizado', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            cartManager.removeProductFromCart(1, 1);
            expect(JSON.parse(fs.readFileSync(cartPath))).toEqual([
                {
                    id: 1,
                    products: [
                        { id: 1, quantity: 1 },
                        { id: 2, quantity: 1 },
                    ],
                },
            ]);
        });
    });

    describe('deleteProductFromCart', () => {
        it('Debe existir el metodo deleteProductFromCart', () => {
            expect(cartManager.deleteProductFromCart).toBeDefined();
        });
        it('Debe devolver "Not Found" si no existe el carrito con el id enviado por parametro', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.deleteProductFromCart(4, 1)).toBe('Not Found');
        });
        it('Debe devolver "Not Found" si no existe el producto con el id enviado por parametro dentro del carrito', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.deleteProductFromCart(1, 1)).toBe('Not Found');
        });
        it('Debe eliminar el producto del carrito', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            cartManager.deleteProductFromCart(1, 1);
            expect(cartManager.getCartById(1).products).toEqual([{ id: 2, quantity: 1 }]);
        });
        it('Debe devolver el carrito con el producto eliminado', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            expect(cartManager.deleteProductFromCart(1, 1)).toEqual({
                id: 1,
                products: [{ id: 2, quantity: 1 }],
            });
        });
        it('De existir mas de un producto con el mismo id, debe eliminar todos', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            cartManager.deleteProductFromCart(1, 1);
            expect(cartManager.getCartById(1).products).toEqual([{ id: 2, quantity: 1 }]);
        });
        it('Debe actualizar el archivo con el carrito actualizado', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            cartManager.deleteProductFromCart(1, 1);
            expect(JSON.parse(fs.readFileSync(cartPath))).toEqual([{ id: 1, products: [{ id: 2, quantity: 1 }] }]);
        });
    });

    describe('clearCart', () => {
        it('Debe existir el metodo clearCart', () => {
            expect(cartManager.clearCart).toBeDefined();
        });
        it('Debe devolver "Not Found" si no existe el carrito con el id enviado por parametro', () => {
            cartManager.createCart();
            cartManager.createCart();
            cartManager.createCart();
            expect(cartManager.clearCart(4)).toBe('Not Found');
        });
        it('Debe eliminar todos los productos del carrito', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            cartManager.addProductToCart(1, { id: 2, title: 'test' });
            cartManager.clearCart(1);
            expect(cartManager.getCartById(1).products).toEqual([]);
        });
        it('Debe devolver el carrito con los productos eliminados', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });
            expect(cartManager.clearCart(1)).toEqual({ id: 1, products: [] });
        });
        it('Debe actualizar el archivo con el carrito actualizado', () => {
            cartManager.createCart();
            cartManager.addProductToCart(1, { id: 1, title: 'test' });

            cartManager.clearCart(1);
            expect(JSON.parse(fs.readFileSync(cartPath))).toEqual([{ id: 1, products: [] }]);
        });
    });
});
