
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('colors/index', {title:'Colors Page'});
};