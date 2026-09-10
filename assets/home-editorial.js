const cards = [...document.querySelectorAll('.project-card')];

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    cards.forEach((item) => item.classList.remove('is-current'));
    card.classList.add('is-current');
  });

  card.addEventListener('mouseleave', () => {
    card.classList.remove('is-current');
  });

  card.addEventListener('focus', () => {
    cards.forEach((item) => item.classList.remove('is-current'));
    card.classList.add('is-current');
  });

  card.addEventListener('blur', () => {
    card.classList.remove('is-current');
  });
});
