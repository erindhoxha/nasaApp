// Planet array
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


// Global variables
var planetSlider = document.querySelector('.planet-slider');
var sliderContainer = document.querySelector('.slider-container');
var imageOverlay = document.querySelector('.image-overlay');
var planetModal = document.querySelector('.planet-modal');
var modalContent = document.querySelector('.modal-content');
var closeBtn = document.getElementById('close-btn');
var refreshBtn = document.getElementById('refresh-btn');
var backToGallery = document.getElementById('back-to-gallery');
var fullScreenBtn = document.getElementById('full-screen');
var smallScreenBtn = document.getElementById('small-screen');
var backgroundBtn = document.getElementById('background-button');
var background = document.querySelector('.box');
var backgroundOverlay = document.querySelector('.background-overlay');
var backgroundSlider = document.querySelector('.slider-container');
var slickArrow;
var planetContainer;
var current;
var numberOfImages = 12;
var selectedNasaId;
var selectedImage;


// PLANET SLIDER - Insert planets from array into slider
function loadPlanets() {
    for (i = 0; i < planets.length; i++) {
        $(planetSlider).append('<div class="planet-container pc' + i + '" data-planet="' + planets[i].name + '"><img class="planet-image" src="' + planets[i].img + '"><h1>' + planets[i].name + '</h1></div>');
    }
    planetContainer = document.querySelector('.planet-container');
}

window.onload = loadPlanets();


// PLANET SLIDER - Update active planet
updateCurrent();

function updateCurrent(){
    current = document.querySelector('.slick-current');
    setTimeout( updateCurrent, 200);
}


// API - Fill modal with random images from search with keyword of clicked planet
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
        $(modalContent).append('<div class="modal-card" data-nasaid="' + nasaId + '"><img class="thumbnail" src="' + thumbnail + '"></div>');
    }
    $('.modal-card').click(function(){
        selectedNasaId = (this.dataset.nasaid);
        getImage(selectedNasaId);
    });
  }


// API - Fetch full size image
function getImage(selectedNasaId) {
    var imageUrl = "https://images-api.nasa.gov/asset/";
    fetch(`${imageUrl}${selectedNasaId}`)
        .then((response) => response.json())
        .then((jsonresponse) => {
        var response = jsonresponse.collection;
        selectedImage = (response.items[0].href);
        openImage();
    });
  }
  

// API - Open full size image
function openImage() {
    imageOverlay.style.backgroundImage = 'url(' + selectedImage + ')';
    imageOverlay.classList.remove('hidden-image-overlay');
    refreshBtn.classList.add('hidden');
    closeBtn.classList.add('hidden');
    backToGallery.classList.remove('hidden');
    fullScreenBtn.classList.remove('hidden');
    backgroundBtn.classList.remove('hidden');
    backgroundBtn.onclick = function() {
        document.body.style.backgroundImage = 'url(' + selectedImage + ')';
        document.body.style.backgroundSize = 'cover';
        backgroundOverlay.classList.remove('hidden');
        backgroundSlider.classList.add('hidden');
    }
}


// Modal show
for (i = 0; i < planets.length; i++) {
    document.querySelector('.pc' + i).onclick = function() {
        fillModal();
        refreshBtn.classList.remove('hidden');
        closeBtn.classList.remove('hidden');
        planetModal.classList.remove('hidden-modal');
        setTimeout(function() {
            modalContent.classList.remove('hidden');
            modalOpen = true;
        }, 500);
    }
}


// Modal hide
var mouse_in_modal = false;
var modalOpen = false;
$(planetModal).hover(function(){ 
    mouse_in_modal = true; 
}, function(){ 
    mouse_in_modal = false; 
});

function emptyModal() {
    modalContent.innerHTML = "";
}

function hideModal() {
    planetModal.classList.add('hidden-modal');
    planetModal.classList.remove('fullscreen');
    emptyModal();
    imageOverlay.classList.add('hidden-image-overlay');
    backToGallery.classList.add('hidden');
    fullScreenBtn.classList.add('hidden');
    smallScreenBtn.classList.add('hidden');
    backgroundBtn.classList.add('hidden');
    modalOpen = false;
}


// Buttons
document.body.onclick = function() {
    if (mouse_in_modal === false && modalOpen === true) {
        hideModal();
    }
}

closeBtn.onclick = function(){
    hideModal();
}

refreshBtn.onclick = function(){
    emptyModal();
    fillModal();
}

backToGallery.onclick = function(){
    imageOverlay.style.backgroundImage = 'url()';
    backToGallery.classList.add('hidden');
    fullScreenBtn.classList.add('hidden');
    smallScreenBtn.classList.add('hidden');
    backgroundBtn.classList.add('hidden');
    planetModal.classList.remove('fullscreen');
    imageOverlay.classList.add('hidden-image-overlay');
    refreshBtn.classList.remove('hidden');
    closeBtn.classList.remove('hidden');
}

fullScreenBtn.onclick = function() {
    planetModal.classList.add('fullscreen');
    fullScreenBtn.classList.add('hidden');
    smallScreenBtn.classList.remove('hidden');
}

smallScreenBtn.onclick = function() {
    planetModal.classList.remove('fullscreen');
    fullScreenBtn.classList.remove('hidden');
    smallScreenBtn.classList.add('hidden');
}