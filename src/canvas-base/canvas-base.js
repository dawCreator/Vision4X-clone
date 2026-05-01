export class CanvasBase extends HTMLElement {
  constructor() {
    super();
    this.canvas = null;
    this.ctx = null;
  }

  connectedCallback() {
    if (!this._initialized) {
      this._initialized = true;
  
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.appendChild(this.canvas);
  
      window.addEventListener('resize', this.resizeCanvas);
  
      this.classList.add('canvas-base');
    }
    const MAIN_WINDOW = this.parentElement?.closest('main-window');
    if (MAIN_WINDOW) {
      MAIN_WINDOW.addEventListener('main-window-update', this.resizeCanvas);
    }
    this.resizeCanvas();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resizeCanvas);

    const MAIN_WINDOW = this.parentElement?.closest('main-window');
    MAIN_WINDOW?.removeEventListener('main-window-update', this.resizeCanvas);
  }

  resizeCanvas = function() {
    if (!this.canvas) return;

    const rect = this.getBoundingClientRect();

    this.canvas.width = rect.width * devicePixelRatio;
    this.canvas.height = rect.height * devicePixelRatio;
    this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    this.setupCanvas();
    this.render();
  }.bind(this);

  setupCanvas() {
    // Implemented by subclasses.
  }

  clear(background = undefined) {
    if (!this.ctx) return;

    if (background !== undefined) {
      this.ctx.fillStyle = background;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  render() {
    // Implemented by subclasses.
  }
}



