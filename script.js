// ===== DOM Elements =====
const musicBtn = document.getElementById('musicBtn');
const bgMusic = document.getElementById('bgMusic');
const envelope = document.getElementById('envelope');
const openBtn = document.getElementById('openBtn');
const landing = document.getElementById('landing');
const invitation = document.getElementById('invitation');
const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');
const copyInviteBtn = document.getElementById('copyInviteBtn');
const whatsAppShareBtn = document.getElementById('whatsAppShareBtn');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

// ===== Music Control =====
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play().catch(() => {});
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// ===== Envelope Open =====
openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    envelope.classList.add('opened');
    
    // Start music
    setTimeout(() => {
        bgMusic.play().then(() => {
            isPlaying = true;
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(() => {});
    }, 500);

    // Transition to invitation
    setTimeout(() => {
        landing.style.opacity = '0';
        landing.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            landing.classList.add('hidden');
            invitation.classList.remove('hidden');
            invitation.style.opacity = '0';
            setTimeout(() => {
                invitation.style.transition = 'opacity 1s ease';
                invitation.style.opacity = '1';
            }, 50);
        }, 1000);
    }, 800);
});

// ===== Floating Hearts =====
function createFloatingHearts() {
    const container = document.getElementById('hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 8000);
    }, 800);
}
createFloatingHearts();

// ===== Falling Petals =====
function createPetals() {
    const petalsContainer = document.getElementById('petals');
    if (!petalsContainer) return;
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        petal.style.opacity = Math.random() * 0.6 + 0.2;
        petal.style.width = (Math.random() * 10 + 8) + 'px';
        petal.style.height = petal.style.width;
        petalsContainer.appendChild(petal);
    }
}
createPetals();

// ===== Countdown Timer =====
function updateCountdown() {
    const weddingDate = new Date('2026-08-15T17:00:00');
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    updateCountValue('days', days);
    updateCountValue('hours', hours);
    updateCountValue('minutes', minutes);
    updateCountValue('seconds', seconds);
}

setInterval(updateCountdown, 1000);
updateCountdown();

function updateCountValue(id, value) {
    const el = document.getElementById(id);
    const next = String(value);
    if (el.textContent !== next) {
        el.textContent = next;
        el.classList.remove('changed');
        void el.offsetWidth;
        el.classList.add('changed');
    }
}

// ===== RSVP Form =====
rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('guestName').value;
    const message = document.getElementById('message').value;

    // Add wish to wall if message exists
    if (message) {
        addWishToWall(name, message);
    }

    // Show success
    rsvpForm.classList.add('hidden');
    rsvpSuccess.classList.remove('hidden');

    // Create celebration effect
    createCelebration();
});

function addWishToWall(name, message) {
    const wall = document.getElementById('wishesWall');
    const card = document.createElement('div');
    card.classList.add('wish-card');
    const messageElement = document.createElement('p');
    messageElement.textContent = `"${message}"`;
    const authorElement = document.createElement('span');
    authorElement.textContent = `- ${name}`;
    card.append(messageElement, authorElement);
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    wall.prepend(card);
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

// ===== Celebration Effect =====
function createCelebration() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${['#d4a853', '#e8a0bf', '#f0d48a', '#c77dba', '#fef9ef'][Math.floor(Math.random() * 5)]};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 50);
    }

    // Add confetti animation
    if (!document.getElementById('confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            maybeCreateScrollConfetti(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe detail cards
document.querySelectorAll('.detail-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150);
            }
        });
    }, observerOptions);
    cardObserver.observe(card);
});

// ===== Smooth Scroll for Indicator =====
document.querySelector('.scroll-indicator')?.addEventListener('click', () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
});

// ===== Gallery Lightbox =====
document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', () => {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightbox.classList.remove('hidden');
    });
});

lightboxClose?.addEventListener('click', () => lightbox?.classList.add('hidden'));
lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

// ===== Share Link =====
copyInviteBtn?.addEventListener('click', async () => {
    const url = window.location.href;
    try {
        await navigator.clipboard.writeText(url);
        copyInviteBtn.innerHTML = '<i class="fas fa-check"></i> Link Copied';
    } catch {
        copyInviteBtn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Copy Failed';
    }

    setTimeout(() => {
        copyInviteBtn.innerHTML = '<i class="fas fa-link"></i> Copy Invitation Link';
    }, 1700);
});

if (whatsAppShareBtn) {
    const names = document.querySelector('.couple-names')?.textContent?.replace(/\s+/g, ' ').trim() || 'our wedding';
    const message = `You're invited to ${names}'s wedding celebration!`;
    whatsAppShareBtn.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
}

// ===== Confetti on Scroll =====
function maybeCreateScrollConfetti(section) {
    if (!section.classList.contains('celebrated') && section.dataset.confetti === 'true') {
        section.classList.add('celebrated');
        createCelebration();
    }
}
