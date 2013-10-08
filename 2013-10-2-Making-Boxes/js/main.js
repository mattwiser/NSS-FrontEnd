$(document).ready(init);

function init()
{
  $('#btn').click(makingBoxes);
}

function makingBoxes()
{
  var boxNumber = $('#amount').val();
  boxNumber = parseInt(boxNumber);

  for (var i = 0; i < boxNumber; i++) {

    var $div = $('<div>');
    $div.addClass('box');
    $div.text(i);
    $('#boxes').append($div);


  };
}