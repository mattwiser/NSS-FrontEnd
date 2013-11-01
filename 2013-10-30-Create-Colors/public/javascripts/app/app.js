$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  $('.color').on('click', colorChange)
}

function colorChange(){
  $(this).css('background-color', 'white')
}
