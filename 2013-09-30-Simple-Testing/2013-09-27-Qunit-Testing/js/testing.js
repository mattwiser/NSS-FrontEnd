/*
test("<name of function>", function(){
  deepEqual(<actual_value>, <expected_value>, "what is this test doing?");
  deepEqual(<actual_value>, <expected_value>, "testing this function with different values");
});
*/

test("1+1", function(){
  deepEqual(1+1, 2, "adding 1 and 1");
});

test("nashville[0]", function(){
  deepEqual("nashville"[0], "n", "find first letter");
});

test("add 3", function(){
  deepEqual(add_3(3), 6, "add 3 test");
  deepEqual(add_3(7), 10, "add 3 test");
});

test("square", function(){
  deepEqual(square(3), 9, "square 3 test");
  deepEqual(square(5), 25, "square 5 test");
});

test("area", function(){
  deepEqual(area(3, 5), 15, "area of 3, 5 test");
  deepEqual(area(7, 5), 35, "area of 7, 5 test");
});

test("volume", function(){
  deepEqual(volume(3, 5, 2), 30, "volume of 3, 5, 2 test");
  deepEqual(volume(7, 5, 2), 70, "volume of 7, 5, 2 test");
});

test("power", function(){
  deepEqual(power(3, 2), 9, "power 3^2 test");
  deepEqual(power(5, 2), 25, "power 5^2 test");
  deepEqual(power(5, 1), 5, "power 5^1 test");
  deepEqual(power(5, 0), 1, "power 5^0 test");
});

test("greetings", function(){

  deepEqual(greeting("hello", "janet"), "hello, janet!", "teesting janet")

})
