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
    // NEED THIS CODE FOR THE SEARCH - WHEN TYPING ON ENTER ENTER CLICK WILL TRIGGER THE BUTTON
    var input = document.getElementById("search-input");
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("search").click();
      }
    });
    
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


    function myFunction() {
      var input, filter, ul, li, a, i, txtValue;
      input = document.getElementById("search-input");
      filter = input.value.toUpperCase();
      ul = document.getElementById("myUL");
      li = ul.getElementsByTagName("li");
      if ($("#search-input").val() == "") {
        $("#myUL li").css('display','none');
      } else {
          for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "block";
            } else {
                li[i].style.display = "none";
            }
        }
      }
  }
  
  $("#myUL li").on('click', function() {
    $("#search-input").val($(this)[0].innerText)
    $("#myUL li").hide();
  })