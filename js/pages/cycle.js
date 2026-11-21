/* cycle.html — shared helpers live in js/common.js */

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

// --- 2. CYCLE LOGIC (HARDCODED DATES) ---
// Her known start date is Feb 1, 2026. Months are 0-indexed in JS (0=Jan, 1=Feb)
const HARDCODED_START = new Date(2026, 1, 1, 0, 0, 0, 0); 
const CYCLE_LENGTH = 31; // Jan 1 to Feb 1 is 31 days

function calculateTodayPhase() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate difference in days from Feb 1, 2026
    const diffTime = Math.abs(today - HARDCODED_START);
    let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Current day of the cycle (1-indexed)
    let currentDay = ((diffDays % CYCLE_LENGTH) + CYCLE_LENGTH) % CYCLE_LENGTH;
    if (today >= HARDCODED_START) {
        currentDay = (diffDays % CYCLE_LENGTH) + 1;
    } else {
        currentDay = CYCLE_LENGTH - (diffDays % CYCLE_LENGTH) + 1;
        if (currentDay > CYCLE_LENGTH) currentDay = 1;
    }

    document.getElementById('cycleDay').innerText = currentDay;

    // Determine Phase and Message based on 31 day cycle
    let phaseName = "";
    let phaseDesc = "";
    let circleColor = "";

    if (currentDay >= 1 && currentDay <= 5) {
        phaseName = "Rest and Recover 🩸";
        phaseDesc = "You are on your period baby. Please rest, drink lots of warm water, and let me pamper you. Do not overwork yourself today my sweetest.";
        circleColor = "rgba(239, 68, 68, 0.2)"; 
    } else if (currentDay > 5 && currentDay <= 14) {
        phaseName = "Glowing ✨";
        phaseDesc = "Your energy is coming back lovey. You are absolutely glowing and I love seeing you so active and happy. Keep shining my gorgeous girl.";
        circleColor = "rgba(74, 222, 128, 0.2)"; 
    } else if (currentDay >= 15 && currentDay <= 17) {
        phaseName = "Peak Beauty 🌸";
        phaseDesc = "This is your ovulatory phase, my gorgeous girl. Your hormones are peaking, and you might feel extra confident, social, and energetic. This is also when your body naturally increases its libido, so it is the perfect time for us to be a little extra intimate and have some sexy time cutie.";
        circleColor = "rgba(253, 164, 175, 0.3)"; 
    } else {
        phaseName = "Cuddle ☁️";
        phaseDesc = "As your body prepares for your next cycle, your hormones can become a bit unstable. Your energy starts to drop, and you might experience PMS, bloating, or mood swings. That is completely okay. Let us just stay in, watch movies, and take things slow. I am always here to listen and cuddle my sweetheart.";
        circleColor = "rgba(147, 51, 234, 0.2)"; 
    }

    document.getElementById('phaseName').innerText = phaseName;
    document.getElementById('phaseDesc').innerText = phaseDesc;
    document.getElementById('circle-bg').style.background = circleColor;

    // Calculate next period
    let nextPeriodDate = new Date(HARDCODED_START);
    while (nextPeriodDate <= today) {
        nextPeriodDate.setDate(nextPeriodDate.getDate() + CYCLE_LENGTH);
    }
    
    const options = { month: 'long', day: 'numeric' };
    document.getElementById('nextPeriodText').innerText = "Expected next period starts on " + nextPeriodDate.toLocaleDateString(undefined, options);
}

// --- 3. CALENDAR GENERATOR LOGIC ---
let currentMonthOffset = 0;

function changeMonth(direction) {
    currentMonthOffset += direction;
    renderCalendar();
}

function renderCalendar() {
    const calElement = document.getElementById('calendar-grid');
    const monthTitle = document.getElementById('month-title');
    
    const today = new Date();
    const targetYear = today.getFullYear();
    const targetMonth = today.getMonth() + currentMonthOffset;
    
    const firstDayOfMonth = new Date(targetYear, targetMonth, 1);
    const lastDayOfMonth = new Date(targetYear, targetMonth + 1, 0);
    
    const actualYear = firstDayOfMonth.getFullYear();
    const actualMonth = firstDayOfMonth.getMonth();
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay(); 
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthTitle.innerText = monthNames[actualMonth] + " " + actualYear;
    
    let html = '';
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(d => {
        html += `<div class="cal-header">${d}</div>`;
    });
    
    for (let i = 0; i < startingDayOfWeek; i++) {
        html += `<div class="cal-day empty"></div>`;
    }
    
    for (let d = 1; d <= daysInMonth; d++) {
        const currentIterDate = new Date(actualYear, actualMonth, d, 0, 0, 0, 0);
        
        const diffTime = currentIterDate - HARDCODED_START;
        let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        let currentCycleDay = 0;
        if (currentIterDate >= HARDCODED_START) {
            currentCycleDay = (diffDays % CYCLE_LENGTH) + 1;
        } else {
            let tempDiff = Math.abs(diffDays);
            currentCycleDay = CYCLE_LENGTH - (tempDiff % CYCLE_LENGTH) + 1;
            if (currentCycleDay > CYCLE_LENGTH) currentCycleDay = 1;
        }
        
        let phaseClass = '';
        if (currentCycleDay >= 1 && currentCycleDay <= 5) phaseClass = 'phase-period';
        else if (currentCycleDay > 5 && currentCycleDay <= 14) phaseClass = 'phase-glow';
        else if (currentCycleDay >= 15 && currentCycleDay <= 17) phaseClass = 'phase-peak';
        else phaseClass = 'phase-cuddle';
        
        let todayClass = '';
        if (d === today.getDate() && actualMonth === today.getMonth() && actualYear === today.getFullYear()) {
            todayClass = 'today-highlight';
        }

        html += `<div class="cal-day ${phaseClass} ${todayClass}">${d}</div>`;
    }
    calElement.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', () => {
    calculateTodayPhase();
    renderCalendar();
});

// --- 4. INTERACTIVE CARE PACKAGE MODAL LOGIC ---
const careModal = document.getElementById('careModal');
const careBody = document.getElementById('care-modal-body');

function openCareModal(type) {
    let content = '';

    if (type === 'cramps') {
        content = `
            <h2 style="color:var(--primary-purple); font-family:'Georgia', serif; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Relieving your cramps</h2>
            <p style="font-style:italic;">I hate that you are in pain baby. Let me help you feel a little better.</p>
            
            <div class="virtual-compress">♨️</div>
            <p style="font-size: 0.95rem; line-height: 1.5; color: #444;">Turn your screen brightness up just a bit, and place your phone gently on your tummy right here. Close your eyes, breathe slowly, and imagine my hands keeping you warm lovey.</p>
            
            <div class="care-checklist">
                <p style="font-weight:bold; margin-top:0; margin-bottom:10px; color:var(--primary-purple);">My care checklist for you</p>
                <label><input type="checkbox" onclick="this.parentElement.style.opacity = this.checked ? '0.5' : '1'"> Drink a glass of warm water</label>
                <label><input type="checkbox" onclick="this.parentElement.style.opacity = this.checked ? '0.5' : '1'"> Take your pain medicine if it hurts too much</label>
                <label><input type="checkbox" onclick="this.parentElement.style.opacity = this.checked ? '0.5' : '1'"> Lay down and rest your beautiful eyes</label>
            </div>
        `;
    } else if (type === 'sweets') {
        content = `
            <h2 style="color:var(--primary-purple); font-family:'Georgia', serif; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Your sweet cravings</h2>
            <p style="font-style:italic;">Tap a chocolate piece to reveal a sweet truth about you my pretty baby.</p>
            <div class="choc-grid">
                <div class="choc-piece" onclick="this.className='choc-piece choc-revealed'; this.innerText='You have the most beautiful smile in the world'">Tap to eat 🍫</div>
                <div class="choc-piece" onclick="this.className='choc-piece choc-revealed'; this.innerText='I am so incredibly proud of how hard you work'">Tap to eat 🍫</div>
                <div class="choc-piece" onclick="this.className='choc-piece choc-revealed'; this.innerText='You are the absolute best part of my day'">Tap to eat 🍫</div>
                <div class="choc-piece" onclick="this.className='choc-piece choc-revealed'; this.innerText='I love you exactly the way you are'">Tap to eat 🍫</div>
            </div>
        `;
    } else if (type === 'moody') {
        content = `
            <h2 style="color:var(--primary-purple); font-family:'Georgia', serif; border-bottom: 1px solid #ddd; padding-bottom: 10px;">Let it all out baby</h2>
            <p style="font-style:italic;">If you are feeling frustrated or overwhelmed, type it all out right here. Nobody will read it.</p>
            <textarea class="vent-area" id="ventBox" placeholder="Type whatever is bothering you..."></textarea>
            <button class="btn" style="width:100%; margin-top:15px;" onclick="burnThoughts()">Release it to the universe ✨</button>
            <p id="vent-reply" style="color: var(--primary-purple); font-weight: bold; margin-top: 15px; min-height: 20px;"></p>
        `;
    }

    // Append the close button dynamically so it isn't overwritten
    careBody.innerHTML = `<span class="close-btn" onclick="closeCareModal()">✖</span>` + content;
    
    careModal.style.display = 'flex';
    setTimeout(() => { careModal.classList.add('active'); }, 10);
}

function closeCareModal() {
    careModal.classList.remove('active');
    setTimeout(() => { careModal.style.display = 'none'; }, 300);
}

function checkSick() {
    const checkboxes = document.querySelectorAll('#sick-box input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(c => c.checked);
    const rewardText = document.getElementById('sick-reward');
    if (allChecked) {
        rewardText.style.opacity = '1';
        rewardText.style.transform = 'translateY(0)';
    } else {
        rewardText.style.opacity = '0';
        rewardText.style.transform = 'translateY(10px)';
    }
}

function burnThoughts() {
    const ventBox = document.getElementById('ventBox');
    if (ventBox.value.trim() === "") return;
    
    ventBox.style.transition = "all 1s";
    ventBox.style.opacity = "0";
    ventBox.style.filter = "blur(5px)";
    
    setTimeout(() => {
        ventBox.value = "";
        ventBox.style.opacity = "1";
        ventBox.style.filter = "blur(0)";
        document.getElementById('vent-reply').innerText = "I am so proud of you for letting that go lovey. I love you.";
    }, 1000);
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
