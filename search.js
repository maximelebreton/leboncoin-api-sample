const express = require('express');
const router = express.Router();

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == 'object' ? err.message : err;
  res.status(501).json(response);
};

// Api
router.get('/leboncoin', (req, res) => {

  const http = require("https");

  const options = {
    "method": "POST",
    "hostname": "api.leboncoin.fr",
    "port": null,
    "path": "/finder/search",
    "headers": {
      "origin": "https://www.leboncoin.fr",
      "api_key": "ba0c2dad52b3ec",
      "content-type": "text/plain;charset=UTF-8",
      "accept": "*/*",
      "referer": "https://www.leboncoin.fr/annonces/offres/ile_de_france/",
    }
  };

  req = http.request(options, function (resp) {
    let chunks = [];

    resp.on("data", function (chunk) {
      chunks.push(chunk);      
    });

    resp.on("end", function () {
      const body = Buffer.concat(chunks);
      response.data = body.toString();
      res.json(response);
    });
  });

  req.write("{\"limit\":1,\"limit_alu\":3,\"filters\":{\"category\":{\"id\":\"2\"},\"enums\":{\"ad_type\":[\"offer\"]},\"location\":{\"region\":\"12\"},\"keywords\":{},\"ranges\":{}}}");
  req.end();
  
});

module.exports = router;