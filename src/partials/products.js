const svgIcons = document.querySelectorAll('.offer-svg');

svgIcons.forEach((svg, index) => {
  svg.addEventListener('mouseenter', () => {
    const useElement = svg.querySelector('use');
    if (useElement) {
      // Змінюємо активну іконку
      useElement.setAttribute('href', '#icon-rectangle');
      svg.style.width = '28px';
      svg.style.height = '13px';
      svg.style.fill = '#FD9222';
    }

    // Скидаємо всі інші іконки
    svgIcons.forEach((icon, i) => {
      if (icon !== svg) {
        // Перевірка, щоб не змінювати активну іконку
        const useElementOther = icon.querySelector('use');
        if (useElementOther) {
          useElementOther.setAttribute('href', '#icon-ellipse');
        }
        icon.style.width = '13px';
        icon.style.height = '13px';
        icon.style.fill = 'rgba(17, 17, 17, 0.1)';
      }
    });

    // console.log(`Індекс активної іконки: ${index}`);
  });
});
