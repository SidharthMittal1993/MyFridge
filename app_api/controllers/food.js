var mongoose = require('mongoose');
var food = mongoose.model('food');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.foodInfo = function(req, res) {
  console.log('Finding Food details', req.params);
    food
      .find()
      .exec(function(err, food) {
        if (!food) {
          sendJSONresponse(res, 404, {
            "message": "food details not found"
          });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(food);
        sendJSONresponse(res, 200, food);
      });
  
};


module.exports.foodCreate = function(req, res) {
  food.create({
    name: req.body.name,
    date: req.body.date,
    expiry: req.body.expiry,
    left_overs: req.body.left_overs,
    quantity: req.body.quantity
    
  }, function(err, foodi) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    } else {
      console.log(foodi);
      sendJSONresponse(res, 201, foodi);
    }
  });
};


module.exports.foodUpdateOne = function(req, res) {
  if (!req.params.foodid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, foodid is required"
    });
    return;
  }
  food
    .findById(req.params.foodid)
    .exec(
      function(err, food) {
        if (!food) {
          sendJSONresponse(res, 404, {
            "message": "foodid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        food.name = req.body.name;
        food.date = req.body.date;
        food.expiry = req.body.expiry;
        food.left_overs = req.body.left_overs;
        food.quantity = req.body.quantity;
        
        location.save(function(err, food) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, food);
          }
        });
      }
  );
};

module.exports.foodDeleteOne = function(req, res) {
  var foodid = req.params.foodid;
  if (foodid) {
    food
      .findByIdAndRemove(foodid)
      .exec(
        function(err, food) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Food id " + foodid + " deleted");
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, {
      "message": "No foodid"
    });
  }
};
