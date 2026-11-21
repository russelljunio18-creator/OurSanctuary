/* music.html — shared helpers live in js/common.js */

// --- 2. MUSIC PLAYER LOGIC ---
const audio = document.getElementById("myAudio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");

const player = document.getElementById("player");

function formatTime(seconds) {
    if (!isFinite(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ":" + String(s).padStart(2, "0");
}

function setPlayingUI(isPlaying) {
    playBtn.innerText = isPlaying ? "⏸" : "▶";
    playBtn.setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    player.classList.toggle("playing", isPlaying);
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        setPlayingUI(true);
    } else {
        audio.pause();
        setPlayingUI(false);
    }
}
audio.addEventListener("loadedmetadata", () => {
    document.getElementById("time-total").innerText = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progress.style.width = percentage + "%";
    document.getElementById("time-now").innerText = formatTime(audio.currentTime);
});
audio.addEventListener("ended", () => {
    setPlayingUI(false);
    progress.style.width = "0%";
});

// Tap the bar to jump to that part of the song
document.getElementById("seek").addEventListener("click", (e) => {
    if (!isFinite(audio.duration)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

// --- 3. COPY TO CLIPBOARD LOGIC ---
function copyToClipboard(link, buttonElement) {
    navigator.clipboard.writeText(link).then(() => {
        const originalText = buttonElement.innerText;
        buttonElement.innerText = "Copied ✔";
        buttonElement.classList.add("copied");

        setTimeout(() => {
            buttonElement.innerText = originalText;
            buttonElement.classList.remove("copied");
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
    newSongDiv.className = 'album-item new';
    newSongDiv.innerHTML = `
        <div class="album-info">
            <strong></strong>
            <span>Dedicated by my beautiful princess 💜</span>
        </div>
    `;
    newSongDiv.querySelector('strong').textContent = songName; // shown as plain text
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
