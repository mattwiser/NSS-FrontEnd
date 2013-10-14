'use strict';
// Local Schemata
var db = {};
db.contacts = [];

// Cloud Schema
var Δdb;
var Δcontacts;

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase('https://address-book.firebaseio.com/');
  Δcontacts = Δdb.child('contacts');
  Δcontacts.on('child_added', entryPopulator);
  $('#submit').click(submitContact);


}



function submitContact(){
  var name = $('#name').val();
  var address = $('#address').val();
  var phone = $('#phone').val();
  var country = $('#country').val();
  var photo = $('#photo').val();

  var contact = {};
  contact.name = name;
  contact.address = address;
  contact.phone = phone;
  contact.country = country;
  contact.photo = photo;

  Δcontacts.push(contact);

}

function entryCreator(contact){
  var $div = $('<li class = "contact"></li>');

  var name = contact.name;
  var address = contact.address;
  var phone = contact.phone;
  var country = contact.country;
  var photo = contact.photo;

  $div.append($('<p class = "name"></p>').text(name));
  $div.append($('<a class = "address"></a>').text(address));
  $div.append($('<p class = "phone"></p>').text(phone));
  $div.append($('<p class = "country"></p>').text(country));

  var img = $('<img></img>');
  img.attr('src', photo);
  img.attr('width', '150px');
  img.attr('height', '150px');
  img.attr('overflow', 'hidden');
  $div.prepend(img);

  db.contacts.push(contact);
  $('#list').prepend($div);
}

function entryPopulator(snapshot){
  var contact = snapshot.val();
  entryCreator(contact);
  codeAddress(contact.address);
};



var geocoder;
var map;


function init() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(36.1667, -86.7833);
  var mapOptions = {
    zoom: 11,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function codeAddress(address) {
  var address = address;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}



google.maps.event.addDomListener(window, 'load', init);


function getValue(selector, fn){
  var value = $(selector).val();
  $selector.val('');

  if(fn){
    value = fn(value)
  }
  return value;
}






