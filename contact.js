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

    // Initialize AOS
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

            // Send form data using Web3Forms
            const formData = new FormData();
            formData.append('access_key', '31a87a1b-abc3-45e3-b66b-ec5e149820eb');
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('subject', subject);
            formData.append('message', message);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("✅ Message sent successfully!");
                    contactForm.reset();
                    showSuccessModal();
                } else {
                    throw new Error(data.message || 'Something went wrong!');
                }
            })
            .catch(error => {
                console.error("❌ Error:", error);
                alert("Failed to send message. Please try again later.");
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
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
