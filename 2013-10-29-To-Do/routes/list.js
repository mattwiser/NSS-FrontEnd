var db = require('../modules/database');
/*
 * GET list page.
 */

exports.index = function(req, res){
  var tasks = db.read(__dirname + '/../db/tasks.json');
  res.render('list/index', { title: 'Saved Tasks', tasks: tasks });
};

exports.new = function(req, res){
  res.render('list/new', { title: 'New Task' });
};

exports.create = function(req, res){
  var date = req.body.date;
  var name = req.body.name;
  var color = req.body.color;

  var task = {};
  task.date = date;
  task.name = name;
  task.color = color;

  var tasks = db.read(__dirname + '/../db/tasks.json');
  tasks.push(task);
  db.write(__dirname + '/../db/tasks.json', tasks);


  res.redirect('list/');
};