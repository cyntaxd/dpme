// Get the canvas and its context
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Global variables for particles and interactions
let particlesArray = [];
const numberOfParticles = 100;  // Adjust as needed
let lastScrollY = window.scrollY; // For detecting scroll movement
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Particle class definition
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
    // Move particle by inherent speed
    this.x += this.speedX;
    this.y += this.speedY;

    // Apply scroll influence
    const scrollFactor = 0.05;
    this.y += scrollDelta * scrollFactor;
    
    // --- Repulsion from Mouse ---
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
    
    // Smooth fading: update alpha with clamping and directional reversal
    this.alpha += this.fadeSpeed;
    if (this.alpha >= 1) {
      this.alpha = 1;
      this.fadeSpeed = -Math.abs(this.fadeSpeed);
    } else if (this.alpha <= 0) {
      this.alpha = 0;
      this.fadeSpeed = Math.abs(this.fadeSpeed);
    }

    // Wrap particles when moving off-screen
    if (this.x < 0) this.x = canvas.width;
    if (this.x > canvas.width) this.x = 0;
    if (this.y < 0) this.y = canvas.height;
    if (this.y > canvas.height) this.y = 0;
  }

  draw() {
    ctx.save();
    // Calculate offset based on mouse position for parallax effect
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

// Initialize particles
function initParticles() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

// Animation Loop
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate scroll delta
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;
  lastScrollY = currentScrollY;

  // Update and draw each particle
  particlesArray.forEach(particle => {
    particle.update(scrollDelta);
    particle.draw();
  });

  requestAnimationFrame(animateParticles);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

// Update mouse position for repulsion and parallax offset
window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Start the particle system
initParticles();
animateParticles();
