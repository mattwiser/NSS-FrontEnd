var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');
var Todo = mongoose.model('Todo');
/*
 * GET /
 */

exports.index = function(req, res){
  Priority.find(function(err, priorities){
    Todo.find().populate('priority').exec(function(todoerr, todos){
      res.render('todos/index', {title: 'Express', priorities: priorities, todos: todos});
    });
  });
};

exports.create = function(req, res){
  new Todo(req.body).save(function(err, todo, count){
    Todo.findById(todo._id).populate('priority').exec(function(err, todo){
      res.send(todo);
    });
  });
};

exports.delete = function(req, res){
  Todo.findByIdAndRemove(req.body.id, function(err, todo){
    res.redirect('/todos');
  });
}