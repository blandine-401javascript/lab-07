'use strict';

// 404 is an error when client request something the server can not find

const notFound = (req, res, next) => {
  res.send(404);
  res.end();

};

module.exports= notFound;
