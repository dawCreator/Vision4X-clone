// Shows an image of Vision4X as an overlay when space is held, allowing the user to adjust the opacity by dragging left/right.

const DEFAULT_FILL = 50;
const MIN_OPACITY = 0.15;
const MAX_OPACITY = 1;
const MOUSE_SENSITIVITY = 2.5;
const MIN_DX_THRESHOLD = 4;

class ImageOverlay extends HTMLElement {
  constructor() {
    super();
    this.spacePressed = false;
    this.wasVisibleOnSpaceDown = false;
    this.draggedSinceSpaceDown = false;
    this.fillPercent = DEFAULT_FILL;
    this.currentMouseX = 0;
    this.pointerXOnSpaceDown = 0;
  }

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    const TEMPLATE = document.getElementById('image-overlay-template');
    if (!TEMPLATE) return;
    
    const content = TEMPLATE.content.cloneNode(true);
    this.appendChild(content);

    this.backdrop = this.querySelector('.image-overlay__backdrop');
    this.bar = this.querySelector('.image-overlay__bar');
    this.fill = this.querySelector('.image-overlay__fill');

    this.updateFill(this.fillPercent);

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('pointermove', this.handlePointerMove);
  }

  disconnectedCallback() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('pointermove', this.handlePointerMove);
  }

  handleKeyDown = function(event) {
    if (event.code !== 'Space' || event.repeat) return;
    event.preventDefault();

    const wasVisible = this.classList.contains('visible');
    this.spacePressed = true;
    this.wasVisibleOnSpaceDown = wasVisible;
    this.draggedSinceSpaceDown = false;
    this.pointerXOnSpaceDown = this.currentMouseX;
    this.fillPercentOnSpaceDown = this.fillPercent;

    if (!wasVisible) {
      this.showOverlay();
    }

    this.showBar();
  }.bind(this);

  handleKeyUp = function(event) {
    if (event.code !== 'Space') return;
    if (!this.classList.contains('visible')) return;

    const shouldClose = this.wasVisibleOnSpaceDown && !this.draggedSinceSpaceDown;
    this.spacePressed = false;
    this.draggedSinceSpaceDown = false;

    if (shouldClose) {
      this.hideOverlay();
      return;
    }

    this.hideBar();
  }.bind(this);

  handlePointerMove = function(event) {
    this.currentMouseX = event.clientX;
    
    if (!this.classList.contains('visible') || !this.spacePressed) return;
    
    const dx = event.clientX - this.pointerXOnSpaceDown;
    
    if (!this.draggedSinceSpaceDown && Math.abs(dx) >= MIN_DX_THRESHOLD) {
      this.draggedSinceSpaceDown = true;
      this.pointerXOnSpaceDown = event.clientX;
    }
    
    if (this.draggedSinceSpaceDown) {
      this.updateFromPointer(event.clientX - this.pointerXOnSpaceDown);
    }
  }.bind(this);

  showOverlay() {
    this.classList.add('visible');
  }

  hideOverlay() {
    this.classList.remove('visible');
    this.spacePressed = false;
    this.dragging = false;
    this.hideBar(true);
  }

  showBar() {
    if (this.classList.contains('visible') && this.spacePressed) {
        this.bar.classList.add('visible');
    }
  }

  hideBar() {
    this.bar.classList.remove('visible');
  }

  updateFromPointer(dx) {
    const scaledDx = dx * MOUSE_SENSITIVITY;
    const percent = Math.min(100, Math.max(0, this.fillPercentOnSpaceDown + (scaledDx / window.innerWidth) * 100));
    this.updateFill(percent);
  }

  updateFill(percent) {
    this.fillPercent = percent;
    this.fill.style.width = `${percent}%`;
    const opacity = MIN_OPACITY + (MAX_OPACITY - MIN_OPACITY) * (percent / 100);
    this.backdrop.style.setProperty('--image-opacity', opacity.toFixed(3));
  }
}

customElements.define('image-overlay', ImageOverlay);
