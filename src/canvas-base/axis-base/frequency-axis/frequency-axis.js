import { AxisBase } from '../axis-base.js';

class FrequencyAxis extends AxisBase {
  constructor() {
    super();
    this.min = 20;
    this.max = 20000;
    this.unit = 'Hz';
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
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(w, 0);
    this.ctx.stroke();

    this.ctx.fillStyle = '#888';
    this.ctx.font = '12px monospace';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';

    const tickCount = 10;
    for (let i = 0; i <= tickCount; i++) {
      const x = (i / tickCount) * w;
      const value = this.min + (i / tickCount) * (this.max - this.min);

      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, 5);
      this.ctx.stroke();

      const label = value > 1000 ? (value / 1000).toFixed(1) + 'k' : value.toFixed(0);
      this.ctx.fillText(label + this.unit, x, 8);
    }
  }
}

customElements.define('frequency-axis', FrequencyAxis);
