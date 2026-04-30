import { ViewBase } from '../view-base.js';

class StereoView extends ViewBase {
  constructor() {
    super();
    this.dataLeft = [];
    this.dataRight = [];
  }

  setData(dataLeft, dataRight) {
    this.dataLeft = dataLeft;
    this.dataRight = dataRight;
    this.render();
  }

  render() {
    if (!this.ctx) return;

    const w = this.canvas.width;
    const h = this.canvas.height;
    const midH = h / 2;

    this.clear('#1a1a1a');

    this.drawChannel(this.dataLeft, 0, midH, '#ff6600');
    this.drawChannel(this.dataRight, midH, h, '#00ff99');
  }

  drawChannel(data, yStart, yEnd, color) {
    if (data.length === 0) return;

    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();

    const step = this.canvas.width / data.length;
    const channelHeight = yEnd - yStart;
    const mid = yStart + channelHeight / 2;

    for (let i = 0; i < data.length; i++) {
      const x = i * step;
      const y = mid - data[i] * (channelHeight / 2);
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.stroke();
  }
}

customElements.define('stereo-view', StereoView);
