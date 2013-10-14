'use strict';
//Firebase Schema
var Δdb;
var Δbalance;
var Δtotal;
var Δstock;
var Δcash;
var Δstocks;
//Local Schema
var db = {};
db.balance = {};
db.balance.total = 0;
db.balance.stock = 0;
db.balance.cash = 0;
db.stocks = [];


$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://stock-market.firebaseio.com/');
  Δbalance = Δdb.child('balance');
  Δtotal = Δbalance.child('total');
  Δstock = Δbalance.child('stock');
  Δcash = Δbalance.child('cash');
  Δstocks = Δdb.child('stocks');
  $('#stock-btn').click(purchase);
  $('#interval-btn').click();
  $('#funds-btn').click(setFunds);
  Δcash.on('value', refreshBalance);
  Δstocks.on('child_added', createRow);


}



function purchase(){
  var symbol = $('#stockSymbol').val();
  var quantity = $('#stockAmount').val();
  quantity = parseInt(quantity, 10);

  requestQuote(symbol, function(data){
    var quote = data.Data;

    if(quote.LastPrice * quantity <= db.balance.cash){
      db.balance.cash -= quote.LastPrice * quantity;
      db.balance.stock += quote.LastPrice * quantity;
      db.balance.total = db.balance.cash + db.balance.stock;
      Δcash.set(db.balance.cash);
      Δtotal.set(db.balance.total);
      Δstock.set(db.balance.stock);

      var stock = {};
      stock.name = quote.Name;
      stock.symbol = symbol;
      stock.purchasePrice = quote.LastPrice;
      stock.quantity = quantity;
      Δstocks.push(stock);
      db.stocks.push(stock);
    }

    $('#stockSymbol').val('');
    $('#stockAmount').val('');
  });
}


function requestQuote(symbol, fn){
  var data = {symbol: symbol};
  $.getJSON('http://dev.markitondemand.com/Api/Quote/jsonp?callback=?', data, fn);
}

function setFunds(){
    var total = $('#funds').val();
    Δtotal.set(total);
    $('#totalFunds').text(total);
    Δcash.set(total);
    db.balance.cash = parseFloat(total);
    $('#funds').val('');
  }

function refreshBalance(snapshot){
  $('#totalFunds').text(snapshot.val());
  db.balance.cash = parseFloat(snapshot.val());
}

function createRow(snapshot){
  var stock = snapshot.val();
  var $row = '<tr><td class="name"></td><td class="symbol"></td><td class="purchasedQuote"></td><td class="currentQuote"></td><td class="purchased"></td><td class="old-total"></td><td class="new-total"></td></tr>';
  $row = $($row);
  $row.children('.name').text(stock.name);
  $row.children('.symbol').text(stock.symbol);
  $row.addClass(stock.symbol).addClass('stock');
  var symbol = stock.symbol;

  $row.children('.purchasedQuote').text(stock.purchasePrice);
  $row.children('.currentQuote').text(currentQuote(symbol, $row, stock.quantity));
  $row.children('.purchased').text(stock.quantity);
  $row.children('.old-total').text(stock.quantity * stock.purchasePrice);
  $('#stock-list').append($row);
}

function currentQuote(symbol, row, quantity){
  requestQuote(symbol, function(data){
    var newQuote = data.Data.LastPrice;
    row.children('.currentQuote').text(newQuote);
    row.children('.new-total').text(newQuote * quantity );

  });
}