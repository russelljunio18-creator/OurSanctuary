/* bouquet.html — shared helpers live in js/common.js

   ✍️  WRITE YOUR WORDS HERE
   - PHOTO_CAPTION is the line under the bouquet photo.
   - Each entry in TULIP_NOTES becomes one tappable tulip.
     Add or remove entries and the tulips update by themselves.
     color: any CSS colour (these match the real bouquet).
*/

const PHOTO_CAPTION = "Tulips that will never wilt, just like what I feel for you lovey.";

const TULIP_NOTES = [
    { color: '#7c3aed', title: 'Our color',
      note: 'Purple has always been our color baby. It is all over this whole sanctuary because every time I see it, I think of you. Real flowers fade after a few days, but these tulips will stay exactly like this, and so will my love for you. I love you the most my princess.' },
    { color: '#c4b5fd', title: 'My peace',
      note: 'These soft ones remind me of how gentle you are with me, even on the days I do not deserve it. When college gets too loud and everything feels heavy, you are the quiet I run to. Thank you for always being so patient with me, my solace.' },
    { color: '#dc2626', title: 'My whole heart',
      note: 'Red is for everything I feel for you that I still cannot say properly out loud. From the letter I crumpled and threw away, to my nervous confession at the JS Prom, it was always you. My heart is completely and utterly yours sweetheart.' },
    { color: '#facc15', title: 'My sunshine',
      note: 'Yellow is for you, my pretty sunshine. You light up even my most tiring days without even trying. Whenever you feel like giving up on your schoolworks, look at this little tulip and remember that I am always so incredibly proud of you darling.' },
    { color: '#a855f7', title: 'Forever',
      note: 'I want us to be just like this bouquet, always together and never fading. Through graduation, through our future home, through growing old and still holding hands. Every single day, I choose you, and I will keep choosing you my precious.' },
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
