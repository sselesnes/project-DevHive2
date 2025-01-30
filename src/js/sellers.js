document
  .querySelector('.top-sellers-gallery-buynow')
  .addEventListener('click', () => {
    document.body.classList.add('modal-open');
    document.querySelector('.top-sellers-modal').classList.add('is-open');
  });

document
  .querySelector('.top-sellers-modal-close')
  .addEventListener('click', () => {
    document.body.classList.remove('modal-open');
    document.querySelector('.top-sellers-modal').classList.remove('is-open');
  });

function updateModalHeight() {
  document.documentElement.style.setProperty(
    '--modal-height',
    `${window.innerHeight * 0.9}px`
  );
}

window.addEventListener('resize', updateModalHeight);
window.addEventListener('load', updateModalHeight);
