// ===========================
// AI x Notion Workshop
// Landing Page Scripts
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Create floating particles
    createParticles();

    // Animate elements on load
    animateEntrance();

    // Setup ripple effects
    setupRipple();

    // Setup Mentimeter modal
    setupModal();
});

// --- Entrance Animation ---
function animateEntrance() {
    const brand = document.getElementById('brand');
    const cards = document.querySelectorAll('.btn-card');
    const footer = document.getElementById('footer');

    setTimeout(() => { brand.classList.add('animate-in'); }, 200);

    cards.forEach((card, index) => {
        setTimeout(() => { card.classList.add('animate-in'); }, 400 + (index * 120));
    });

    setTimeout(() => { footer.classList.add('animate-in'); }, 400 + (cards.length * 120) + 200);
}

// --- Particle System ---
function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = 25;
    const colors = [
        'rgba(56, 189, 248, 0.4)',
        'rgba(125, 211, 252, 0.3)',
        'rgba(186, 230, 253, 0.5)',
        'rgba(14, 165, 233, 0.25)',
        'rgba(103, 232, 249, 0.3)',
    ];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 3;
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = left + '%';
        particle.style.backgroundColor = color;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.boxShadow = '0 0 ' + (size * 2) + 'px ' + color;

        container.appendChild(particle);
    }
}

// --- Interactive Tilt Effect ---
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.btn-card');
    cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        if (distance < 2) {
            const rotateX = deltaY * -4;
            const rotateY = deltaX * 4;
            card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        } else {
            card.style.transform = '';
        }
    });
});

document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.btn-card').forEach((card) => {
        card.style.transform = '';
    });
});

// --- Ripple Effect on Click ---
function setupRipple() {
    document.querySelectorAll('.btn-card').forEach((card) => {
        card.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.position = 'absolute';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'radial-gradient(circle, rgba(56, 189, 248, 0.3), transparent 70%)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleEffect 0.6s ease-out forwards';
            ripple.style.zIndex = '0';
            ripple.style.pointerEvents = 'none';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 700);
        });
    });
}

// Ripple keyframes
const rippleStyle = document.createElement('style');
rippleStyle.textContent = '@keyframes rippleEffect { to { transform: scale(2.5); opacity: 0; } }';
document.head.appendChild(rippleStyle);

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
        copyText.textContent = 'คัดลอกแล้ว!';
        copyBtn.classList.add('bg-emerald-50', 'text-emerald-700', 'border-emerald-300');
        setTimeout(() => {
            copyText.textContent = originalText;
            copyBtn.classList.remove('bg-emerald-50', 'text-emerald-700', 'border-emerald-300');
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

