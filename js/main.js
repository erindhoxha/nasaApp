//ERINDS CODE FOR FACTS

var url = "https://api.nasa.gov/planetary/apod?api_key=gdboBB95GZvKSjHc4gj10IOwU8jqJIaRv5XuuDjg";
$.ajax({
  url: url,
  success: function(result){
    console.log
  if("copyright" in result) {
    $("#copyright").text("Image Credits: " + result.copyright);
  }
  else {
    $("#copyright").text("Image Credits: " + "Public Domain");
  }
  
  if(result.media_type == "video") {
    $("#apod_img_id").css("display", "none"); 
    $("#apod_vid_id").attr("src", result.url);
  }
  else {
    $("#apod_vid_id").css("display", "none"); 
    $("#apod_img_id").attr("src", result.url);
  }
  $("#reqObject").text(url);
  $("#returnObject").text(JSON.stringify(result, null, 4));  
  $("#apod_explaination").text(result.explanation);
  $("#apod_title").text(result.title);
}
});
var clicked = false;
var sentFromOtherPage;
var itsFactsPage;
$("#search").on('click', function(e) {
        if ($("#facts").length == 0) {
            window.location.href = 'facts.html';
            sentFromOtherPage = true;
        }

            var searchedValue = $("#search-input").val();
            var url = "https://images-api.nasa.gov/search?q=";
            console.log(searchedValue);
    
            fetch(`${url}${searchedValue}`)
            .then((response) => response.json())
            .then((jsonresponse) => {
                var response = jsonresponse.collection;
                console.log(response);
                var source   = document.getElementById("planet-template").innerHTML;
                var template = Handlebars.compile(source);
                var context = (response);
                var html    = template(context);
                $("#facts").html(html);
            });
})


// ERINDS CODE FOR FACTS