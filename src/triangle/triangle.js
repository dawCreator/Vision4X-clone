export function describeTriangle() {
  return 'Red triangle component with HTML/CSS/JS split for testing.';
}

const triangleComponents = document.querySelectorAll('.triangle-component');
triangleComponents.forEach((component) => {
  const shape = component.querySelector('.triangle-shape');
  const label = component.querySelector('.triangle-label');
  if (!shape || !label) return;

  shape.addEventListener('click', () => {
    const isGreen = shape.classList.toggle('triangle-green');
    label.textContent = isGreen ? 'Green Triangle' : 'Red Triangle';
  });
});
