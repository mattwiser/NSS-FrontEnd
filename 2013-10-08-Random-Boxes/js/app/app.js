'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('#start').click(boxGenerator);
  $('#stop').click(boxKiller);
}



var timer = 1;

function boxGenerator(){
  var dimensions = $('#dimensions').val();
  dimensions = dimensions.split(', ');
  for (var i = 0; i < dimensions.length; i++) {
    dimensions[i] = parseInt(dimensions[i], 10);
  }

  var delay = $('#delay').val();
  delay = parseFloat(delay);
  delay = delay * 1000;



  function maker(){
    var colorR =  Math.floor((Math.random()*256));
    var colorG =  Math.floor((Math.random()*256));
    var colorB =  Math.floor((Math.random()*256));
    var alpha = Math.random();
    var rgb = 'rgba(' + colorR +','+ colorG + ',' + colorB + ',' + alpha + ')';
    var $div = $('<div>');
    $div.addClass('box');
    $div.css('background-color', rgb);
    $div.css('width', dimensions[0]);
    $div.css('height', dimensions[1]);

    $('#boxes').prepend($div);
  }

  timer = setInterval(maker, delay);


}

function boxKiller(){
    timer = clearInterval(timer);

  }