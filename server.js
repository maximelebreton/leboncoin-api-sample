const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file to use leboncoin api
const api = require('./search');

const accessControlAllowOrigin = 'http://localhost:4200';

// Setup CORS parameters
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', accessControlAllowOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    next();
});

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.send('toto');
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`LEBONCOIN-API running on localhost:${port}`));