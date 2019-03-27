$(function(){

	$(".loading-container").fadeOut();

	var apiKey = 'If1K6QldEkrrugyllIXJL9kjFzPfR3k7KzITvJM6';

	// var urlAsteroidTitles = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=2017-09-07&end_date=2017-09-13&api_key=' + apiKey;
	// ^^ Reference point for URL Key ^^

	console.log(urlAsteroidTitles);
	// var urlAsteroid = 'https://api.nasa.gov/planetary/apod?api_key=If1K6QldEkrrugyllIXJL9kjFzPfR3k7KzITvJM6'

			$( function() {
			    // var dateFormat = "mm/dd/yy",
			    var dateFormat = "yyyy/mm/dd",
			      from = $( "#from" )
			        .datepicker({
			          defaultDate: "-2y",
			          changeMonth: true,
			          numberOfMonths: 1,
			          dateFormat: "yy-mm-dd"
			        })
			        .on( "change", function() {
			          to.datepicker( "option", "minDate", getDate( this ) );
			        }),
			      to = $( "#to" ).datepicker({
			        defaultDate: "-2y",
			        changeMonth: true,
			        numberOfMonths: 1,
			          dateFormat: "yy-mm-dd"
			      })
			      .on( "change", function() {
			        from.datepicker( "option", "maxDate", getDate( this ) );
			      });
			 
			    function getDate( element ) {
			      var date;
			      try {
			        date = $.datepicker.parseDate( dateFormat, element.value );
			      } catch( error ) {
			        date = null;
			      }
			 
			      return date;
			    }
			  } );
		

	

	// var urlAsteroidTitles = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY' + apiKey; original

	

		// Write some code that pulls information for all 10 asteroids near earth; name, diameter, closest date to earth, hazardous potential, magnitude and an IF statement for asteroid sizes that displays one of 3 sizes and links to articles about asteroids. Also include the ability to be able to browse through years. 


		var dateFrom;
		var dateTo;
		var urlAsteroidTitles;

		$( ".btn-primary" ).click(function() {
			$(".loading-container").fadeIn();
			$(".asteroidDetails").empty();
			dateFrom = $("#from").val();
			dateTo = $("#to").val();
			urlAsteroidTitles = 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + dateFrom + '&end_date=' + dateTo + '&api_key=' + apiKey;

			console.log(urlAsteroidTitles);

			// AJAX request for PROJECT INFO
			$.ajax({

				url: urlAsteroidTitles,

				// when the ajax request is complete do all of these things
				success: function(res) {
					console.log(res);
					console.log(res.near_earth_objects[Object.keys(res.near_earth_objects)[0]])
					// console.log(dateFrom + ' ' + dateTo);

					var asteroids = res.near_earth_objects[Object.keys(res.near_earth_objects)[0]]
					var output = '';
					asteroids.forEach(function(asteroid) {
						// $('<li>' + '<h4>' + asteroid.name + '</h4>' + '</li>').appendTo('ul.asteroidDetails');
							output += `
							<div class="col-lg-4 col-6 col-sm-12 col-md-6 mb-3 pb-3">
							<div class="card" style="width: 18rem;">
									<div class="card-body" style="background-color:black; color:white">
										<h5 class="card-title">${asteroid.name}</h5>
										<p class="card-text">Neo JPL Url: ${asteroid.nasa_jpl_url}.</p>
										<p class="card-text">Estimated Diameter Max: ${asteroid.estimated_diameter.kilometers.estimated_diameter_max}KM.</p>
										<p class="card-text">Estimated Diameter Min: ${asteroid.estimated_diameter.kilometers.estimated_diameter_min}KM.</p>
										<a href="#" class="btn btn-md btn-see-more" style="background-color:#0b3d91; color:white; border:none;">See more! (incoming)</a>
									</div>
								</div>
								</div>`
							$(output).appendTo('.output');
							$(".loading-container").fadeOut();
					});

					
				},

			}); // END ajax request
		});

});