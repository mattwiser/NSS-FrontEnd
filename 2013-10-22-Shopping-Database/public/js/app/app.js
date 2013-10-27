'use strict';

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

// Firebase Schema
var Δdb;
var Δproducts;
var Δcustomers;
var Δorders;

// Local Schema (defined in keys.js)
db.products = db.customers = db.orders = [];
db.pagination = {};
db.pagination.perPage = 5;
db.pagination.currentPage = 1;
db.pagination.currentRowCount = 0;
db.cart = {};
db.cart.totals = {};
db.cart.products = [];


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  initializeDatabase();
  turnHandlersOn();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initializeDatabase(){
  Δdb = new Firebase(db.keys.firebase);
  Δproducts = Δdb.child('products');
  Δcustomers = Δdb.child('customers');
  Δorders = Δdb.child('orders');

  Δproducts.on('child_added', dbProductAdded);
  Δcustomers.on('child_added', dbCustomerAdded);
  Δorders.on('child_added', dbOrderAdded);
}

function turnHandlersOn(){
  $('#add-product').on('click', clickAddProduct);
  $('#previous').on('click', clickNavigation);
  $('#next').on('click', clickNavigation);
  $('#add-customer').on('click', clickAddCustomer);
  $('#select-customer').on('change', selectCustomer);
  $('#products').on('click', '.product-image img',cartClickItem);
}

function turnHandlersOff(){
  $('#add-product').off('click');
  $('#previous').off('click');
  $('#next').off('click');
  $('#add-customer').off('click');
  $('#select-customer').off('change');
  $('#products').off('click', '.product-image img',cartClickItem);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function cartClickItem(){
  var cells = $(this).parent();
  cells = $(cells).parent();
  cells = $(cells).children();

  var name = cells[1];
  name = name.textContent;

  var cartProduct = _.find(db.products, function(c){return c.name === name;});

  db.cart.products.push(cartProduct);
  totalMaker(db.cart.products);
  htmlAddtoCart(cartProduct);
}


function htmlAddtoCart(product){

  var rows =$('#cart >tbody').children();



  if (_.find(rows, function(c){

    c = c.children;
    c =$(c[1]).text();
    return c === product.name;

  })) {

    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      row = row.children;
      for (var x = 0; x < row.length; x++) {
        if (row[x].textContent === product.name) {
          var total = parseInt(rows[i].children[3].textContent, 10);
          total++;
          $(rows[i].children[3]).text(total);
        }
      }
    }


  }

  else {

    var $row = $('<tr>');

    var $image = $('<td>');
    $image.append($('<img>'));

    var img = $image.children();
    $(img).attr('src', 'img/'+product.image);

    $image.addClass('product-image');

    var $name = $('<td>');
    $name.addClass('product-name');
    $name.text(product.name);

    var $price = $('<td>');
    $price.addClass('product-price');
    $price.text(product.price);

    var $count = $('<td>');
    $count.addClass('product-count');
    $count.text(1);

    $row.append($image);
    $row.append($name);
    $row.append($price);
    $row.append($count);




    $('#cart tbody').append($row);
  }
}

function totalMaker(array){

  var sum = 0;
  var weight = 0;

  for (var i = 0; i < array.length; i++) {
    var salePrice = array[i].price - (array[i].price * array[i].off);
    sum += salePrice;
    weight += array[i].weight;
  }

  db.cart.totals.count = array.length;
  db.cart.totals.amount = sum;
  db.cart.totals.weight = weight;
  db.cart.totals.shipping = calculateShipping();
  db.cart.totals.grand = db.cart.totals.shipping +  db.cart.totals.amount;

  $('#cart-count').text(db.cart.totals.count);
  $('#cart-amount').text(formatCurrency(db.cart.totals.amount));
  $('#cart-weight').text(db.cart.totals.weight);
  $('#cart-shipping').text(formatCurrency(db.cart.totals.shipping));
  $('#cart-grand').text(formatCurrency(db.cart.totals.grand));
}

function selectCustomer(){
  var name = this.value;
  var customer = _.find(db.customers, function(c){return c.name === name;});
  db.cart.customer = customer;
}

function calculateShipping(){
  if (db.cart.customer.isDomestic === true) {
    return (db.cart.totals.weight * .50);
  } else{
    return (db.cart.totals.weight * 1.50);
  }
}

function clickAddCustomer(){
  var name = getValue('#customer-name');
  var image = getValue('#customer-image');
  var isDomestic = $('#domestic')[0].checked;

  var customer = new Customer(name, image, isDomestic);
  Δcustomers.push(customer);
  htmlClearRadio();


}

function clickAddProduct(){
  var image = getValue('#product-image');
  var name = getValue('#product-name');
  var weight = getValue('#product-weight', parseFloat);
  var price = getValue('#product-price', parseFloat);
  var off = getValue('#product-off', parseFloat) / 100;

  var product = new Product(image, name, weight, price, off);
  delete product.salePrice;
  Δproducts.push(product);
}

function clickNavigation(){
  db.pagination.currentRowCount = 0;
  htmlEmptyProductRows();

  var isPrevious = this.id === 'previous';
  db.pagination.currentPage += isPrevious ? -1 : +1;

  var startIndex = db.pagination.perPage * (db.pagination.currentPage - 1);
  var endLength = (startIndex + db.pagination.perPage) > db.products.length ? db.products.length : startIndex + db.pagination.perPage;
  var isLess = startIndex > 0;
  var isMore = db.products.length > endLength;

  htmlShowHideNavigation('#previous', isLess);
  htmlShowHideNavigation('#next', isMore);

  for(var i = startIndex; i < endLength; i++){
    htmlAddProduct(db.products[i]);
  }
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbProductAdded(snapshot){
  var obj = snapshot.val();
  var product = new Product(obj.image, obj.name, obj.weight, obj.price, obj.off);
  product.id = snapshot.name();
  db.products.push(product);
  if(db.pagination.currentRowCount < db.pagination.perPage){
    htmlAddProduct(product);
  } else {
    htmlShowHideNavigation('#next', true);
  }
}

function dbCustomerAdded(snapshot){
  var obj = snapshot.val();
  var customer = new Customer(obj.name, obj.image, obj.isDomestic);
  customer.id = snapshot.name();
  db.customers.push(customer);
  htmlAddCustomertoSelect(customer);
}

function dbOrderAdded(snapshot){
  var order = snapshot.val();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddCustomertoSelect(customer){
  var $option = $('<option>');
  $option.val(customer.name);
  $option.text(customer.name);
  $('#select-customer').prepend($option);
}

function htmlClearRadio(){
  // $('#domestic').prop('checked', false);
  // $('#international').prop('checked', false);

  $('input[name=address]:checked')[0].checked=false;
}

function htmlAddProduct(product){
  db.pagination.currentRowCount++;
  var tr = '<tr class="product"><td class="product-image"><img src="/img/' + product.image + '"></td><td class="product-name">' + product.name + '</td><td class="product-weight">' + product.weight + ' lbs</td><td class="product-price">' + formatCurrency(product.price) + '</td><td class="product-off">' + product.off + '</td><td class="product-sale">' + formatCurrency(product.salePrice()) + '</td></tr>';
  var $tr = $(tr);
  $('#products').append($tr);
}

function htmlShowHideNavigation(selector, shouldShow){
  $(selector).removeClass('hidden');

  if(!shouldShow){
    $(selector).addClass('hidden');
  }
}

function htmlEmptyProductRows(){
  $('.product').remove();
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function Product(image, name, weight, price, off){
  this.image = image;
  this.name = name;
  this.weight = weight;
  this.price = price;
  this.off = off;
  this.salePrice = function(){return this.price - (this.price * this.off);};
}

function Customer(name, image, isDomestic){
  this.name = name;
  this.image = image;
  this.isDomestic = isDomestic;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

function parseUpperCase(string){
  return string.toUpperCase();
}

function parseLowerCase(string){
  return string.toLowerCase();
}

function formatCurrency(number){
  return '$' + number.toFixed(2);
}

function formatWeight(number){
  number.toFixed(1);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
