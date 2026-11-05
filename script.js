const projectData = {
    loopin: {
        title: 'LoopIn',
        description: 'A lightweight real-time chat project built to keep conversations quick and temporary. It was a practical experiment in turning a simple idea into a usable web experience without unnecessary friction.',
        meta: ['Realtime chat', 'JavaScript', 'Temporary rooms', 'No login'],
        artwork: 'loopin',
        website: 'https://loopin0.netlify.app/',
        github: 'https://github.com/Pranit-kumar-hazarika/loopin'
    },
    blurrr: {
        title: 'Blurrr',
        description: 'A shared event and photo-sharing concept focused on making moments easier to capture and revisit. It explores community sharing and the way people connect around a single event or experience.',
        meta: ['Shared camera', 'Photos', 'Community', 'Event app'],
        artwork: 'blurrr',
        website: '',
        github: 'https://github.com/Pranit-kumar-hazarika/blurrr'
    },
    bahona: {
        title: 'Bahona Computer Science Department Website',
        description: 'A college department website built to present information clearly and keep the campus identity strong. It focuses on clean communication, simple structure, and easy access to essential details.',
        meta: ['Department website', 'College', 'Faculty', 'Information', 'Responsive'],
        artwork: 'bahona',
        website: 'https://bahonacsd.netlify.app/',
        github: ''
    },
    portfolio: {
        title: 'Personal Portfolio',
        description: 'My personal portfolio is a reflection of how I like to work — practical, expressive, and design-aware. It brings together my projects, visual style, and the idea of building work that feels like me.',
        meta: ['Portfolio', 'Brand', 'Creative website', 'Responsive'],
        artwork: 'portfolio',
        website: 'https://pranittt.netlify.app/',
        github: 'https://github.com/Pranit-kumar-hazarika/my-portfolio'
    }
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
});

const siteHeader = document.querySelector('.site-header');
const heroSection = document.getElementById('home');
const aboutSection = document.getElementById('about');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelectorAll('.brand[href="#home"], .nav-links a[href="#home"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        window.history.replaceState(null, '', '#home');
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
    });
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = window.localStorage.getItem('portfolio-theme');

if (savedTheme === 'light') {
    delete document.documentElement.dataset.theme;
} else {
    document.documentElement.dataset.theme = 'dark';
}

const updateThemeToggle = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-checked', String(isDark));
    themeToggle.setAttribute('aria-label', `${isDark ? 'Dark' : 'Light'} mode enabled. Activate to switch to ${isDark ? 'light' : 'dark'} mode.`);
};

updateThemeToggle();
themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme !== 'dark';

    if (isDark) {
        document.documentElement.dataset.theme = 'dark';
    } else {
        delete document.documentElement.dataset.theme;
    }

    window.localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    updateThemeToggle();
});

let scrollUpdatePending = false;

const updateScrollEffects = () => {
    if (scrollUpdatePending) {
        return;
    }

    scrollUpdatePending = true;
    window.requestAnimationFrame(() => {
        siteHeader.classList.toggle('is-scrolled', window.scrollY > 36);

        if (!prefersReducedMotion.matches) {
            const aboutTop = aboutSection.getBoundingClientRect().top;
            const overlap = Math.min(1, Math.max(0, (window.innerHeight - aboutTop) / window.innerHeight));
            heroSection.style.setProperty('--hero-blur', `${(overlap * 8).toFixed(2)}px`);
        } else {
            heroSection.style.setProperty('--hero-blur', '0px');
        }

        scrollUpdatePending = false;
    });
};

updateScrollEffects();
window.addEventListener('scroll', updateScrollEffects, { passive: true });
window.addEventListener('resize', updateScrollEffects);
prefersReducedMotion.addEventListener('change', updateScrollEffects);

const sectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const navigableSections = [...sectionLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

const navigationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        sectionLinks.forEach((link) => {
            const isCurrent = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('is-active', isCurrent);

            if (isCurrent) {
                link.setAttribute('aria-current', 'location');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    });
}, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
});

navigableSections.forEach((section) => navigationObserver.observe(section));

const modal = document.getElementById('projectModal');
const modalPreview = document.getElementById('modalPreview');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalMeta = document.getElementById('modalMeta');
const projectLink = document.getElementById('projectLink');
const githubLink = document.getElementById('githubLink');
const modalClose = document.querySelector('.modal-close');

const openModal = (key) => {
    const project = projectData[key];

    if (!project) {
        return;
    }

    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalPreview.className = `modal-preview preview-${project.artwork}`;
    modalMeta.innerHTML = project.meta.map((item) => `<span>${item}</span>`).join('');

    if (project.website) {
        projectLink.href = project.website;
        projectLink.classList.remove('hidden');
    } else {
        projectLink.classList.add('hidden');
    }

    if (project.github) {
        githubLink.href = project.github;
        githubLink.classList.remove('hidden');
    } else {
        githubLink.classList.add('hidden');
    }

    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
};

document.querySelectorAll('.project-card').forEach((card) => {
    const open = () => openModal(card.dataset.project);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            open();
        }
    });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
    if (event.target.matches('[data-close="true"]')) {
        closeModal();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
    }
});

const galleryButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryVideos = [...document.querySelectorAll('.gallery-grid video')];

galleryVideos.forEach((video, index) => {
    video.addEventListener('play', () => {
        galleryVideos.forEach((otherVideo) => {
            if (otherVideo !== video) {
                otherVideo.pause();
            }
        });
    });

    video.addEventListener('ended', () => {
        const nextVideo = galleryVideos[(index + 1) % galleryVideos.length];
        nextVideo.play().catch((error) => {
            console.warn('Could not autoplay the next creative video.', error);
        });
    });
});

galleryButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        galleryButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));

        galleryItems.forEach((item) => {
            const match = filter === 'all' || item.dataset.category === filter;
            item.classList.toggle('hidden', !match);
        });
    });
});

const contactFormStatus = document.getElementById('contactFormStatus');

if (new URLSearchParams(window.location.search).get('inquiry') === 'sent') {
    contactFormStatus.hidden = false;
}
