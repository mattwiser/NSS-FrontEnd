/*
 * GET list page.
 */

exports.index = function(req, res){
  res.render('list/index', { title: 'Saved Tasks' });
};

exports.new = function(req, res){
  res.render('list/new', { title: 'New Task' });
};