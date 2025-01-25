const svgIcons = document.querySelectorAll('.offer-svg');
const cardField = document.querySelector('.products-field');
const cards = document.querySelectorAll('.products-card');
const products = document.querySelector('.products');
let activeIndex = 0;
let startX = 0;

function calculateCardWidth() {
  const viewportWidth = window.innerWidth;
  return viewportWidth >= 768 ? 292 : 357;
}

function svgHover() {
  svgIcons.forEach((svg, index) => {
    svg.addEventListener('mouseover', () => {
      updateCardDisplay(index);
    });
  });
}

function svgReskin() {
  svgIcons.forEach((svg, index) => {
    const useElement = svg.querySelector('use');
    if (!useElement) return;

    const isActive = index === activeIndex;
    useElement.setAttribute('href', isActive ? '#icon-rectangle' : '#icon-ellipse');
    svg.style.width = isActive ? '28px' : '13px';
    svg.style.height = isActive ? '13px' : '13px';
    svg.style.fill = isActive ? '#FD9222' : 'rgba(17, 17, 17, 0.1)';
  });
}

function updateCardDisplay(index) {
  activeIndex = index;
  const offset = -activeIndex * calculateCardWidth();
  cardField.style.transform = `translateX(${offset}px)`;
  svgReskin();
  }

products.addEventListener('touchstart', touchEvent => {
    startX = touchEvent.touches[0].clientX;
  });

products.addEventListener('touchend', touchEvent => {
  const swipeDistance = touchEvent.changedTouches[0].clientX - startX;
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance < 0 && activeIndex < cards.length - 1) {
      updateCardDisplay(activeIndex + 1);
    } else if (swipeDistance > 0 && activeIndex > 0) {
      updateCardDisplay(activeIndex - 1);
    }
  }
});

svgHover();
updateCardDisplay(activeIndex);
window.addEventListener('resize', () => updateCardDisplay(activeIndex));