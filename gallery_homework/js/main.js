/*----------------------------------
-----------Constructor--------------
----------------------------------*/
var Gallery = function (data) {
	this.index = 0;
	this.url = data.url;
	this.totalImg = data.url.length;
	this.gallery = document.createElement('div');
}

/*----------------------------------
-----------Prototype--------------
----------------------------------*/
Gallery.prototype = {
	Constructor: Gallery,
	imgContainer: document.createElement('div'),
	init: function () {
		this.moveBackward();
		this.imgView();
		this.moveForward();
	},
	moveBackward: function(){
		var previousButton = document.getElementById('previous');
		var ram = this;
		previousButton.addEventListener('click', function () {
			var img = this.parentNode.getElementsByTagName('img')[0];
			ram.index--;
			img.src = ram.url[ram.index];
		})
		this.gallery.appendChild(previousButton);
	},
	imgView: function () {
		this.gallery.style.textAlign = 'center';
		var img = document.createElement('img');
		img.src = this.url[this.index];
		this.gallery.appendChild(img);
		this.imgContainer.appendChild(this.gallery);
		document.body.appendChild(this.imgContainer);
	},
	moveForward: function(){
		var nextButton = document.getElementById('next');
		var ram = this;
		nextButton.addEventListener('click', function () {
			var img = this.parentNode.getElementsByTagName('img')[0];
			ram.index++;
			img.src = ram.url[ram.index];
		})
		this.gallery.appendChild(nextButton);
	},
}

var imgGallery = new Gallery({
	'url': ['img/home1.jpg', 'img/home2.jpg', 'img/home3.jpg', 'img/home4.jpg', 'img/home5.jpg']
});

imgGallery.init();