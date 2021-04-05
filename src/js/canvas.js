import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2195C5', '#8ECEFD', '#FFD6E5', '#FF2F66']
var gravity = 1;
var friction = .95;

// Helper Functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
});

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  //init()
});
// Reset
addEventListener('click', function() {
  init()
});

// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x
    this.y = y
    this.dx = dx;
    this.dy = dy;
    this.radius = radius
    this.color = color
  }

  draw() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.stroke();
    c.closePath()
  }

  update() {
    if(this.y + this.radius + this.dy > canvas.height) { // Floor collision
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
      // console.log(this.dy);
    }
    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius - this.dx < 0) {
      this.dx = -this.dx;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw()
  }
}
var ball;
var balls;
// Implementation
function init() {
  balls = [];
  for(var i = 0; i < 100; i++) {
    var radius = randomIntFromRange(20, 40);
    var x = randomIntFromRange(radius + 5, canvas.width - radius);
    var y = randomIntFromRange(radius + 5, canvas.height - radius);
    var dx = randomIntFromRange(-2, 2);
    var dy = randomIntFromRange(-2, 2);
    balls.push(new Ball(x, y, dx, dy, radius, randomColor(colors)));
  }
  // ball = new Ball(canvas.width/2, canvas.height/2, 2, 30, 'red');
  // console.log(ball);
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  // ball.update();
  for(var i = 0; i < balls.length; i++) {
    balls[i].update();
  }
}

init()
animate()
