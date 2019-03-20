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

    $(".next").on("click", {
      d: "n"
    }, rotate);
    $(".prev").on("click", {
      d: "p"
    }, rotate);

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


    var theToggle = document.getElementById('toggle');

    // based on Todd Motto functions
    // https://toddmotto.com/labs/reusable-js/

    // hasClass
    function hasClass(elem, className) {
      return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }
    // addClass
    function addClass(elem, className) {
      if (!hasClass(elem, className)) {
        elem.className += ' ' + className;
      }
    }
    // removeClass
    function removeClass(elem, className) {
      var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
      if (hasClass(elem, className)) {
        while (newClass.indexOf(' ' + className + ' ') >= 0) {
          newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
      }
    }
    // toggleClass
    function toggleClass(elem, className) {
      var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, " ") + ' ';
      if (hasClass(elem, className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
          newClass = newClass.replace(" " + className + " ", " ");
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
      } else {
        elem.className += ' ' + className;
      }
    }

    theToggle.onclick = function () {
      toggleClass(this, 'on');
      return false;
    }