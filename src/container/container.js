class DemoContainer extends HTMLElement {
  connectedCallback() {
    if (this._initialized) return;
    this._initialized = true;

    const template = document.getElementById('demo-container-template');
    if (!template) return;

    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define('demo-container', DemoContainer);
