/* plans.html — shared helpers live in js/common.js */

// --- 2. BUCKET LIST LOGIC ---
// Ticks are remembered on this device, so they stay after closing the page
const BUCKET_KEY = 'bucketListDone';

function toggleCheck(checkbox) {
    checkbox.closest('.bucket-item').classList.toggle('completed', checkbox.checked);
    saveBucket();
}

function saveBucket() {
    const boxes = Array.from(document.querySelectorAll('.bucket-item input'));
    const done = boxes.map(b => b.checked);
    try { localStorage.setItem(BUCKET_KEY, JSON.stringify(done)); } catch (e) {}
    const count = done.filter(Boolean).length;
    document.getElementById('bucket-progress').textContent = count + ' of ' + boxes.length + ' done together';
}

function loadBucket() {
    let done = [];
    try { done = JSON.parse(localStorage.getItem(BUCKET_KEY)) || []; } catch (e) {}
    document.querySelectorAll('.bucket-item input').forEach((box, i) => {
        box.checked = !!done[i];
        box.closest('.bucket-item').classList.toggle('completed', box.checked);
    });
    saveBucket();
}
loadBucket();

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

    const spinBtn = document.getElementById('spin-btn');
    spinBtn.disabled = true;
    spinBtn.style.opacity = "0.7";
    resultBox.classList.remove('final');

    const shuffle = setInterval(() => {
        const randomIdea = ideas[Math.floor(Math.random() * ideas.length)];
        resultBox.innerText = randomIdea;
        counter++;

        if (counter > 20) { 
            clearInterval(shuffle);
            const finalChoice = ideas[Math.floor(Math.random() * ideas.length)];
            resultBox.innerText = "✨ Let us: " + finalChoice + " ✨";
            resultBox.classList.add('final');

            spinBtn.disabled = false;
            spinBtn.style.opacity = "1";
        }
    }, 80);
}
