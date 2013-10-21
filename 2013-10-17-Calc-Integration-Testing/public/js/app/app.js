'use strict';
$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)){return;}

  $(document).foundation();
  $('#calc').click(addStuff);
}

function addStuff(){
  var op1 = $('#op1').val();
  op1 = parseInt(op1, 10);

  var op2 = $('#op2').val();
  op2 = parseInt(op2, 10);

  var operator = $('#operator').val();

  var computation = op1 + operator + op2;
  var result = eval(computation);



  var papertrailRow = {};

  papertrailRow.op1 = op1;
  papertrailRow.op2 = op2;
  papertrailRow.operator = operator;

  htmlUpdatePapertrail(papertrailRow);
  htmlUpdateResult(result);
}

function htmlUpdateResult(result){
  $('#op1').val('');
  $('#op2').val('');
  $('#operator').val('');
  $('#result').text(result);

}

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !==undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

function htmlUpdatePapertrail(papertrailRow){
  var $li = $('<li>');
  var $op1 = $('<span class="op1">');
  var $op2 = $('<span class="op2">');
  var $operator = $('<span class="operator">');
  var $result = $('<span class="result">');
  var $equal = $('<span class="equal">');

  $op1.text(papertrailRow.op1);
  $op2.text(papertrailRow.op2);
  $operator.text(papertrailRow.operator);

  var op1 = papertrailRow.op1;
  var op2 = papertrailRow.op2;
  var operator = papertrailRow.operator;
  var result = eval(op1+operator+op2);
  var equal = ' = ';
  $result.text(result);
  $equal.text(equal);

  $li.append($op1);
  $li.append($operator);
  $li.append($op2);
  $li.append($equal);
  $li.append($result);

  $('#history').append($li);

}