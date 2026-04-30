import { ButtonBase } from '../button-base.js';

class ScaleButton extends ButtonBase {
  connectedCallback() {
    super.connectedCallback();
    const MAIN_WINDOW = this.parentElement?.closest('main-window');
    if (!MAIN_WINDOW) return;
    this.onDrag = this.onDrag.bind(MAIN_WINDOW);
  }
  onDown = function() {
    addEventListener('mousemove', this.onDrag);
    addEventListener('mouseup', this.onDragEnd);
  }.bind(this);
  onDrag(event) {
    this.x = event.clientX / window.innerWidth;
    this.y = event.clientY / window.innerHeight;
  };
  onDragEnd = function(event) {
    removeEventListener('mousemove', this.onDrag);
    removeEventListener('mouseup', this.onDragEnd);
  }.bind(this);
}

customElements.define('scale-button', ScaleButton);