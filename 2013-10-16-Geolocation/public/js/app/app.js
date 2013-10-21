'use strict';

// Firebase Schema
var Δdb;
var Δpositions;

// Local Schema (defined in keys.js)
db.positions = [];
db.path = [];

//

$(document).ready(initialize);

function initialize(){
  $(document).foundation();
  Δdb = new Firebase(db.keys.firebase);
  Δpositions = Δdb.child('positions');
  Δpositions.on('child_added', dbPositionAdded);
  initMap(36, -86, 5);
  $('#start').click(clickStart);
  $('#erase').click(clickErase);

}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function clickStart(){

  var geoOptions = { enableHighAccuracy: true, maximumAge: 1000, timeout: 60000};
  db.watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
}

function clickErase(){
  var LatLng = new google.maps.LatLng(36, -86);
  Δpositions.remove();
  db.positions = [];
  db.path = [];
  db.map.setCenter(LatLng);
  db.map.setZoom(5);

}
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP, VisualRefresh: true};
  db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}


function geoSuccess(location) {
  var position = {};
  position.lat = location.coords.latitude;
  position.lng = location.coords.longitude;
  position.alt = location.coords.altitude || 0;
  position.time = moment().format('MMMM Do YYYY, h:mm:ss a');

  Δpositions.push(position);

}

function geoError() {
  console.log('Sorry, no position available.');
}



// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function dbPositionAdded(snapshot){
  var position = snapshot.val();



  var latLng = new google.maps.LatLng(position.lat, position.lng);
  db.positions.push(position);

  if (db.positions.length === 1) {

    htmlAddStartIcon(latLng);
    htmlAddPolyLine();
  }
  htmlCenterandZoom(latLng);
  db.path.push(latLng);
  db.marker.setPosition(latLng);
  $('#debug').text(position.time);
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function htmlAddPolyLine(){

  var polyLine = new google.maps.Polyline({

    map: db.map,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
  db.path = polyLine.getPath();

}

function htmlAddStartIcon(latLng){

  var image = '/img/3.png';
  db.marker = new google.maps.Marker({map: db.map, position: latLng, icon: image});
  htmlCenterandZoom(latLng);


}
function htmlCenterandZoom(position){
  db.map.setCenter(position);
  db.map.setZoom(18);
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
