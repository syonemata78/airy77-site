const menuButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('main-nav');
function closeMenu() {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
}
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const instructors = [
  { name: 'menguru', photo: 'assets/menguru.jpg', color: '#be89e0' },
  { name: 'SAKU', photo: 'assets/saku.jpg', color: '#bddadb' },
  { name: 'MANA', photo: 'assets/mana.jpg', color: '#edc574' },
  { name: 'moemi', photo: 'assets/moemi.jpg', color: '#ff9b7d' },
  { name: 'seren', photo: 'assets/seren.jpg', color: '#bcd7f1' }
];
const carousel = document.querySelector('.carousel');
const slide = carousel.querySelector('.instructor-slide');
const dots = Array.from(carousel.querySelectorAll('[data-slide]'));
const pause = carousel.querySelector('.slide-pause');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let current = 0;
let stopped = reducedMotion;
let timer;
function showSlide(index) {
  current = (index + instructors.length) % instructors.length;
  const person = instructors[current];
  const photo = slide.querySelector('img');
  photo.src = person.photo;
  photo.alt = `インストラクター ${person.name}`;
  slide.querySelector('h3').textContent = person.name;
  slide.style.setProperty('--slide-color', person.color);
  dots.forEach((dot, i) => i === current ? dot.setAttribute('aria-current', 'true') : dot.removeAttribute('aria-current'));
}
function startTimer() {
  clearInterval(timer);
  if (!stopped && !document.hidden) timer = setInterval(() => showSlide(current + 1), 7000);
}
carousel.querySelector('.previous').addEventListener('click', () => { showSlide(current - 1); startTimer(); });
carousel.querySelector('.next').addEventListener('click', () => { showSlide(current + 1); startTimer(); });
dots.forEach(dot => dot.addEventListener('click', () => { showSlide(Number(dot.dataset.slide)); startTimer(); }));
function updatePause() {
  pause.textContent = stopped ? '▶' : 'Ⅱ';
  pause.setAttribute('aria-label', stopped ? 'スライドの自動切り替えを開始' : 'スライドの自動切り替えを停止');
}
pause.addEventListener('click', () => { stopped = !stopped; updatePause(); startTimer(); });
carousel.addEventListener('mouseenter', () => clearInterval(timer));
carousel.addEventListener('mouseleave', startTimer);
carousel.addEventListener('focusin', () => clearInterval(timer));
carousel.addEventListener('focusout', event => { if (!carousel.contains(event.relatedTarget)) startTimer(); });
document.addEventListener('visibilitychange', startTimer);
updatePause(); startTimer();

const hero = document.querySelector('.hero-video');
const videoButton = document.querySelector('.video-toggle');
function updateVideoButton() {
  videoButton.textContent = hero.paused ? '再生' : '一時停止';
  videoButton.setAttribute('aria-label', hero.paused ? '背景動画を再生' : '背景動画を一時停止');
}
videoButton.addEventListener('click', () => { hero.paused ? hero.play().catch(updateVideoButton) : hero.pause(); });
hero.addEventListener('pause', updateVideoButton);
hero.addEventListener('play', updateVideoButton);
if (reducedMotion) { hero.removeAttribute('autoplay'); hero.pause(); }
updateVideoButton();

const scheduleDialog = document.querySelector('.schedule-dialog');
document.querySelector('.schedule-image').addEventListener('click', () => {
  scheduleDialog.showModal();
  document.body.style.overflow = 'hidden';
});
scheduleDialog.querySelector('button').addEventListener('click', () => scheduleDialog.close());
scheduleDialog.addEventListener('close', () => { document.body.style.overflow = ''; });

const mapFrame = document.querySelector('.school-map');
const maps = {
  ube: { name: '宇部スクール', address: '山口県宇部市西梶返1丁目1-15' },
  onoda: { name: '小野田スクール', address: '山陽小野田市民館 山陽小野田市栄町9番25号' }
};
document.querySelectorAll('[data-map]').forEach(button => button.addEventListener('click', () => {
  const place = maps[button.dataset.map];
  mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(place.address)}&output=embed`;
  mapFrame.title = `${place.name}の地図`;
  document.querySelectorAll('[data-map]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
}));
