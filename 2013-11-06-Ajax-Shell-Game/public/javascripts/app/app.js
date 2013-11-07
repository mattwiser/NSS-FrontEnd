$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('form#newGame').on('submit', submitNewGame);
  $('.cup').on('click', clickCup);
}

//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//

function submitNewGame(event){
  var url = $(this).attr('action') + '?player=' + $('input[name="player"]').val();
  sendGenericAjaxRequest(url, {}, 'post', null, event, function(data, status, jqXHR){
    htmlStartGame(data);
  });
}

function clickCup(){
  var guess = $(this).data('position');
  var gameId = $('#cups').data('game');
  var url = '/games/' + gameId;
  sendGenericAjaxRequest(url, {guess: guess}, 'post', 'put', null, function(data, status, jqXHR){
    console.log(data);
  });
}

//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//

function htmlStartGame(game){
  $('input[name="player"]').val('');
  $('#cups').attr('data-game', game._id);
  $('#player').text(game.player);
  $('#cups').css('visibility', 'visible');
}

//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------//

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