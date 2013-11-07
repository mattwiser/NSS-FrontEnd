$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#newGame').on('submit', submitNewGame);
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
    var game=data;
    htmlCreateCards(game);
  });

}
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//

function htmlCreateCards(game){
  for (var i = 0; i < game.cardArray.length; i++) {
    var $card = $('<div>');
    $card.addClass('card');
    $('#cards').append($card);
  };
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