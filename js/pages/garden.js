/* garden.html — shared helpers live in js/common.js */

// --- 1. REAL TIME DAY/NIGHT LOGIC ---
let breathePhases = [];
let isDayTime = false;

function updateTimeMode() {
    const hour = new Date().getHours();
    // Day time is between 6 AM and 5:59 PM
    isDayTime = (hour >= 6 && hour < 18);
    
    if (isDayTime) {
        document.body.classList.add('day-mode');
        breathePhases = ["Breathe in the sunshine lovey", "Hold it right there baby", "Breathe out gently"];
    } else {
        document.body.classList.remove('day-mode');
        breathePhases = ["Breathe in the moonlight lovey", "Hold it right there baby", "Breathe out gently"];
    }
}

updateTimeMode(); // Run immediately
setInterval(updateTimeMode, 60000); // Check every minute to automatically shift

// --- 2. BREATHING ORB LOGIC ---
const breatheText = document.getElementById('breatheText');
let phaseIndex = 0;

// Initialize first text
breatheText.innerText = breathePhases[0];

setInterval(() => {
    breatheText.style.opacity = 0;
    setTimeout(() => {
        phaseIndex = (phaseIndex + 1) % breathePhases.length;
        breatheText.innerText = breathePhases[phaseIndex];
        breatheText.style.opacity = 1;
    }, 1000); 
}, 4000); 

// --- 3. BOUQUET NOTES LOGIC ---
const notes = [
    `<h2>My solace</h2><p>Whenever college gets too heavy, please remember I am right here to help you carry it baby. You never have to do this alone. I see how hard you work and I am so incredibly proud of you. Take a deep breath and let your worries melt away here. You are my solace, and I will always be yours.</p>`,
    `<h2>My gorgeous girl</h2><p>You are the absolute most beautiful part of my day, my pretty baby. Just looking at your smile makes everything in my world perfectly fine. No matter how stressful things get out there, knowing I get to call you mine makes me the luckiest guy alive. Please never forget how much I adore you.</p>`,
    `<h2>My forever love</h2><p>I will always be your safe place sweetheart. Take all the quiet time you need right here in your garden. Plant as many flowers as you want and just let yourself breathe. I will be patiently waiting for you whenever you are ready to face the world again. We are in this together forever.</p>`
];

const modal = document.getElementById('noteModal');
const noteBody = document.getElementById('note-body');

function openNote(index) {
    noteBody.innerHTML = notes[index];
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeNote() {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

// --- 4. PLANTING TULIPS LOGIC ---
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

function plantTulip(x, y, isInitial = false) {
    const gardenRect = gardenZone.getBoundingClientRect();
    
    // Calculate depth scale so flowers closer to the bottom are bigger
    const depthRatio = (y - gardenRect.top) / gardenRect.height; 
    const scale = 0.5 + depthRatio * 0.9; 

    const wrapper = document.createElement('div');
    wrapper.style.position = 'absolute';
    wrapper.style.left = x + 'px';
    wrapper.style.top = y + 'px';
    wrapper.style.zIndex = Math.floor(y); 
    wrapper.style.transform = `scale(${scale})`;
    wrapper.style.pointerEvents = 'none';

    const tulip = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    tulip.setAttribute("viewBox", "0 0 50 150");
    tulip.style.position = 'absolute';
    tulip.style.bottom = '0';
    tulip.style.left = '-25px'; 
    tulip.style.width = '50px';
    tulip.style.height = '150px';
    tulip.style.transformOrigin = 'bottom center';
    
    const randomSpeed = 3 + Math.random() * 2;
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    tulip.style.animation = `growTulip 1s ease-out forwards, gentleSway ${randomSpeed}s ease-in-out infinite alternate`;
    tulip.classList.add('planted-tulip');
    
    tulip.innerHTML = `
        <path d="M25 150 Q25 100 25 50" stroke="#4ade80" stroke-width="3" fill="none" />
        <path d="M25 120 Q40 100 25 80" fill="#22c55e" opacity="0.8" />
        <path d="M25 10 C10 10 5 40 25 65 C45 40 40 10 25 10 Z" fill="${randomColor}" />
    `;
    
    wrapper.appendChild(tulip);
    document.body.appendChild(wrapper);

    if (!isInitial) {
        const thought = document.createElement('div');
        thought.classList.add('floating-thought');
        thought.innerText = sweetThoughts[Math.floor(Math.random() * sweetThoughts.length)];
        thought.style.left = x + 'px';
        thought.style.top = (y - 120 * scale) + 'px';
        thought.style.transform = 'translateX(-50%)';
        document.body.appendChild(thought);
        
        setTimeout(() => { thought.remove(); }, 4000);
    }
}

// Handle user clicks to plant
gardenZone.addEventListener('click', function(e) {
    if (e.target.id === 'garden-path') return;
    plantTulip(e.clientX, e.clientY, false);
});

// Pre-plant flowers beautifully along the sides
window.addEventListener('DOMContentLoaded', () => {
    const gardenRect = gardenZone.getBoundingClientRect();
    
    for (let i = 0; i < 60; i++) {
        let y = Math.random() * gardenRect.height;
        let depthFactor = y / gardenRect.height;
        
        let pathHalfWidth = 35 + depthFactor * 80; 
        let center = window.innerWidth / 2;
        let x = Math.random() * window.innerWidth;
        
        if (x > center - pathHalfWidth && x < center + pathHalfWidth) {
            x = (Math.random() > 0.5) 
                ? center - pathHalfWidth - Math.random() * 40 
                : center + pathHalfWidth + Math.random() * 40;
        }
        
        x = Math.max(20, Math.min(window.innerWidth - 20, x));
        plantTulip(x, gardenRect.top + y, true);
    }
});

// --- 5. DYNAMIC PARTICLES (Fireflies or Sun Motes) ---
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
window.addEventListener('resize', resize);
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
        if (this.brightness >= 1 || this.brightness <= 0) {
            this.fade = -this.fade;
        }

        if (mouseX !== null && mouseY !== null) {
            let dx = mouseX - this.x;
            let dy = mouseY - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 150) {
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
        
        // Yellow fireflies at night, white glowing motes during the day
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

for (let i = 0; i < 70; i++) {
    flies.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < flies.length; i++) {
        flies[i].update();
        flies[i].draw();
    }
    requestAnimationFrame(animate);
}
animate();

document.body.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

document.body.addEventListener('touchmove', (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
});

document.body.addEventListener('mouseleave', () => { mouseX = null; mouseY = null; });
document.body.addEventListener('touchend', () => { mouseX = null; mouseY = null; });
