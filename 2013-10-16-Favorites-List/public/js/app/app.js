'use strict';

// Firebase Schema
var Δdb;
var Δpositions;
var Δfavorites;

// Local Schema (defined in keys.js)
db.locations = [];
db.watchId = {};
$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δfavorites = Δdb.child('favorites');
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbLocationAdded);
  $('#start').click(clickStart);
  $('#stop').click(clickStop);
  initMap(36, -86, 5);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart(){
  var geoOptions = { enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);


}

function clickStop(){

}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(0, 0), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function geoSuccess(location){
  var position = {};
  position.lat = location.coords.latitude;
  position.lng = location.coords.longitude;
  position.alt = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');
  Δpositions.push(position);
  console.log('fuck');
}
function geoError(){
  console.log('Geo Lock Failed');
}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function dbLocationAdded(snapshot){
  var location = snapshot.val();
  var latLng = new google.maps.LatLng(location.lat, location.lng);
  db.locations.push(location);
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

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
