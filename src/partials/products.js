const svgIcons = document.querySelectorAll('.offer-svg');
const cardField = document.querySelector('.products-field');
const cards = document.querySelectorAll('.products-card');
const products = document.querySelector('.products');
let activeIndex = 0;
let startX = 0;

function calculateCardWidth() {
  return window.innerWidth >= 768 ? 292 : 357;
}

function getSwipeStep() {
  return window.innerWidth >= 768 ? 2 : 1;
}

function svgHover() {
  svgIcons.forEach(function (svg, index) {
    svg.addEventListener('mouseover', function () {
      updateCardDisplay(index);
    });
  });
}

function svgReskin() {
  svgIcons.forEach(function (svg, index) {
    const useElement = svg.querySelector('use');
    if (!useElement) return;

    const isActive = index === activeIndex;
    useElement.setAttribute(
      'href',
      isActive ? '#icon-rectangle' : '#icon-ellipse'
    );
    svg.style.width = isActive ? '28px' : '13px';
    svg.style.height = '13px';
    svg.style.fill = isActive ? '#FD9222' : 'rgba(17, 17, 17, 0.1)';
  });
}

function updateCardDisplay(index) {
  activeIndex = index;
  const offset = -activeIndex * calculateCardWidth();
  cardField.style.transform = `translateX(${offset}px)`;
  svgReskin();
}

products.addEventListener('touchstart', function (touchEvent) {
  startX = touchEvent.touches[0].clientX;
});

products.addEventListener('touchend', function (touchEvent) {
  const swipeDistance = touchEvent.changedTouches[0].clientX - startX;
  let swipeStep = getSwipeStep();

  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance < 0 && activeIndex < cards.length - 1) {
      if (activeIndex + swipeStep >= cards.length) {
        swipeStep = 1;
      }
      updateCardDisplay(activeIndex + swipeStep);
    } else if (swipeDistance > 0 && activeIndex > 0) {
      if (activeIndex - swipeStep < 0) {
        swipeStep = 1;
      }
      updateCardDisplay(activeIndex - swipeStep);
    }
  }
});

svgHover();
updateCardDisplay(activeIndex);
window.addEventListener('resize', function () {
  updateCardDisplay(activeIndex);
});
