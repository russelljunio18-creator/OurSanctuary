/* plans.html — shared helpers live in js/common.js */

// --- 1. SCROLL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card').forEach(card => {
    observer.observe(card);
});

// --- 2. BUCKET LIST LOGIC ---
function toggleCheck(item) {
    const checkbox = item.querySelector('input');
    checkbox.checked = !checkbox.checked;
    
    if(checkbox.checked) {
        item.classList.add('completed');
    } else {
        item.classList.remove('completed');
    }
}

// --- 3. DATE DECIDER LOGIC (Roulette Style) ---
const ideas = [
    "Watch a movie together 🍿", 
    "Listen to spotify and chill 🎶", 
    "Read a book together 📖", 
    "Play Mobile Legends, my princess 🎮", 
    "Order some food and eat 🍕", 
    "Take a long peaceful walk 🚶",
    "Late night deep talks 🌙",
    "Study date for college 📚",
    "Go out and get something to eat baby 🧋",
    "Build a cozy blanket fort and cuddle ⛺",
    "Cook food together lovey 🍳",
    "Have a sweet picnic at the park 🧺",
    "Binge watch a new series gorgeous 📺",
    "Take cute pictures together cutie 📸",
    "Go thrift shopping for matching outfits 👕",
    "Late night drive with our playlist 🚗",
    "Peaceful study date at a cafe my sweetest ☕",
    "Write sweet letters to each other ✍️",
    "Try baking something my pretty baby 🍪",
    "Watch the sunset together 🌅"
];

function spinWheel() {
    const resultBox = document.getElementById('decider-result');
    let counter = 0;

    document.querySelector('.btn').disabled = true;
    document.querySelector('.btn').style.opacity = "0.7";

    const shuffle = setInterval(() => {
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        resultBox.innerText = randomIdea;
        counter++;

        if (counter > 20) { 
            clearInterval(shuffle);
            const finalChoice = ideas[Math.floor(Math.random() * ideas.length)];
            resultBox.innerText = "✨ Let us: " + finalChoice + " ✨";
            
            document.querySelector('.btn').disabled = false;
            document.querySelector('.btn').style.opacity = "1";
        }
    }, 80);
}

// --- 4. GARDEN GENERATION ---
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
