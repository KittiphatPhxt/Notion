// ========================================================
// Notion Learning Hub — Scripts (Touch & Mobile Optimized)
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    // Animate elements on load
    animateEntrance();

    // Setup interactive tilt ONLY on desktop with real mouse pointer
    setupDesktopTilt();

    // Setup Mentimeter QR Modal
    setupModal();
});

// --- Entrance Animation ---
function animateEntrance() {
    const brand = document.getElementById('brand');
    const cards = document.querySelectorAll('.notion-card');
    const footer = document.getElementById('footer');

    if (brand) {
        setTimeout(() => { brand.classList.add('animate-in'); }, 100);
    }

    cards.forEach((card, index) => {
        setTimeout(() => { card.classList.add('animate-in'); }, 200 + (index * 80));
    });

    if (footer) {
        setTimeout(() => { footer.classList.add('animate-in'); }, 200 + (cards.length * 80) + 150);
    }
}

// --- Desktop-Only Subtle Tilt (Disabled on iPad/Mobile touchscreens) ---
function setupDesktopTilt() {
    const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isDesktopPointer) return;

    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.notion-card');
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / rect.width;
            const deltaY = (e.clientY - centerY) / rect.height;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 1.4) {
                const rotateX = deltaY * -3;
                const rotateY = deltaX * 3;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
            } else {
                card.style.transform = '';
            }
        });
    });

    document.addEventListener('mouseleave', () => {
        document.querySelectorAll('.notion-card').forEach((card) => {
            card.style.transform = '';
        });
    });
}

// --- Mentimeter Modal Logic ---
function setupModal() {
    const mentiBtn = document.getElementById('btn-menti');
    const modal = document.getElementById('menti-modal');
    const closeBtn = document.getElementById('close-modal');
    const copyBtn = document.getElementById('btn-copy-code');
    const copyText = document.getElementById('copy-text');

    if (!mentiBtn || !modal) return;

    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    mentiBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const code = '3568 5553';
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(code).then(() => {
                    showCopied();
                }).catch(() => {
                    fallbackCopy(code);
                });
            } else {
                fallbackCopy(code);
            }
        });
    }

    function showCopied() {
        if (!copyText) return;
        const originalText = copyText.textContent;
        copyText.textContent = 'คัดลอกสำเร็จ!';
        copyBtn.classList.add('bg-[#EEF6F3]', 'text-[#0F7B6C]', 'border-[#C4E3D8]');
        setTimeout(() => {
            copyText.textContent = originalText;
            copyBtn.classList.remove('bg-[#EEF6F3]', 'text-[#0F7B6C]', 'border-[#C4E3D8]');
        }, 2000);
    }

    function fallbackCopy(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showCopied();
    }
}
