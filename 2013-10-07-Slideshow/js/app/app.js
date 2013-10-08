'use strict';


var photos = [];
var currenIndex = 0;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#search').click(searchFlickr);

}

function searchFlickr(){
  const API_KEY = '535e074aa659dc0f015130888fede80e';
  const PER_PAGE = '5';
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



