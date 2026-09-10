const projectLinks = [...document.querySelectorAll('.project-link')];
const slides = [...document.querySelectorAll('.slide')];

let currentIndex = 0;
let intervalId = null;
let isHoveringProject = false;

function showProject(projectName) {
  const nextIndex = slides.findIndex(slide => slide.dataset.project === projectName);
  if (nextIndex < 0) return;

  currentIndex = nextIndex;

  slides.forEach((slide, index) => {
    slide.classList.toggle('is-active', index === currentIndex);
  });

  projectLinks.forEach(link => {
    link.classList.toggle('is-current', link.dataset.project === projectName);
  });
}

function nextSlide() {
  if (isHoveringProject) return;
  currentIndex = (currentIndex + 1) % slides.length;
  showProject(slides[currentIndex].dataset.project);
}

function startSlideshow() {
  stopSlideshow();
  intervalId = window.setInterval(nextSlide, 5200);
}

function stopSlideshow() {
  if (intervalId) {
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

projectLinks.forEach(link => {
  link.addEventListener('mouseenter', () => {
    isHoveringProject = true;
    stopSlideshow();
    showProject(link.dataset.project);
  });

  link.addEventListener('mouseleave', () => {
    isHoveringProject = false;
    startSlideshow();
  });

  link.addEventListener('focus', () => {
    isHoveringProject = true;
    stopSlideshow();
    showProject(link.dataset.project);
  });

  link.addEventListener('blur', () => {
    isHoveringProject = false;
    startSlideshow();
  });
});

startSlideshow();
