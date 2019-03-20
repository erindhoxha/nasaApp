$(".loading-container").css('visibility','visible');

var url = "https://api.nasa.gov/planetary/apod?api_key=gdboBB95GZvKSjHc4gj10IOwU8jqJIaRv5XuuDjg";
  var pageURL = new URL(document.location);
  var params = pageURL.searchParams;
  var searchedValue = params.get('searched');
  searchClicked = searchedValue;

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
    });
} else {
  var url = "https://images-api.nasa.gov/search?q=mars";
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
$(".loading-container").css('visibility','visible');
    });
}



// ERINDS CODE FOR FACTS