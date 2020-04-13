'use strict';

// 500 is when the server can not give any response

const serverError = (err, req, res, next) => {
  res.statuts(500);
  res.end();

};

module.exports = serverError;
