import { ViewBase } from '../view-base.js';

class SpectrumView extends ViewBase {
  constructor() {
    super();
  }

  render() {
    if (!this.ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    this.clear('#1a1a1a');

    if (this.data.length === 0) return;

    const barWidth = w / this.data.length;

    for (let i = 0; i < this.data.length; i++) {
      const barHeight = this.data[i] * h;
      const x = i * barWidth;
      const y = h - barHeight;

      this.ctx.fillStyle = `hsl(${(i / this.data.length) * 360}, 100%, 50%)`;
      this.ctx.fillRect(x, y, barWidth - 1, barHeight);
    }
  }
}

customElements.define('spectrum-view', SpectrumView);
