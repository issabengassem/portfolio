/* ============================================
   PORTFOLIO SCRIPT - INTERACTIVE FEATURES
   ============================================ */

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    createParticles();
    initTypingAnimation();
    initScrollProgress();
    initScrollReveal();
    initProjectCards();
    initContactForm();
    initCustomCursor();
    initNavigation();
});

// ============================================
// THEME TOGGLE
// ============================================

function initTheme() {
    const themeBtn = document.getElementById('theme-btn');
    const html = document.documentElement;
    
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
    const icon = themeBtn.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ============================================
// PARTICLE BACKGROUND
// ============================================

function createParticles() {
    const container = document.getElementById('particles');
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
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
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================

function initScrollReveal() {
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.glass-card, .project-card');
    
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
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(64, 138, 113, 0.9)' : 'rgba(200, 50, 50, 0.9)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        backdrop-filter: blur(10px);
        border: 1px solid ${type === 'success' ? 'rgba(176, 228, 204, 0.5)' : 'rgba(255, 100, 100, 0.5)'};
        box-shadow: 0 0 20px rgba(64, 138, 113, 0.3);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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
    `;
    
    document.body.appendChild(cursorGlow);
    
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.display = 'block';
        cursorGlow.style.left = (e.clientX - 20) + 'px';
        cursorGlow.style.top = (e.clientY - 20) + 'px';
    });
    
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
    
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--accent)';
            } else {
                link.style.color = '';
            }
        });
    });
}

// ============================================
// SMOOTH PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        
        if (distance > -window.innerHeight && distance < window.innerHeight) {
            element.style.transform = `translateY(${distance * 0.5}px)`;
        }
    });
});

// ============================================
// LAZY LOADING
// ============================================

function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
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

// Initialize lazy loading
initLazyLoading();

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
    if (isMobile && document.querySelectorAll('.particle').length > 30) {
        const particles = document.querySelectorAll('.particle');
        for (let i = 30; i < particles.length; i++) {
            particles[i].remove();
        }
    }
}

window.addEventListener('resize', handleResize);

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
// PERFORMANCE OPTIMIZATION
// ============================================

// Throttle scroll events
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Handle scroll animations
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// ACCESSIBILITY
// ============================================

// Add keyboard navigation for theme toggle
document.addEventListener('keydown', (e) => {
    if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        document.getElementById('theme-btn').click();
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%cWelcome to Issa Bengassem\'s Portfolio', 'color: #408A71; font-size: 20px; font-weight: bold;');
console.log('%cData Science & Artificial Intelligence Engineer', 'color: #B0E4CC; font-size: 14px;');
console.log('%cPowered by modern web technologies', 'color: #7AB2B2; font-size: 12px;');
