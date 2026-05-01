import { ViewBase } from '../view-base.js';

class SpectrogramView extends ViewBase {
  constructor() {
    super();
    this.history = [];
    this.historyLength = 100;
  }

  setData(data) {
    this.history.push([...data]);
    if (this.history.length > this.historyLength) {
      this.history.shift();
    }
    this.render();
  }

  render() {
    this.clear();
    
    if (!this.ctx || this.history.length === 0) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    const timeStep = w / this.history.length;
    const freqBins = this.history[0].length;
    const freqStep = h / freqBins;

    for (let t = 0; t < this.history.length; t++) {
      const frame = this.history[t];
      for (let f = 0; f < frame.length; f++) {
        const intensity = frame[f];
        const hue = (f / frame.length) * 360;
        const lightness = 50 * intensity;
        this.ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        this.ctx.fillRect(t * timeStep, f * freqStep, timeStep, freqStep);
      }
    }
  }
}

customElements.define('spectogram-view', SpectrogramView);
