// Utility functions
function log(arg){ console.log(arg); }
function out(arg){ document.getElementById("debug").innerHTML = arg; }

// 3D JS,CSS Carousel
var Carousel = function(){
	// Var defs and init
	var me = this; // to scope

	// Configuration variables
	var carouselW = 600;
	var carouselH = 300;
	var itemW = 100;
	var itemH = 200;
	var noOfItemsToAdd = 10;

	// Working variables (DO NOT MODIFY)
	var carousel = document.getElementById("carousel");
	var itemContainer = carousel.getElementsByClassName("item-container")[0];
	var btnPrevious = carousel.getElementsByClassName("btn-previous")[0];
	var btnNext = carousel.getElementsByClassName("btn-next")[0];
	var items = [];
	var deg = 0;
	var rangeX = carouselW - itemW;
	var rangeY = carouselH - itemH;
	var itemDegreeSperation = 360 / (noOfItemsToAdd-1);
	var itemCount = 0;
	var tweenObject = {
		deg:0
	};

	// Simulate constructor from other languages
	init();

	// Constructor (not a js constructor!);
	function init(){

		// Add items
		for (var i=0; i < noOfItemsToAdd; i++){
			addItem();
		}

		// Attach event listeners
		btnPrevious.addEventListener("click",btnPreviousClickHandler);
		btnNext.addEventListener("click",btnNextClickHandler);


		// Start animation
		animate();
	}
	
	var ease = Bounce.easeOut;

	function btnPreviousClickHandler(e){

		var targetDeg = tweenObject.deg - itemDegreeSperation;
		TweenMax.to(tweenObject,1,{deg:targetDeg,ease:ease,onUpdate:animate});
	}
	
	function btnNextClickHandler(e){
		log("Carousel.btnNextClickHandler(e)");

		var targetDeg = tweenObject.deg + itemDegreeSperation;
		TweenMax.to(tweenObject,1,{deg:targetDeg,ease:ease,onUpdate:animate});
	}
	
	function addItem(){

		var item = document.createElement("div");
		item.classList.add("item");

		var label = document.createElement("div");
		item.appendChild(label);

		itemContainer.appendChild(item);

		var itemObject = {
			carouselItem:item
		};

		items.push(itemObject);
		itemCount++;
	}

	function animate(){

		for (var i=0; i < items.length; i++){

			var itemDeg = tweenObject.deg + (itemDegreeSperation * i);

			var sin = 0.5 + (Math.sin(degToRad(itemDeg)) * 0.5);
			var cos = 0.5 + (Math.cos(degToRad(itemDeg)) * 0.5);

			var itemObject = items[i];
			var posX = sin * rangeX;
			var posY = cos * rangeY;
			itemObject.carouselItem.style.left = posX + "px";
			itemObject.carouselItem.style.top = posY + "px";

			var zIndex = 1 + Math.round(cos * 100);
			itemObject.carouselItem.style.zIndex = zIndex;

			var scale = 0.5 + (cos * 0.5);
			itemObject.carouselItem.style.transform = "scale(" + scale + ")";

			var opacity = 0.3 + (cos * 0.7);
			itemObject.carouselItem.style.opacity = opacity;
		}

	}



// Utility functions
function degToRad(input) { 

	return input * (Math.PI / 180); }
};

// Init page load
function pageLoadInit(){
	
	var myCarousel = new Carousel();
}