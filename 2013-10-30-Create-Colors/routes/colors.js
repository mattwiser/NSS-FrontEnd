
/*
 * GET /
 */

exports.index = function(req, res){
  var colors = ['teal', 'gray', 'blue', 'green', 'purple', 'black']
  res.render('colors/index', {title: 'Colors', colors:colors});
};
