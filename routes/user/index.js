
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');
var router = express.Router();

var UsersSchema = new mongoose.Schema({
 name:{
 	type:String
 },
 email:{
 	type:String
 },
 password:{
       type: String
  },
 createdAt:{
 	type:Date,
 	default:Date.now
 }
});

var Users = mongoose.model('Users', UsersSchema);


/* GET home page. */
router.get('/:id', function(req, res, next) {
  Users.findById(req.user._id).exec(function (err, users) {
    if (err) {
        console.log('err Users: ' + err);
    }
    if (!users) {
      return res.status(404).send('Not Found');
    }
    return res.json(users);
  });
});

router.post('/', function(req, res, next) {
  var users = new Users();
    users.name = req.body.name;
    users.email = req.body.email;
    users.password = req.body.password;
     users.save()
      .then(function(users) {

        res.json(users);
      })
});

module.exports = router;