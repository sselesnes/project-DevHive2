// document.addEventListener("DOMContentLoaded", function () {
const menuBtn = document.querySelector('.btn-sandvich');
const menu = document.querySelector('.header-nav-container');
const closeBtn = document.querySelector('.mobile-menu-close');

menuBtn.addEventListener('click', function () {
  menu.classList.add('is-open');
});

closeBtn.addEventListener('click', function () {
  menu.classList.remove('is-open');
});

document.addEventListener('click', function (event) {
  if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
    menu.classList.remove('is-open');
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    menu.classList.remove('is-open');
  }
});
// });
