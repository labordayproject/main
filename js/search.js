
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

	function getTrails ( city, state ) {

		var url = 'https://outdoor-data-api.herokuapp.com/api.json?api_key=28f730adcde18a08dfa7dc5198840b3d&q[city_cont]='+city+'&q[state_cont]='+state+'&q[activities_activity_type_name_eq]=hiking';

		function callback ( results ) {
			trails = results.places.map( function( trail ){ return trail; } );
		}

	$.ajax( url, { method:'GET', dataType:'jsonp' }).done(callback);

	}

	function searchSubmit ( scope ){

		var $searchText = $('#searchbar').val().toString();
		var $city  = function(){ return $searchText.split(', ')[0]; };
		var $state = function(){ return $searchText.split(', ')[1]; };


		if ( scope === 'city' ){
			return $city() === undefined ? '' : $city();
		}

		else {
			return $state() === undefined ? '' : $state();
		}
	}

	getTrails( searchSubmit( 'city' ), searchSubmit( 'state' ) );
	myFunction();
	myOtherFunction();
}



/*========================================================================
 * line 67 defines an event listener on the form containg the searchbar.
 * it calls searchResults on submit, making new user defined trail data available.
 *=======================================================================*/

$('.navbar-form').submit( searchResults );


//This is an attempt to implement reverse geocoding map:



//This is an attempt to get the trail names displayed
var myFunction = function() {
setTimeout(function(){
	for (var i = 0; i < trails.length; i ++) {
	document.getElementById("trail"+i).innerHTML = trails[i].name;
	document.getElementById("length"+i).innerHTML = trails[i].activities[0].length + " miles";
	document.getElementById("city"+i).innerHTML = trails[i].city + ", " + trails[i].state;

}

}, 1700);
};

var myOtherFunction = (function() {
setTimeout(function(){
for (var k = 0; k < trails.length; k ++) {
	var lat = trails[k].lat;
	var long = trails[k].lon;
	$('#iframe'+k).attr('src', "https://www.google.com/maps/embed/v1/view?key=AIzaSyD4iE2xVSpkLLOXoyqT-RuPwURN3ddScAI&center="+lat+","+long+"&zoom=18&maptype=satellite");
}
}, 1700);
});
