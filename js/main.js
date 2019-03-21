    // DEFINE GLOBAL VARIABLES HERE
    var searchClicked = false;

    // I need this code because it sends the user when they press the search button to 
    // FACTS.HTML?=search then the search value what they type, and then gets the 
    // searched=true and I get those values from the other page and gucci gang
    $("#search").on('click', function(e) {
        e.preventDefault();
        var searchVal = $("#search-input").val();
        window.location.href = `facts.html?search=${searchVal}&searched=true`;
        searchClicked = true;
        console.log(searchClicked);
    })
    var carousel = $(".carousel"),
      currdeg = 0;
    function rotate(e) {
      if (e.data.d == "n") {
        currdeg = currdeg - 60;
      }
      if (e.data.d == "p") {
        currdeg = currdeg + 60;
      }
      carousel.css({
        "-webkit-transform": "rotateY(" + currdeg + "deg)",
        "-moz-transform": "rotateY(" + currdeg + "deg)",
        "-o-transform": "rotateY(" + currdeg + "deg)",
        "transform": "rotateY(" + currdeg + "deg)"
      });
    }
    // NAV BAR

    
    //Slick Slider
    $(document).ready(function(){
      $('.planet-slider').slick({
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
