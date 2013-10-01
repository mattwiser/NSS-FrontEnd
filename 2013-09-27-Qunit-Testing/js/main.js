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

function pig_latin(string)
{

  return string.slice(1)+string[0]+"ay"
}

function pig_greeting(greeting, name)
{
  return pig_latin(greeting) + ", " + pig_latin(name) + "!"
}

function pig_sentence(sentence)
{
  var sent_array = sentence.split(" ");
  var latin_array = [];

  for (var i = 0; i < sent_array.length; i++)

    {
      latin_array.push(pig_latin(sent_array[i]))
    };

return latin_array.join(' ');
}