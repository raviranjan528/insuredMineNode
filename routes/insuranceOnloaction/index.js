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

var insuranceOnloactionSchema = new mongoose.Schema({
 zipCode:{
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

var insuranceOnloaction = mongoose.model('insuranceOnloaction', insuranceOnloactionSchema);


/* GET home page. */
router.get('/:id', function(req, res, next) {
  insuranceOnloaction.find({'zipCode':req.params.id}).populate('insurance').exec(function (err, insuranceonloaction) {
    if (err) {
        console.log('err insuranceonloaction: ' + err);
    }
    if (!insuranceonloaction) {
      return res.status(404).send('Not Found');
    }
    return res.json(insuranceonloaction);
  });
});

router.post('/', function(req, res, next) {
  var insuranceonloaction = new insuranceOnloaction();
    insuranceonloaction.zipCode = req.body.zipCode;
    insuranceonloaction.insurance = req.body.insurance;
     insuranceonloaction.save()
      .then(function(insuranceonloaction) {

        res.json(insuranceonloaction);
      })
});

module.exports = router;