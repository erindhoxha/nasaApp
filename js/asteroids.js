$(function(){


	var apiKey = 'If1K6QldEkrrugyllIXJL9kjFzPfR3k7KzITvJM6';

	var urlAsteroid = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=' + apiKey;
	// ^^ Reference point for URL Key ^^

	console.log(urlAsteroid);
	// var urlAsteroid = 'https://api.nasa.gov/planetary/apod?api_key=If1K6QldEkrrugyllIXJL9kjFzPfR3k7KzITvJM6'

		// AJAX request for PROJECT INFO
		$.ajax({

			url: urlAsteroid,

			// when the ajax request is complete do all of these things
			success: function(res) {

				console.log(res);

				

				var asteroids = res.near_earth_objects['2015-09-07'];

				asteroids.forEach(function(asteroid) {
					$('<li>' + '<h4>' + asteroid.name + '</h4>' + '</li>').appendTo('ul.asteroidDetails');
				});

				
			},

		}); // END ajax request




	
	
});