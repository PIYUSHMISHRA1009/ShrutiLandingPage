// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar subtle shadow on scroll (dark theme)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.35)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Staggered reveal-on-scroll with reduced-motion respect
document.addEventListener('DOMContentLoaded', () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('.section-title, .section-sub, .program-grid > *, .week-card, .resource-card, .support-card, .success-story, .program-card, .cta-panel');
    if (prefersReduced) return;
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = [...revealEls].indexOf(entry.target) * 12; // even faster stagger
                entry.target.style.transition = `opacity .25s cubic-bezier(.25,.8,.25,1) ${delay}ms, transform .25s cubic-bezier(.25,.8,.25,1) ${delay}ms`;
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(8px)';
        io.observe(el);
    });
});

// Removed number counters for simpler static impact stats

// Removed contact form logic (no form on new design)

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Removed notification system

// Removed button ripple effect

// Removed parallax for tighter match

// Removed page fade-in loader

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Add focus styles for accessibility
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    *:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
    
    .btn:focus,
    .nav-link:focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
    }
`;
document.head.appendChild(focusStyle);

// Removed lazy loading (not needed)

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events + active nav highlighting
const debouncedScrollHandler = debounce(() => {
    // Navbar background change
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.35)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    // Parallax effect
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }

    // Active nav link
    const sections = ['about','program','faq','enroll'];
    const links = document.querySelectorAll('.nav-link');
    let current = null;
    sections.forEach(id => {
        const s = document.getElementById(id) || document.querySelector('.'+id);
        if (!s) return;
        const top = s.getBoundingClientRect().top;
        if (top <= 120) current = id;
    });
    links.forEach(l => {
        if (current && l.getAttribute('href') === `#${current}`) l.classList.add('active');
        else l.classList.remove('active');
    });
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.section-title, .section-sub, .grid, .summary-card, .cta-panel');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

console.log('🚀 Shurtis Landing Page loaded successfully!');

// FAQ accordion (single open at a time)
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-question');
        trigger.addEventListener('click', () => {
            // close others
            faqItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            // toggle current
            item.classList.toggle('active');
        });
    });
});

// Custom cursor logic
(function customCursor(){
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    const update = (e) => {
        const { clientX: x, clientY: y } = e;
        dot.style.transform = `translate(${x}px, ${y}px)`;
        ring.style.transform = `translate(${x}px, ${y}px)`;
        // spotlight position for buttons
        const t = e.target.closest('.btn-primary');
        if (t) {
            t.classList.add('spotlight');
            const r = t.getBoundingClientRect();
            t.style.setProperty('--mx', `${((x - r.left)/r.width)*100}%`);
            t.style.setProperty('--my', `${((y - r.top)/r.height)*100}%`);
        }
    };
    window.addEventListener('mousemove', update);

    // Hover states on interactive elements
    const interactive = 'a, button, .btn, .nav-link, .faq-question';
    document.querySelectorAll(interactive).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // click ripple on ring
    window.addEventListener('click', () => {
        ring.animate([
            { transform: ring.style.transform + ' scale(1)', opacity: 1 },
            { transform: ring.style.transform + ' scale(1.8)', opacity: 0 }
        ], { duration: 300, easing: 'ease-out' });
    });
})();

// Lottie micro-animations for icons (progressive enhancement)
(function attachLottie(){
    const els = document.querySelectorAll('[data-lottie]');
    if (!els.length) return;
    const load = () => import('https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js')
        .then(() => window.lottie);
    load().then(lottie => {
        els.forEach(el => {
            const src = el.getAttribute('data-lottie');
            const container = document.createElement('div');
            container.style.width = '56px';
            container.style.height = '56px';
            container.style.pointerEvents = 'none';
            el.innerHTML = '';
            el.appendChild(container);
            const anim = lottie.loadAnimation({
                container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: src
            });
            // pause until visible
            const io = new IntersectionObserver((entries)=>{
                entries.forEach(en=>{
                    if(en.isIntersecting) anim.play(); else anim.pause();
                })
            }, {threshold: .1});
            io.observe(container);
        });
    }).catch(()=>{});
})();

// Personalization: Time-of-day theme + Geo/time localization
(function personalize(){
    // Time-of-day accent on body via data-theme
    const hour = new Date().getHours();
    const theme = (hour >= 6 && hour < 18) ? 'day' : 'night';
    document.documentElement.setAttribute('data-theme', theme);

    // Localize currency (amounts marked with .price-amount[data-amount])
    try {
        document.querySelectorAll('.price-amount').forEach(el => {
            const amt = Number(el.getAttribute('data-amount') || '7000');
            // Force Indian Rupee format
            const formatted = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 0, // Optional: removes .00
                maximumFractionDigits: 0
            }).format(amt);
            el.textContent = formatted; // Will display: ₹7,000
        });
    } catch (e) {
        console.warn('Currency formatting failed:', e);
    }

    // Localize date text elements marked with .date-text[data-date]
    try {
        const userLocale = navigator.language || 'en-IN';
        document.querySelectorAll('.date-text').forEach(el => {
            const iso = el.getAttribute('data-date');
            if (!iso) return;
            const d = new Date(iso);
            const formatted = new Intl.DateTimeFormat(userLocale, { day:'numeric', month:'long' }).format(d);
            el.textContent = formatted;
        });
    } catch(e) {}

})();
