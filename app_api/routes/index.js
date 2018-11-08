var express = require('express');
var router = express.Router();
var ctrlfood = require('../controllers/food');


//food
router.get('/food',ctrlfood.foodInfo);
router.post('/food',ctrlfood.foodCreate);

module.exports = router;