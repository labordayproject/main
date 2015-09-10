var express = require('express');
var app = express();
var request = require('request');
var geoData = require('./geo.json');
//Load fs module
var fs = require('fs');
var $ = require('jquery');
// var unirest = require('unirest');
//use form field to change variables:
//what these variables should look like:
//var firstName = document.getElementsByName("firstname")[0].value;
// console.log($.ajax());
//what they look like currently:
var latitude = null;
var limit = null;
var longitude = null;
var name = null;
var activity = "hiking";
var city = "portland";
var state = "oregon";
var zip = "97225";
var country;
var radius = 5;
var trailName = "";
var lat = geoData.results[0].geometry.location.lat;
var long = geoData.results[0].geometry.location.lng;

//var variableRequest = unirest.get("https://trailapi-trailapi.p.mashape.com/?limit=null&lon=null&q[activities_activity_name_cont]=null&q[activities_activity_type_name_eq]="+activity+"&q[city_cont]="+city+"&q[country_cont]="+country+"&q[state_cont]="+state+"&radius="+radius+"");
// unirest.get("https://outdoor-data-api.herokuapp.com/api.json?api_key=28f730adcde18a08dfa7dc5198840b3d&q[city_cont]=Portland&q[state_cont]=Oregon").end(function (result) {
//    return result.body;
// }).pipe(fs.createWriteStream('data1.json'));


//This calls on trailapi and gets us the data data
$.ajax('https://outdoor-data-api.herokuapp.com/api.json?api_key=28f730adcde18a08dfa7dc5198840b3d&q[city_cont]='+city+'&q[state_cont]='+state+'&lat='+lat+'&lon='+long+'');

//.pipe(fs.createWriteStream('data.json'));

//This calls google maps and gets lat/long from a zipcode
//request('https://maps.googleapis.com/maps/api/geocode/json?address='+zip+'&key=AIzaSyAQd8ISKvr87dAMkzzQOSnx9BzGHCtamLE').pipe(fs.createWriteStream('geo.json'));

//.pipe(fs.createWriteStream('data1.json'));


function myFunction() {
    var x = document.getElementById("frm1");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
        text += x.elements[i].value + "<br>";
    }
    document.getElementById("demo").innerHTML = text;
    var city = document.getElementsByName('city')[0].value;
    var state = document.getElementsByName('state')[0].value;
  //  request('https://outdoor-data-api.herokuapp.com/api.json?api_key=28f730adcde18a08dfa7dc5198840b3d&q[city_cont]='+city+'&q[state_cont]='+state+'');

}

//console.log(long);
