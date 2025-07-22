const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let letters = [];
let particles = [];

class Letter {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.text = "TE ADORO 💖";
    this.speed = speed;
    this.size = 20 + Math.random() * 10;
    this.color = "pink";
  }
  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = -50;
      this.x = Math.random() * canvas.width;
    }
  }
  draw() {
    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

function createLetters() {
  for (let i = 0; i < 30; i++) {
    letters.push(
      new Letter(Math.random() * canvas.width, Math.random() * canvas.height, 1 + Math.random() * 2)
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  letters.forEach((l) => {
    l.update();
    l.draw();
  });
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.size < 0.5) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.text = "TE ADORO 💖";
    this.size = 20;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;
    this.color = "pink";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95;
  }
  draw() {
    ctx.font = `${this.size}px Arial`;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x, this.y);
  }
}

canvas.addEventListener("click", function (e) {
  for (let i = 0; i < 10; i++) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

createLetters();
animate();
