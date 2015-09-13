

/*========================================================================
 * trails is populated with trail objects returned by searchResults
 * onLoad trails is an empty array. It is populated only when the client
 * submits a search request from the main page. It is repopulated on each
 * successive submit.
 *=======================================================================*/

var trails = []; // => [{trail}, {trail}, {trail}, ...]


/*========================================================================
 * outer function searchResults is required to prevent the submit event from
 * refreshing the entire page (.preventDefault).
 *
 * getTrails defines the ajax call, and allows for variables to be used in
 * the HTTP request. It's .done callback resets the value of trails. this
 * is the only way to capture the return from an async request.
 *
 * searchSubmit sanitizes the client's search input, and parses out the
 * city and state. these can now be passed as arguments for getTrails.
 *
 * finally searchResults runs getTrails using two calls to searchSubmit
 * as arguments.
 *=======================================================================*/

function searchResults ( event ) {

	event.preventDefault();

	console.log( 'no refresh!' );

	function getTrails ( city, state ) {

		var url = 'https://outdoor-data-api.herokuapp.com/api.json?api_key=28f730adcde18a08dfa7dc5198840b3d&q[city_cont]='+city+'&q[state_cont]='+state+'&q[activities_activity_type_name_eq]=hiking';

		function callback ( results ) {

			trails = results.places.map( function( trail ){ return trail } )
			//$.ajax( "localhost:3000", { method: 'POST' }  ).done( function(){ trails = trails } );
		}

		$.ajax( url, { method:'GET', dataType:'jsonp' }).done(callback);
	};

	function searchSubmit ( scope ){

		var $searchText = $('#searchbar').val().toString();
		var $city  = function(){ return $searchText.split(', ')[0] };
		var $state = function(){ return $searchText.split(', ')[1] };

		if ( scope === 'city' ){
			return $city() === undefined ? '' : $city();
		}

		else {
			return $state() === undefined ? '' : $state();
		}
	}

	getTrails( searchSubmit( 'city' ), searchSubmit( 'state' ) );

}



/*========================================================================
 * line 67 defines an event listener on the form containg the searchbar.
 * it calls searchResults on submit, making new user defined trail data available.
 *=======================================================================*/

$('#searchform').submit( searchResults );



/*========================================================================
 * Data handling
 *=======================================================================*/

angular.module('myApp', []);
angular.module('myApp').controller('AppCtrl', AppCtrl);

function AppCtrl($scope, $http) {
	console.log('Hello world from controller');

	// function addTrail() {
	// 	console.log(trails[0]);
	// 	$http.post('http://localhost:3000/users', trails[0]).success(function(response) {
	// 		console.log(response);
	// 	});
	// };
  //
	// $(".btn-lg").click(addTrail);

	$scope.addTrail = function() {
		console.log(trails[0]);
		$http.post('http://localhost:3000/users', trails[0]).success(function(response) {
			console.log(response);
		});
	};
};
