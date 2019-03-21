$(".loading-container").css('visibility','visible');

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
      var response = jsonresponse.collection;
      console.log(response);
      var source = document.getElementById("planet-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = (response);
      var html = template(context);
      $("#facts").html(html);
      $(".loading-container").css('visibility','hidden');
      $(".see-more").css('visibility','visible');
      $(".card").slice(6,100).hide();
      hideExtraImages();
    });
} else {
  var url = "https://images-api.nasa.gov/search?q=pluto";
  fetch(`${url}`)
    .then((response) => response.json())
    .then((jsonresponse) => {
      var response = jsonresponse.collection;
      console.log(response);
      var source = document.getElementById("planet-template").innerHTML;
      var template = Handlebars.compile(source);
      var context = (response);
      var html = template(context);
      $("#facts").html(html);
    $(".loading-container").css('visibility','hidden');
    $(".see-more").css('visibility','visible');
    $(".card").slice(6,100).hide();
    hideExtraImages();
    });
}
var n = 12;
$(".see-more").on('click', function() {
  $(".card").slice(0,n).show()
  n += 6;
});

function hideExtraImages() {
  for (let i = 0; i < $('.card').length; i++) {
    if ($(`.card.${i}`).find($(".card-img-top")).length > 1) {
      $(`.card.${i}`).find($(".card-img-top")).slice(1,2).hide();
    } 
  }
}


// ERINDS CODE FOR FACTS