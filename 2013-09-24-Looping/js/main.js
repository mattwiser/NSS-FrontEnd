
var test_scores =[];
var deviation = [];
var sum = 0;
var mean = 0;
var square_total = 0;



debugger;


for (var x = 0; x <10;  x++) {
	
	var	score = prompt('Please Enter a Score');
	score=parseFloat(score);
	test_scores.push(score);
	sum += test_scores[x];

	

};

mean = (sum/10);

for (x = 0; x < 10; x++)
{
	deviation.push((test_scores[x]-mean));
}

for (x = 0; x < 10; x++)
{
	deviation[x] = ((deviation[x] * deviation[x]));
}



for (x = 0; x < 10; x++)
{
		square_total += deviation[x];
}

square_total = square_total/9;
var standard_deviation = Math.sqrt(square_total);




console.log("The class average is " + mean);
console.log("The standard deviation is " + standard_deviation);