const svgIcons = document.querySelectorAll('.offer-svg');
const cardField = document.querySelector('.products-field');
const cards = document.querySelectorAll('.products-card');
let activeIndex = 0;

const calculateCardWidth = () => {
  const viewportWidth = window.innerWidth;
  return viewportWidth >= 768 ? 292 : 357;
};

const updateSvgStyles = () => {
  svgIcons.forEach((svg, index) => {
    const useElement = svg.querySelector('use');
    if (!useElement) return;

    const isActive = index === activeIndex;
    useElement.setAttribute(
      'href',
      isActive ? '#icon-rectangle' : '#icon-ellipse'
    );
    svg.style.width = isActive ? '28px' : '13px';
    svg.style.height = isActive ? '13px' : '13px';
    svg.style.fill = isActive ? '#FD9222' : 'rgba(17, 17, 17, 0.1)';
  });
};

const updateCardDisplay = index => {
  activeIndex = index;
  const offset = -activeIndex * calculateCardWidth();
  cardField.style.transform = `translateX(${offset}px)`;
  updateSvgStyles();
};

svgIcons.forEach((svg, index) => {
  svg.addEventListener('mouseover', () => {
    updateCardDisplay(index);
  });
});

let startX = 0;

document.querySelector('.products').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.querySelector('.products').addEventListener('touchend', e => {
  const swipeDistance = e.changedTouches[0].clientX - startX;
  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance < 0 && activeIndex < cards.length - 1) {
      updateCardDisplay(activeIndex + 1);
    } else if (swipeDistance > 0 && activeIndex > 0) {
      updateCardDisplay(activeIndex - 1);
    }
  }
});

window.addEventListener('resize', () => updateCardDisplay(activeIndex));

updateCardDisplay(activeIndex);
