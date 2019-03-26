$(function() {


    // Now we may render our compiled template by passing required context


    //https://https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=DEMO_KEYDEMO_KEY

    
    var apiKey = "TBXJbvg5BOgWrUI5dgjrf23cS4Fhs1GczfDNJYEe";

    var urlRover = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=200&camera=mast&api_key=TBXJbvg5BOgWrUI5dgjrf23cS4Fhs1GczfDNJYEe";

    console.log(urlRover);

    $(document).ready(function(){
        $('.slick-me').slick({
            infinite: true,
            centerMode: true,
            centerPadding: '25%',
            responsive: [
              {
                breakpoint: 1024,
                settings: {
                  centerPadding: '0%',
                }
              }
            ]
          });
      });



  


    $.ajax({

          url: urlRover,
        
          success: function(res){
            console.log(res)
            rovers = res.photos;


       



            // rovers.forEach(function(rover) {
            //     $('<h1 class="img-tile">' + rover.img_src + '</h1>' ).appendTo('.go-here');
            // });
            
            var template = document.getElementById('html_template').innerHTML;

            // compile it with Template7
            var compiledTemplate = Template7.compile(template);
        
            var json_data_html = compiledTemplate(res);
            $("#content-wrap").html(json_data_html);
        },
        
        }); // END ajax request
        
       

});









// $(function(){


// var apiKey = "TBXJbvg5BOgWrUI5dgjrf23cS4Fhs1GczfDNJYEe";

// var urlRover = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=TBXJbvg5BOgWrUI5dgjrf23cS4Fhs1GczfDNJYEe";

// console.log(urlRover);

// // [""0""].img_src
// // [""0""].rover.landing_date

// // $.ajax({

// //   url: urlRover,

// //   success: function(res){

// //     var rovers = res.photos;

// //     rovers.forEach(function(rover) {
// //         $('<h1 class="img-tile">' + rover.img_src + '</h1>' ).appendTo('.go-here');
// //     });

				
// // },

// }); // END ajax request




// });

