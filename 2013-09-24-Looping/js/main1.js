
var test_scores =[];
var deviation = [];

score = prompt('Please Enter a Score');

while(test_scores.length<=9)
{
	score=parseFloat(score);
	test_scores.push(score);
	score = prompt('Please Enter a Score');
}


var sum = 0;

for (var x = 0; x < test_scores.length; x++)
{
	sum += test_scores[x];
}

var mean = (sum/10);

for (var x = 0; x < test_scores.length; x++)
{
	deviation.push((test_scores[x]-mean));
}

for (var x = 0; x < deviation.length; x++)
{
	deviation[x] = ((deviation[x] * deviation[x]));
}

var square_total = 0

for (var x = 0; x < deviation.length; x++)
{
		square_total += deviation[x];
}

square_total = square_total/9;
var standard_deviation = Math.sqrt(square_total);




console.log("The class average is " + mean);
console.log("The standard deviation is " + standard_deviation);