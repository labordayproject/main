var express = require('express');
var app = express();
var jsdom = require("jsdom");
$ = require("jquery")(jsdom.jsdom().createWindow());
//URL Declaration
var url = 'https://outdoor-data-api.herokuapp.com/api.json?api_key=28f730adcde18a08dfa7dc5198840b3d&q[city_cont]='+city+'&q[state_cont]='+state+'&lat='+lat+'&lon='+long+'';

// var longest = $.ajax('https://maps.googleapis.com/maps/api/geocode/json?address='+zip+'&key=AIzaSyAQd8ISKvr87dAMkzzQOSnx9BzGHCtamLE');
// var latest = $.ajax('https://maps.googleapis.com/maps/api/geocode/json?address='+zip+'&key=AIzaSyAQd8ISKvr87dAMkzzQOSnx9BzGHCtamLE');
// var lat = latest.responseJSON.results[0].geometry.bounds.northeast.lat;
// var long = longest.responseJSON.results[0].geometry.bounds.northeast.lng;

//This turns zipcodes into lat/long:
var zipped = function ( zipcode ) {
  var longest = $.ajax('https://maps.googleapis.com/maps/api/geocode/json?address='+zipcode+'&key=AIzaSyAQd8ISKvr87dAMkzzQOSnx9BzGHCtamLE');
  var latest = $.ajax('https://maps.googleapis.com/maps/api/geocode/json?address='+zipcode+'&key=AIzaSyAQd8ISKvr87dAMkzzQOSnx9BzGHCtamLE');
  return [latest,longest];
};

//Extracts latitude from object returned by zipped:
function latitude (obj) {
  var lat = obj[0].responseJSON.results[0].geometry.bounds.northeast.lat;
  console.log(obj[0].responseJSON);
  return lat;
}

//Extracts longitude from object returned by zipped:
function longitude (obj) {
  var long = obj[1].responseJSON.results[0].geometry.bounds.northeast.lng;
  return long;
}

//This function should take the input and return arrays of city/state or lat/long;
function input() {

if ($("#input").val().length === 5) {
  var obj = zipped(($("#input").val()));
  var lat = latitude(obj);
  var long = longitude(obj);
  return [lat, long];
}
else {
  var string = $("#input").val();
  var array = string.split(" ");
  var str = array[0];
  var city = str.replace(/\,/g,"");
  var state = array[1];
  return [city, state];
}
}

function citify() {
  var city = input()[0];
  return city;
}

function statify() {
  var state = input()[1];
  return state;
}

function latify() {
  var lat = input()[0];
  return lat;
}

function longify() {
  var long = input()[1];
  return long;
}

var city = citify();
var state = statify();
var lat = latify();
var long = longify();

//This is the main trail API call function
var getTrails = function (city, state, lat, long) {
  var url = 'https://outdoor-data-api.herokuapp.com/api.json?api_key=28f730adcde18a08dfa7dc5198840b3d&q[city_cont]='+city+'&q[state_cont]='+state+'&lat='+lat+'&lon='+long+'';
  var obj = $.ajax(url,{
  method:'GET',
  dataType:'jsonp'
});
return obj;
};
