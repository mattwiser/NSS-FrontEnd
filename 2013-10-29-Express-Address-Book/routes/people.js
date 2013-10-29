
/*
 * GET people page.
 */

exports.index = function(req, res){
  res.render('people/index', { title: 'People: Address Book' });
};