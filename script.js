document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // State for cursor position
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Dot follows instantly
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;

        // Initial position for outline to prevent jump
        if (outlineX === 0 && outlineY === 0) {
            outlineX = mouseX;
            outlineY = mouseY;
            cursorOutline.style.left = `${mouseX}px`;
            cursorOutline.style.top = `${mouseY}px`;
        }
    });

    // Smooth animation for outline
    const animateCursor = () => {
        const dx = mouseX - outlineX;
        const dy = mouseY - outlineY;

        outlineX += dx * 0.15; // smooth factor
        outlineY += dy * 0.15;

        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, .service-box, input, textarea');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll Reveal Animation using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hero-content, .hero-image, .section-header, .skill-card, .project-card, .service-box, .contact-container');

    // Add initial hidden class style logic (handled in JS to avoid accessibility issues if JS disabled)
    // We'll just add a class 'hidden' to these elements via CSS if we wanted, 
    // but for simplicity let's just add an inline style animation here or handle class toggling

    // Let's add a fade-in-up class to these elements
    hiddenElements.forEach((el) => {
        el.classList.add('animate-hidden');
        observer.observe(el);
    });

    // Sticky Navbar shadow on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
});

// Popup Logic
function showPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('show-popup');
        // Reset form
        const form = document.querySelector('.contact-form');
        if (form) form.reset();
    }
}

function closePopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('show-popup');
    }
}
