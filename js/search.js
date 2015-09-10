var trails = [];


function searchResults (event) {
	
	event.preventDefault();

	function getTrails (city, state, lat, long) {
		var url = 'https://outdoor-data-api.herokuapp.com/api.json?api_key=28f730adcde18a08dfa7dc5198840b3d&q[city_cont]='+city+'&q[state_cont]='+state+'&lat='+lat+'&lon='+long+'';
		
		function callback (results) {
			console.log(results);
			console.log(results.places)
			trails = results.places.map( function( trail ){ return trail } )
		}

		$.ajax( url, { method:'GET', dataType:'jsonp' }).done(callback);
	};

	function searchSubmit ( scope ){
		
		var $searchText = $('#searchbar').val();
		var $city  = function(){ return $searchText.split(', ')[0] };
		var $state = function(){ return $searchText.split(', ')[1] };
		//var $lat   = function(){ return $searchText };
		//var $lon   = function(){ return $searchText };
		console.log( 'state: ', $state() )

		if ( scope === 'city' ){
			return $city();
		}
		else {
			if ( $state() === undefined ) {
				return '';
			}
			return $state()
		}
	}

	getTrails( searchSubmit('city'), searchSubmit('state') );
}

$('.navbar-form').submit( searchResults );

//    /[\w\s\,]+/ =>REGEX any number of characters a-Z or 0-9 and spaces