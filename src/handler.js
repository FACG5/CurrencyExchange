const fs = require("fs");
const path = require("path");
const request = require('request');
// const querystring = require("querystring");


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
  // console.log('hhhh');

  var udata = "";
  req.on("data", function(chunk) {
    udata += chunk;
  });

  req.on("end", function() {
    console.log(udata);
    res.writeHead(200, {
      "content-type": "application/json"
    });
    const parsedData = JSON.parse(udata);
    // console.log(parsedData);

    var val=parsedData.val;
    // console.log("1111",val);
    var num=parsedData.num;
    //select your val & num from data???
    findCurrency(val,num,res)
  });
}

// var final = function processData(val, num) {
//   console.log(val,"22222");
//   var currnvalue = findCurrency(val);
// }



function findCurrency(val,num,res){
  // console.log("dddd",val);
  var url ="https://api.coindesk.com/v1/bpi/currentprice/"+val;
  request.get(url,function(err,obj){
    if (err) {
      console.error(err);
    }else {
      // console.log(typeof obj.body);
      // console.log(JSON.parse(obj.body).bpi[val],'HANNNNNEEEEEN');

      var final = JSON.parse(obj.body).bpi[val].rate_float * num;
      // console.log(JSON.parse(obj.body).bpi[val].rate_float,"final result");
      res.end(final+"");

      // console.log(obj);

     // return  obj.bpi[val].rate_float;//that is the currency value 0000$ for Bitcoin

    }

  })
}

module.exports = {
  handelApi,
  serverStaticFile,
  handelHomePage,
  handelError
};
