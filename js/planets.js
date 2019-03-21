var planetContainer = document.querySelector('.planet-container');

planetContainer.onclick = function() {
var selectedPlanet = this.dataset.planet;
  var url = "https://images-api.nasa.gov/search?q=";
  fetch(`${url}${selectedPlanet}`)
    .then((response) => response.json())
    .then((jsonresponse) => {
      var response = jsonresponse.collection;
      console.log(response);
      console.log(response.items[0]);
    });
} 