var mongoose = require('mongoose');
var _ = require('lodash');

var Game = mongoose.Schema({
  player: String,
  createdAt:{type:Date, default: Date.now},
  cardArray: [Number],
  time: {type: Number, default: 0},
  numSquares: Number
});

mongoose.model('Game', Game);