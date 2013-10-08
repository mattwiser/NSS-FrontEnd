$(document).ready(init);

function init()
{
  $('#btn').click(makingBoxes);
  $('#clearinput').click(clearInput);
  $('#colorString').focus();
  $('#clearboxes').click(clearboxes)
}

function clearInput()
{
  $('#colorString').val('');
  $('#colorString').focus();
}

function clearboxes()
{
  $('#boxes').empty()
  clearInput();
}

function makingBoxes()
{
  var colors = $('#colorString').val();
  colors = colors.split(', ');

  for (var i = 0; i < colors.length; i++)
  {
    var $color = $('<div>');
    $color.addClass('box');
    $color.text(colors[i]);
    $color.css('background-color', colors[i])

    $('#boxes').append($color);

  };
}