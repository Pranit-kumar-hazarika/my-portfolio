document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".scroll-animate, .stagger");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Handle stagger containers
                if (entry.target.classList.contains("stagger")) {
                    const children = entry.target.querySelectorAll(":scope > *");
                    children.forEach((child, i) => {
                        setTimeout(() => {
                            child.classList.add("active");
                        }, i * 150); // 150ms stagger step
                    });
                } else {
                    // Handle normal single elements
                    setTimeout(() => {
                        entry.target.classList.add("active");
                    }, entry.target.dataset.delay || 0);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});
