/* story.html — shared helpers live in js/common.js */

// 1. SCROLL PROGRESS BAR
window.onscroll = function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
};

// 2. SCROLL ANIMATION FOR CHAPTERS
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.chapter').forEach(chapter => {
    observer.observe(chapter);
});

// 3. SECRET THOUGHTS LOGIC
function toggleSecret(element) {
    // Close any currently open secrets
    document.querySelectorAll('.secret-word.active').forEach(el => {
        if (el !== element) el.classList.remove('active');
    });
    // Toggle the one that was clicked
    element.classList.toggle('active');

    // Keep the bubble inside the screen on small phones
    const tip = element.querySelector('.tooltip-text');
    tip.style.setProperty('--nudge', '0px');
    if (element.classList.contains('active')) {
        const r = tip.getBoundingClientRect();
        const margin = 12;
        let nudge = 0;
        if (r.left < margin) nudge = margin - r.left;
        else if (r.right > window.innerWidth - margin) nudge = window.innerWidth - margin - r.right;
        tip.style.setProperty('--nudge', nudge + 'px');
    }
}

// Close secrets if clicking outside
document.addEventListener('click', function(event) {
    const isClickInside = event.target.closest('.secret-word');
    if (!isClickInside) {
        document.querySelectorAll('.secret-word.active').forEach(el => {
            el.classList.remove('active');
        });
    }
});

// 4. CHAPTER NUMBERS (added automatically, so new chapters number themselves)
document.querySelectorAll('.chapter:not(.finale-box)').forEach((chapter, i) => {
    const label = document.createElement('div');
    label.className = 'chapter-num';
    label.textContent = 'Chapter ' + (i + 1);
    chapter.prepend(label);
});

// 5. "TO BE CONTINUED" BOX
function closeBook(box) {
    box.innerHTML = "<div class='finale-icon'>♾️</div><div class='finale-text'>I cannot wait to write the rest of our chapters, side by side, forever.</div>";
    box.classList.add('closed');
}
