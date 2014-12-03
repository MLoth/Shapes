document.addEventListener('DOMContentLoaded', function() { init(); });

function init() {
	checkElements();
	listeners();
	setVariables();
}

function setVariables() {
	IE = document.all?true:false;
	colors = [["bfff00"],["a9bf67"],["edffba"]];
	positionOld = { X: 0, Y: 0 };
	positionNew = { X: width/2, Y: height/2 };
	positionGone = {X: 0, Y: 0 };
}

function listeners() {
	document.addEventListener( 'mousedown', function() { onMouseDown() });
	document.addEventListener( 'mouseup', function() { onMouseUp() });
	window.addEventListener( 'resize', function() { checkElements() });
}

function onMouseDown(event) {
	mouse = getMousePosition(window.event);
	if (checkForMobile()) { breedteNav = 0; hoogteNav = navigationHeight() }
		else { hoogteNav = 0 };
	var r = {
		hoogte : Math.floor(Math.random() * 50),
		breedte : Math.floor(Math.random() * 50),
		positieX : mouse.posX - breedteNav,
		positieY : mouse.posY - hoogteNav,
		opacity : 1
    }
	draw( r );
	savePos( r );
}

function savePos( r ) {
	positionGone = positionOld;
	positionOld = positionNew;
	positionNew = {
		X: r.positieX,
		Y: r.positieY
	}
}

function randomPoint( min, max ) {
	return ((Math.random()*(max-min)) + min); 
}

function onMouseUp(event) {
	mouseDown = false;
}

function checkElements() {
	veranderCanvas();
	breedteNav = checkNavBreedte();
		if(checkForMobile()) { changeValuesForMobile() }
}

function checkForMobile() {
	if(window.innerWidth <= 990) { return true }
	else { return false };
}

function changeValuesForMobile() {
	breedteNav = 0;
}

function checkNavBreedte() {
	var nav = document.getElementById('nav');
	return nav.offsetWidth;
}

function getMousePosition(e) {
  	if (IE) {
    	tempX = event.clientX + document.body.scrollLeft
    	tempY = event.clientY + document.body.scrollTop
  	} else {
    	tempX = e.pageX
    	tempY = e.pageY
  	}

  	var mouse = {
  		posX: tempX,
  		posY: tempY
  	}
    return mouse;
}

function navigationHeight() {
	var nav = document.getElementById('nav');
	return nav.offsetHeight;
}

function veranderCanvas() {
	var canvas = document.getElementById('draw_stuff');
	var parent = document.getElementById('parent');
	width = parent.offsetWidth;
	height = parent.offsetHeight;

	canvas.setAttribute( 'width', width);

	if(checkForMobile()) {
		canvas.setAttribute( 'height', window.innerHeight - navigationHeight());
	}
	else {
		canvas.setAttribute( 'height', height);
	}
}

function getContextCanvas() {
	var c = document.getElementById('draw_stuff');
	var ctx = c.getContext("2d");
	return ctx;
}

function draw( r ) {
	var ctx = getContextCanvas();
	var color = colors[Math.floor(Math.random() * 3)];
    ctx.lineWidth = 0.4;

    ctx.beginPath();

    // sFunction = function () { fillArc( ctx, r, g, b, a) };
    
	// timeoutId = setTimeout(sFunction, 20);
	// if (a >= 1) {
	// 	clearTimeout( timeoutId );
	// 	drawBezier();
	// };

    ctx.rect( r.positieX, r.positieY, r.breedte, r.hoogte );

	ctx.fillStyle = "#" + color;
    ctx.fill();

}