import { CanvasBase } from '../canvas-base.js';

export class AxisBase extends CanvasBase {
  constructor() {
    super();
    this.min = 0;
    this.max = 1;
    this.unit = '';
  }

  setRange(min, max, unit = '') {
    this.min = min;
    this.max = max;
    this.unit = unit;
    this.render();
  }
}