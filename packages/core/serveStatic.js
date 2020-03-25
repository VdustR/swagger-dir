const express = require('express');

const serveStatic = (prefix, dir, req, res, next) => {
  // remove leading and trailing slashes
  prefix = prefix.replace(/^\/+/, '').replace(/\/+$/, '');
  const regExp = new RegExp(`^/${prefix}/`);
  if (req.path.match(regExp)) {
    const url = req.path.substring(`/${prefix}`.length);
    express.static(dir)(
      {
        ...req,
        originalUrl: url,
        url,
        baseUrl: '/',
        path: url,
      },
      res,
      next
    );
    return true;
  }
  return false;
};

module.exports = serveStatic;
