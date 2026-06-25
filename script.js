/* ============================================
   PORTFOLIO SCRIPT - INTERACTIVE FEATURES
   ============================================ */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    if (window.emailjs && typeof window.emailjs.init === 'function') {
        emailjs.init({
            publicKey: 'E8AE3XeLDDH8czRCU'
        });
    } else {
        console.warn('EmailJS library is not available. Contact form will not send emails.');
    }
    initTheme();
    optimizePerformanceForDevice();
    createParticles();
    initTypingAnimation();
    initScrollProgress();
    initScrollReveal();
    initProjectCards();
    initContactForm();
    initCustomCursor();
    initNavigation();
    initCertificateModal();
    initCurrentYear();
    initLazyLoading();
    initMobileTouchOptimization();
});

// ============================================
// CERTIFICATE MODAL
// ============================================

function initCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const closeBtn = document.querySelector('.modal-close');
    if (!modal || !closeBtn) return;

    // Close button click handler
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeCertificateModal();
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeCertificateModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertificateModal();
        }
    });
}

function openCertificateModal(filename, title) {
    const modal = document.getElementById('certificateModal');
    const pdf = document.getElementById('certificatePdf');
    const image = document.getElementById('certificateImage');
    const modalTitle = document.getElementById('modalTitle');
    const downloadBtn = document.getElementById('certificateDownload');
    const downloadLabel = downloadBtn ? downloadBtn.querySelector('span') : null;
    if (!modal || !modalTitle || !downloadBtn) return;

    // Keep assets relative so they work both locally and when deployed.
    const safeTitle = title || 'Certificate';
    const normalizedFileName = String(filename || '').trim().split(/[\\/]/).pop();
    if (!normalizedFileName) {
        showNotification('Unable to open this file.', 'error');
        return;
    }

    const filePath = encodeURI(normalizedFileName);
    const extension = normalizedFileName.split('.').pop().toLowerCase();
    const isImage = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'avif'].includes(extension);

    if (pdf) {
        pdf.src = '';
        pdf.hidden = true;
    }

    if (image) {
        image.src = '';
        image.alt = `${safeTitle} certificate`;
        image.hidden = true;
    }

    if (isImage && image) {
        image.src = filePath;
        image.hidden = false;
    } else if (pdf) {
        pdf.src = filePath;
        pdf.hidden = false;
    }

    modalTitle.textContent = safeTitle;
    downloadBtn.href = filePath;
    downloadBtn.download = normalizedFileName;
    if (downloadLabel) {
        downloadLabel.textContent = extension === 'pdf' ? 'Download PDF' : 'Download File';
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    const pdf = document.getElementById('certificatePdf');
    const image = document.getElementById('certificateImage');
    if (!modal) return;
    if (modal.contains(document.activeElement)) {
        document.activeElement.blur();
    }
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (pdf) {
        pdf.src = '';
        pdf.hidden = true;
    }
    if (image) {
        image.src = '';
        image.alt = '';
        image.hidden = true;
    }
    document.body.style.overflow = 'auto';
}

// ============================================
// THEME TOGGLE
// ============================================

function initTheme() {
    const themeBtn = document.getElementById('theme-btn');
    const html = document.documentElement;
    if (!themeBtn) return;

    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-btn');
    if (!themeBtn) return;
    const icon = themeBtn.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeBtn.setAttribute('aria-label', 'Switch to light theme');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeBtn.setAttribute('aria-label', 'Switch to dark theme');
    }
}

// ============================================
// PARTICLE BACKGROUND
// ============================================

function createParticles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const container = document.getElementById('particles');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 18 : 36;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 3 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            background: radial-gradient(circle, rgba(64, 138, 113, 0.8), rgba(176, 228, 204, 0.3));
            border-radius: 50%;
            animation: particleFloat ${duration}s infinite linear;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 5}px rgba(64, 138, 113, 0.6);
        `;

        container.appendChild(particle);
    }

    // Add particle float animation
    if (!document.querySelector('style[data-particles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-particles', 'true');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(0px) translateX(0px);
                    opacity: 0;
                }
                10% {
                    opacity: 0.5;
                }
                90% {
                    opacity: 0.5;
                }
                100% {
                    transform: translateY(-100vh) translateX(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// TYPING ANIMATION
// ============================================

function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    if (window.innerWidth < 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const text = typingElement.textContent;
    typingElement.textContent = '';

    let index = 0;
    const speed = 80;

    function type() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start typing after a short delay
    setTimeout(type, 500);
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    let ticking = false;

    const updateProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
        progressBar.style.width = scrolled + '%';
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateProgress);
            ticking = true;
        }
    }, { passive: true });

    updateProgress();
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.glass-card, .project-card');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
        [...sections, ...cards].forEach(element => {
            element.style.opacity = '1';
            element.style.animation = 'none';
        });
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
}

// ============================================
// PROJECT CARDS - 3D TILT EFFECT
// ============================================

function initProjectCards() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) {
        return;
    }

    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.02)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Validate
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send email via EmailJS
        if (!(window.emailjs && typeof window.emailjs.send === 'function')) {
            showNotification('Email service is not ready yet. Please refresh and try again.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            return;
        }

        emailjs.send('service_2mr8fjj', 'template_58offpv', {
            name: name,
            email: email,
            message: message
        }).then(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }).catch((error) => {
            console.error('EmailJS error:', error);
            showNotification('Failed to send message. Please try again.', 'error');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.setAttribute('role', type === 'error' ? 'alert' : 'status');
    notification.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

    const isMobile = window.innerWidth < 768;
    const position = isMobile ? 'top: 100px; left: 1rem; right: 1rem; max-width: none;' : 'top: 80px; right: 20px; max-width: 300px;';

    notification.style.cssText = `
        position: fixed;
        ${position}
        background: ${type === 'success' ? 'rgba(64, 138, 113, 0.95)' : 'rgba(200, 50, 50, 0.95)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(176, 228, 204, 0.5)' : 'rgba(255, 100, 100, 0.5)'};
        box-shadow: 0 0 20px rgba(64, 138, 113, 0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        word-wrap: break-word;
        overflow-wrap: break-word;
        font-size: ${isMobile ? '0.9rem' : '1rem'};
        text-align: center;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add slide animations for notifications
if (!document.querySelector('style[data-notifications]')) {
    const style = document.createElement('style');
    style.setAttribute('data-notifications', 'true');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// CUSTOM CURSOR GLOW
// ============================================

function initCustomCursor() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) {
        return;
    }

    const cursorGlow = document.createElement('div');
    cursorGlow.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(176, 228, 204, 0.4) 0%, transparent 70%);
        border: 2px solid rgba(64, 138, 113, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        display: none;
        box-shadow: 0 0 30px rgba(64, 138, 113, 0.3);
        transform: translate3d(-50%, -50%, 0);
        will-change: transform;
    `;

    document.body.appendChild(cursorGlow);
    let mouseX = 0;
    let mouseY = 0;
    let cursorTicking = false;

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.display = 'block';
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!cursorTicking) {
            window.requestAnimationFrame(() => {
                cursorGlow.style.left = mouseX + 'px';
                cursorGlow.style.top = mouseY + 'px';
                cursorTicking = false;
            });
            cursorTicking = true;
        }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.display = 'none';
    });

    // Hide cursor on interactive elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.matches('a, button, input, textarea, [role="button"]')) {
            cursorGlow.style.opacity = '0.5';
            cursorGlow.style.borderColor = 'rgba(176, 228, 204, 0.8)';
        } else {
            cursorGlow.style.opacity = '1';
            cursorGlow.style.borderColor = 'rgba(64, 138, 113, 0.6)';
        }
    });
}

// ============================================
// NAVIGATION HIGHLIGHT
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const sections = document.querySelectorAll('section[id]');
    if (!navLinks.length) return;

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation');
            });
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', 'Open navigation');
                navToggle.focus();
            }
        });
    }

    const updateActiveLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 220 && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href').slice(1) === current;
            link.classList.toggle('active', isActive);
        });
    };

    window.addEventListener('scroll', debounce(updateActiveLink, 50), { passive: true });
    updateActiveLink();
}

// ============================================
// LAZY LOADING
// ============================================

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;

    if (!('IntersectionObserver' in window)) {
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
        return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// UTILITY: PAGE TRANSITIONS
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

function handleResize() {
    const isMobile = window.innerWidth < 768;

    // Adjust particle count on resize
    if (isMobile && document.querySelectorAll('.particle').length > 18) {
        const particles = document.querySelectorAll('.particle');
        for (let i = 18; i < particles.length; i++) {
            particles[i].remove();
        }
    }
}

window.addEventListener('resize', debounce(handleResize, 150));

// ============================================
// MOBILE TOUCH OPTIMIZATION
// ============================================

function initMobileTouchOptimization() {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    };

    if (isMobile || isTouchDevice()) {
        // Add active state feedback to touch interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .contact-method, .skill-badge');

        interactiveElements.forEach(element => {
            // Use passive touch listeners for better performance
            element.addEventListener('touchstart', function(e) {
                this.style.opacity = '0.8';
                this.style.transform = 'scale(0.98)';
            }, { passive: true });

            element.addEventListener('touchend', function(e) {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            }, { passive: true });
        });

        // Disable hover states on touch devices (already handled in CSS but ensure here)
        document.documentElement.classList.add('touch-device');
    }
}

// ============================================
// PERFORMANCE OPTIMIZATION FOR LOW-END DEVICES
// ============================================

function optimizePerformanceForDevice() {
    // Detect if device has limited resources
    const isMobileDevice = window.innerWidth < 768;
    const supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobileDevice) {
        // Reduce animation complexity
        document.documentElement.style.setProperty('--trans-normal', '200ms cubic-bezier(0.4, 0, 0.2, 1)');
        document.documentElement.style.setProperty('--trans-slow', '300ms cubic-bezier(0.4, 0, 0.2, 1)');
    }

    if (supportsReducedMotion) {
        // Disable all animations for accessibility
        document.documentElement.style.setProperty('--trans-fast', '0ms');
        document.documentElement.style.setProperty('--trans-normal', '0ms');
        document.documentElement.style.setProperty('--trans-slow', '0ms');
    }
}

// ============================================
// DEBOUNCE UTILITY
// ============================================

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// ============================================
// ACCESSIBILITY
// ============================================

// Add keyboard navigation for theme toggle
document.addEventListener('keydown', (e) => {
    if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        const themeBtn = document.getElementById('theme-btn');
        if (themeBtn) themeBtn.click();
    }
});

function initCurrentYear() {
    const year = document.getElementById('current-year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cWelcome to Issa Bengassem\'s Portfolio', 'color: #408A71; font-size: 20px; font-weight: bold;');
console.log('%cData Science & Artificial Intelligence Engineer', 'color: #B0E4CC; font-size: 14px;');
console.log('%cPowered by modern web technologies', 'color: #7AB2B2; font-size: 12px;');
