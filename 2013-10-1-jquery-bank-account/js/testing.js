test('deposit', function(){

  deepEqual(deposit(100, 1000), 1100, 'test deposit func')
})

test('withdraw', function(){

  deepEqual(withdraw(100, 1000), 900, 'test withdraw func')
})