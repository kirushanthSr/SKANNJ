document.addEventListener("DOMContentLoaded", function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false
    });

    // Countdown Timer Logic
    const countDownDate = new Date("June 1, 2025 00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(x);
            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";
        }
    }

    updateCountdown();
    const x = setInterval(updateCountdown, 1000);

    // Notification Form Submission
    const notificationForm = document.getElementById("notificationForm");
    if (notificationForm) {
        notificationForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const emailInput = document.getElementById("email");
            const submitButton = this.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            if (!email) {
                alert("Please enter your email address.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            try {
                const formData = {
                    access_key: '31a87a1b-abc3-45e3-b66b-ec5e149820eb',
                    email: email,
                    subject: 'Launch Notification Request',
                    message: `New launch notification request from: ${email}`,
                    from_name: 'Launch Subscriber',
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
                    alert('Thank you for subscribing! You will be notified when we launch.');
                    window.location.href = "index.html";
                } else {
                    throw new Error(result.message || 'Failed to subscribe');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to subscribe. Please try again later.');
                submitButton.disabled = false;
                submitButton.textContent = 'Notify Me';
            }
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
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
});
