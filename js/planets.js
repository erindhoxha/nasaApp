var planetContainer = document.querySelector('.planet-container');

planetContainer.onclick = function() {
    var selectedPlanet = this.dataset.planet;
    var url = "https://images-api.nasa.gov/search?q=";
    var randomNum = Math.floor(Math.random() * 99);
    console.log(randomNum);
    fetch(`${url}${selectedPlanet}`)
        .then((response) => response.json())
        .then((jsonresponse) => {
        var response = jsonresponse.collection;
        console.log(response);
        console.log(response.items[randomNum].links[0].href);
    });
}

