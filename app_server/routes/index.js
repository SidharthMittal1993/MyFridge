var express = require('express');
var router = express.Router();
var ctrlfood= require('../controllers/food');


router.get('/', ctrlfood.homelist);
router.post('/food',ctrlfood.foodCreate);

module.exports = router;