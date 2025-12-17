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
    ["243", "44", "207"],
    ["145", "77", "133"],
    ["192", "0", "157"],
  ];
  positionOld = { X: 0, Y: 0 };
  positionNew = { X: width / 2, Y: height / 2 };
  positionGone = { X: 0, Y: 0 };
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
  var p = {
    diameter: Math.floor(Math.random() * 60),
    positieX: mouse.posX - breedteNav,
    positieY: mouse.posY - hoogteNav,
    opacity: 1,
  };
  draw(p);
  savePos(p);
}

function savePos(particle) {
  positionGone = positionOld;
  positionOld = positionNew;
  positionNew = {
    X: particle.positieX,
    Y: particle.positieY,
  };
}

function drawBezier() {
  var ctx = getContextCanvas();
  ctx.beginPath();
  ctx.moveTo(positionOld.X, positionOld.Y);

  var ctrlPoint1 = {
    X: randomPoint(20, width),
    Y: randomPoint(20, height),
  };

  var ctrlPoint2 = {
    X: randomPoint(20, width),
    Y: randomPoint(20, height),
  };

  ctx.bezierCurveTo(
    ctrlPoint1.X,
    ctrlPoint1.Y,
    ctrlPoint2.X,
    ctrlPoint2.Y,
    positionNew.X,
    positionNew.Y,
  );
  ctx.strokeStyle = "#ff70c6";
  ctx.stroke();
}

function randomPoint(min, max) {
  return Math.random() * (max - min) + min;
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

  var mouse = {
    posX: tempX,
    posY: tempY,
  };
  return mouse;
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

function draw(particle) {
  var ctx = getContextCanvas();
  ctx.beginPath();
  ctx.arc(
    particle.positieX,
    particle.positieY,
    particle.diameter,
    0,
    2 * Math.PI,
  );
  var color = colors[Math.floor(Math.random() * 3)];
  fillArc(ctx, color[0], color[1], color[2], 0);
  ctx.lineWidth = 0.5;
}

function fillArc(ctx, r, g, b, a) {
  a += 0.1;
  console.log(a);

  ctx.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
  console.log("rgba(" + r + "," + g + "," + b + "," + a + ")");
  ctx.fill();
  ctx.restore();

  sFunction = function () {
    fillArc(ctx, r, g, b, a);
  };
  timeoutId = setTimeout(sFunction, 20);
  if (a >= 1) {
    clearTimeout(timeoutId);
    drawBezier();
  }
}
