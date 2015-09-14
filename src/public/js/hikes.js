angular.module('myApp', []);
angular.module('myApp').controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $http) {
	console.log('Hello world from controller - hikes');

  $http.get('http://localhost:3000/trails').success(function(response) {
    console.log('I got the data I requested');
    console.log('Response: ', response);
    var userTrails = response[0].trails;
    console.log('User Trails: ', userTrails);

    var $results = $('.results');

    for(i = 0; i < userTrails.length; i++) {
      var $hike = $('<div>', {'class': 'hike', 'style': 'background-color: lightblue; width: 100%;'} );
      var $trailName = $('<h1>', {'class': 'trailName', 'style': 'text-align: center;'} ).html(userTrails[i].activities[0].name);
      var $length = $('<p>', {'class': 'length'} ).html('<b>Length:</b>  ' + userTrails[i].activities[0].length);
      var $description = $('<p>', {'class': 'description'} ).html('<b>Description:</b>  ' + userTrails[i].activities[0].description);
      var $nearestCity = $('<p>', {'class': 'nearestCity'} ).html('<b>Nearest City:</b>  ' + userTrails[i].city + ', ' + userTrails[i].state);

      $hike.append($trailName).append($length).append($description).append($nearestCity);
      $results.append($hike);
    };
  });
};
