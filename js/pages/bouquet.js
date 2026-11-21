/* bouquet.html — shared helpers live in js/common.js

   ✍️  WRITE YOUR WORDS HERE
   - PHOTO_CAPTION is the line under the bouquet photo.
   - Each entry in TULIP_NOTES becomes one tappable tulip.
     Add or remove entries and the tulips update by themselves.
     color: any CSS colour (these match the real bouquet).
*/

const PHOTO_CAPTION = "TODO: write a line about the bouquet here";

const TULIP_NOTES = [
    { color: '#7c3aed', title: 'TODO: title for tulip 1', note: 'TODO: write your message here' },
    { color: '#c4b5fd', title: 'TODO: title for tulip 2', note: 'TODO: write your message here' },
    { color: '#dc2626', title: 'TODO: title for tulip 3', note: 'TODO: write your message here' },
    { color: '#facc15', title: 'TODO: title for tulip 4', note: 'TODO: write your message here' },
    { color: '#a855f7', title: 'TODO: title for tulip 5', note: 'TODO: write your message here' },
];

/* ---------- Nothing below needs editing ---------- */

function tulipSVG(color) {
    return `<svg viewBox="0 0 50 150" aria-hidden="true">
        <path d="M25 150 Q25 100 25 50" stroke="#5fb87a" stroke-width="3" fill="none" />
        <path d="M25 125 Q42 102 25 82" fill="#5fb87a" opacity="0.7" />
        <path d="M25 10 C10 10 5 40 25 65 C45 40 40 10 25 10 Z" fill="${color}" />
        <path d="M25 10 C18 22 18 45 25 65" stroke="rgba(0,0,0,0.12)" stroke-width="1.5" fill="none" />
    </svg>`;
}

function buildTulips() {
    document.getElementById('photo-caption').textContent = PHOTO_CAPTION;
    const row = document.getElementById('tulip-row');
    TULIP_NOTES.forEach((t, i) => {
        const btn = document.createElement('button');
        btn.className = 'tulip';
        btn.style.setProperty('--delay', (i * -0.7) + 's');
        btn.setAttribute('aria-label', 'Open tulip ' + (i + 1));
        btn.innerHTML = tulipSVG(t.color);
        btn.addEventListener('click', () => openTulip(i, btn));
        row.appendChild(btn);
    });
}

function openTulip(i, btn) {
    const t = TULIP_NOTES[i];
    const body = document.getElementById('tulip-note');
    body.innerHTML = '<h2></h2><p></p>';
    body.querySelector('h2').textContent = t.title;
    body.querySelector('p').textContent = t.note;
    btn.classList.add('read');
    const modal = document.getElementById('tulipModal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeTulip() {
    const modal = document.getElementById('tulipModal');
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeTulip(); });

buildTulips();
