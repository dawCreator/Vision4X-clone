export class ButtonBase extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    this.classList.add('button-base');
    this.addEventListener('mousedown', this.onDown);
  }

  disconnectedCallback() {
    this.removeEventListener('mousedown', this.onDown);
  }

  onDown = function() {
    this.dispatchEvent(new CustomEvent('button-click', { detail: { label: this.label } }));
  }.bind(this);

  setIcon(iconName) {
    this.className = `icon-${iconName}`;
  }

  setLabel(label) {
    this.label = label;
    this.setAttribute('aria-label', label);
  }
}
