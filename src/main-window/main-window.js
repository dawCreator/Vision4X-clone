class MainWindow extends HTMLElement {
	constructor() {
			super();
	}   

  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    const template = document.getElementById('main-window-template');
    if (!template) return;

    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
  
  get x() {
    if (this.#x !== undefined) return this.#x;
    return parseFloat(this.style.getPropertyValue('--x'));
  }
  #x = undefined;
  set x(value) {
    if (isNaN(value)) return;
    const X = Math.max(0, Math.min(1, value)),
          X_CHANGED = this.x !== X;
    this.#x = X;
    if (!this.#needsUpdate && X_CHANGED) this.update();
  }

  get y() {
    if (this.#y !== undefined) return this.#y;
    return parseFloat(this.style.getPropertyValue('--y'));
  }
  #y = undefined;
  set y(value) {
    if (isNaN(value)) return;
    this.#y = Math.max(0, Math.min(1, value));
    if (!this.#needsUpdate && this.y !== this.#y) this.update();
  }

  #needsUpdate = false;
  update = function() {
    if (this.#needsUpdate) return;
    this.#needsUpdate = requestAnimationFrame(() => {
      this.style.setProperty('--x', `${this.x}`);
      this.#x = undefined;
      this.style.setProperty('--y', `${this.y}`);
      this.#y = undefined;

      const event = new CustomEvent('main-window-update', { detail: { x: this.x, y: this.y } });
      this.dispatchEvent(event);

      this.#needsUpdate = false;
    });
  }.bind(this);
}

customElements.define('main-window', MainWindow);