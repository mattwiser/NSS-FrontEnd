$(document).ready(init);

function pig_latin(word){
  return  word.slice(1) + word.slice(0,1) + "ay";
};
function reversal_restitch(string)
{

  var array = string.split(", ");
  array = array.reverse();

  for (var i = 0; i < array.length; i++)
  {
    array[i] = pig_latin(array[i])
  };

  array = array.join("; ");
  return array;
}

function init(){
  $('#pig_btn').click(pig_prog)
};

function pig_prog(){
  return $('#result').val(reversal_restitch($('#text').val()));

}
