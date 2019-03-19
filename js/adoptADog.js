fetch('https://dog.ceo/api/breeds/list/all')
.then((response) => response.json())
.then((json) => {
    console.log(json.message);
    context = json;
    var source   = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var context = context;
    var html    = template(context);
    $("#container").html(html);
})

fetch('https://dog.ceo/api/breed/hound/images/random/3')
.then((response) => response.json())
.then((json) => {
    console.log(json.message);
});


// data
