'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);
  $('#clear').click(clearFunction);
  $('#photos').on('dblclick', '.photo', deletionFunc);
  $('#photos').on('click', '.photo', selectFunc);
  $('#photos').on('click', '.photo.highlight', deselectFunc);
  $('#clear_selected').click(killSelected);
  $('#save').click(saveSelected);
}

function searchFlickr(){
  const API_KEY = '535e074aa659dc0f015130888fede80e';
  const PER_PAGE = '50';
  var page = 1;

  var query = $('#query').val();
  var url = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key='+ API_KEY + '&text=' + query + '&per_page=' + PER_PAGE + '&page=' + page + '&format=json&jsoncallback=?';
  $.getJSON(url, results);
}

function results(data){

  for (var i = 0; i < data.photos.photo.length; i++) {
    img_maker(data.photos.photo[i]);
  };

}

function img_maker(photo){
  var url = "url(http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +"_m.jpg)";
  var $div = $('<div>');
  $div.addClass('photo');
  $div.css('background-image', url);
  $('#photos').prepend($div);
}

function deletionFunc(){
  $(this).remove();
}

function clearFunction()
{
  $('#photos').empty();
}

function selectFunc(){
  $(this).addClass('highlight')
}

function deselectFunc(){
  if ($(this).hasClass('highlight')){
  $(this).removeClass('highlight')
  }
}

function killSelected() {
  $('.highlight').remove();
}

function saveSelected() {
  var $selectedImages = $('.highlight');
  $selectedImages.removeClass('highlight');
  $('#saved-photos').append($selectedImages);
}

