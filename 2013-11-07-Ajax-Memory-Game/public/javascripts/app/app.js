$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#newGame').on('submit', submitNewGame);
  $('#cards').on('click', '.card', clickCard);
}

//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//

function submitNewGame(event){
  var url = $(this).attr('action');
  var data = {};
  data.player = $('input[name="player"]').val();
  data.numSquares = $('input[name="squares"]').val();

  sendGenericAjaxRequest(url, data, 'post', 'post', event, function(data, status, jqXHR){
    console.log(data);
    htmlCreateCards(data);
  });

}

function clickCard(){
  var position = $(this).data('position');

}
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//

function htmlCreateCards(data){
  for (var i = 0; i < data.array; i++) {
    var $link= $('<a>');


    var $card = $('<div>');
    $card.addClass('card');
    $card.attr('data-position', i);

    $link.append($card);

    $('#cards').append($link);
  };
  $('input[name="player"]').val('');
  $('input[name="squares"]').val('');
}

//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//

function sendGenericAjaxRequest(url, data, verb, altVerb, event, successFn){
  var options = {};
  options.url = url;
  options.type = verb;
  options.data = data;
  options.success = successFn;
  options.error = function(jqXHR, status, error){console.log(error);};

  if(altVerb) options.data._method = altVerb;
  $.ajax(options);
  if(event) event.preventDefault();
}