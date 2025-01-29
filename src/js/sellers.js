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
