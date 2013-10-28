'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  turnHandlersOff();
  turnHandlersOn();
  db.products = [];
  db.customers = [];
  db.orders = [];
  db.cart = {};
  db.cart.totals = {};
  db.cart.products = [];
  db.pagination.currentRowCount = 0;
  db.pagination.currentPage = 1;
  Δdb.remove();
  // $('#cart tbody').empty();
}

function teardownTest(){
}

test('Add Product', function(){
  expect(12);

  $('#product-image').val('ipad-air.png');
  $('#product-name').val('Ipad Air');
  $('#product-weight').val('1.0');
  $('#product-price').val('500.00');
  $('#product-off').val('10');
  $('#add-product').trigger('click');

  equal(db.products.length, 1, 'products array should have 1 element');
  ok(db.products[0].id, 'id should be populated');
  ok(db.products[0] instanceof Product, 'product should be an instanceof Product');
  equal(db.products[0].image, 'ipad-air.png', 'product should have an image');
  equal(db.products[0].name, 'Ipad Air', 'product should have a name');
  equal(db.products[0].weight, 1.0, 'product should have a weight');
  QUnit.close(db.products[0].salePrice(), 450, 0.01, 'product should have a sale price');

  equal($('#products tr').length, 2, 'should be 2 rows in table');
  equal($('#products tr:nth-child(2) > td').length, 6, 'should be 6 columns in row');
  equal($('#products .product-name').text(), 'Ipad Air', 'name column should be populated');
  equal($('#products .product-sale').text(), '$450.00', 'sale column should be populated');
  equal($('#products .product-image img').attr('src'), '/img/ipad-air.png', 'image column should be populated');
});

test('Product Pagination', function(){
  expect(18);

  for(var i = 0; i < 12; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var weight = Math.random() * 100;
    var price = Math.random() * 1000;
    var off = Math.random() * 100;

    createTestProduct(name, image, weight, price, off);
  }

  equal(db.products.length, 12, 'should have 12 products');
  equal(db.pagination.perPage, 5, 'should be 5 products per page');
  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  equal($('#previous.hidden').length, 1, 'previous button should be hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 2, 'should be on second page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next:not(.hidden)').length, 1, 'next button should not be hidden');

  $('#next').trigger('click');

  equal(db.pagination.currentPage, 3, 'should be on third page');
  equal($('#products tr').length, 3, 'should have 2 products in table');
  equal($('#previous:not(.hidden)').length, 1, 'previous button should not be hidden');
  equal($('#next.hidden').length, 1, 'next button should be hidden');

  $('#previous').trigger('click');
  $('#previous').trigger('click');

  equal(db.pagination.currentPage, 1, 'should be on first page');
  equal($('#products tr').length, 6, 'should have 5 products in table');
  ok($('#previous').hasClass('hidden'), 'previous button should be hidden');
  ok(!$('#next').hasClass('hidden'), 'next button should not be hidden');
});


test('Radio Buttons', function(){
  expect(7);

  $('#customer-image').val('bob.png');
  $('#customer-name').val('Bob Jenkins');
  $('#domestic')[0].checked = true;
  $('#add-customer').trigger('click');

  equal(db.customers.length, 1, 'should have one customer in array');
  equal(db.customers[0] instanceof Customer, true, 'customer object should be Customer type');
  equal(db.customers[0].name, 'Bob Jenkins', 'name should be present');
  equal(db.customers[0].image, 'bob.png', 'image should be present');
  ok(db.customers[0].id, 'id shoud be present');
  ok(db.customers[0].isDomestic, 'should be domestic');

  ok(!$('#domestic')[0].checked, 'domestic should not be checked');
});

test('Customer Dropdown',function(){
  expect(7);

  for(var i = 0; i < 5; i++){
    var name = Math.random().toString(36).substring(2);
    var image = Math.random().toString(36).substring(2) + '.png';
    var isDomestic = _.shuffle([true, false])[0];

    createTestCustomer(name, image, isDomestic);
  }
  createTestCustomer('bob', 'bob.png', true);

// table headers
// name, count, amount, weight, shipping, total

  equal(db.customers.length, 6, 'there should be 6 customers in the array');
  equal($('select#select-customer option').length, 6, 'there should be 6 option tags');
  equal($('select#select-customer option:nth-child(1)').val(), 'bob', 'bob value should on top of the list');
  equal($('select#select-customer option:nth-child(1)').text(), 'bob', 'bob text should on top of the list');
  ok($('table#cart').length, 'shopping cart should be visible');
  ok($('#purchase').length, 'purchase button should be visible');
  equal($('table#cart th').length, 6, 'there should be 6 columns');

});


test('Add Items to Shopping Cart', function(){
  expect(19);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); //Sale price will be 450
  createTestProduct('iPad Mini', 'ipad-mini.png', 0.8, 400, 0); //sale 200
  createTestProduct('iPad 2', 'ipad-2.png', 1.4, 400, 10); //sale 360

  createTestCustomer('bob', 'bob.png', true);
  createTestCustomer('sally', 'sally.png', false);

  $('#select-customer').val('sally');
  $('#select-customer').trigger('change');

  //2 ipad minis
  $('#products tr:nth-child(3) .product-image img').trigger('click');
  $('#products tr:nth-child(3) .product-image img').trigger('click');
  //1 ipad air
  $('#products tr:nth-child(2) .product-image img').trigger('click');
  // 1 ipad 2
  $('#products tr:nth-child(4) .product-image img').trigger('click');

  equal(db.cart.customer.name, 'sally', 'cart should belong to sally');
  ok(db.cart.customer instanceof Customer, 'sally should be an instance of Customer');
  equal(db.cart.products.length, 4, 'There should be 4 Product Objects in db.cart.products array');
  ok(db.cart.products[0] instanceof Product, 'The items in db.cart.products array should be constructed with Product constructor');
  equal(db.cart.totals.count, 4, 'The value of db.cart.totals.count (the total number of purchased products) should be 4');
  equal(db.cart.totals.amount, 1610, 'The value of db.totals.amount (the total cost of products without shipping) should be 1610');
  equal(db.cart.totals.weight, 4,'The value of db.totals.weight (total weight of items) should be 4');
//domestic is 50 cents per lb, international is 1.50 per lb
  equal(db.cart.totals.shipping, 6, 'shipping should be 6 dollars');
  equal(db.cart.totals.grand, 1616, 'The grand total of db.cart.totals.grand should be 1616');

  equal($('#cart thead tr').length, 1, 'there shold be 1 table header');
  equal($('#cart tfoot tr').length, 1, 'there should be 1 table footer');
  equal($('#cart tbody tr').length, 3, 'there should be 3 items in table body');

  equal($('#cart tbody tr:nth-child(1) .product-name').text(),'iPad Mini','name cell text should be ipad Mini');
  equal($('#cart tbody tr:nth-child(1) .product-count').text(),'2','product cell text should be 2');


  equal($('#cart tfoot tr #cart-count').text(),'4', 'cart count should have 4 items');
  equal($('#cart tfoot tr #cart-amount').text(),'$1610.00', 'cart amount should be 1610 dollars');
  equal($('#cart tfoot tr #cart-weight').text(),'4', 'cart weight should be 4lbs');
  equal($('#cart tfoot tr #cart-shipping').text(),'$6.00', 'cart shipping total should be 6 dollars');
  equal($('#cart tfoot tr #cart-grand').text(),'$1616.00', 'cart grand total should be $1616.00');



});


test('Add Order', function(){
  expect(13);

  createTestProduct('iPad Air', 'ipad-air.png', 1, 500, 10); // sale - 450
  createTestProduct('iPhone 5s', 'iphone-5s.png', 0.5, 200, 0); // sale - 200
  createTestProduct('Apple TV', 'apple-tv.png', 1.5, 100, 5); // sale - 95

  createTestCustomer('Bob', 'bob.png', true);
  createTestCustomer('Sally', 'sally.png', false);

  $('select#select-customer').val('Sally');
  $('select#select-customer').trigger('change');

  // 2 iphone 5s
  $('#products tr:nth-child(3) .product-image img').trigger('click');
  $('#products tr:nth-child(3) .product-image img').trigger('click');

  // 1 ipad air
  $('#products tr:nth-child(2) .product-image img').trigger('click');

  // 1 apple tv
  $('#products tr:nth-child(4) .product-image img').trigger('click');
  $('#purchase').trigger('click');

  equal($('#cart tbody tr').length, 0, 'should be no rows in tbody after purchase');
  equal($('#cart-grand').text(), '', 'should be no grand total after purchase');
  // equal($('#select-customer').val(), 'default', 'drop down should default after purchase');
  equal(db.orders.length, 1, 'should be 1 order after purchase');
  ok(db.orders[0] instanceof Order, 'should be an Order instance after purchase');
  ok(db.orders[0].id, 'should have an ID after purchase');
  equal($('#orders thead th').length, 6, 'should have 6 columns in orders table');
  equal($('#orders tbody tr').length, 1, 'should have 1 row in orders table body');
  equal($('#orders tbody .order-time').text().split(' ').length, 5, 'date time should be formatted');
  equal($('#orders tbody .order-customer').text(), 'Sally', 'should have customers name');
  equal($('#orders tbody .order-total').text(), '$945.00', 'should have customers total');
  equal($('#orders tbody .order-shipping').text(), '$5.25', 'should have customers shipping');
  equal($('#orders tbody .order-grand').text(), '$950.25', 'should have customers grand');
  equal($('#orders tbody .order-products-list li').length, 4, 'should have 4 items in order');
});

function createTestProduct(name, image, weight, price, off){
  $('#product-name').val(name);
  $('#product-image').val(image);
  $('#product-weight').val(weight);
  $('#product-price').val(price);
  $('#product-off').val(off);
  $('#add-product').trigger('click');
}

function createTestCustomer(name, image, isDomestic){
  $('#customer-name').val(name);
  $('#customer-image').val(image);

  if (isDomestic){
    $('#domestic')[0].checked = true;
  } else {
    $('#international')[0].checked = true;
  }

  $('#add-customer').trigger('click');
}


