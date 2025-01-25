const svgIcons = document.querySelectorAll('.offer-svg');
const cardField = document.querySelector('.products-field');
const cards = document.querySelectorAll('.products-card');
let activeIndex = 0;

function calculateCardWidth() {
  const viewportWidth = window.innerWidth;
  if (viewportWidth >= 1200) {
    return 270 + 18;
  } else if (viewportWidth >= 768) {
    return 270 + 18;
  } else {
    return 335 + 18;
  }
}

function updateCardDisplay(index) {
  activeIndex = index;
  const cardWidth = calculateCardWidth();
  const offset = -activeIndex * cardWidth;
  cardField.style.transform = `translateX(${offset}px)`;

  svgIcons.forEach((svg, i) => {
    const useElement = svg.querySelector('use');
    if (useElement) {
      if (i === activeIndex) {
        useElement.setAttribute('href', '#icon-rectangle');
        svg.style.width = '28px';
        svg.style.height = '13px';
        svg.style.fill = '#FD9222';
      } else {
        useElement.setAttribute('href', '#icon-ellipse');
        svg.style.width = '13px';
        svg.style.height = '13px';
        svg.style.fill = 'rgba(17, 17, 17, 0.1)';
      }
    }
  });
}

let startX = 0;
let endX = 0;

document.querySelector('.products').addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

document.querySelector('.products').addEventListener('touchend', e => {
  endX = e.changedTouches[0].clientX;
  const swipeDistance = endX - startX;

  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance < 0 && activeIndex < cards.length - 1) {
      updateCardDisplay(activeIndex + 1);
    } else if (swipeDistance > 0 && activeIndex > 0) {
      updateCardDisplay(activeIndex - 1);
    }
  }
});

svgIcons.forEach((svg, index) => {
  svg.addEventListener('click', () => {
    updateCardDisplay(index);
  });
});

window.addEventListener('resize', () => {
  updateCardDisplay(activeIndex);
});

updateCardDisplay(activeIndex);
