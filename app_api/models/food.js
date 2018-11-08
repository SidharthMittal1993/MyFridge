var mongoose = require('mongoose');
var foodschema = new mongoose.Schema(
{
       name:
       {
         type:String, required: true
       },
       date:
       {
         type:Date
       },
       expiry:
       {
         type:Date
       },
       left_overs:
       {
         type:Boolean, "default": false
       },
       quantity:
       {
         type:Number, "default": -1, min: -1
       },       
});

mongoose.model('food', foodschema);