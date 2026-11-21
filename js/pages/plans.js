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
