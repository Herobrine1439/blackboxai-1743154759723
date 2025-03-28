class HUDEffects {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.visuals = document.getElementById('visuals');
    this.visuals.appendChild(this.canvas);
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Effect properties
    this.particles = [];
    this.scanLinePosition = 0;
    this.animationId = null;
    
    this.initEffects();
  }

  resizeCanvas() {
    this.canvas.width = this.visuals.clientWidth;
    this.canvas.height = this.visuals.clientHeight;
  }

  initEffects() {
    // Create initial particles
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    
    this.startAnimation();
  }

  startAnimation() {
    if (!this.animationId) {
      this.animate();
    }
  }

  stopAnimation() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw particles
    this.ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
    this.particles.forEach(particle => {
      this.ctx.globalAlpha = particle.opacity;
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fill();
      
      // Move particles
      particle.y += particle.speed;
      if (particle.y > this.canvas.height) {
        particle.y = 0;
        particle.x = Math.random() * this.canvas.width;
      }
    });
    
    // Draw scan line
    this.ctx.globalAlpha = 0.1;
    this.ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
    this.ctx.fillRect(0, this.scanLinePosition, this.canvas.width, 2);
    this.scanLinePosition = (this.scanLinePosition + 1) % this.canvas.height;
    
    // Draw grid lines
    this.drawGrid();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  drawGrid() {
    this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < this.canvas.width; x += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < this.canvas.height; y += 50) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  // Public method to trigger visual response
  showResponseEffect() {
    // Flash effect
    this.ctx.fillStyle = 'rgba(0, 255, 255, 0.3)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Add temporary particles
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
  }
}

// Export for module usage
export default HUDEffects;