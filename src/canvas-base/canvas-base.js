export class CanvasBase extends HTMLElement {
  constructor() {
    super();
    this.canvas = null;
    this.ctx = null;
    this.resizeHandler = this.resizeCanvas.bind(this);
  }

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.appendChild(this.canvas);

    this.resizeCanvas();
    window.addEventListener('resize', this.resizeHandler);

    const MAIN_WINDOW = this.parentElement?.closest('main-window');
    if (MAIN_WINDOW) {
      MAIN_WINDOW.addEventListener('main-window-update', this.resizeCanvas);
    }
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeCanvas() {
    if (!this.canvas) return;

    const rect = this.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    this.canvas.width = Math.round(rect.width * devicePixelRatio);
    this.canvas.height = Math.round(rect.height * devicePixelRatio);
    this.ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

    this.render();
  }

  clear(background) {
    if (!this.ctx) return;

    if (background) {
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



