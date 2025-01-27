const svgIcons = document.querySelectorAll('.slider-icon');
const cardList = document.querySelector('.product-list');
let cards = Array.from(document.querySelectorAll('.product-card'));
let activeIndex = 0;
let startX = 0;

function calculateCardWidth() {
  return window.innerWidth >= 768 ? 292 : 357;
}

function eventSvgHover() {
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
    svg.style.transform = isActive ? 'scale(1.15)' : 'scale(1.0)';
    if (isActive) {
      setTimeout(() => {
        postSvgStyles(svg);
      }, 200);
    }
  });
}

function postSvgStyles() {
  svgIcons.forEach((svg, index) => {
    svg.style.transform = 'scale(1.0)';
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
  const cardWidth = calculateCardWidth();

  // Обчислюємо кількість карток, які потрібно просунути
  const swipeStep = Math.round(Math.abs(swipeDistance) / cardWidth);

  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance < 0) {
      // Перехід вперед
      updateCardDisplay((activeIndex + swipeStep) % cards.length);
      updateSvgStyles();
    } else if (swipeDistance > 0) {
      // Перехід назад
      updateCardDisplay(
        (activeIndex - swipeStep + cards.length) % cards.length
      );
      updateSvgStyles();
    }
  }
}

function initializeCards() {
  const cardWidth = calculateCardWidth();
  const visibleCards = Math.floor(window.innerWidth / cardWidth);
  const totalCards = cards.length;

  // Clone cards to create infinite scroll effect
  for (let i = 0; i < visibleCards; i++) {
    cards.forEach(card => {
      cardList.appendChild(card.cloneNode(true));
    });
  }

  // Adjust the initial position to show the first set of cards
  updateCardDisplay(activeIndex);
}

cardList.addEventListener('touchstart', handleTouch, { passive: true });
cardList.addEventListener('touchend', handleTouch);
eventSvgHover();
updateSvgStyles();
window.addEventListener('resize', () => {
  initializeCards();
  updateCardDisplay(activeIndex);
});
initializeCards();
updateCardDisplay(activeIndex);
