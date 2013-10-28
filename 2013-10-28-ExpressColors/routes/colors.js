
/*
 * GET home page.
 */

exports.index = function(req, res){
  var colors = ['blue', 'green', 'red'];
  res.render('colors/index', {title:'Colors Page', colors: colors});
};

exports.new = function(req, res){
  res.render('colors/new', {title:'New Color'});
};

exports.create = function(req, res){
  var color = req.body.color;
  res.redirect('/colors');
};