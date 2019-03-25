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
var numberOfImages = 12;
var selectedNasaId;
var selectedImage;
var imageOverlay = document.querySelector('.image-overlay');

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
  var randomNumbers = Array.from({length: numberOfImages}, () => Math.floor(Math.random() * 100));
  for (i = 0; i < numberOfImages; i++) {
    var thumbnail = (response.items[randomNumbers[i]].links[0].href);
    var nasaId = (response.items[randomNumbers[i]].data[0].nasa_id);
    $('.modal-content').append('<div class="modal-card" data-nasaid="' + nasaId + '"><img class="thumbnail" src="' + thumbnail + '"></div>');
  }
  $('.modal-card').click(function(){
    selectedNasaId = (this.dataset.nasaid);
    getImage(selectedNasaId);
  });
}

// Modal show
for (i = 0; i < planets.length; i++) {
  document.querySelector('.pc' + i).onclick = function() {
    fillModal ();
    $('#refresh-btn').removeClass('hidden');
    $('#close-btn').removeClass('hidden');
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
  $(imageOverlay).addClass('hidden-image-overlay');
  $('#back-to-gallery').addClass('hidden');
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
  $(imageOverlay).addClass('hidden-image-overlay');
  $('.modal-content').empty();
  fillModal ();
});

// Fetch full size image
function getImage(selectedNasaId) {
  var imageUrl = "https://images-api.nasa.gov/asset/";
  fetch(`${imageUrl}${selectedNasaId}`)
    .then((response) => response.json())
    .then((jsonresponse) => {
    var response = jsonresponse.collection;
    selectedImage = (response.items[0].href);
    // // Apply image as background image
    // overlay.style.backgroundImage = 'url(' + selectedImage + ')';
    // overlay.style.backgroundPosition = 'left top';
    // overlay.style.backgroundSize = 'cover';
    // sliderContainer.style.opacity = '0';
    openImage();
  });
}

// Open full size image
function openImage() {
  imageOverlay.style.backgroundImage = 'url(' + selectedImage + ')';
  $(imageOverlay).removeClass('hidden-image-overlay');
  $('#refresh-btn').addClass('hidden');
  $('#close-btn').addClass('hidden');
  $('#back-to-gallery').removeClass('hidden');
  $('#back-to-gallery').click(function(){
    imageOverlay.style.backgroundImage = 'url()';
    $('#back-to-gallery').addClass('hidden');
    $(imageOverlay).addClass('hidden-image-overlay');
    $('#refresh-btn').removeClass('hidden');
    $('#close-btn').removeClass('hidden');
  });
}