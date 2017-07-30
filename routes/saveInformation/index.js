
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var router = express.Router();

var saveInformationSchema = new mongoose.Schema({
 description:{
 	type:String
 },
 zipCode:{
 	type:String
 },
 email:{
  type:String
 },
 insurance:{
       type: Schema.ObjectId,
       ref: 'Insurance'
  },
 createdAt:{
 	type:Date,
 	default:Date.now
 }
});

var saveInformation = mongoose.model('saveInformation', saveInformationSchema);


/* GET home page. */
router.get('/:id', function(req, res, next) {
  saveInformation.find({'email':req.body.email}).populate('insurance').exec(function (err, saveinformation) {
    if (err) {
        console.log('err saveinformation: ' + err);
    }
    if (!saveinformation) {
      return res.status(404).send('Not Found');
    }
    return res.json(saveinformation);
  });
});

router.post('/', function(req, res, next) {
  var saveinformation = new saveInformation();
    saveinformation.description = req.body.description;
    saveinformation.zipCode = req.body.zipCode;
    saveinformation.email = req.body.email;
    saveinformation.insurance = req.body.insurance;
     saveinformation.save()
      .then(function(saveinformation) {

        res.json(saveinformation);
      })
});

module.exports = router;