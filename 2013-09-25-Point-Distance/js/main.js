var coord1 = [];
var coord2 = [];

for (var i = 0; i < 1; i++) {
  var x = prompt('Enter x-coordinate 1:');
  x=parseFloat(x);
  coord1.push(x);
  var y = prompt('Enter y-coordinate 1:');
  y=parseFloat(y);
  coord1.push(y);

};

for (var i = 0; i < 1; i++) {
  x = prompt('Enter x-coordinate 2:');
  x=parseFloat(x);
  coord2.push(x);
  y = prompt('Enter y-coordinate 2:');
  y=parseFloat(y);
  coord2.push(y);

};

var x_len = coord1[0]-coord2[0];
var y_len = coord1[1]-coord2[1];
var point_dist = Math.sqrt((Math.pow(x_len, 2))+(Math.pow(y_len, 2)))

console.log('The length of the x plane is: ' + x_len);
console.log('The length of the y plane is: ' + y_len);
console.log('The distance between the provided points is: ' + point_dist);