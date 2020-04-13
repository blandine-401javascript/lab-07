'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

// products test

describe('products routes work', () => {
  it('can get productss', async () => {
    let response = await mockRequest.get('/products');

    expect(JSON.stringify(response.body)).toBe(
      JSON.stringify([
        {
          id: 1,
          category : 'furniture',
          name : 'bed',
          display_name : '',
          description : 'pillow top bed',
        },
        {
          id: 2,
          category : 'electronics',
          name : 'phone',
          display_name : 'samsung phone',
          description : 'samsung s10',
        },
      ]),
    );

    expect(response.status).toBe(200);
  });

  it('can update a products', async () => {
    let newProductsData = {

      category : 'electronics',
      name : 'phone',
      display_name : 'applephone',
      description : 'apple s10',

    };

    let response = await mockRequest.put('/products/2').send(newProductsData);

    expect(JSON.stringify(response.body)).toBe(
      JSON.stringify({ category: 'electronics', name: 'phone', display_name: 'applephone', description: 'apple s10', id: '2' }),
    );

    expect(response.status).toBe(200);
  });
});

describe('middleware works', () => {
  it('gives 404 error when accessing route that doesn\'t exist', async () => {
    let response = await mockRequest.post('/blah');
    expect(response.status).toBe(404);
  });
});





// categories test

describe('categories routes work', () => {
  it('can get categories', async () => {
    let response = await mockRequest.get('/categories');

    expect(JSON.stringify(response.body)).toBe(
      JSON.stringify([
        {
          id: 1,
          name: 'furniture',
          display_name:'sofa',
          description: 'this furniture is made with leather',
        },
        {
          id : 2,
          name: 'electronics',
          display_name:'laptop',
          description: 'hp envy 360',
        },
      ]),
    );

    expect(response.status).toBe(200);
  });

  it('can update a categories', async () => {
    let newCategoriesData = {

      name: 'furniture',
      display_name:'sofa',
      description: 'this furniture is made with leather',

    };

    let response = await mockRequest.put('/categories/1').send(newCategoriesData);

    expect(JSON.stringify(response.body)).toBe(
      JSON.stringify({
        name: 'furniture',display_name:'sofa',description: 'this furniture is made with leather', id: '1' }),
    );

    expect(response.status).toBe(200);
  });
});

describe('middleware works', () => {
  it('gives 404 error when accessing route that doesn\'t exist', async () => {
    let response = await mockRequest.post('/blah');
    expect(response.status).toBe(404);
  });
});



