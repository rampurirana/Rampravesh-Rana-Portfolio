/* THEME TOGGLE */
const toggle = document.getElementById('themeToggle');
const html = document.documentElement;
let dark = false;

// Check localStorage
if(localStorage.getItem('theme') === 'dark') {
    dark = true; html.dataset.theme = 'dark'; toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
    dark = !dark;
    html.dataset.theme = dark ? 'dark' : 'light';
    toggle.textContent = dark ? '☀️' : '🌙';
    localStorage.setItem('theme', dark ? 'dark' : 'light');
});

/* HAMBURGER */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    });
});

/* NAVBAR SCROLL */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // Active nav link
    const sections = document.querySelectorAll('section[id], .cta[id]');
    let current = '';
    sections.forEach(s => {
        if(window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#'+current);
    });
});

/* FADE UP ANIMATION */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if(entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
        }
    });
},  {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* SKILL BARS */
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                fill.style.width = fill.dataset.width + '%';
            });
        }
    });
},  {threshold: 0.3});

document.querySelectorAll('.about-text').forEach(el => skillObserver.observe(el));

/* PROJECT FILTER */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        document.querySelectorAll('.project-card').forEach(card => {
            const match = filter === 'all' || card.dataset.cat === filter;
            card.style.display = match ? '' : 'none';
        });
    });
});

/* CTA */
function handleCTA() {
    const email = document.getElementById('ctaEmail').value.trim();
    if(!email || !email.includes('@')) {
        document.getElementById('ctaEmail').style.borderColor = '#ef4444';
        setTimeout(() => document.getElementById('ctaEmail').style.borderColor = '', 2000);
        return;
    }
    const btn = event.target;
    btn.textContent = 'Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
        btn.textContent = 'Contact Us';
        btn.style.background = '';
        document.getElementById('ctaEmail').value = '';
    }, 3000);
}

/* SMOOTH SCROLL OFFSET */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if(target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});