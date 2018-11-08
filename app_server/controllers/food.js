var request = require('request');
var apiOptions = {
  server : "http://localhost:3000"
};

var renderHomepage = function(req, res, responseBody){
  var message;
  if (!(responseBody instanceof Array)) {
    message = "API lookup error";
    responseBody = [];
  } else {
    if (!responseBody.length) {
      message = "Nofood info found";
    }
  }
  res.render('index', {
    title: 'MyFridge - All the food info available in your fridge',
    dataFood: responseBody
  });
};

module.exports.homelist = function(req, res){
  var requestOptions, path;
  path = '/api/food';
  requestOptions = {
    url : apiOptions.server + path,
    method : "GET",
    json : {},
  };
  request(
    requestOptions,
    function(err, response, body) {
      var i, data;
      data = body;
      renderHomepage(req, res, data);
    }
  );
};

module.exports.foodCreate = function(req, res){
  var requestOptions, path, foodid, postdata;
  path = "/api/food/";
  postdata = {
    name: req.body.name,
    date: req.body.date,
    expiry: req.body.expiry,
    left_overs: req.body.left_overs,
    quantity: req.body.quantity
  };
  requestOptions = {
    url : apiOptions.server + path,
    method : "POST",
    json : postdata
  };
    request(
      requestOptions,
      function(err, response, body) {
        if (response.statusCode === 201) {
          res.redirect('/food/' + foodid);
        } else if (response.statusCode === 400 && body.name && body.name === "ValidationError" ) {
          res.redirect('/food/' + foodid);
        } else {
          console.log(body);
        }
      }
    );
}; 