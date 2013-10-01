$(document).ready(initialize);

function initialize()
{
  $('#name_btn').click(name_count)


function name_count()
{
  var x = $('#name_txt').val();
  var x = x.length
  $('#name_div').text(x);
}
}