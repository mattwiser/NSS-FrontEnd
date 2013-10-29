var db = require('../modules/database');
/*
 * GET /people
 */

exports.index = function(req, res){
  var people = db.read(__dirname + '/../db/people.json')
  res.render('people/index', { title: 'People: Address Book', people: people });
};
/*
 * GET /people/new
 */

exports.new = function(req, res){

  res.render('people/new', { title: 'New Person: Address Book'});
};

/*
 * POST /people/
 */

exports.create = function(req, res){
  var name= req.body.name;
  var gender= req.body.gender;
  var age= parseInt(req.body.age);
  var color= req.body.color;

  var person= {};
  person.name=name;
  person.gender=gender;
  person.age=age;
  person.color=color;

  var people= db.read(__dirname + '/../db/people.json');
  people.push(person);
  db.write(__dirname + '/../db/people.json', people);

  res.redirect('/people');
};