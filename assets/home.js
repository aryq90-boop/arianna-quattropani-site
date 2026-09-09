const slides = [...document.querySelectorAll('.home-slide')];
let current = 0;
function show(next) {
  slides[current].classList.remove('is-active');
  current = (next + slides.length) % slides.length;
  slides[current].classList.add('is-active');
}
document.querySelector('.hero-hit-left').addEventListener('click', () => show(current - 1));
document.querySelector('.hero-hit-right').addEventListener('click', () => show(current + 1));
let timer = setInterval(() => show(current + 1), 6500);
document.querySelector('.home-hero').addEventListener('pointerenter', () => clearInterval(timer));
