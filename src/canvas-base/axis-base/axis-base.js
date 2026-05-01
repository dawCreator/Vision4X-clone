import { CanvasBase } from '../canvas-base.js';

export class AxisBase extends CanvasBase {
  #numbers = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000];
  #unit = undefined;
  #isLogarithmic = false; 
  static FONT = '12px sans-serif';

  connectedCallback() {
    if (this._initialized) return;
    this.classList.add('axis-base');
    super.connectedCallback();
  }

  setupCanvas() {
    if (!this.ctx) return;

    this.ctx.font = AxisBase.FONT;
    this.ctx.fillStyle = this.textColor;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    switch (name) {
      case 'vertical':
        this.render();
        break;
      default:
        break;
    }
  }

  get isVertical() {
    return this.hasAttribute('vertical');
  }
  set isVertical(value) {
    if (value) this.setAttribute('vertical', '');
     else this.removeAttribute('vertical');
  }

  get textColor() {
    return getComputedStyle(this).getPropertyValue('--TEXT_COLOR').trim() || '#c8c8c8';
  }

  get offset() {

  }
  set offset(value) {
  }


  render() {
    if (!this.ctx) return;

    const W = this.canvas.clientWidth;
    const H = this.canvas.clientHeight;

    if (W < 20 || H < 20) return;

    this.clear();

    const MAX = this.#numbers[this.#numbers.length - 1],
          MIN = this.#numbers[0];
    const RANGE = MAX - MIN;


    for (let i = 0; i < this.#numbers.length; i++) {
      const number = this.#numbers[i],
            ratio = (number - MIN) / RANGE;

      if (this.isVertical) {
        const y = H - ratio * H;
        this.ctx.fillText(number, W / 2, y);
      } else {
        const x = ratio * W;
        this.ctx.fillText(number, x, H / 2);
      }
    }
  }
}