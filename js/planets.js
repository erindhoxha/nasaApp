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
var overlay = document.querySelector('.overlay');
var sliderContainer = document.querySelector('.slider-container');
var current;

// Insert planets from array into slider
function loadPlanets() {
    for (i = 0; i < planets.length; i++) {
        $(planetSlider).append('<div class="planet-container pc' + i + '" data-planet="' + planets[i].name + '"><img class="planet-image" src="' + planets[i].img + '"><h1>' + planets[i].name + '</h1></div>');
    }
    planetContainer = document.querySelector('.planet-container');
}

window.onload = loadPlanets();

// Update active planet
updateCurrent();

function updateCurrent(){
  current = document.querySelector('.slick-current');
  setTimeout( updateCurrent, 200);
}

// API
for (i = 0; i < planets.length; i++) {
  document.querySelector('.pc' + i).onclick = function() {
    var selectedPlanet = current.dataset.planet;
    var searchUrl = "https://images-api.nasa.gov/search?q=";
    var imageUrl = "https://images-api.nasa.gov/asset/";
    var randomNum = Math.floor(Math.random() * 99);
      
    // Search API for random image with search term of clicked planet
    fetch(`${searchUrl}${selectedPlanet}${'&media_type=image'}`)
        .then((response) => response.json())
        .then((jsonresponse) => {
        var response = jsonresponse.collection;
        var nasaId = (response.items[randomNum].data[0].nasa_id);
        getImage(nasaId);
    });

    // Get full resolution image of searched image
    function getImage(nasaId) {
      fetch(`${imageUrl}${nasaId}`)
        .then((response) => response.json())
        .then((jsonresponse) => {
        var response = jsonresponse.collection;
        var selectedImage = (response.items[2].href);
        // Apply image as background image
        overlay.style.backgroundImage = 'url(' + selectedImage + ')';
        overlay.style.backgroundPosition = 'left top';
        overlay.style.backgroundSize = 'cover';
        sliderContainer.style.opacity = '0';
      });
    }
  }
}

// Fill modal with 12 x random images from search with keyword of clicked planet
function fillModal() {
  var selectedPlanet = current.dataset.planet;
  var searchUrl = "https://images-api.nasa.gov/search?q=";
  fetch(`${searchUrl}${selectedPlanet}${'&media_type=image'}`)
    .then((response) => response.json())
    .then((jsonresponse) => {
    var response = jsonresponse.collection;
    getThumbnails(response);
  });
}

function getThumbnails(response) {
  var randomNumbers = Array.from({length: 12}, () => Math.floor(Math.random() * 100));
  for (i = 0; i < 12; i++) {
    var thumbnail = (response.items[randomNumbers[i]].links[0].href);
    $('.modal-content').append('<div class="modal-card"><img class="thumbnail" src="' + thumbnail + '"></div>');
  }
}

// Modal show
for (i = 0; i < planets.length; i++) {
  document.querySelector('.pc' + i).onclick = function() {
    fillModal ();
    $('.planet-modal').removeClass('hidden-modal');
    $('.slick-arrow').addClass('hidden');
    setTimeout(function() {
      $('.modal-content').removeClass('hidden');
      modalOpen = true;
    }, 500);
  }
}

// Modal hide
var mouse_in_modal = false;
var modalOpen = false;
$('.planet-modal').hover(function(){ 
    mouse_in_modal = true; 
}, function(){ 
    mouse_in_modal = false; 
});

function hideModal() {
  $('.planet-modal').addClass('hidden-modal');
  $('.slick-arrow').removeClass('hidden');
  $('.modal-content').addClass('hidden');
  $('.modal-content').empty();
  modalOpen = false;
}

$('body').click(function() {
  if (mouse_in_modal === false && modalOpen === true) {
    hideModal();
  }
});

$('#close-btn').click(function(){
  hideModal();
});

$('#refresh-btn').click(function(){
  $('.modal-content').empty();
  fillModal ();
});