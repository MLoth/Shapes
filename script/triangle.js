document.addEventListener("DOMContentLoaded", function () {
  init();
});

function init() {
  checkElements();
  listeners();
  setVariables();
}

function setVariables() {
  IE = document.all ? true : false;
  colors = [
    ["28", "254", "255"],
    ["120", "204", "204"],
    ["10", "155", "155"],
  ];
}

function listeners() {
  document.addEventListener("mousedown", function () {
    onMouseDown();
  });
  document.addEventListener("mouseup", function () {
    onMouseUp();
  });
  window.addEventListener("resize", function () {
    checkElements();
  });
}

function onMouseDown(event) {
  mouse = getMousePosition(window.event);
  if (checkForMobile()) {
    breedteNav = 0;
    hoogteNav = navigationHeight();
  } else {
    hoogteNav = 0;
  }
  var t = {
    X: mouse.posX - breedteNav,
    Y: mouse.posY - hoogteNav,
    background: colors[Math.floor(Math.random() * 6)],
  };
  draw(t);
}

function draw(start) {
  var ctx = getContextCanvas();
  ctx.beginPath();

  var lengte = Math.floor(Math.random() * 200);
  var hoek = Math.random() * 6;

  var punt1 = {
    X: start.X,
    Y: start.Y + lengte,
  };
  var punt2 = {
    X: start.X + lengte * Math.cos(5.75958653),
    Y: start.Y + lengte * Math.sin(5.75958653),
  };
  var punt3 = {
    X: start.X + lengte * Math.cos(3.66519143),
    Y: start.Y + lengte * Math.sin(3.66519143),
  };

  punt1 = rotatePoints(punt1, hoek, start);
  punt2 = rotatePoints(punt2, hoek, start);
  punt3 = rotatePoints(punt3, hoek, start);

  ctx.moveTo(punt1.X, punt1.Y);
  ctx.lineTo(punt2.X, punt2.Y);
  ctx.lineTo(punt3.X, punt3.Y);

  ctx.lineWidth = 0.5;
  ctx.strokeStyle = "#eee";
  ctx.stroke();

  var color = colors[Math.floor(Math.random() * 3)];

  ctx.fillStyle = "rgb(" + color[0] + "," + color[1] + "," + color[2] + ")";
  ctx.fill();
}

function rotatePoints(point, hoek, start) {
  return (p = {
    X:
      start.X +
      Math.cos(hoek) * (point.X - start.X) -
      Math.sin(hoek) * (point.Y - start.Y),
    Y:
      start.Y +
      Math.sin(hoek) * (point.X - start.X) +
      Math.cos(hoek) * (point.Y - start.Y),
  });
}

function onMouseUp(event) {
  mouseDown = false;
}

function checkElements() {
  veranderCanvas();
  breedteNav = checkNavBreedte();
  if (checkForMobile()) {
    changeValuesForMobile();
  }
}

function checkForMobile() {
  if (window.innerWidth <= 990) {
    return true;
  } else {
    return false;
  }
}

function changeValuesForMobile() {
  breedteNav = 0;
}

function checkNavBreedte() {
  var nav = document.getElementById("nav");
  return nav.offsetWidth;
}

function getMousePosition(e) {
  if (IE) {
    tempX = event.clientX + document.body.scrollLeft;
    tempY = event.clientY + document.body.scrollTop;
  } else {
    tempX = e.pageX;
    tempY = e.pageY;
  }
  return (mouse = {
    posX: tempX,
    posY: tempY,
  });
}

function navigationHeight() {
  var nav = document.getElementById("nav");
  return nav.offsetHeight;
}

function veranderCanvas() {
  var canvas = document.getElementById("draw_stuff");
  var parent = document.getElementById("parent");
  width = parent.offsetWidth;
  height = parent.offsetHeight;

  canvas.setAttribute("width", width);

  if (checkForMobile()) {
    canvas.setAttribute("height", window.innerHeight - navigationHeight());
  } else {
    canvas.setAttribute("height", height);
  }
}

function getContextCanvas() {
  var c = document.getElementById("draw_stuff");
  var ctx = c.getContext("2d");
  return ctx;
}
