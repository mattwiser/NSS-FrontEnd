test('piggy latin', function(){

  deepEqual(pig_latin('hello'), 'ellohay', 'test latin func')
})

test('reversal', function(){

  deepEqual(reversal_restitch('boy, girl, poop'), 'ooppay; irlgay; oybay', 'test reverse func')
})