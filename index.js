'use strict';

const app = require('./lib/sever.js');

let port = process.env.PORT || 3000;
app.start(port);
