'use strict';

var Δdb;
var db = {};
var Δitems;
var Δperson;
db.person = {};
db.items = [];

db.stats = {};
db.stats.sum = 0;


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#add').click(add);
  $('#save').click(save);


  Δdb = new Firebase('https://house-inventory-1.firebaseio.com/');
  Δitems = Δdb.child('items');
  Δperson = Δdb.child('person');
  Δperson.on('value', personChanged);
  Δitems.on('child_added', itemAdded);
}

function itemAdded(snapshot){
  var item = snapshot.val();
  db.items.push(item);
  createRow(item);
  totalCost(item);

}

function personChanged(snapshot){
  var person = snapshot.val();

  try{
    $('#person').val(person.fullName);
    $('#address').val(person.address);
    db.person = person;
  } catch(e){
      console.log(e);
    }


  // for(var property in inventory.items){
  //   var item = inventory.items[property];
  //   items.push(item);
  // }


  // for(var i = 0; i < items.length; i++){
  //   createRow(items[i]);
  // }
}


function save(){
  var fullName = $('#person').val();
  var address = $('#address').val();
  var person = {};
  person.fullName = fullName;
  person.address = address;

  Δperson.set(person);
}

function add(){
  var name = $('#name').val();
  var count = $('#count').val();
  var value = $('#value').val();
  var room = $('#room').val();
  var condition = $('#condition').val();
  var date = $('#date').val();

  var item = {};
  item.name = name;
  item.count = parseInt(count, 10);
  item.value = parseFloat(value);
  item.room = room;
  item.condition = condition;
  item.date = date;

  Δitems.push(item);

}

function createRow(item){
  var row = '<tr><td class="name"></td><td class="count"></td><td class="value"></td><td class="room"></td><td class="condition"></td><td class="date"></td></tr>';
  var $row = $(row);

  $row.children('.name').text(item.name);
  $row.children('.count').text(item.count);
  $row.children('.value').text(item.value);
  $row.children('.room').text(item.room);
  $row.children('.condition').text(item.condition);
  $row.children('.date').text(item.date);

  $('#items').append($row);
}



function totalCost(x){
  db.stats.sum += (x.count * x.value);
  $('#sum').val('$' + db.stats.sum );
}
