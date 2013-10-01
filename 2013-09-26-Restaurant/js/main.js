var apps = [ ];
var salads = [ ];
var drinks =[ ];
var specials =[ ];
var desserts = [ ];

var x = parseFloat(prompt('How many appetizers would you like to add?'));



for (var i = 0; i  < x; i++) 
{
	var app = {};
	app.name = prompt('What is the name of your appetizer?');
	app.cost = parseFloat(prompt('How much does it cost?'));
	app.calories = parseFloat(prompt('How many calories does it contain?'));
	app.ingredients = prompt('What are the ingredients?');
	apps.push(app);
};

x = parseFloat(prompt('How many salads would you like to add?'));


for (var i = 0; i  < x; i++) 
{
	var salad = {};
	salad.name = prompt('What is the name of your salad?');
	salad.cost = parseFloat(prompt('How much does it cost?'));
	salad.calories = parseFloat(prompt('How many calories does it contain?'));
	salad.ingredients = prompt('What are the ingredients?');
	salads.push(salad);
};

x = parseFloat(prompt('How many drinks would you like to add?'));


for (var i = 0; i  < x; i++) 
{
	var drink = {};
	drink.name = prompt('What is the name of your drink?');
	drink.cost = parseFloat(prompt('How much does it cost?'));
	drink.calories = parseFloat(prompt('How many calories does it contain?'));
	drink.ingredients = prompt('What are the ingredients?');
	drinks.push(drink);
};

x = parseFloat(prompt('How many specials would you like to add?'));


for (var i = 0; i  < x; i++) 
{
	var special = {};
	special.name = prompt('What is the name of your special?');
	special.cost = parseFloat(prompt('How much does it cost?'));
	special.calories = parseFloat(prompt('How many calories does it contain?'));
	special.ingredients = prompt('What are the ingredients?');
	specials.push(special);
};

x = parseFloat(prompt('How many appetizers would you like to add?'));


for (var i = 0; i  < x; i++) 
{
	var dessert = {};
	dessert.name = prompt('What is the name of your appetizer?');
	dessert.cost = parseFloat(prompt('How much does it cost?'));
	dessert.calories = parseFloat(prompt('How many calories does it contain?'));
	dessert.ingredients = prompt('What are the ingredients?');
	desserts.push(desserts);
};
