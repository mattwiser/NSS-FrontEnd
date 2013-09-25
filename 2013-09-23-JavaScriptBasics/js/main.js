/*
  this is a multi-line
  javascript
  comment
*/

var first_name = prompt('GIVE ME YOUR FIRST NAME ASSHOLE!');
var last_name = prompt('GIVE ME YOUR LAST NAME ASSHOLE!');
var gender = prompt('WHAT SEX ARE YOU ASSHOLE?');
var age = prompt('HOW OLD ARE YOU ASSHOLE?');
age = parseInt(age);
var bday_month = prompt('WHAT MONTH WERE YOU BORN IN?');
var current_month = prompt('WHAT MONTH IS IT');
var full_name = first_name + " " + last_name;


//debugger;

var test1 = prompt('GIMME YOUR TEST 1 SCORE DUMMY');
test1 = parseFloat(test1);

var test2 = prompt('GIMME YOUR TEST 2 SCORE DUMMY');
test2 = parseFloat(test2);

var test3 = prompt('GIMME TOUR TEST 3 SCORE DUMMY');
test3 = parseFloat(test3);



var sum = 0;
sum = sum+test1;
sum = sum+test2;
sum = sum+test3;

var average = sum / 3;

if (average < 70)
  console.log('failed');
else if((average >= 70) && (average < 80))
  console.log('You made a C');
else if((average >= 80) && (average < 90))
  console.log('You made a B');
else
  console.log('You made a A');







console.log('Your full name is : ' + full_name);
console.log("YOUR AVERAGE TEST SCORE IS: " + average);



if((first_name == 'Matthew') && (last_name = 'Wiser'))
  console.log('hey, i know you!');

if((gender == 'female') && (age >= 21))
  console.log('free drinks, ladies night! woot!');
else if ((gender == 'male') && (age >= 21))
  console.log('Looks like youre buying!!');
else
  console.log('INDETERMINATE AGE OR GENDER');

var can_have_cake = (current_month == bday_month);
var cake = (current_month == bday_month) ? "chocolate" : "vanilla";
console.log("Marie Antoinette says you are eating" + " " +cake);


switch(bday_month)
{
  case'january':
    console.log('Hey capricorn');
    break;

  case'february':
    console.log('Hey Aquarius');
    break;
  default:
    console.log("you are not of this world, god speed!");
  }

