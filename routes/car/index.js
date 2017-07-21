'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var router = express.Router();

var CarSchema = new mongoose.Schema({
 name:{
 	type:String
 },
 createdAt:{
 	type:Date,
 	default:Date.now
 }
});

var Car = mongoose.model('Car', CarSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  Car.find().exec(function (err, car) {
    if (err) {
        console.log('err Car: ' + err);
    }
    if (!car) {
      return res.status(404).send('Not Found');
    }
    return res.json(car);
  });
});

router.post('/', function(req, res, next) {
  var car = new Car();
    car.name = req.body.name;
     car.save()
      .then(function(car) {

        res.json(car);
      })
});
module.exports = router;