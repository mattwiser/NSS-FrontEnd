$(document).ready(init);

function pig_latin(word){
  return  word.slice(1) + word.slice(0,1) + "ay";
};

function init(){
  $('#pig_btn').click(pig_prog)
};

function pig_prog(){
  return $('#result').val(pig_latin($('#text').val()))
}
