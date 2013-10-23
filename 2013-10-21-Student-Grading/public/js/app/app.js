'use strict';

// Local Schema (defined in keys.js)
var schools = [];

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}

  $(document).foundation();
  $('#add-school').click(clickAddSchool);
  $('#add-student').click(clickAddStudent);
  $('#add-subject').click(clickAddSubject);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clickAddSchool(){
  var name = getValue('#school');
  var width = getValue('#width');
  var length = getValue('#length');
  var school = new School(name, length, width);
  schools.push(school);
  htmlAddSchoolSelect(school);
}

function clickAddStudent(){
  var name = getValue('#student');
  var gpa = getValue('#gpa', parseFloat);
  var schoolName = $('#schools').val();

  var school = _.find(schools, function(s){
    return s.name === schoolName;
  });

  var student = new Student(name, gpa);

  htmlAddStudent(student);

  school.students.push(student);
}

function clickAddSubject(){
  var subjectName = getValue('#subject');
  var studentName = getValue('#pick-student');




}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function School(name, length, width){
  this.name = name;
  this.established = '1865';
  this.length = length;
  this.width = width;
  this.area = function(){return (parseInt(this.length, 10)) * (parseInt(this.width, 10));};
  this.students = [];
  this.gpa = function(){
    var sum = _.reduce(this.students, function(memo, student){return memo + student.gpa;}, 0);
    var total = this.students.length;
    return sum / total;
  };
}

function Student(name, gpa){
  this.name = name;
  this.gpa = gpa;
  this.subjects = [];
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function htmlAddSchoolSelect (school){
  var $option = $('<option>');
  $option.text(school.name);
  $option.val(school.name);
  $('#schools').prepend($option);
}

function htmlAddStudent (student){
  var $option = $('<option>');
  $option.text(student.name);
  $option.val(student.name);
  $('#pick-student').prepend($option);
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //