$(".loading-container").css('visibility','visible');
var dataNr;
$(".rick-morty-spaceship-div").hide();
var url = "https://api.nasa.gov/planetary/apod?api_key=gdboBB95GZvKSjHc4gj10IOwU8jqJIaRv5XuuDjg";
  var pageURL = new URL(document.location);
  var params = pageURL.searchParams;
  var searchedValue = params.get('searched');
  searchClicked = searchedValue;
  $(".see-more").css('visibility','hidden');

if (searchClicked == "true") {
  var pageURL = new URL(document.location);
  var params = pageURL.searchParams;
  var searchedValue = params.get('search');
  var url = "https://images-api.nasa.gov/search?q=";
  console.log(searchedValue);
  fetch(`${url}${searchedValue}`)
    .then((response) => response.json())
    .then((jsonresponse) => {
      response = jsonresponse.collection;
      console.log(response);
      var source = document.getElementById("planet-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = (response);
      var html = template(context);
      $("#facts").html(html);
      $(".loading-container").fadeOut();
      $(".see-more").css('visibility','visible');
      $(".card").slice(6,100).hide();
      hideExtraImages();
      $(".see-more-btn").on('click', function() {
        dataNr = $(this).attr('data-nr');
        console.log(dataNr);
        getResponse()
      })
    });
} else {
  var url = "https://images-api.nasa.gov/search?q=pluto";
  fetch(`${url}`)
    .then((response) => response.json())
    .then((jsonresponse) => {
      response = jsonresponse.collection;
      console.log(response);
      var source = document.getElementById("planet-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = (response);
      var html = template(context);
      $("#facts").html(html);
    $(".loading-container").fadeOut();
    $(".see-more").css('visibility','visible');
    $(".card").slice(6,100).hide();
    hideExtraImages();
      $(".see-more-btn").on('click', function() {
        dataNr = $(this).attr('data-nr');
        console.log(dataNr);
        getResponse()
      })
    });
}
var n = 12;
$(".see-more").on('click', function() {
    $(".loading-container").fadeIn();
  setTimeout(() => {
    $(".card").slice(0, n).show()
    $(".loading-container").fadeOut();
    n += 6;
  }, 1000);

});



var input = document.getElementById("search-input");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("search").click();
  }
});

function hideExtraImages() {
  for (let i = 0; i < $('.card').length; i++) {
    if ($(`.card.${i}`).find($(".card-img-top")).length > 1) {
      $(`.card.${i}`).find($(".card-img-top")).slice(1,2).hide();
    } 
  }
}
  function getResponse() {
    fetch(response.items[dataNr].href)
    .then((response) => response.json())
    .then((responseJson) => 
    $('.modal-img').attr('src', responseJson[2]));
    console.log(dataNr);
    console.log(response.items[dataNr].data[0]);
    console.log(response.items[dataNr].href);
    $(".modal-title").text(response.items[dataNr].data[0].title);
    $(".date-created").text(`${response.items[dataNr].data[0].date_created}`)
    $(".modal-description").text(`${response.items[dataNr].data[0].description}`)
    $(".modal-nasa-id").text(`${response.items[dataNr].data[0].nasa_id}`)
    $(".modal-secondary-creator").text(`${response.items[dataNr].data[0].secondary_creator}`)
    $(".modal-center").text(`${response.items[dataNr].data[0].center}`)
  }
// ERINDS CODE FOR FACTS

$(".planet-image-facts").on('click', function() {
  if ($(this).attr('valueOfPlanet') == "RickMorty") {
    $(".rick-morty-spaceship-div").show();
  }
  $(".loading-container").fadeIn();
  setTimeout(() => {
    $(".loading-container").fadeOut();
  }, 1000);
  console.log($(this).attr('value'));
  var searchedVal = $(this).attr('value');
  var url = "https://images-api.nasa.gov/search?q=";
  fetch(`${url}${searchedVal}`)
    .then((response) => response.json())
    .then((jsonresponse) => {
      response = jsonresponse.collection;
      console.log(response);
      var source = document.getElementById("planet-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = (response);
      var html = template(context);
      $("#facts").html(html);
      $(".loading-container").fadeOut();
      $(".see-more").css('visibility','visible');
      $(".card").slice(6,100).hide();
      hideExtraImages();
      $(".see-more-btn").on('click', function() {
        dataNr = $(this).attr('data-nr');
        console.log(dataNr);
        getResponse()
      })
    });
})

$(".planet-image-facts").on('hover mouseenter', function() {
  console.log($(this).attr('value'));
  var nameOfPlanet = $(this).attr('value');
  $(`.${nameOfPlanet}-span`).css('visibility','visible');
});
$(".planet-image-facts").on('mouseleave', function() {
  console.log($(this).attr('value'));
  var nameOfPlanet = $(this).attr('value');
  $(`.${nameOfPlanet}-span`).css('visibility','hidden');
});


