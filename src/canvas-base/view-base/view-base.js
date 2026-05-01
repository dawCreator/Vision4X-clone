import { CanvasBase } from '../canvas-base.js';

export class ViewBase extends CanvasBase {
  constructor() {
    super();
    this.data = [];
  }

  connectedCallback() {
    if (this._initialized) return;
    this.classList.add('view-base');

    super.connectedCallback();
  }

  setData(data) {
    this.data = data;
    this.render();
  }
}