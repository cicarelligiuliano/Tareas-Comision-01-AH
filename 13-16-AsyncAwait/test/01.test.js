const { getPosts, getComments, getCommentsById, getPostsLimited, getPostsPaginated } = require('../homework');

describe('Fetch', () => {
    describe('getPosts', () => {
        it('Debe devolver un array de 100 elementos', async () => {
            const posts = await getPosts();
            expect(posts.length).toBe(100);
        });
        it('Debe devolver un array de objetos con las propiedades correctas', async () => {
            const posts = await getPosts();
            expect(posts[0]).toMatchObject({
                userId: expect.any(Number),
                id: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String),
            });
        });
    });

    describe('getCommentsById', () => {
        it('Debe devolver un objeto con las propiedades correctas', async () => {
            const comment = await getCommentsById(1);
            expect(comment).toMatchObject({
                postId: expect.any(Number),
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                body: expect.any(String),
            });
        });
        it('Debe devolver el comentario con id solicitado', async () => {
            const comment = await getCommentsById(1);
            expect(comment.id).toBe(1);
        });
        it('Debe devolver un mensaje de error si el id no existe', async () => {
            const comment = await getCommentsById(501);
            expect(comment).toBe('El id enviado no existe');
        });
    });

    describe('getComments', () => {
        it('Debe devolver un array de 10 elementos si se envia un limit de 10', async () => {
            const comments = await getComments(10);
            expect(comments.length).toBe(10);
        });
        it('Debe devolver un array de 20 elementos si no se envia el parametro limit', async () => {
            const comments = await getComments();
            expect(comments.length).toBe(20);
        });
        it('Debe devolver un array de objetos con las propiedades correctas', async () => {
            const comments = await getComments();
            expect(comments[0]).toMatchObject({
                postId: expect.any(Number),
                id: expect.any(Number),
                name: expect.any(String),
                email: expect.any(String),
                body: expect.any(String),
            });
        });
    });

    describe('getPostsLimited', () => {
        it('Debe devolver un array de 10 elementos', async () => {
            const posts = await getPostsLimited(0, 10);
            expect(posts.length).toBe(10);
        });
        it('Debe devolver un array de objetos con las propiedades correctas', async () => {
            const posts = await getPostsLimited(0, 10);
            expect(posts[0]).toMatchObject({
                userId: expect.any(Number),
                id: expect.any(Number),
                title: expect.any(String),
                body: expect.any(String),
            });
        });
        it('Debe devolver un array de 20 elementos si no se envia el parametro elements', async () => {
            const posts = await getPostsLimited(0);
            expect(posts.length).toBe(20);
        });
    });

    describe('getPostsPaginated', () => {
        it('Debe devolver un array de 10 elementos', async () => {
            const posts = await getPostsPaginated(1, 10);
            expect(posts.posts.length).toBe(10);
        });
        it('Debe devolver un objeto con las propiedades correctas', async () => {
            const posts = await getPostsPaginated(1, 5);
            expect(posts).toMatchObject({
                posts: [
                    {
                        userId: 1,
                        id: 1,
                        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                        body:
                            'quia et suscipit\n' +
                            'suscipit recusandae consequuntur expedita et cum\n' +
                            'reprehenderit molestiae ut ut quas totam\n' +
                            'nostrum rerum est autem sunt rem eveniet architecto',
                    },
                    {
                        userId: 1,
                        id: 2,
                        title: 'qui est esse',
                        body:
                            'est rerum tempore vitae\n' +
                            'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
                            'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
                            'qui aperiam non debitis possimus qui neque nisi nulla',
                    },
                    {
                        userId: 1,
                        id: 3,
                        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
                        body:
                            'et iusto sed quo iure\n' +
                            'voluptatem occaecati omnis eligendi aut ad\n' +
                            'voluptatem doloribus vel accusantium quis pariatur\n' +
                            'molestiae porro eius odio et labore et velit aut',
                    },
                    {
                        userId: 1,
                        id: 4,
                        title: 'eum et est occaecati',
                        body:
                            'ullam et saepe reiciendis voluptatem adipisci\n' +
                            'sit amet autem assumenda provident rerum culpa\n' +
                            'quis hic commodi nesciunt rem tenetur doloremque ipsam iure\n' +
                            'quis sunt voluptatem rerum illo velit',
                    },
                    {
                        userId: 1,
                        id: 5,
                        title: 'nesciunt quas odio',
                        body:
                            'repudiandae veniam quaerat sunt sed\n' +
                            'alias aut fugiat sit autem sed est\n' +
                            'voluptatem omnis possimus esse voluptatibus quis\n' +
                            'est aut tenetur dolor neque',
                    },
                ],
                next: expect.any(Object),
                page: expect.any(Number),
                lastPage: expect.any(Number),
            });
        });
        it('Debe devolver un objeto con las propiedades correctas si no se envia el parametro page', async () => {
            const posts = await getPostsPaginated();
            expect(posts).toMatchObject({
                posts: [
                    {
                        userId: 1,
                        id: 1,
                        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
                        body:
                            'quia et suscipit\n' +
                            'suscipit recusandae consequuntur expedita et cum\n' +
                            'reprehenderit molestiae ut ut quas totam\n' +
                            'nostrum rerum est autem sunt rem eveniet architecto',
                    },
                    {
                        userId: 1,
                        id: 2,
                        title: 'qui est esse',
                        body:
                            'est rerum tempore vitae\n' +
                            'sequi sint nihil reprehenderit dolor beatae ea dolores neque\n' +
                            'fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\n' +
                            'qui aperiam non debitis possimus qui neque nisi nulla',
                    },
                    {
                        userId: 1,
                        id: 3,
                        title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
                        body:
                            'et iusto sed quo iure\n' +
                            'voluptatem occaecati omnis eligendi aut ad\n' +
                            'voluptatem doloribus vel accusantium quis pariatur\n' +
                            'molestiae porro eius odio et labore et velit aut',
                    },
                    {
                        userId: 1,
                        id: 4,
                        title: 'eum et est occaecati',
                        body:
                            'ullam et saepe reiciendis voluptatem adipisci\n' +
                            'sit amet autem assumenda provident rerum culpa\n' +
                            'quis hic commodi nesciunt rem tenetur doloremque ipsam iure\n' +
                            'quis sunt voluptatem rerum illo velit',
                    },
                    {
                        userId: 1,
                        id: 5,
                        title: 'nesciunt quas odio',
                        body:
                            'repudiandae veniam quaerat sunt sed\n' +
                            'alias aut fugiat sit autem sed est\n' +
                            'voluptatem omnis possimus esse voluptatibus quis\n' +
                            'est aut tenetur dolor neque',
                    },
                    {
                        userId: 1,
                        id: 6,
                        title: 'dolorem eum magni eos aperiam quia',
                        body:
                            'ut aspernatur corporis harum nihil quis provident sequi\n' +
                            'mollitia nobis aliquid molestiae\n' +
                            'perspiciatis et ea nemo ab reprehenderit accusantium quas\n' +
                            'voluptate dolores velit et doloremque molestiae',
                    },
                    {
                        userId: 1,
                        id: 7,
                        title: 'magnam facilis autem',
                        body:
                            'dolore placeat quibusdam ea quo vitae\n' +
                            'magni quis enim qui quis quo nemo aut saepe\n' +
                            'quidem repellat excepturi ut quia\n' +
                            'sunt ut sequi eos ea sed quas',
                    },
                    {
                        userId: 1,
                        id: 8,
                        title: 'dolorem dolore est ipsam',
                        body:
                            'dignissimos aperiam dolorem qui eum\n' +
                            'facilis quibusdam animi sint suscipit qui sint possimus cum\n' +
                            'quaerat magni maiores excepturi\n' +
                            'ipsam ut commodi dolor voluptatum modi aut vitae',
                    },
                    {
                        userId: 1,
                        id: 9,
                        title: 'nesciunt iure omnis dolorem tempora et accusantium',
                        body:
                            'consectetur animi nesciunt iure dolore\n' +
                            'enim quia ad\n' +
                            'veniam autem ut quam aut nobis\n' +
                            'et est aut quod aut provident voluptas autem voluptas',
                    },
                    {
                        userId: 1,
                        id: 10,
                        title: 'optio molestias id quia eum',
                        body:
                            'quo et expedita modi cum officia vel magni\n' +
                            'doloribus qui repudiandae\n' +
                            'vero nisi sit\n' +
                            'quos veniam quod sed accusamus veritatis error',
                    },
                    {
                        userId: 2,
                        id: 11,
                        title: 'et ea vero quia laudantium autem',
                        body:
                            'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\n' +
                            'accusamus in eum beatae sit\n' +
                            'vel qui neque voluptates ut commodi qui incidunt\n' +
                            'ut animi commodi',
                    },
                    {
                        userId: 2,
                        id: 12,
                        title: 'in quibusdam tempore odit est dolorem',
                        body:
                            'itaque id aut magnam\n' +
                            'praesentium quia et ea odit et ea voluptas et\n' +
                            'sapiente quia nihil amet occaecati quia id voluptatem\n' +
                            'incidunt ea est distinctio odio',
                    },
                    {
                        userId: 2,
                        id: 13,
                        title: 'dolorum ut in voluptas mollitia et saepe quo animi',
                        body:
                            'aut dicta possimus sint mollitia voluptas commodi quo doloremque\n' +
                            'iste corrupti reiciendis voluptatem eius rerum\n' +
                            'sit cumque quod eligendi laborum minima\n' +
                            'perferendis recusandae assumenda consectetur porro architecto ipsum ipsam',
                    },
                    {
                        userId: 2,
                        id: 14,
                        title: 'voluptatem eligendi optio',
                        body:
                            'fuga et accusamus dolorum perferendis illo voluptas\n' +
                            'non doloremque neque facere\n' +
                            'ad qui dolorum molestiae beatae\n' +
                            'sed aut voluptas totam sit illum',
                    },
                    {
                        userId: 2,
                        id: 15,
                        title: 'eveniet quod temporibus',
                        body:
                            'reprehenderit quos placeat\n' +
                            'velit minima officia dolores impedit repudiandae molestiae nam\n' +
                            'voluptas recusandae quis delectus\n' +
                            'officiis harum fugiat vitae',
                    },
                    {
                        userId: 2,
                        id: 16,
                        title: 'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
                        body:
                            'suscipit nam nisi quo aperiam aut\n' +
                            'asperiores eos fugit maiores voluptatibus quia\n' +
                            'voluptatem quis ullam qui in alias quia est\n' +
                            'consequatur magni mollitia accusamus ea nisi voluptate dicta',
                    },
                    {
                        userId: 2,
                        id: 17,
                        title: 'fugit voluptas sed molestias voluptatem provident',
                        body:
                            'eos voluptas et aut odit natus earum\n' +
                            'aspernatur fuga molestiae ullam\n' +
                            'deserunt ratione qui eos\n' +
                            'qui nihil ratione nemo velit ut aut id quo',
                    },
                    {
                        userId: 2,
                        id: 18,
                        title: 'voluptate et itaque vero tempora molestiae',
                        body:
                            'eveniet quo quis\n' +
                            'laborum totam consequatur non dolor\n' +
                            'ut et est repudiandae\n' +
                            'est voluptatem vel debitis et magnam',
                    },
                    {
                        userId: 2,
                        id: 19,
                        title: 'adipisci placeat illum aut reiciendis qui',
                        body:
                            'illum quis cupiditate provident sit magnam\n' +
                            'ea sed aut omnis\n' +
                            'veniam maiores ullam consequatur atque\n' +
                            'adipisci quo iste expedita sit quos voluptas',
                    },
                    {
                        userId: 2,
                        id: 20,
                        title: 'doloribus ad provident suscipit at',
                        body:
                            'qui consequuntur ducimus possimus quisquam amet similique\n' +
                            'suscipit porro ipsam amet\n' +
                            'eos veritatis officiis exercitationem vel fugit aut necessitatibus totam\n' +
                            'omnis rerum consequatur expedita quidem cumque explicabo',
                    },
                ],
                page: expect.any(Number),
                lastPage: expect.any(Number),
            });
        });
        it('Debe devolver un objeto con las propiedades correctas si no se envia el parametro elements', async () => {
            const posts = await getPostsPaginated(3);
            expect(posts).toMatchObject({
                posts: [
                    {
                        userId: 5,
                        id: 41,
                        title: 'non est facere',
                        body:
                            'molestias id nostrum\n' +
                            'excepturi molestiae dolore omnis repellendus quaerat saepe\n' +
                            'consectetur iste quaerat tenetur asperiores accusamus ex ut\n' +
                            'nam quidem est ducimus sunt debitis saepe',
                    },
                    {
                        userId: 5,
                        id: 42,
                        title: 'commodi ullam sint et excepturi error explicabo praesentium voluptas',
                        body:
                            'odio fugit voluptatum ducimus earum autem est incidunt voluptatem\n' +
                            'odit reiciendis aliquam sunt sequi nulla dolorem\n' +
                            'non facere repellendus voluptates quia\n' +
                            'ratione harum vitae ut',
                    },
                    {
                        userId: 5,
                        id: 43,
                        title: 'eligendi iste nostrum consequuntur adipisci praesentium sit beatae perferendis',
                        body:
                            'similique fugit est\n' +
                            'illum et dolorum harum et voluptate eaque quidem\n' +
                            'exercitationem quos nam commodi possimus cum odio nihil nulla\n' +
                            'dolorum exercitationem magnam ex et a et distinctio debitis',
                    },
                    {
                        userId: 5,
                        id: 44,
                        title: 'optio dolor molestias sit',
                        body:
                            'temporibus est consectetur dolore\n' +
                            'et libero debitis vel velit laboriosam quia\n' +
                            'ipsum quibusdam qui itaque fuga rem aut\n' +
                            'ea et iure quam sed maxime ut distinctio quae',
                    },
                    {
                        userId: 5,
                        id: 45,
                        title: 'ut numquam possimus omnis eius suscipit laudantium iure',
                        body:
                            'est natus reiciendis nihil possimus aut provident\n' +
                            'ex et dolor\n' +
                            'repellat pariatur est\n' +
                            'nobis rerum repellendus dolorem autem',
                    },
                    {
                        userId: 5,
                        id: 46,
                        title: 'aut quo modi neque nostrum ducimus',
                        body:
                            'voluptatem quisquam iste\n' +
                            'voluptatibus natus officiis facilis dolorem\n' +
                            'quis quas ipsam\n' +
                            'vel et voluptatum in aliquid',
                    },
                    {
                        userId: 5,
                        id: 47,
                        title: 'quibusdam cumque rem aut deserunt',
                        body:
                            'voluptatem assumenda ut qui ut cupiditate aut impedit veniam\n' +
                            'occaecati nemo illum voluptatem laudantium\n' +
                            'molestiae beatae rerum ea iure soluta nostrum\n' +
                            'eligendi et voluptate',
                    },
                    {
                        userId: 5,
                        id: 48,
                        title: 'ut voluptatem illum ea doloribus itaque eos',
                        body:
                            'voluptates quo voluptatem facilis iure occaecati\n' +
                            'vel assumenda rerum officia et\n' +
                            'illum perspiciatis ab deleniti\n' +
                            'laudantium repellat ad ut et autem reprehenderit',
                    },
                    {
                        userId: 5,
                        id: 49,
                        title: 'laborum non sunt aut ut assumenda perspiciatis voluptas',
                        body:
                            'inventore ab sint\n' +
                            'natus fugit id nulla sequi architecto nihil quaerat\n' +
                            'eos tenetur in in eum veritatis non\n' +
                            'quibusdam officiis aspernatur cumque aut commodi aut',
                    },
                    {
                        userId: 5,
                        id: 50,
                        title: 'repellendus qui recusandae incidunt voluptates tenetur qui omnis exercitationem',
                        body:
                            'error suscipit maxime adipisci consequuntur recusandae\n' +
                            'voluptas eligendi et est et voluptates\n' +
                            'quia distinctio ab amet quaerat molestiae et vitae\n' +
                            'adipisci impedit sequi nesciunt quis consectetur',
                    },
                    {
                        userId: 6,
                        id: 51,
                        title: 'soluta aliquam aperiam consequatur illo quis voluptas',
                        body:
                            'sunt dolores aut doloribus\n' +
                            'dolore doloribus voluptates tempora et\n' +
                            'doloremque et quo\n' +
                            'cum asperiores sit consectetur dolorem',
                    },
                    {
                        userId: 6,
                        id: 52,
                        title: 'qui enim et consequuntur quia animi quis voluptate quibusdam',
                        body:
                            'iusto est quibusdam fuga quas quaerat molestias\n' +
                            'a enim ut sit accusamus enim\n' +
                            'temporibus iusto accusantium provident architecto\n' +
                            'soluta esse reprehenderit qui laborum',
                    },
                    {
                        userId: 6,
                        id: 53,
                        title: 'ut quo aut ducimus alias',
                        body:
                            'minima harum praesentium eum rerum illo dolore\n' +
                            'quasi exercitationem rerum nam\n' +
                            'porro quis neque quo\n' +
                            'consequatur minus dolor quidem veritatis sunt non explicabo similique',
                    },
                    {
                        userId: 6,
                        id: 54,
                        title: 'sit asperiores ipsam eveniet odio non quia',
                        body:
                            'totam corporis dignissimos\n' +
                            'vitae dolorem ut occaecati accusamus\n' +
                            'ex velit deserunt\n' +
                            'et exercitationem vero incidunt corrupti mollitia',
                    },
                    {
                        userId: 6,
                        id: 55,
                        title: 'sit vel voluptatem et non libero',
                        body:
                            'debitis excepturi ea perferendis harum libero optio\n' +
                            'eos accusamus cum fuga ut sapiente repudiandae\n' +
                            'et ut incidunt omnis molestiae\n' +
                            'nihil ut eum odit',
                    },
                    {
                        userId: 6,
                        id: 56,
                        title: 'qui et at rerum necessitatibus',
                        body:
                            'aut est omnis dolores\n' +
                            'neque rerum quod ea rerum velit pariatur beatae excepturi\n' +
                            'et provident voluptas corrupti\n' +
                            'corporis harum reprehenderit dolores eligendi',
                    },
                    {
                        userId: 6,
                        id: 57,
                        title: 'sed ab est est',
                        body:
                            'at pariatur consequuntur earum quidem\n' +
                            'quo est laudantium soluta voluptatem\n' +
                            'qui ullam et est\n' +
                            'et cum voluptas voluptatum repellat est',
                    },
                    {
                        userId: 6,
                        id: 58,
                        title: 'voluptatum itaque dolores nisi et quasi',
                        body:
                            'veniam voluptatum quae adipisci id\n' +
                            'et id quia eos ad et dolorem\n' +
                            'aliquam quo nisi sunt eos impedit error\n' +
                            'ad similique veniam',
                    },
                    {
                        userId: 6,
                        id: 59,
                        title: 'qui commodi dolor at maiores et quis id accusantium',
                        body:
                            'perspiciatis et quam ea autem temporibus non voluptatibus qui\n' +
                            'beatae a earum officia nesciunt dolores suscipit voluptas et\n' +
                            'animi doloribus cum rerum quas et magni\n' +
                            'et hic ut ut commodi expedita sunt',
                    },
                    {
                        userId: 6,
                        id: 60,
                        title: 'consequatur placeat omnis quisquam quia reprehenderit fugit veritatis facere',
                        body:
                            'asperiores sunt ab assumenda cumque modi velit\n' +
                            'qui esse omnis\n' +
                            'voluptate et fuga perferendis voluptas\n' +
                            'illo ratione amet aut et omnis',
                    },
                ],
                next: expect.any(Object),
                page: expect.any(Number),
                lastPage: expect.any(Number),
            });
        });
        it('Debe devolver un objeto con las propiedades correctas si se envia un page mayor a la cantidad de paginas', async () => {
            const posts = await getPostsPaginated(100);
            expect(posts).toMatchObject({
                posts: [],
                page: expect.any(Number),
                lastPage: expect.any(Number),
            });
        });
        it('El elemento next debe devolver un objeto con las propiedades correctas', async () => {
            const posts = await getPostsPaginated(1, 10);
            expect(posts.next).toMatchObject({
                posts: expect.any(Object),
                next: expect.any(Object),
                page: expect.any(Number),
                lastPage: expect.any(Number),
            });
        });
        it('El elemento next.post debe tener la cantidad de elementos correcta', async () => {
            const posts = await getPostsPaginated(1, 10);
            expect(posts.next.posts.length).toBe(10);
        });
        it('Los elementos de next.post deben ser los correctos', async () => {
            const posts = await getPostsPaginated(1, 10);
            expect(posts.next.posts[0]).toMatchObject({
                userId: 2,
                id: 11,
                title: 'et ea vero quia laudantium autem',
                body:
                    'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\n' +
                    'accusamus in eum beatae sit\n' +
                    'vel qui neque voluptates ut commodi qui incidunt\n' +
                    'ut animi commodi',
            });
        });
        it('El elemento next.page debe tener el valor correcto', async () => {
            const posts = await getPostsPaginated(1, 10);
            expect(posts.next.page).toBe(2);
        });
        it('La propiedad next.next debe devolver un objeto con las propiedades correctas', async () => {
            const posts = await getPostsPaginated(1, 10);
            expect(posts.next.next).toMatchObject({
                posts: expect.any(Object),
                next: expect.any(Object),
                page: expect.any(Number),
                lastPage: expect.any(Number),
            });
        });
        it('La propiedad next.next.posts debe tener la cantidad de elementos correcta', async () => {
            const posts = await getPostsPaginated(1, 10);
            expect(posts.next.next.posts.length).toBe(10);
        });
        it('Los elementos de next.next.post deben ser los correctos', async () => {
            const posts = await getPostsPaginated(4, 10);
            expect(posts.next.next.posts[0]).toMatchObject({
                userId: 6,
                id: 51,
                title: 'soluta aliquam aperiam consequatur illo quis voluptas',
                body:
                    'sunt dolores aut doloribus\n' +
                    'dolore doloribus voluptates tempora et\n' +
                    'doloremque et quo\n' +
                    'cum asperiores sit consectetur dolorem',
            });
        });
    });
});
