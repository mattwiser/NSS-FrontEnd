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
  game.cardArray= array;
  res.send(game);
};