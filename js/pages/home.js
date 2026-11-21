/* Home page (index.html)
   spawnNotification() comes from js/common.js */

// --- 1. GREETINGS & SPECIAL-DAY NOTIFICATIONS ---
function triggerGreetingsAndEvents() {
    const hour = new Date().getHours();
    let greetingTitle = "";
    let greetingMsg = "";
    let greetingIcon = "";

    if (hour >= 5 && hour < 12) {
        greetingTitle = "Good morning lovey";
        greetingMsg = "Wakey wakey my pretty sunshine";
        greetingIcon = "☀️";
    } else if (hour >= 12 && hour < 17) {
        greetingTitle = "Good afternoon";
        greetingMsg = "Good afternoon my beautiful girl";
        greetingIcon = "🌻";
    } else if (hour >= 17 && hour < 21) {
        greetingTitle = "Good evening";
        greetingMsg = "Good evening my sweetest";
        greetingIcon = "✨";
    } else {
        greetingTitle = "Sweet dreams";
        greetingMsg = "Goodnight my pretty baby, sleep well";
        greetingIcon = "🌙";
    }

    spawnNotification(greetingTitle, greetingMsg, greetingIcon, 6000);
    document.getElementById('dynamic-greeting').innerText = greetingMsg;

    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();

    setTimeout(() => {
        if (month === 1 && date === 24) {
            spawnNotification("Happy birthday cutie", "Another year older, more beautiful, and another year I get to celebrate you. I love you so much", "🎂", 0);
        } else if (month === 2 && date === 28) {
            spawnNotification("Happy anniversary my love", "Thank you for the best time of my life. I am so lucky to call you mine. Here is to us", "🎉", 0);
        } else if (date === 28) {
            spawnNotification("Happy monthsary sweetheart", "Every single month with you is a blessing. I love you the most", "💕", 0);
        }
    }, 800);
}

// --- 2. EXACT CALENDAR DIFFERENCE ---
function calculateExactDifference(startDateObj) {
    const now = new Date();
    if (now < startDateObj) return { years: 0, months: 0, days: 0, hours: 0, mins: 0, secs: 0 };

    let years = now.getFullYear() - startDateObj.getFullYear();
    let months = now.getMonth() - startDateObj.getMonth();
    let days = now.getDate() - startDateObj.getDate();
    let hours = now.getHours() - startDateObj.getHours();
    let mins = now.getMinutes() - startDateObj.getMinutes();
    let secs = now.getSeconds() - startDateObj.getSeconds();

    if (secs < 0) { secs += 60; mins--; }
    if (mins < 0) { mins += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }

    if (days < 0) {
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += prevMonth;
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }
    return { years, months, days, hours, mins, secs };
}

// --- 3. LIVE COUNTERS ---
const anniversary = new Date("March 28, 2025 01:53:00");
const birthDate = new Date("February 24, 2007 00:00:00");

function fillTicker(prefix, diff) {
    ['years', 'months', 'days', 'hours', 'mins', 'secs'].forEach(unit => {
        document.getElementById(prefix + unit).innerText = diff[unit];
    });
}

function updateTickers() {
    fillTicker('', calculateExactDifference(anniversary));
    fillTicker('b-', calculateExactDifference(birthDate));
}

// --- 4. SPECIAL DATES CALENDAR ---
let currentMainMonthOffset = 0;

function changeMainMonth(direction) {
    currentMainMonthOffset += direction;
    renderMainCalendar();
}

function renderMainCalendar() {
    const calElement = document.getElementById('main-calendar-grid');
    const monthTitle = document.getElementById('main-month-title');

    const today = new Date();
    const targetYear = today.getFullYear();
    const targetMonth = today.getMonth() + currentMainMonthOffset;

    const firstDayOfMonth = new Date(targetYear, targetMonth, 1);
    const lastDayOfMonth = new Date(targetYear, targetMonth + 1, 0);

    const actualYear = firstDayOfMonth.getFullYear();
    const actualMonth = firstDayOfMonth.getMonth();
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthTitle.innerText = monthNames[actualMonth] + " " + actualYear;

    let html = '';
    ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(d => {
        html += `<div class="cal-header">${d}</div>`;
    });

    for (let i = 0; i < startingDayOfWeek; i++) {
        html += `<div class="cal-day empty"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        let dateClass = '';
        let clickAttr = '';

        if (actualMonth === 1 && d === 24) {
            dateClass = 'date-bday clickable';
            clickAttr = `onclick="spawnNotification('Her Birthday', 'Your special day my precious. I love celebrating you', '🎂', 4000)"`;
        } else if (actualMonth === 2 && d === 28) {
            dateClass = 'date-anniv clickable';
            clickAttr = `onclick="spawnNotification('Our Anniversary', 'The day my life changed forever. I am so lucky babe', '🎉', 4000)"`;
        } else if (actualMonth === 1 && d === 14) {
            dateClass = 'date-valentines clickable';
            clickAttr = `onclick="spawnNotification('Valentines Day', 'A whole day dedicated to how much I love you cutie', '💖', 4000)"`;
        } else if (actualMonth === 11 && d === 3) {
            dateClass = 'date-sweater clickable';
            clickAttr = `onclick="spawnNotification('Sweater Day', 'The day I was too shy to give you a sweater but wanted to keep you warm', '🧥', 5000)"`;
        } else if (actualMonth === 11 && d === 25) {
            dateClass = 'date-christmas clickable';
            clickAttr = `onclick="spawnNotification('Christmas', 'My favorite present is having you in my life darling', '🎄', 4000)"`;
        } else if (d === 28) {
            dateClass = 'date-monthsary clickable';
            clickAttr = `onclick="spawnNotification('Happy Monthsary', 'Another beautiful month loving you sweetheart', '💕', 4000)"`;
        }

        let todayClass = '';
        if (d === today.getDate() && actualMonth === today.getMonth() && actualYear === today.getFullYear()) {
            todayClass = 'today-highlight';
        }

        html += `<div class="cal-day ${dateClass} ${todayClass}" ${clickAttr}>${d}</div>`;
    }
    calElement.innerHTML = html;
}

// --- 5. HIDDEN NOTE PASSWORD ---
function checkPass() {
    const hint = document.getElementById("pass-hint");
    if (document.getElementById("passInput").value === "2025") {
        document.getElementById("lock-interface").hidden = true;
        document.getElementById("secret-content").hidden = false;
    } else {
        hint.textContent = "Try again baby. Hint is the year";
        hint.classList.remove('shake');
        void hint.offsetWidth; // restart the shake animation
        hint.classList.add('shake');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    triggerGreetingsAndEvents();
    renderMainCalendar();
    updateTickers();
    setInterval(updateTickers, 1000);
});
