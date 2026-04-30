import { AxisBase } from '../axis-base.js';

class LoudnessAxis extends AxisBase {
  constructor() {
    super();
    this.min = 0;
    this.max = 1;
    this.unit = '';
  }

  connectedCallback() {
    super.connectedCallback();
    if (this._initialized) {
      this.render();
    }
  }

  render() {
    if (!this.ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    this.clear('#0a0a0a');

    this.ctx.strokeStyle = '#444';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(w - 1, 0);
    this.ctx.lineTo(w - 1, h);
    this.ctx.stroke();

    this.ctx.fillStyle = '#888';
    this.ctx.font = '10px monospace';
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';

    const tickCount = 5;
    for (let i = 0; i <= tickCount; i++) {
      const y = (i / tickCount) * h;
      const value = this.max - (i / tickCount) * (this.max - this.min);

      this.ctx.beginPath();
      this.ctx.moveTo(w - 1, y);
      this.ctx.lineTo(w - 6, y);
      this.ctx.stroke();

      const label = value.toFixed(1) + this.unit;
      this.ctx.fillText(label, w - 10, y);
    }
  }
}

customElements.define('loudness-axis', LoudnessAxis);
