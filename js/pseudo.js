// Express/passwordless is going to give us an ID for a particular email.

function renderUser(id) {
    window.location.assign("http://www.ourhosthere.com/" + id);
}
// Of course, this is all then plainly available to anyone with an ID...


function buildQuery(query) {
  // Code for accessing API Here
  /*
  (
  node
    ["amenity"="fire_station"]
    (50.6,7.0,50.8,7.3);
  way
    ["amenity"="fire_station"]
    (50.6,7.0,50.8,7.3);
  rel
    ["amenity"="fire_station"]
    (50.6,7.0,50.8,7.3);
);
(._;>;);
out;
*/

// Split results at each returned node
// Code Here

// Parse values of each node and display
  results.forEach(parseReturn);
}

function parseReturn (result) {
  var searchResult = $("<div>").appendTo("body");
  $("<H2>").innerHTML(result.tags.name).appendTo(searchResult);
  $("<p>").innerHTML("The flowers were nice.").appendTo(searchResult); //TODO: some other description here
  $("<div id='map'>").innerHTML("map data here").appendTo(searchResult);
}

/* Sample node returned:
{
  "type": "node",
  "id": 257510608,
  "lat": 50.7721193,
  "lon": 7.2104840,
  "tags": {
    "addr:city": "Sankt Augustin",
    "addr:country": "DE",
    "addr:housenumber": "4",
    "addr:postcode": "53757",
    "addr:street": "Schulstraße",
    "amenity": "fire_station",
    "name": "Löschgruppe Niederpleis",
    "operator": "Freiwillige Feuerwehr Sankt Augustin",
    "website": "http://www.lgniederpleis.de/"
  }
*/
