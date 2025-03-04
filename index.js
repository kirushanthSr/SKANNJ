document.addEventListener("DOMContentLoaded", function () {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,
        once: true
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Statistics Animation
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 200;
        
        function updateCount() {
            const count = parseInt(stat.innerText);
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                stat.innerText = target;
            }
        }
        
        // Start counting when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            if (!email) {
                alert('Please enter your email address.');
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = 'Subscribing...';

            try {
                const formData = {
                    access_key: '31a87a1b-abc3-45e3-b66b-ec5e149820eb',
                    email: email,
                    subject: 'New Newsletter Subscription',
                    message: `New subscription request from: ${email}`,
                    from_name: 'Newsletter Subscriber',
                    replyto: email
                };

                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (result.success) {
                    alert('Thank you for subscribing to our newsletter!');
                    newsletterForm.reset();
                } else {
                    throw new Error(result.message || 'Failed to subscribe');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to subscribe. Please try again later.');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Subscribe';
            }
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Back to Top Button Logic
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
});
