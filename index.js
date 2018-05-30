const express = require('express');
const throng = require('throng');
const request = require('request');

const PORT = process.env.PORT || 3000;
const WORKERS = process.env.WEB_CONCURRENCY || 1;
const LOADER_JS_URL = process.env.LOADER_JS_URL || 'https://www.are.na/loader.js';

const app = express();

const start = () =>
  app
    .get('/loader.js', (req, res, next) => {
      const stream = request(LOADER_JS_URL).on('error', next);
      req.pipe(stream).pipe(res);
    })
    .listen(PORT, () =>
      console.log(`Listening on port ${PORT}`));

throng({
  workers: WORKERS,
  lifetime: Infinity,
  start: start,
});
