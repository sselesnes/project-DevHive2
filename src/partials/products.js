const svgIcons = document.querySelectorAll('.offer-svg');
const cardDisplay = document.querySelectorAll('.products-card');

function updateCardDisplay(activeIndex) {
  const viewportWidth = window.innerWidth;
  let visibleCardsCount;

  if (viewportWidth >= 1200) {
    visibleCardsCount = 4;
  } else if (viewportWidth >= 768) {
    visibleCardsCount = 3;
  } else {
    visibleCardsCount = 1;
  }

  cardDisplay.forEach((card, index) => {
    if (index >= activeIndex && index < activeIndex + visibleCardsCount) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}
updateCardDisplay(0);

svgIcons.forEach((svg, index) => {
  svg.addEventListener('mouseenter', () => {
    const useElement = svg.querySelector('use');
    if (useElement) {
      useElement.setAttribute('href', '#icon-rectangle');
      svg.style.width = '28px';
      svg.style.height = '13px';
      svg.style.fill = '#FD9222';
    }

    svgIcons.forEach((icon, i) => {
      if (icon !== svg) {
        const useElementOther = icon.querySelector('use');
        if (useElementOther) {
          useElementOther.setAttribute('href', '#icon-ellipse');
        }
        icon.style.width = '13px';
        icon.style.height = '13px';
        icon.style.fill = 'rgba(17, 17, 17, 0.1)';
      }
    });
    updateCardDisplay(index);
  });
});

window.addEventListener('resize', () => {
  const activeIndex = Array.from(svgIcons).findIndex(svg => {
    const useElement = svg.querySelector('use');
    return useElement && useElement.getAttribute('href') === '#icon-rectangle';
  });
  updateCardDisplay(activeIndex !== -1 ? activeIndex : 0);
});
