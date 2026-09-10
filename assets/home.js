const slides = [...document.querySelectorAll('.home-slide')];
const hero = document.querySelector('.home-hero');
let current = 0;
let timer;

function setHeroHeight(slide) {
  if (!hero || !slide) return;
  const img = slide.querySelector('img');
  if (!img) return;

  const update = () => {
    if (!img.naturalWidth || !img.naturalHeight) return;
    const width = hero.clientWidth;
    const height = width * (img.naturalHeight / img.naturalWidth);
    hero.style.height = `${Math.round(height)}px`;
  };

  if (img.complete) update();
  else img.addEventListener('load', update, { once: true });
}

function show(next) {
  slides[current].classList.remove('is-active');
  current = (next + slides.length) % slides.length;
  slides[current].classList.add('is-active');
  setHeroHeight(slides[current]);
}

function startSlideshow() {
  clearInterval(timer);
  timer = setInterval(() => show(current + 1), 6000);
}

if (slides.length) {
  setHeroHeight(slides[current]);
  startSlideshow();
}

window.addEventListener('resize', () => setHeroHeight(slides[current]));
