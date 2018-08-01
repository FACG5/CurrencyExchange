const fs = require("fs");
const path = require("path");
const request = require('request');



function handelHomePage(req, res) {
  res.writeHead(200, {
    "content-type": "text/html"
  });
  fs.readFile(path.join(__dirname, "..", "public", "index.html"), function(
    err,
    file
  ) {
    if (err) {
      console.log(err);
    } else {
      res.end(file);
    }
  });
}

function serverStaticFile(req, res) {
  var endponit = req.url;
  var extention = endponit.split(".")[1];
  var contenttype = {
    html: "text/html",
    css: "text/css",
    js: "application/javascript",
    jpg: "image/jpg",
    png: "image/png",
    json: "application/json",
    jpeg: "image/jpg"
  };
  res.writeHead(200, {
    "content-type": contenttype[extention]
  });
  fs.readFile(path.join(__dirname, "..", endponit), function(err, file) {
    if (err) {
      console.log(err);
    } else {
      res.end(file);
    }
  });
}

function handelError(res) {
  fs.readFile(path.join(__dirname, "..", "public", 'fourofour.html'), function(err, file) {
    if (err) {
      console.error(err);
    } else {

      res.writeHead(404, {
        "content-type": "text/html"
      });
      res.end(file);
    }
  });
}



function handelApi(req, res) {
  var udata = "";
  req.on("data", function(chunk) {
    udata += chunk;
  });

  req.on("end", function() {
    res.writeHead(200, {
      "content-type": "application/json"
    });
    const parsedData = JSON.parse(udata);


    var val = parsedData.val;

    var num = parsedData.num;

    findCurrency(val, num, res)
  });
}





function findCurrency(val, num, res) {

  var url = "https://api.coindesk.com/v1/bpi/currentprice/" + val;
  request.get(url, function(err, obj) {
    if (err) {
      console.error(err);
    } else {


      var final = JSON.parse(obj.body).bpi[val].rate_float * num;
      var string= JSON.stringify(final);
      res.end(string);


    }

  })
}

module.exports = {
  handelApi,
  serverStaticFile,
  handelHomePage,
  handelError
};
