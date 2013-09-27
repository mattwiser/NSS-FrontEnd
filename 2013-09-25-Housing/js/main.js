/*var house = [ ];
var total_windows = 0;
var total_square_ft = 0;

function sq_ft(length, width)
{
  return length * width
}

var total_rooms = prompt('How many rooms do you want?');
var total_rooms = parseFloat(total_rooms);



for (var i = total_rooms; i > 0; i--)
{
  var room = { };
  room.name = prompt('What is the Room Name?');
  room.length = parseFloat(prompt ('How Long is the Room?'));
  room.width = parseFloat(prompt ('How Wide is the Room?'));
  room.window = parseFloat(prompt ('How Many Windows in the Room?'));
  house.push(room);
}


for (i = 0;  i < total_rooms ; i++)
{
  total_windows += house[i].window;
  total_square_ft += sq_ft(house[i].length, house[i].width);
};

var sq_ft_price = total_square_ft * 200;
var window_price = total_windows * 250;
var total_cost = sq_ft_price + window_price;

console.log('The total price is:' + total_cost);
console.log('The total price of rooms is :' + sq_ft_price);
console.log('The total window price is:' + total_windows);
console.log('The total number of rooms is:' + total_rooms);
console.log('The total square feet are :' + total_square_ft);
console.log('The total window number is :' + total_windows);*/


/*chylds way*/
function area(l, w)
{
  return l * w;
};

const PRICE_PER_SQFT = 200;
const PRICE_PER_WINDOW -250;

var house = {};
house.number_of_rooms = parseInt(prompt('Number of Rooms?'));
house.number_of_windows = 0
house.area = 0;
house.rooms = [];

for(var i = 0; i < house.number_of_rooms; i++)
{
  var room = {};
  room.name = prompt('');
  room.length = parseFloat(prompt(''));
  rom.windows = parseFloat(prompt(''));
  house.number_of_windows += room.windows;
  room.width = parseFloat(prompt(''));
  room.area = area(room.length, room.width);
  house.area += room.area;
  rooms.push(room);
  house.rooms.push(room);
};

house.area_cost = house.area * PRICE_PER_SQFT;
house.window_cost = house.number_of_windows * PRICE_PER_WINDOW;
house.total_cost = house.area_cost + house.window_cost;




