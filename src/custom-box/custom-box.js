class ColoredBox extends HTMLElement {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  connectedCallback() {
    this.textContent = 'Tap me';
    this.addEventListener('click', this.handleClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick);
  }

  handleClick() {
    this.classList.toggle('active');
    this.textContent = this.classList.contains('active')
      ? 'Active!'
      : 'Tap me';
  }
}

customElements.define('colored-box', ColoredBox);
