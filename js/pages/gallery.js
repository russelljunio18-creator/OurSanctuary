/* gallery.html — shared helpers live in js/common.js */

// --- 1. SCROLL ANIMATION (Polaroid Pop-up) ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, (index % 10) * 100); 
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.polaroid').forEach(photo => {
    observer.observe(photo);
});

// --- 2. TEXT PORTRAIT LOGIC ---
const phrase = "I love you ";
document.getElementById('text-portrait').innerText = phrase.repeat(50000);

function openPortrait() { 
    document.getElementById('portrait-overlay').style.display = 'flex'; 
}
function closePortrait() { 
    document.getElementById('portrait-overlay').style.display = 'none'; 
}

// --- 3. PHOTO VIEWER (tap a polaroid to see it big) ---
const polaroids = Array.from(document.querySelectorAll('.polaroid'));
let viewerIndex = 0;

polaroids.forEach((photo, i) => {
    const caption = photo.querySelector('p').textContent;
    photo.querySelector('img').alt = caption;
    photo.setAttribute('tabindex', '0');
    photo.addEventListener('click', () => openViewer(i));
    photo.addEventListener('keydown', e => { if (e.key === 'Enter') openViewer(i); });
});

function showViewerPhoto() {
    const photo = polaroids[viewerIndex];
    document.getElementById('viewer-img').src = photo.querySelector('img').src;
    document.getElementById('viewer-img').alt = photo.querySelector('p').textContent;
    document.getElementById('viewer-caption').textContent = photo.querySelector('p').textContent;
    document.getElementById('viewer-count').textContent = (viewerIndex + 1) + ' / ' + polaroids.length;
}

function openViewer(i) {
    viewerIndex = i;
    showViewerPhoto();
    document.getElementById('viewer').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeViewer() {
    document.getElementById('viewer').classList.remove('open');
    document.body.style.overflow = '';
}

function stepViewer(dir) {
    viewerIndex = (viewerIndex + dir + polaroids.length) % polaroids.length;
    showViewerPhoto();
}

document.addEventListener('keydown', e => {
    if (!document.getElementById('viewer').classList.contains('open')) return;
    if (e.key === 'Escape') closeViewer();
    if (e.key === 'ArrowRight') stepViewer(1);
    if (e.key === 'ArrowLeft') stepViewer(-1);
});

// Swipe left/right on phones
let touchStartX = null;
document.getElementById('viewer').addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
document.getElementById('viewer').addEventListener('touchend', e => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) stepViewer(dx < 0 ? 1 : -1);
    touchStartX = null;
});
