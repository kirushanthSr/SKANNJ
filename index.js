document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuBtn?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Back to Top Button Logic
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', debounce(() => {
        if (window.scrollY > 300) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    }, 100));

    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Statistics Counter Animation
    const stats = document.querySelectorAll('.stat-number');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        let count = 0;
        const speed = Math.max(10, target / 100); // Dynamic speed adjustment

        const updateCounter = () => {
            if (count < target) {
                count += speed;
                el.textContent = Math.floor(count);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        };
        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navLinks.classList.remove('active');
            }
        });
    });

    // Lazy Loading for Images
    const lazyImages = document.querySelectorAll('img');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 50px 0px' });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Debounce Function
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Section Visibility Animation
    const sections = document.querySelectorAll("section");

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => sectionObserver.observe(section));

    // Parallax Effect for Hero Image
    const heroImage = document.querySelector(".hero-image img");

    window.addEventListener("scroll", () => {
        let offset = window.scrollY;
        heroImage.classList.toggle("parallax", offset > 70);
    });

    // Type Effect for Hero Title
    const text = "Revolutionizing Waste Management with AI Technology";
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            document.querySelector(".hero-title").textContent += text.charAt(index);
            index++;
            setTimeout(typeEffect, 70);
        }
    }

    document.querySelector(".hero-title").textContent = "";
    typeEffect();

    // Header Scroll Effect
    const header = document.querySelector(".header");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });



    // Back to Top Button Logic (for additional setup)
    const backToTopBtn = document.getElementById("backToTop");

    if (!backToTopBtn) {
        console.error("Back to Top button not found!");
        return;
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
