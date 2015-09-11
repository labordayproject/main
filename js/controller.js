angular.module('myApp', []);
angular.module('myApp').controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $http) {
  console.log('Hello world from controller');

  var refresh = function() {
    $http.get('http://localhost:3000/users').success(function(response) {
      console.log('I got the data I requested');
      console.log(response);
      $scope.people = response;
      console.log($scope.people);
      $scope.user = '';
    });
  };

  refresh();

  $scope.addUser = function() {
    console.log($scope.user);
    $http.post('http://localhost:3000/users', $scope.user).success(function(response) {
      console.log(response);
      refresh();
    });
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('http://localhost:3000/users/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('http://localhost:3000/users/' + id).success(function(response) {
      $scope.user = response;
    });
  };

  $scope.update = function() {
    console.log($scope.user._id);
    $http.put('http://localhost:3000/users/' + $scope.user._id, $scope.user).success(function(response) {
      refresh();
    });
  };
};
