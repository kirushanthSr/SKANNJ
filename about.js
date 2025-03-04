AOS.init({
    duration: 1000,
    once: true
});

console.log(document.querySelector('.cta-section'));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("appear");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.classList.add("hidden"); // Start hidden
    sectionObserver.observe(section);
});

document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("backToTop");

    if (!backToTop) {
        console.error("Back to Top button not found!");
        return;
    }

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const processSection = document.querySelector(".process-section");
    if (processSection) {
        processSection.classList.remove("hidden");
        processSection.classList.add("appear");
    }
});