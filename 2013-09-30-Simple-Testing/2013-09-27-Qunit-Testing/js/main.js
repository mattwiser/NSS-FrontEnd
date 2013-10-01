function add_3(num)
{
  return num + 3;
}

function square(base)
{
  return base*base
}

function area(length, width)
{
  return length * width;
}

function volume(length, width, height)
{
  return area(length, width)*height
}

function power(base, exponent)
{
  var sum = 1;

  for (var i = 0; i < exponent; i++) {

    sum *= base

  };

return sum;
}

function greeting(greeting, name)
{
  return greeting +", "+name+"!"
}