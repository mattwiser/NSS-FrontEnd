$(document).ready(initialize);

var oldPosition = {};
var count = 0;
var timer = '';

function initialize(){
  $(document).foundation();
  $('#newGame').on('submit', submitNewGame);
  $('#cards').on('click', '.card', clickCardOne);
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
    htmlCreateCards(data);
  });

}

function clickCardOne(){
  var ajaxData = {};
  ajaxData.position = $(this).data('position');
  ajaxData.id = $(this).parent().parent().data('id');

  var url = '/games/'+ ajaxData.id;

  sendGenericAjaxRequest(url, ajaxData, 'post', 'get', null, function(data, status, jqXHR){
    htmlShowCardOne(data);
  });
}

function clickCardTwo(){
  var ajaxData = {};
  ajaxData.position = $(this).data('position');
  ajaxData.id = $(this).parent().parent().data('id');

  var url = '/games/'+ ajaxData.id + '/card2';

  sendGenericAjaxRequest(url, ajaxData, 'post', 'get', null, function(data, status, jqXHR){
    htmlShowCardTwo(data);
  });
}

function winFunction(){
  if ($('.matched').length===($('.cardStyle').length)/2) {

    var data = {};
    data.id = $('#cards').data('id');
    data.time = parseInt($('#time').text());

    var url = '/games/'+data+'/win'

    clearInterval(timer);
    $('#time').text('');

    sendGenericAjaxRequest(url, data, 'post', null, null, function(data, status, jqXHR){
      console.log(data);
      newBoard();
    });
  };
}
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//
//---------------------------------------------------------------------------------------------//

function newBoard(){
  var data = {};
  sendGenericAjaxRequest('/', data, 'post', 'get', null, function(data, status, jqXHR){
  });
}

function htmlShowCardOne(data){
  var $selector = '.card[data-position=' + data.position + ']';
  $selector = $($selector);
  $selector.text(data.value);
  $('#cards').off('click');
  $('.card').addClass('card2');
  $(".card[data-position='" + data.position +"']").removeClass('card2');
  $('#cards').on('click', '.card2', clickCardTwo);
  oldPosition = data;

}

function htmlShowCardTwo(data){
  if (data.value===oldPosition.value) {
    var $selector = '.card[data-position=' + data.position + ']';
    $selector = $($selector);
    $selector.text(data.value);

    $selector.removeClass('card');
    $('.card[data-position=' + oldPosition.position + ']').removeClass('card');

    $selector.addClass('matched');
    $('.card[data-position=' + oldPosition.position + ']').addClass('matched');


    $('.card').removeClass('card2');
    $('#cards').off('click');
    $('#cards').on('click', '.card', clickCardOne);

    winFunction();

  } else{

    $('.card').removeClass('card2');
    $('#cards').off('click');
    $('#cards').on('click', '.card', clickCardOne);

    $('.card').removeClass('card2');
    $(".card[data-position='" + data.position +"']").empty();
    $(".card[data-position='" + oldPosition.position +"']").empty();


  };
}

function htmlCreateCards(data){
  $('#cards').attr('data-id', data.id);

  for (var i = 0; i < data.array; i++) {
    var $link= $('<a>');


    var $card = $('<div>');
    $card.addClass('card');
    $card.addClass('cardStyle');
    $card.attr('data-position', i);

    $link.append($card);

    $('#cards').append($link);
  };
  $('input[name="player"]').val('');
  $('input[name="squares"]').val('');
  timer = setInterval(function(){count++;$('#time').text(count);},1000);
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