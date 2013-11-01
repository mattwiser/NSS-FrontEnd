var mongoose = require('mongoose');
var Song = mongoose.model('Song');

exports.index = function(req, res){
  Song.find(function(err, songs){
  res.render('songs/index', {title: 'Express', songs: songs});
  });
};

exports.new = function(req, res){
  res.render('songs/new', {title: 'Express'});
};

exports.create = function(req, res){
  console.log('BEFORE');
  console.log(req.body);
  req.body.genres = req.body.genres.split(', ');
  new Song(req.body).save(function(err, song, count){
    console.log('AFTER');
    console.log(song);
    res.redirect('/songs');
  })

};

