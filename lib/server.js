'use strict';

/*This is your main server file, which defines all the server functionality. This file should export a server object and a start function. It should also assign all the middleware this server is using (404, 500, timestamp, logging), defined in lib/middleware. Your server should define all the routes for CRUD operations upon products and categories from db.json.

Note that you do NOT have to modify the db.json file when the CRUD operations are executed. Instead, when your server runs, your server.js file should import the contents of db.json and save that as an object. Then, any CRUD routes can modify or return this in-memory object.

let db = require('../db.json'); */




const express = require('express');

// require db.json to use data;

let data = require('../db.json');

// Define routes
const notFound = require('../lib/middleware/404.js');
const timestamp = require('../lib/middleware/timestamp');
const logger = require('../lib/middleware/logger.js');
const serverError = require ('../lib/middleware/500.js');
const generateSwagger = require('../docs/swagger.js');





const app = express();


app.use(express.json());
app.use(timestamp);
app.use(logger);

const startServer = (port) =>{
  app.listen(port, () => {
    console.log('Never Give Up', port);
  });
};

generateSwagger(app);

// for swagger api

/**
 * This route gives you a standard "Homepage" message
 * @route GET /
 * @param {string} name.query - a name field which adds a welcome message
 * @returns {object} 200 - The HTML to show on the homepage
 */
app.get('/', (req, res, next) => {
  let homeHTML = '<div><h1>Homepage</h1>';

  if (req.query.name)
    homeHTML += '<h3>Welcome ' + req.query.name + '!</h3></div>';
  else homeHTML += '</div>';

  // return res to the client
  res.status(200);
  res.send(homeHTML);
});

app.get('/trow-err', (req, res, next) => {
  next('this is an error');
});



/**
 * This route allows you to create a products
 * @route POST /products
 * @group products
 * @returns {object} 201 - The created object
 * @returns {Error} - If there was an issue creating in the db
 */

app.post('/products', (req, res, next) => {

  // get the objrct from req.body
  let newProducts = req.body;
  console.log('res', req.body);


  // add the id key by setting the id equal to the number of products + 1
  newProducts.id = data.products.length + 1 ;

  // push newproducts to in memory data
  data.products.push(newProducts);



  res.status(201);
  res.send(newProducts);
});


/**
 * This route allows you to get a products
 * @route GET /products
 * @group products
 * @returns {object} 200 - get products

 */


app.get('/products',
  (req, res, next) => {
    console.log('Get products');
    next();
  },
  (req, res, next) => {
    console.log('continuing attempt');
    next();
  },
  (req, res, next) =>{
    res.send(data.products);
    console.log('products', data.products);
  },

);


/**
 * This route allows you to update a products
 * @route PUT /products/{id}
 * @group products
 * @param {Number} id.path - the id of the field you want to update
 * @returns {object} 200 - The updated object
 * @returns {Error} - If there was an issue updating in the db
 */



app.put('/products/:id',
  (req, res, next) => {




    if(req.params.id > data.products.length){
      next();
      return;
    }

    console.log('Should not be here if id >2');

    let modifiedRecord = req.body;
    modifiedRecord.id = req.params.id;

    // replace in database
    data.products[req.params.id -1] = modifiedRecord;
    res.send(modifiedRecord);
  },
  notFound,

);





/**
 * This route allows you to delete a products
 * @route DELETE /products/{id}
 * @group products
 * @param {Number} id.path - the id of the field you want to update
 * @returns {object} 200 - delete products by id

 */

app.delete('/products/:id', (req, res, next) => {
  let products = data.products;
  data.products = products.filter((val) => {
    if(val.id === parseInt(req.params.id)) return false;
    else return true;
  });

  res.send(data.products);
});




// categories



/**
 * This route allows you to create a categories
 * @route POST /categories
 * @group categories
 * @returns {object} 201 - The created object
 * @returns {Error} - If there was an issue creating in the db
 */

app.post('/categories', (req, res, next) => {

  // get the objrct from req.body
  let newCategories = req.body;
  console.log('res', req.body);


  // add the id key by setting the id equal to the number of categories + 1
  newCategories.id = data.categories.length + 1 ;

  // push newcategories to in memory data
  data.categories.push(newCategories);



  res.status(201);
  res.send(newCategories);
});


/**
 * This route allows you to get a categories
 * @route GET /categories
 * @group categories
 * @returns {object} 200 - get categories

 */


app.get('/categories',
  (req, res, next) => {
    console.log('Get categories');
    next();
  },
  (req, res, next) => {
    console.log('continuing attempt');
    next();
  },
  (req, res, next) =>{
    res.send(data.categories);
    console.log('categories', data.categories);
  },

);


/**
 * This route allows you to update a categories
 * @route PUT /categories/{id}
 * @group categories
 * @param {Number} id.path - the id of the field you want to update
 * @returns {object} 200 - The updated object
 * @returns {Error} - If there was an issue updating in the db
 */



app.put('/categories/:id',
  (req, res, next) => {




    if(req.params.id > data.categories.length){
      next();
      return;
    }

    console.log('Should not be here if id >2');

    let modifiedRecord = req.body;
    modifiedRecord.id = req.params.id;

    // replace in database
    data.categories[req.params.id -1] = modifiedRecord;
    res.send(modifiedRecord);
  },
  notFound,

);





/**
 * This route allows you to delete a categories
 * @route DELETE /categories/{id}
 * @group categories
 * @param {Number} id.path - the id of the field you want to update
 * @returns {object} 200 - delete categories by id

 */

app.delete('/categories/:id', (req, res, next) => {
  let categories = data.categories;
  data.categories = categories.filter((val) => {
    if(val.id === parseInt(req.params.id)) return false;
    else return true;
  });

  res.send(data.categories);
});




app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start:startServer,

};

