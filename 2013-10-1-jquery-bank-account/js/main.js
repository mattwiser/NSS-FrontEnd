function deposit(deposit, balance)
{
  return deposit + balance;
}

function withdraw(withdraw, balance)
{
  return balance - withdraw;
}



$(document).ready(init)

function init() {


$('#deposit_btn').click(dep_func);
$('#withdraw_btn').click(with_func);


}

function dep_func()
{

  var balance = $('#balance').val();
  balance = parseInt(balance);

  var dep_amt = $('#value').val()
  dep_amt = parseInt(dep_amt);

  return $('#balance').val(dep_amt+balance);

  if ($('#balance').val() > 0) {$('#balance').removeClass('red')};



}

function with_func()
{
  var balance = $('#balance').val();
  balance = parseInt(balance);

  var with_amt = $('#value').val()
  with_amt = parseInt(with_amt);

  return $('#balance').val(balance - with_amt);


  if ($('#balance').val() < 0) {$('#balance').addClass('red')};



}

