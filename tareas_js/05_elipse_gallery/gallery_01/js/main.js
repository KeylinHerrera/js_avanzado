//Utility functions
function out(arg){document.getElementById('debug').innerHTML = arg;}
function log(arg){console.log(arg);}

//3d, js, css carousel
var Carousel = function(){

	//Configuration Variables
	var carouselWidth = 600;
	var carouselHeight =300;
	var itemWidth = 100;
	var itemHeight = 130;
	var noOfItemToAdd = 8; 

	// Working with variable
	var carousel = document.getElementById('carousel');
	var itemContainer = carousel.getElementsByClassName('item-container')[0];
	var items = [];
	var deg = 0;
	var rangeX = carouselWidth - itemWidth;
	var rangeY = carouselHeight - itemHeight;
	var itemDegreeSeparation = 360 / (noOfItemToAdd -1);

	init();

	function init(){
		log('Carousel.init()');

		//Add Items
		for (var i = 0; i < noOfItemToAdd; i++) {
			addItem();
		}

		//star animate
		animate();
	}


	function addItem(){
		log('Carousel.addItem()');

		var item = document.createElement('div');
		item.classList.add('item');
		itemContainer.appendChild(item);

		var itemObject = {
			carouselItem: item
		};

		items.push(itemObject);
	}

	function animate(){
		deg += 1;

		for (var i = 0; i < items.length; i++) {

			var itemDeg = deg + (itemDegreeSeparation * i)

			var sin = 0.5 + (Math.sin(degToRad(itemDeg))* 0.7);
			var cos = 0.5 + (Math.cos(degToRad(itemDeg))* 0.4);

			var itemObject = items[i];
			var posX = sin * rangeX;
			var posY = cos * rangeY;
			itemObject.carouselItem.style.left = posX + 'px';
			itemObject.carouselItem.style.top = posY + 'px';
		}


		requestAnimationFrame(animate);
	}

	//Utility functions
	function degToRad(input){return input *(Math.PI/180);}
};

function pageLoadinit(){
	var myCarousel = new Carousel()
}