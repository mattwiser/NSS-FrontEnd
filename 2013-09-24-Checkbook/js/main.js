var name = prompt('GIVE ME YOUR NAME ASSHOLE!');

var balance = prompt('GIVE ME YOUR BALANCE ASSHOLE!');
balance = parseInt(balance);

console.log(("Your Balance Is") + " " + (balance));

var deposit = prompt('GIVE ME MONEY ASSHOLE!');
deposit = parseInt(deposit);

console.log(("Your Balance Is") + " " + (balance+deposit));

var deposit2 = prompt('GIVE ME MONEY ASSHOLE!');
deposit2 = parseInt(deposit2);

console.log(("Your Balance Is") + " " + (balance+deposit+deposit2));


var deposit3 = prompt('GIVE ME MONEY ASSHOLE!');
deposit3 = parseInt(deposit3);

console.log(("Your Balance Is") + " " + (balance+deposit+deposit2+deposit3));

var withdraw = prompt('TAKE SOME MONEY ASSHOLE');
withdraw = parseInt(withdraw);

console.log(("Your Balance Is") + " " + ((balance+deposit+deposit2+deposit3)-(withdraw)));

var withdraw2 = prompt('TAKE SOME MONEY ASSHOLE');
withdraw2 = parseInt(withdraw2);

console.log(("Your Balance Is") + " " + ((balance+deposit+deposit2+deposit3)-(withdraw+withdraw2)));

var withdraw3 = prompt('TAKE SOME MONEY ASSHOLE');
withdraw3 = parseInt(withdraw3);

console.log(("Your Balance Is") + " " + ((balance+deposit+deposit2+deposit3)-(withdraw+withdraw2+withdraw3)));


var sum = ((balance+deposit+deposit2+deposit3)-(withdraw+withdraw3+withdraw2));



if (sum < 0)
  sum = sum - 50;
if (sum < 0)
  console.log('We billed you 50 bucks for your incompetence');





console.log('Your full name is : ' + " " + name);
console.log("Your Balance Is" + " " + sum);






