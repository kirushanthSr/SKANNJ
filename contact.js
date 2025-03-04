document.addEventListener("DOMContentLoaded", function () {

    animatedElements.forEach(el => animationObserver.observe(el));

    // Smooth Scrolling with Easing Function
    function smoothScrollTo(target) {
        const startPosition = window.pageYOffset;
        const targetPosition = target.offsetTop - 80; // Offset for fixed header
        const distance = targetPosition - startPosition;
        const duration = 800;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Smooth Scroll for All Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            if (target) smoothScrollTo(target);
        });
    });

    // Form Image Animation
    const formImage = document.querySelector(".form-image img");
    if (formImage) {
        setTimeout(() => {
            formImage.classList.add("animate-in", "fade");
        }, 500);
    }

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false
    });

    // Form Submission and Validation
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name") ? document.getElementById("name").value.trim() : '';
            const email = document.getElementById("email") ? document.getElementById("email").value.trim() : '';
            const phone = document.getElementById("phone") ? document.getElementById("phone").value.trim() : '';
            const subject = document.getElementById("subject") ? document.getElementById("subject").value.trim() : '';
            const message = document.getElementById("message") ? document.getElementById("message").value.trim() : '';

            if (!name || !email || !message) {
                alert("Please fill out all required fields.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            const submitButton = document.querySelector(".btn-primary");
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

            // Send form data using Formspree
            fetch("https://formspree.io/f/YOUR_FORM_ID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message,
                    _replyto: email
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                console.log("✅ Message sent successfully!");
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
                showSuccessModal();
            })
            .catch(error => {
                console.error("❌ Error sending message:", error);
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
                alert("Failed to send message. Please try again later.");
            });
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showSuccessModal() {
        const modal = document.getElementById("successModal");
        if (modal) {
            modal.style.display = "block";

            const closeButton = document.querySelector(".close");
            closeButton.onclick = function () {
                modal.style.display = "none";
            };

            const goToHomePageButton = document.getElementById("goToHomePage");
            goToHomePageButton.onclick = function () {
                window.location.href = "index.html";
            };

            window.onclick = function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            };
        }
    }

    // Back-to-Top Button Logic
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
