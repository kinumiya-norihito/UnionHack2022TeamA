var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var raf;
var running = false;
var moveAuto = false;

var ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 1,
  radius: 25,
  color: "blue",
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clear();
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (moveAuto == true) {
    ball.vy *= 0.99;
    ball.vy += 0.25;
  } else {
    ball.vx = 0;
    ball.vy = 0;
  }

  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
    ball.vx = -ball.vx;
  }

  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", function (e) {
  if (!running) {
    clear();
    ball.x = e.clientX;
    ball.y = e.clientY;
    ball.draw();
  }
});
canvas.addEventListener("click", function (e) {
  if (!running) {
    moveAuto = true;
    ball.vx = 5;
    ball.vy = 1;
    ball.x = e.clientX;
    ball.y = e.clientY;
    console.log(ball.vx, ball.vy);
    console.log(ball.x, ball.y);
    window.cancelAnimationFrame(raf);
    raf = window.requestAnimationFrame(draw);
    running = true;
  } else {
    running = false;
    moveAuto = false;
  }
});

canvas.addEventListener("mouseout", function (e) {
  window.cancelAnimationFrame(raf);
  running = false;
});

ball.draw();
