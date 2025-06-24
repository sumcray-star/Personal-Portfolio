
class ClickSpark {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      sparkColor: options.sparkColor || '#fff',
      sparkSize: options.sparkSize || 10,
      sparkRadius: options.sparkRadius || 15,
      sparkCount: options.sparkCount || 8,
      duration: options.duration || 400,
      easing: options.easing || 'ease-out',
      extraScale: options.extraScale || 1.0,
      ...options
    };
    
    this.sparks = [];
    this.animationId = null;
    this.canvas = null;
    this.ctx = null;
    
    this.init();
  }
  
  init() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '1000';
    
    this.ctx = this.canvas.getContext('2d');
    
    // Make sure parent is positioned
    const computedStyle = window.getComputedStyle(this.element);
    if (computedStyle.position === 'static') {
      this.element.style.position = 'relative';
    }
    
    this.element.appendChild(this.canvas);
    
    // Setup event listeners
    this.element.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Initial resize
    this.handleResize();
    
    // Start animation loop
    this.animate();
  }
  
  handleResize() {
    const rect = this.element.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const now = performance.now();
    const newSparks = Array.from({ length: this.options.sparkCount }, (_, i) => ({
      x,
      y,
      angle: (2 * Math.PI * i) / this.options.sparkCount,
      startTime: now,
    }));
    
    this.sparks.push(...newSparks);
  }
  
  easeFunc(t) {
    switch (this.options.easing) {
      case 'linear':
        return t;
      case 'ease-in':
        return t * t;
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      default:
        return t * (2 - t);
    }
  }
  
  animate(timestamp) {
    if (!timestamp) timestamp = performance.now();
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.sparks = this.sparks.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= this.options.duration) {
        return false;
      }
      
      const progress = elapsed / this.options.duration;
      const eased = this.easeFunc(progress);
      
      const distance = eased * this.options.sparkRadius * this.options.extraScale;
      const lineLength = this.options.sparkSize * (1 - eased);
      
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
      
      this.ctx.strokeStyle = this.options.sparkColor;
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
      
      return true;
    });
    
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.canvas) {
      this.canvas.remove();
    }
    this.element.removeEventListener('click', this.handleClick);
    window.removeEventListener('resize', this.handleResize);
  }
}

// Initialize ClickSpark on various elements
function initClickSparks() {
  // Add sparks to buttons
  const buttons = document.querySelectorAll('button, .form-btn, .resume-btn');
  buttons.forEach(button => {
    new ClickSpark(button, {
      sparkColor: '#ffdb70',
      sparkSize: 8,
      sparkRadius: 12,
      sparkCount: 6,
      duration: 300
    });
  });
  
  // Add sparks to navigation links
  const navLinks = document.querySelectorAll('.navbar-link');
  navLinks.forEach(link => {
    new ClickSpark(link, {
      sparkColor: '#ffdb70',
      sparkSize: 6,
      sparkRadius: 10,
      sparkCount: 5,
      duration: 250
    });
  });
  
  // Add sparks to portfolio items
  const portfolioItems = document.querySelectorAll('.project-item');
  portfolioItems.forEach(item => {
    new ClickSpark(item, {
      sparkColor: '#ff7675',
      sparkSize: 10,
      sparkRadius: 15,
      sparkCount: 8,
      duration: 400
    });
  });
  
  // Add sparks to social links
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach(link => {
    new ClickSpark(link, {
      sparkColor: '#74b9ff',
      sparkSize: 8,
      sparkRadius: 12,
      sparkCount: 6,
      duration: 350
    });
  });
  
  // Add sparks to service items
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(item => {
    new ClickSpark(item, {
      sparkColor: '#00b894',
      sparkSize: 9,
      sparkRadius: 14,
      sparkCount: 7,
      duration: 375
    });
  });
  
  // Add sparks to testimonial items
  const testimonialItems = document.querySelectorAll('.testimonials-item');
  testimonialItems.forEach(item => {
    new ClickSpark(item, {
      sparkColor: '#a29bfe',
      sparkSize: 8,
      sparkRadius: 13,
      sparkCount: 6,
      duration: 325
    });
  });
  
  // Add sparks to filter buttons
  const filterBtns = document.querySelectorAll('[data-filter-btn]');
  filterBtns.forEach(btn => {
    new ClickSpark(btn, {
      sparkColor: '#fd79a8',
      sparkSize: 7,
      sparkRadius: 11,
      sparkCount: 5,
      duration: 275
    });
  });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClickSpark;
}
