
	(function() {
		[].forEach.call(document.querySelectorAll('noscript'), function(noscript) {
		var img = new Image();
		img.setAttribute('data-src', '');
		noscript.parentNode.insertBefore(img, noscript);
		img.onload = function() {
			img.removeAttribute('data-src');
		};
		img.src = noscript.getAttribute('data-src');
	});
	})();
