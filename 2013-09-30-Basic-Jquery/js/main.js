$(document).ready(initialize);

function initialize() {

function change_div_txt() {
  var name = $('#name').val();
  var color = $('#color').val();
  $('#b').text(name).css("background-color", color);
}

function age_verif() {
var x = $('#age').val();
x = parseInt(x);
if (x >= 21) {
  $('#age_div').text("You've passed!").css("background-color", "green")
}
else {
$('#age_div').text("You've failed!").css("background-color", "red")
}
}

  $('#clicker').click(change_div_txt);
  $('#age_check').click(age_verif);


  //$('div').css('background-color', 'red');
  //$('div').css('font-size', '25px');
  //$('div').css('color', 'yellow');


  //var color = prompt('What color would you like?')
  //$('div').css('background-color', color)

  //var size = prompt('What font size would you like?')
  //$('div').css('font-size', size)

  // var selector = prompt('which div would you like?');
  // var cls = prompt('Class to add?');
  // var new_txt = prompt('what would you like to say?');
  // $(selector).addClass(cls)
  // $(selector).text(nodeqaew_txt)

  // var selector_to_hide = prompt('which node would you like hide?');
  // $(selector_to_hide).hide();

}