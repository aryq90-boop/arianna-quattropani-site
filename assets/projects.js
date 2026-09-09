const PROJECTS = {
  'residual-green': {
    title: 'Residual Green',
    text: [
      'There is a silent knowledge rooted in the memories of women and in the fibres of plants. It is transmitted through gestures. A fragile heritage that moves through time, resists oblivion, and gives back to the earth a primordial voice.',
      'Residual Green explores the transmission of medicinal knowledge among Dao women in Northern Vietnam, investigating an archaic knowledge rooted in the symbiotic relationship between body and nature. Through a rituality of gestures and memories, these women safeguard the integrity of the forest, acting as a living archive of a layered knowledge that proceeds quietly, yet resiliently, through generations.'
    ],
    images: [
      ['project-rg-01.svg', 'Residual Green — image 01'],
      ['project-rg-02.svg', 'Residual Green — image 02'],
      ['project-rg-03.svg', 'Residual Green — image 03'],
      ['project-rg-04.svg', 'Residual Green — image 04'],
      ['project-rg-05.svg', 'Residual Green — image 05'],
      ['project-rg-06.svg', 'Residual Green — image 06'],
      ['project-rg-07.svg', 'Residual Green — image 07'],
      ['project-rg-08.svg', 'Residual Green — image 08'],
      ['project-rg-09.svg', 'Residual Green — image 09']
    ]
  },
  'faraway-so-close': {
    title: 'Faraway So Close',
    text: [
      'Faraway So Close is a visual research on distance, belonging and the uneasy coexistence of modernity and tradition.',
      'Moving through places shaped by tourism, migration and rapid transformation, the project looks at the dissonance between being somewhere and feeling part of it — and at the small gestures through which a sense of home is continuously reconstructed.'
    ],
    images: [
      ['project-fs-01.svg', 'Faraway So Close — image 01'],
      ['project-fs-02.svg', 'Faraway So Close — image 02'],
      ['project-fs-03.svg', 'Faraway So Close — image 03'],
      ['project-fs-04.svg', 'Faraway So Close — image 04'],
      ['project-fs-05.svg', 'Faraway So Close — image 05'],
      ['project-fs-06.svg', 'Faraway So Close — image 06']
    ]
  },
  'aremu': {
    title: 'Aremu',
    text: [
      'Aremu moves along the border between land and sea, where work, memory and landscape leave traces on one another.',
      'The photographic sequence is interrupted by handmade interventions and material fragments, allowing the image to become both document and physical object.'
    ],
    images: [
      ['project-ar-01.svg', 'Aremu — image 01'],
      ['project-ar-02.svg', 'Aremu — image 02'],
      ['project-ar-03.svg', 'Aremu — image 03'],
      ['project-ar-04.svg', 'Aremu — image 04'],
      ['project-ar-05.svg', 'Aremu — image 05'],
      ['project-ar-06.svg', 'Aremu — image 06']
    ]
  }
};

const key = document.body.dataset.project || 'residual-green';
const project = PROJECTS[key] || PROJECTS['residual-green'];
const ASSET_BASE = '../../assets/';

document.title = `${project.title} — Arianna Quattropani`;
document.getElementById('project-title').textContent = project.title;

document.getElementById('project-text').innerHTML = project.text
  .map(paragraph => `<p>${paragraph}</p>`)
  .join('');

document.querySelectorAll('[data-project-link]').forEach(a => {
  a.classList.toggle('current', a.dataset.projectLink === key);
});

const gallery = document.getElementById('project-gallery');
const fullscreen = document.getElementById('project-fullscreen');
const viewerImage = document.getElementById('viewer-image');
const viewerCaption = document.getElementById('viewer-caption');
const viewerCounter = document.getElementById('viewer-counter');
let current = 0;

project.images.forEach(([src, alt], i) => {
  const fig = document.createElement('figure');
  const img = document.createElement('img');
  img.src = `${ASSET_BASE}${src}`;
  img.alt = alt;
  img.loading = i < 5 ? 'eager' : 'lazy';
  fig.appendChild(img);
  fig.addEventListener('click', () => showFullscreen(i));
  gallery.appendChild(fig);
});

function renderViewer() {
  const [src, alt] = project.images[current];
  viewerImage.src = `${ASSET_BASE}${src}`;
  viewerImage.alt = alt;
  viewerCaption.textContent = project.title;
  viewerCounter.textContent = `${current + 1} / ${project.images.length}`;
}

function setActiveButton(view) {
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.toggle('is-active', btn.dataset.view === view);
  });
}

function showGrid() {
  gallery.hidden = false;
  fullscreen.hidden = true;
  setActiveButton('grid');
}

function showFullscreen(index = current) {
  current = index;
  renderViewer();
  gallery.hidden = true;
  fullscreen.hidden = false;
  setActiveButton('fullscreen');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function step(delta) {
  current = (current + delta + project.images.length) % project.images.length;
  renderViewer();
}

document.querySelector('.viewer-prev').addEventListener('click', () => step(-1));
document.querySelector('.viewer-next').addEventListener('click', () => step(1));

document.querySelectorAll('.view-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.dataset.view === 'grid') showGrid();
    else showFullscreen(current);
  });
});

document.addEventListener('keydown', e => {
  if (fullscreen.hidden) return;
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'Escape') showGrid();
});
