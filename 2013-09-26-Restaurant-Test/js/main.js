/*var menu = [ ];

var section_count = parseFloat(prompt('How many sections are on your menu?'));

for (var i = 0; i < section_count; i++) 
{
	var section = [ ];
	section.name = prompt('What is the name of section ' + (i+1));
	menu.push(section);
};

for ( var y = 0; y < menu.length; y++) {
	
var item_count = parseFloat(prompt('How many items are in the ' + menu[y].name + ' section?'));

for ( i = 0; i < item_count ; i++) {
	
	var menu_item={};
	menu_item.name = prompt('What is the name of item ' + (i+1));
	menu_item.price = parseFloat(prompt('How much does item ' + (i+1) + ' cost?'));
	menu_item.calories = parseFloat(prompt('How many calories are in item ' + (i+1)));
	
	menu_item.ingredients = [ ];
	
	ingredient_count = parseFloat(prompt("How many ingredients does the item contain?"));

	for (var z = 0; z < ingredient_count; z++) 
	{
		var ingredient = prompt('What is ingredient ' + (z+1) );
		menu_item.ingredients.push(ingredient);
	};
	
menu[y].push(menu_item);

};
};

debugger;

for (var i = 0; i < menu.length ; i++) {
	
	console.log(menu[i].name);  
	
};*/

/*chylds way*/



var menu = {};
menu.sections = {};
menu.total_calories = 0;

menu.number_of_sections = parseInt(prompt('How many sections are on your menu?'));


for (var i = 0; i < menu.number_of_sections; i++)
{
	var section_name = prompt('What is the name of the section');
	menu.sections[section_name] = [];

}
var item = {};

var response =prompt('Menu Section or Blank to Exit?');
while(response)
{
	var item = {};
	item.name = prompt('Name?');
	item.calories = parseFloat(prompt('Calories?'));
	item.cost = parseFloat(prompt('Cost?'));
	item.ingredients = prompt('Ingredients?').split(', ');
	menu.sections[response].push(item);

	response = prompt('Menu Section or Blank to Exit?');
}

var section_list = Object.getOwnPropertyNames(menu.sections);


for (i = 0; i < section_list.length; i++)
{
	for ( var j =0 ; j < menu.sections[section_list[i]].length; j++)
	{
		menu.total_calories += menu.sections[section_list[i]][j].calories;
	}
}







