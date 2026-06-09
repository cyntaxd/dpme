const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;  // Adjust as needed
let lastScrollY = window.scrollY; // For detecting scroll movement
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;           // Radius between 1 and 3
    this.speedX = (Math.random() - 0.5) * 1;         // Random horizontal speed
    this.speedY = (Math.random() - 0.5) * 1;         // Random vertical speed
    this.alpha = Math.random();                    // Starting opacity
    this.fadeSpeed = Math.random() * 0.005 + 0.002;  // Fade speed between 0.002 and 0.007
  }

  update(scrollDelta) {
    this.x += this.speedX;
    this.y += this.speedY;

    const scrollFactor = 0.05;
    this.y += scrollDelta * scrollFactor;
    
    const repelRadius = 100;
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < repelRadius && distance > 0) {
      const force = (repelRadius - distance) / repelRadius;
      const repelMultiplier = 2;
      this.x += (dx / distance) * force * repelMultiplier;
      this.y += (dy / distance) * force * repelMultiplier;
    }
    
    this.alpha += this.fadeSpeed;
    if (this.alpha >= 1) {
      this.alpha = 1;
      this.fadeSpeed = -Math.abs(this.fadeSpeed);
    } else if (this.alpha <= 0) {
      this.alpha = 0;
      this.fadeSpeed = Math.abs(this.fadeSpeed);
    }

    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.save();
    const mouseFactor = 0.05;
    const offsetX = (mouseX - canvas.width / 2) * mouseFactor;
    const offsetY = (mouseY - canvas.height / 2) * mouseFactor;
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x + offsetX, this.y + offsetY, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;

  particlesArray.forEach(particle => {
    particle.update(scrollDelta);
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

initParticles();
animateParticles();
