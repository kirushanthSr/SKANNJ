// In index.js
// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-in-out'
});

// Set launch date to exactly 4 months from now
const launchDate = new Date();
launchDate.setMonth(launchDate.getMonth() + 4);

// Fixed timer function
function updateTimer() {
    const currentDate = new Date();
    const diff = launchDate - currentDate;

    if (diff <= 0) {
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        document.getElementById('seconds').innerHTML = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update timer immediately and then every second
updateTimer();
setInterval(updateTimer, 1000);

// Back to Top Button
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// CORRECTED JAVASCRIPT
// Remove debounce unless you have specific performance needs
const backToTop = document.querySelector('.back-to-top');

// Simple scroll handler
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

// Reliable click handler
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Fallback for older browsers
    if (!('scrollBehavior' in document.documentElement.style)) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 0) {
            window.requestAnimationFrame(smoothScroll);
        }
    }
});

// Fallback smooth scroll
function smoothScroll() {
    const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (currentPosition > 0) {
        window.scrollTo(0, Math.max(currentPosition - 50, 0));
        requestAnimationFrame(smoothScroll);
    }
}

