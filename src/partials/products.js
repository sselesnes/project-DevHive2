const svgIcons = document.querySelectorAll('.offer-svg');
const cardList = document.querySelector('.product-list');
const cards = document.querySelectorAll('.product-card');
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
    svg.style.fill = isActive ? '#FD9222' : 'rgba(17, 17, 17, 0.1)';
    svg.style.width = isActive ? '28px' : '13px';
  });
}

function updateCardDisplay(index) {
  activeIndex = index;
  const offset = -activeIndex * calculateCardWidth();
  cardList.style.transform = `translateX(${offset}px)`;
  svgReskin();
}

cardList.addEventListener(
  'touchstart',
  function (touchEvent) {
    startX = touchEvent.touches[0].clientX;
  },
  { passive: true }
);

cardList.addEventListener('touchend', function (touchEvent) {
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
window.addEventListener('resize', () => updateCardDisplay(activeIndex));
updateCardDisplay(activeIndex);
