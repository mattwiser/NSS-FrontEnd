var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var colors = require('colors');
var _=require('lodash')
// Colors
// bold, italic, underline, inverse, yellow, cyan,
// white, magenta, green, red, grey, blue, rainbow,
// zebra, random

/*
 * GET /
 */

exports.index = function(req, res){
  console.log('home.index'.italic.underline.bold.magenta);
  res.render('games/index', {title: 'Memory Game'});
};


/*
 * POST /games/start /
 */

exports.create = function(req, res){
  var game = new Game(req.body);

  var array1 = _.range(game.numSquares);
  var array2 = _.range(game.numSquares);
  var array = array1.concat(array2);
  array = _.shuffle(array);
  game.cardArray = array;

  var obj = {};
  obj.array = game.cardArray.length;
  obj.id = game.id;

  game.save(function(err, game){
  res.send(obj);
  });
}

exports.show = function(req, res){
  console.log('----show----');
  Game.findById(req.body.id, function(err, game){
    var obj = {};
    obj.value = game.cardArray[req.body.position];
    obj.position=req.body.position
    res.send(obj);
  });
}

exports.show2 = function(req, res){
  console.log('----show2----');
  console.log(req.body);
  Game.findById(req.body.id, function(err, game){
    var obj = {};
    obj.value = game.cardArray[req.body.position];
    obj.position=req.body.position
    res.send(obj);
  });
}

exports.finish = function(req, res){
  Game.findById(req.body.id, function(err, game){
    game.time = req.body.time;
    res.send(game);
  });
};