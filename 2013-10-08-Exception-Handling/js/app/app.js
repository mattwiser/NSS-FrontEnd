'use strict';

$(document).ready(initialize);

function initialize(){
  $(document).foundation();

  var o = {};

  try{
    console.log(x);
  } catch(e) {

    console.log('you just received an error' + e);
  }
  try{
    console.log(y);
  } catch(e) {

    console.log('you just received an error' + e);
  }
  try{o.doesntExist();
    } catch(e){
    console.log('you have received an error' + e);
  }
}
