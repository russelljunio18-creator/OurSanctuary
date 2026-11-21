/* garden.html — shared helpers live in js/common.js */

// --- 1. DAY / NIGHT (follows the real time, the button can switch it) ---
let breathePhases = [];
let isDayTime = false;
let manualMode = null; // null = follow the clock, otherwise 'day' or 'night'

function applyMode() {
    const hour = new Date().getHours();
    // Day time is between 6 AM and 5:59 PM
    isDayTime = manualMode ? manualMode === 'day' : (hour >= 6 && hour < 18);

    document.body.classList.toggle('day-mode', isDayTime);
    breathePhases = isDayTime
        ? ["Breathe in the sunshine lovey", "Hold it right there baby", "Breathe out gently"]
        : ["Breathe in the moonlight lovey", "Hold it right there baby", "Breathe out gently"];

    const btn = document.getElementById('mode-btn');
    btn.textContent = isDayTime ? '🌙' : '☀️';
    btn.setAttribute('aria-label', isDayTime ? 'Switch to night' : 'Switch to day');
}

function toggleMode() {
    manualMode = isDayTime ? 'night' : 'day';
    applyMode();
    document.getElementById('breatheText').innerText = breathePhases[phaseIndex];
}

applyMode();
setInterval(() => { if (!manualMode) applyMode(); }, 60000);

// --- 2. BREATHING ORB (words change in step with the orb: 4s in, 4s hold, 4s out) ---
const breatheText = document.getElementById('breatheText');
let phaseIndex = 0;
breatheText.innerText = breathePhases[0];
document.getElementById('orb').classList.add('breathing');

setInterval(() => {
    breatheText.style.opacity = 0;
    setTimeout(() => {
        phaseIndex = (phaseIndex + 1) % breathePhases.length;
        breatheText.innerText = breathePhases[phaseIndex];
        breatheText.style.opacity = 1;
    }, 600);
}, 4000);

// --- 3. BOUQUET NOTES ---
const notes = [
    `<h2>My solace</h2><p>Whenever college gets too heavy, please remember I am right here to help you carry it baby. You never have to do this alone. I see how hard you work and I am so incredibly proud of you. Take a deep breath and let your worries melt away here. You are my solace, and I will always be yours.</p>`,
    `<h2>My gorgeous girl</h2><p>You are the absolute most beautiful part of my day, my pretty baby. Just looking at your smile makes everything in my world perfectly fine. No matter how stressful things get out there, knowing I get to call you mine makes me the luckiest guy alive. Please never forget how much I adore you.</p>`,
    `<h2>My forever love</h2><p>I will always be your safe place sweetheart. Take all the quiet time you need right here in your garden. Plant as many flowers as you want and just let yourself breathe. I will be patiently waiting for you whenever you are ready to face the world again. We are in this together forever.</p>`
];

const modal = document.getElementById('noteModal');
const noteBody = document.getElementById('note-body');

function openNote(index) {
    noteBody.innerHTML = notes[index];
    document.querySelectorAll('.bouquet-tulip')[index].classList.add('read');
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeNote() {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNote(); });

// --- 4. PLANTING TULIPS ---
const sweetThoughts = [
    "I love you so much",
    "You are absolutely gorgeous",
    "My pretty baby",
    "Everything will be okay",
    "Take a deep breath lovey",
    "My sweet princess",
    "I am so incredibly proud of you",
    "You mean the world to me",
    "My beautiful future bride",
    "Keep smiling cutie",
    "You are my peace"
];

const colors = ['#9333ea', '#701a75', '#d8b4fe', '#a855f7', '#c084fc'];
const gardenZone = document.getElementById('garden-zone');
const bed = document.getElementById('tulip-bed');
const thoughtLayer = document.getElementById('thought-layer');
const STORE_KEY = 'gardenTulips';
const MAX_SAVED = 120;

// Her tulips are saved on this device: dx = pixels from the middle, d = depth (0 back, 1 front)
let saved = [];
try { saved = JSON.parse(localStorage.getItem(STORE_KEY)) || []; } catch (e) { saved = []; }

function saveTulips() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (e) {}
}

// The path gets wider towards the front; keep tulips off it
function pathHalfWidth(d) { return 37.5 + 87.5 * d; }

function keepOffPath(dx, d) {
    const half = pathHalfWidth(d) + 14;
    if (Math.abs(dx) < half) dx = (dx < 0 ? -1 : 1) * (half + Math.random() * 18);
    return dx;
}

function tulipSVG(color) {
    return `<svg viewBox="0 0 50 150" aria-hidden="true">
        <path d="M25 150 Q25 100 25 50" stroke="#4ade80" stroke-width="3" fill="none" />
        <path d="M25 120 Q40 100 25 80" fill="#22c55e" opacity="0.8" />
        <path d="M25 10 C10 10 5 40 25 65 C45 40 40 10 25 10 Z" fill="${color}" />
    </svg>`;
}

function addTulip(t, kind) {
    const w = bed.clientWidth, h = bed.clientHeight;
    const x = Math.max(12, Math.min(w - 12, w / 2 + t.dx));
    const small = window.innerWidth < 600;
    const scale = small ? 0.38 + t.d * 0.62 : 0.45 + t.d * 0.85;   // closer to the front = bigger
    const el = document.createElement('div');
    el.className = 'tulip-plant ' + kind;
    el.style.left = x + 'px';
    el.style.top = (t.d * h - 150) + 'px';
    el.style.zIndex = Math.round(t.d * 100);
    el.style.setProperty('--s', scale);
    el.style.transform = `scale(${scale})`;
    el.style.setProperty('--sway', (3 + Math.random() * 2) + 's');
    el.style.setProperty('--delay', (Math.random() * -4) + 's');
    el.innerHTML = tulipSVG(t.color);
    bed.appendChild(el);
    return { x, y: t.d * h, scale };
}

// A few tulips already growing along the sides so the garden never looks empty
function decorTulips() {
    const w = bed.clientWidth;
    const count = w < 600 ? 16 : 30;
    const list = [];
    for (let i = 0; i < count; i++) {
        const d = 0.08 + Math.random() * 0.75;
        const side = i % 2 ? 1 : -1;
        const min = pathHalfWidth(d) + 40;
        const dx = side * (min + Math.random() * Math.max(10, w / 2 - min));
        list.push({ dx, d, color: colors[i % colors.length] });
    }
    return list;
}
let decor = [];

function renderGarden() {
    bed.innerHTML = '';
    decor.forEach(t => addTulip(t, 'decor'));
    saved.forEach(t => addTulip(t, 'mine'));
    updateCount();
}

function updateCount() {
    const n = saved.length;
    document.getElementById('tulip-count').textContent = '🌷 ' + n + ' planted';
    document.getElementById('helper-text').classList.toggle('hidden', n > 0);
}

function sparkleAt(x, y) {
    for (let i = 0; i < 8; i++) {
        const s = document.createElement('span');
        s.className = 'sparkle';
        const angle = (i / 8) * Math.PI * 2;
        s.style.left = x + 'px';
        s.style.top = y + 'px';
        s.style.setProperty('--dx', Math.cos(angle) * 28 + 'px');
        s.style.setProperty('--dy', Math.sin(angle) * 28 + 'px');
        thoughtLayer.appendChild(s);
        setTimeout(() => s.remove(), 700);
    }
}

function floatThought(x, y) {
    const thought = document.createElement('div');
    thought.className = 'floating-thought';
    thought.innerText = sweetThoughts[Math.floor(Math.random() * sweetThoughts.length)];
    thoughtLayer.appendChild(thought);
    // keep the words inside the screen
    const half = thought.offsetWidth / 2 + 12;
    thought.style.left = Math.max(half, Math.min(window.innerWidth - half, x)) + 'px';
    thought.style.top = Math.max(90, y) + 'px';
    setTimeout(() => thought.remove(), 3600);
}

gardenZone.addEventListener('click', e => {
    const rect = bed.getBoundingClientRect();
    const d = Math.max(0.04, Math.min(0.92, (e.clientY - rect.top) / rect.height));
    const dx = keepOffPath(e.clientX - (rect.left + rect.width / 2), d);
    const t = { dx: Math.round(dx), d: +d.toFixed(3), color: colors[Math.floor(Math.random() * colors.length)] };

    saved.push(t);
    if (saved.length > MAX_SAVED) {
        saved.shift();
        renderGarden(); // the oldest tulip makes room
    }
    saveTulips();

    const pos = addTulip(t, 'mine new');
    updateCount();
    sparkleAt(e.clientX, e.clientY);
    floatThought(rect.left + pos.x, rect.top + pos.y - 150 * pos.scale - 30);
});

// Keyboard: Enter or Space on the lawn plants a tulip somewhere nice
gardenZone.tabIndex = 0;
gardenZone.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    const rect = gardenZone.getBoundingClientRect();
    gardenZone.dispatchEvent(new MouseEvent('click', {
        clientX: rect.left + Math.random() * rect.width,
        clientY: rect.top + (0.2 + Math.random() * 0.6) * rect.height
    }));
});

decor = decorTulips();
renderGarden();

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { decor = decorTulips(); renderGarden(); resize(); }, 200);
});

// --- 5. FIREFLIES AT NIGHT, SUN MOTES DURING THE DAY ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let width, height;
let flies = [];
let mouseX = null;
let mouseY = null;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.brightness = Math.random();
        this.fade = Math.random() * 0.02 + 0.005;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.brightness += this.fade;
        if (this.brightness >= 1 || this.brightness <= 0) this.fade = -this.fade;

        if (mouseX !== null && mouseY !== null) {
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            if (Math.sqrt(dx * dx + dy * dy) < 150) {
                this.x += dx * 0.01;
                this.y += dy * 0.01;
            }
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (isDayTime) {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.brightness})`;
            ctx.shadowColor = '#ffffff';
        } else {
            ctx.fillStyle = `rgba(255, 223, 128, ${this.brightness})`;
            ctx.shadowColor = '#ffdf73';
        }
        ctx.shadowBlur = 8;
        ctx.fill();
    }
}

const particleCount = window.innerWidth < 600 ? 45 : 70;
for (let i = 0; i < particleCount; i++) flies.push(new Particle());

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function animate() {
    ctx.clearRect(0, 0, width, height);
    flies.forEach(f => { if (!reduceMotion) f.update(); f.draw(); });
    if (!reduceMotion) requestAnimationFrame(animate);
}
animate();

document.body.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
document.body.addEventListener('touchmove', e => { mouseX = e.touches[0].clientX; mouseY = e.touches[0].clientY; }, { passive: true });
document.body.addEventListener('mouseleave', () => { mouseX = null; mouseY = null; });
document.body.addEventListener('touchend', () => { mouseX = null; mouseY = null; });
