const svgIcons = document.querySelectorAll('.slider-icon');
const cardList = document.querySelector('.product-list');
const cards = document.querySelectorAll('.product-card');
let activeIndex = 0;

function calculateCardWidth() {
  return window.innerWidth >= 768 ? 292 : 357;
}

function getSwipeStep() {
  return window.innerWidth >= 768 ? 2 : 1;
}

function setupSvgHover() {
  svgIcons.forEach((svg, index) => {
    svg.addEventListener('mouseover', () => {
      updateCardDisplay(index);
      updateSvgStyles();
    });
  });
}

function updateSvgStyles() {
  svgIcons.forEach((svg, index) => {
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
}

function handleTouch(event) {
  if (event.type === 'touchstart') {
    startX = event.touches[0].clientX;
  } else if (event.type === 'touchend') {
    const swipeDistance = event.changedTouches[0].clientX - startX;
    handleSwipe(swipeDistance);
  }
}

function handleSwipe(swipeDistance) {
  const swipeStep = getSwipeStep();
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance < 0 && activeIndex < cards.length - 1) {
      updateCardDisplay(Math.min(activeIndex + swipeStep, cards.length - 1));
      updateSvgStyles();
    } else if (swipeDistance > 0 && activeIndex > 0) {
      updateCardDisplay(Math.max(activeIndex - swipeStep, 0));
      updateSvgStyles();
    }
  }
}

cardList.addEventListener('touchstart', handleTouch, { passive: true });
cardList.addEventListener('touchend', handleTouch);
setupSvgHover();
updateSvgStyles();
window.addEventListener('resize', () => updateCardDisplay(activeIndex));
updateCardDisplay(activeIndex);
