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

// --- 3. GARDEN GENERATION ---
window.addEventListener('DOMContentLoaded', () => {
    const garden = document.getElementById('tulip-garden');
    const tulipCount = 35; 
    const colors = ['#9333ea', '#701a75', '#d8b4fe', '#a855f7'];

    for (let i = 0; i < tulipCount; i++) {
        const tulip = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const randomX = Math.random() * 100;
        const randomHeight = 120 + Math.random() * 180;
        const randomDelay = Math.random() * -5;
        const randomSpeed = 4 + Math.random() * 2;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        tulip.setAttribute("viewBox", "0 0 50 150");
        tulip.style.cssText = `
            position: absolute;
            bottom: -20px;
            left: ${randomX}%;
            height: ${randomHeight}px;
            z-index: ${Math.floor(randomHeight)};
            transform-origin: bottom center;
            animation: sway ${randomSpeed}s ease-in-out ${randomDelay}s infinite;
            filter: drop-shadow(0 0 8px rgba(0,0,0,0.1));
        `;

        tulip.innerHTML = `
            <path d="M25 150 Q25 100 25 50" stroke="#4ade80" stroke-width="3" fill="none" />
            <path d="M25 120 Q40 100 25 80" fill="#22c55e" opacity="0.6" />
            <path d="M25 10 C10 10 5 40 25 65 C45 40 40 10 25 10 Z" fill="${randomColor}" />
        `;
        garden.appendChild(tulip);
    }
});
