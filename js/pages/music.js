/* music.html — shared helpers live in js/common.js */

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

// --- 2. MUSIC PLAYER LOGIC ---
const audio = document.getElementById("myAudio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playBtn.innerText = "⏸";
    } else {
        audio.pause();
        playBtn.innerText = "▶";
    }
}
audio.addEventListener("timeupdate", () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percentage + "%";
});
audio.addEventListener("ended", () => {
    playBtn.innerText = "▶";
    progress.style.width = "0%";
});

// --- 3. COPY TO CLIPBOARD LOGIC ---
function copyToClipboard(link, buttonElement) {
    navigator.clipboard.writeText(link).then(() => {
        const originalText = buttonElement.innerText;
        buttonElement.innerText = "Copied ✔";
        buttonElement.style.background = "var(--primary-purple)";
        buttonElement.style.color = "white";
        
        setTimeout(() => {
            buttonElement.innerText = originalText;
            buttonElement.style.background = "transparent";
            buttonElement.style.color = "var(--primary-purple)";
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert("Failed to copy link, darling");
    });
}

// --- 4. DEDICATE A SONG LOGIC ---
window.addEventListener('DOMContentLoaded', loadDedications);

function dedicateSong() {
    const input = document.getElementById('songInput');
    const songName = input.value.trim();
    
    if(songName === "") return;

    // Save to Local Storage
    let savedSongs = JSON.parse(localStorage.getItem('myDedicatedSongs')) || [];
    savedSongs.push(songName);
    localStorage.setItem('myDedicatedSongs', JSON.stringify(savedSongs));

    // Add it to the screen instantly
    addSongToScreen(songName);

    // Clear the input box
    input.value = "";

    // Trigger the animation
    spawnMusicNotes();
}

function addSongToScreen(songName) {
    const list = document.getElementById('dedicated-list');
    const newSongDiv = document.createElement('div');
    newSongDiv.className = 'album-item';
    newSongDiv.innerHTML = `
        <div class="album-info">
            <strong>${songName}</strong>
            <span>Dedicated by my beautiful princess 💜</span>
        </div>
    `;
    // Adds the newest song right at the top of the list
    list.insertBefore(newSongDiv, list.firstChild);
}

function loadDedications() {
    let savedSongs = JSON.parse(localStorage.getItem('myDedicatedSongs')) || [];
    // Load them in order, the insertBefore function naturally puts the newest at the top
    savedSongs.forEach(song => addSongToScreen(song));
}

function spawnMusicNotes() {
    const notes = ['🎵', '🎶', '🎼', '💜', '✨'];
    for(let i = 0; i < 15; i++) {
        setTimeout(() => {
            const noteEl = document.createElement('div');
            noteEl.className = 'floating-note';
            noteEl.innerText = notes[Math.floor(Math.random() * notes.length)];
            noteEl.style.left = (Math.random() * 90 + 5) + 'vw'; 
            noteEl.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            document.body.appendChild(noteEl);
            
            // Clean up the element after animation finishes
            setTimeout(() => { noteEl.remove(); }, 4000);
        }, i * 150);
    }
}

// --- 5. GARDEN GENERATION ---
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
