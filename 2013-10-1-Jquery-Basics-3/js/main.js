function add(number1, number2)
{
  return number1 + number2;
};

$(document).ready(init);

function init()
{
  $('#add').click(compute_sum);
}

function compute_sum()
{

  var num1 = $('#num1').val()
  num1 = parseInt(num1);


  var num2 = $('#num2').val()
  num2 = parseInt(num2);

  var sum = add(num1, num2);
  return $('#result').text(sum);
}