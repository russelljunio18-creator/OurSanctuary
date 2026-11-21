/* vouchers.html — shared helpers live in js/common.js */

// --- 1. SCROLL ANIMATION ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, (index % 4) * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.voucher').forEach(card => {
    observer.observe(card);
});

// --- 2. REDEEM LOGIC ---
const modal = document.getElementById('redeemModal');
const redeemText = document.getElementById('redeem-text');

function redeemVoucher(btn, voucherName) {
    const card = btn.parentElement;
    
    // Visual change to show it is used
    card.classList.add('redeemed');
    btn.innerText = "Claimed ✔";

    // Update and show modal
    redeemText.innerText = `You just claimed the ${voucherName} voucher. Send me a message right now so I can give it to you my love.`;
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeModal() {
    modal.classList.remove('active');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}
