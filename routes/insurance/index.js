'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var router = express.Router();

var InsuranceSchema = new mongoose.Schema({
 name:{
 	type:String
 },
 imageUrl:{
  type:String
 },
 createdAt:{
 	type:Date,
 	default:Date.now
 }
});

var Insurance = mongoose.model('Insurance', InsuranceSchema);


/* GET home page. */
router.get('/', function(req, res, next) {
  Insurance.find().exec(function (err, insurance) {
    if (err) {
        console.log('err insurance: ' + err);
    }
    if (!insurance) {
      return res.status(404).send('Not Found');
    }
    return res.json(insurance);
  });
});

router.post('/', function(req, res, next) {
  var insurance = new Insurance();
    insurance.name = req.body.name;
    insurance.imageUrl = req.body.imageUrl;
     insurance.save()
      .then(function(insurance) {

        res.json(insurance);
      })
});
module.exports = router;