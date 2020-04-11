'use strict';

const app = require('./lib/server.js');

let port = process.env.PORT || 3000;
app.start(port);
