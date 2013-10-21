'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
 initialize(null, true);
}

function teardownTest(){
}

test('Calculate 2 Numbers', function(){
  expect(4);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('*');
  $('#calc').trigger('click');

  deepEqual($('#op1').val(), '', 'op1 should be blank');
  deepEqual($('#op2').val(), '', 'op2 should be blank');
  deepEqual($('#operator').val(), '', 'operator should be blank');
  deepEqual($('#result').text(), '6', 'result should be equal to 6');
});

test('Papertrail', function(){
  expect(2);

  $('#op1').val('3');
  $('#op2').val('2');
  $('#operator').val('+');
  $('#calc').trigger('click');

  deepEqual($('#history > li').length, 1, 'should be 1 li');

  $('#op1').val('7');
  $('#op2').val('8');
  $('#operator').val('*');
  $('#calc').trigger('click');

  deepEqual($('#history > li').length, 2, 'should be 2 li');

});

test('')