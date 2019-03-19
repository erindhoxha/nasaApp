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

$("#search").on('click', function(e) {
    location.replace(`facts.html?id=${searchedValue}`)
    var pageURL = new URL(document.location);
    var params = pageURL.searchParams;
    var id = params.get('id');

    var url = "https://images-api.nasa.gov/search?q=";
    var searchedValue = $("#search-input").val();
    fetch(`${url}${searchedValue}`)
    .then((response) => response.json())
    .then((jsonresponse) => {
        console.log(jsonresponse);
        var response = jsonresponse.collection.items;
        console.log(response);
    });

})


// ERINDS CODE FOR FACTS