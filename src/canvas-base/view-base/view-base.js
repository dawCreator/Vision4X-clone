import { CanvasBase } from '../canvas-base.js';

export class ViewBase extends CanvasBase {
  constructor() {
    super();
    this.data = [];
  }

  setData(data) {
    this.data = data;
    this.render();
  }
}