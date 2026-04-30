import { ViewBase } from '../view-base.js';

class OscilloscopeView extends ViewBase {
  constructor() {
    super();
  }

  render() {
    if (!this.ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    this.clear('#1a1a1a');

    if (this.data.length === 0) return;

    this.ctx.strokeStyle = '#00ff00';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    const step = w / this.data.length;
    for (let i = 0; i < this.data.length; i++) {
      const x = i * step;
      const y = h / 2 - this.data[i] * (h / 2);
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
  }
}

customElements.define('oscilloscope-view', OscilloscopeView);
