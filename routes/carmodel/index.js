// 'use strict';

// var express = require('express');
// var controller = require('./carmodel.controller');

// var router = express.Router();

// router.get('/', controller.index);
// router.post('/', controller.create);

// module.exports = router;
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var router = express.Router();

var CarmodelSchema = new mongoose.Schema({
 name:{
 	type:String
 },
 imageUrl:{
 	type:String
 },
 car:{
       type: Schema.ObjectId,
       ref: 'Car'
  },
 createdAt:{
 	type:Date,
 	default:Date.now
 }
});

var Carmodel = mongoose.model('Carmodel', CarmodelSchema);


/* GET home page. */
router.get('/:id', function(req, res, next) {
  Carmodel.find({'car':req.params.id}).populate('car', 'name').exec(function (err, carmodel) {
    if (err) {
        console.log('err carmodel: ' + err);
    }
    if (!carmodel) {
      return res.status(404).send('Not Found');
    }
    return res.json(carmodel);
  });
});

router.post('/', function(req, res, next) {
  var carmodel = new Carmodel();
    carmodel.name = req.body.name;
    carmodel.imageUrl = req.body.imageUrl;
    carmodel.car = req.body.car;
     carmodel.save()
      .then(function(carmodel) {

        res.json(carmodel);
      })
});

module.exports = router;