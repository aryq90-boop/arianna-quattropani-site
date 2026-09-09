const slides = [...document.querySelectorAll('.home-slide')];
let current = 0;

function show(next) {
  slides[current].classList.remove('is-active');
  current = (next + slides.length) % slides.length;
  slides[current].classList.add('is-active');
}

setInterval(() => show(current + 1), 6000);
