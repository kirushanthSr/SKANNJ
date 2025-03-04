document.addEventListener("DOMContentLoaded", function () {
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
        contactForm.addEventListener("submit", async function (event) {
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

            try {
                // Prepare form data
                const formData = {
                    access_key: '31a87a1b-abc3-45e3-b66b-ec5e149820eb',
                    name: name,
                    email: email,
                    phone: phone || 'Not provided',
                    subject: subject || 'No Subject',
                    message: message,
                    from_name: name,
                    replyto: email
                };

                // Send to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                console.log("API Response:", result);

                if (result.success) {
                    console.log("✅ Message sent successfully!");
                    contactForm.reset();
                    showSuccessModal();
                } else {
                    throw new Error(result.message || 'Failed to send message');
                }
            } catch (error) {
                console.error("❌ Error:", error);
                alert("Failed to send message. Please try again later.");
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }
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
