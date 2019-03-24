var planets = [
	{
		name: 'mercury',
		img: "img/mercury.png",
    },
    {
		name: 'venus',
		img: "img/venus.png",
    },
    {
		name: 'earth',
		img: "img/earth.png",
    },
    {
		name: 'mars',
		img: "img/mars.png",
    },
    {
		name: 'jupiter',
		img: "img/jupiter.png",
    },
    {
		name: 'saturn',
		img: "img/saturn.png",
    },
    {
		name: 'uranus',
		img: "img/uranus.png",
    },
    {
		name: 'neptune',
		img: "img/neptune.png",
    },
]

var planetSlider = document.querySelector('.planet-slider');
var planetContainer;

function loadPlanets() {
    for (i = 0; i < planets.length; i++) {
        $(planetSlider).append('<div class="planet-container" data-planet="' + planets[i].name + '"><img class="planet-image" src="' + planets[i].img + '"><h1>' + planets[i].name + '</h1></div>');
    }
}

window.onload = loadPlanets();

document.querySelector('.planet-container').onclick = function() {
    var selectedPlanet = this.dataset.planet;
    var url = "https://images-api.nasa.gov/search?q=";
    var randomNum = Math.floor(Math.random() * 99);
    fetch(`${url}${selectedPlanet}`)
        .then((response) => response.json())
        .then((jsonresponse) => {
        var response = jsonresponse.collection;
        console.log(response);
        console.log(response.items[randomNum].links[0].href);
    });
}