'use strict';

const app = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(app.server);

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
    let newproductsData = {

      category : 'electronics',
      name : 'phone',
      display_name : 'apple phone',
      description : ' apple s10',
    };

    let response = await mockRequest.put('/products/1').send(newproductsData);

    expect(JSON.stringify(response.body)).toBe(
      JSON.stringify({ category: 'electronics', name: 'phone', display_name: 'applephone', description: 'apple s10', id: 1 }),
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
