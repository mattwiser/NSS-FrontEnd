$(document).ready(init)


function init()
{
  $('#btn').click(color_adder);
  $('#color').focus();
}

function color_adder()
{
  var color = $('#color').val();
  var $div = $('<div>')
  $div.addClass('box')
  $div.css("background-color", color);
  $('#colors').append($div);
  clearInputAndFocus()

}

function  clearInputAndFocus()
{
  $('#color').val('');
  $('#color').focus();

}