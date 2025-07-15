// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navOverlay = document.querySelector('.nav-overlay');
// navClose and its event listener have been removed as the close button is no longer present

navToggle.addEventListener('click', () => {
    const isActive = navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    if (isActive) {
        document.body.classList.add('nav-locked');
        navOverlay.classList.add('active');
    } else {
        document.body.classList.remove('nav-locked');
        navOverlay.classList.remove('active');
    }
});

navOverlay.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('nav-locked');
    navOverlay.classList.remove('active');
});

// Add click animation to nav links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        // First clear any previous effects
        document.querySelectorAll('.nav-effect').forEach(el => el.remove());
        
        // Create a splash effect
        const effect = document.createElement('div');
        effect.classList.add('nav-effect');
        
        // Random color from our palette
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        effect.style.backgroundColor = randomColor;
        
        // Position at click point
        const rect = link.getBoundingClientRect();
        effect.style.top = `${e.clientY - rect.top}px`;
        effect.style.left = `${e.clientX - rect.left}px`;
        
        // Add to DOM
        link.appendChild(effect);
        
        // Close mobile menu
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('nav-locked');
        navOverlay.classList.remove('active');
        
        // Hide header immediately and lock it hidden if scrolling to a section
        const header = document.querySelector('header');
        const href = link.getAttribute('href');
        if (header && href && href.startsWith('#')) {
            header.classList.add('header-hidden');
            forceHideHeader = true;
        }
        // Smooth scroll for internal section links (on index page only)
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Custom animation for About, Skills, Contact Me
                const id = href.replace('#', '');
                if (["about", "skills", "contact"].includes(id)) {
                    target.classList.remove('section-flash');
                    void target.offsetWidth;
                    target.classList.add('section-flash');
                    target.addEventListener('animationend', function handler() {
                        target.classList.remove('section-flash');
                        target.removeEventListener('animationend', handler);
                    });
                }
            }
        }
        // For links like index.html#about, index.html#skills, index.html#contact on index page
        if (href && href.startsWith('index.html#')) {
            const hash = href.substring('index.html'.length);
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
                const target = document.querySelector(hash);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                    const id = hash.replace('#', '');
                    if (["about", "skills", "contact"].includes(id)) {
                        target.classList.remove('section-flash');
                        void target.offsetWidth;
                        target.classList.add('section-flash');
                        target.addEventListener('animationend', function handler() {
                            target.classList.remove('section-flash');
                            target.removeEventListener('animationend', handler);
                        });
                    }
                }
            }
        }
    });
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    
    const fadeInOptions = {
        threshold: 0.1
    };
    
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, fadeInOptions);
    
    sections.forEach(section => {
        section.classList.add('hidden');
        fadeInObserver.observe(section);
    });
});

// Typing Animation Effect
// Removed typewriter effect for hero section. The text will now appear immediately.

// Add animations to skill tags
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tags span');
    
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.1}s`;
        tag.classList.add('animated');
    });
});

// Contact Form Submission
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Check if form was successfully submitted (URL contains success parameter)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            // Clear the form
            contactForm.reset();
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
            successMessage.style.cssText = `
                background: #4CAF50;
                color: white;
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 1rem;
                text-align: center;
                animation: fadeIn 0.5s ease-in;
            `;
            
            // Insert success message before the form
            contactForm.parentNode.insertBefore(successMessage, contactForm);
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                if (successMessage.parentNode) {
                    successMessage.remove();
                }
            }, 5000);
            
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
        
        contactForm.addEventListener('submit', (e) => {
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !message) {
                e.preventDefault();
                alert('Please fill in all fields.');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Formspree will handle the submission and redirect
            // We don't prevent default here to allow Formspree to process the form
        });
    }
});

// Comic Sound Effects
function createComicEffect(element, text, duration = 2000) {
    const effect = document.createElement('div');
    effect.textContent = text;
    effect.classList.add(text.toLowerCase());
    
    // Random position relative to the element
    const rect = element.getBoundingClientRect();
    const topOffset = Math.random() * rect.height;
    const leftOffset = Math.random() * rect.width;
    
    effect.style.top = `${topOffset}px`;
    effect.style.left = `${leftOffset}px`;
    
    element.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, duration);
}

// Add comic-style effect to page
document.addEventListener('DOMContentLoaded', () => {
    // Random rotation for cards
    const cards = document.querySelectorAll('.project-card, .achievement-card');
    
    // cards.forEach(card => {
    //     const randomRotation = (Math.random() * 2 - 1) * 1.5; // Random value between -1.5 and 1.5 degrees
    //     card.style.transform = `rotate(${randomRotation}deg)`;
        
    //     card.addEventListener('mouseenter', () => {
    //         card.style.transform = 'rotate(0deg) translateY(-5px)';
            
    //         // Add comic sound effect
    //         const effects = ['POW', 'BANG', 'BOOM', 'ZAP', 'WOW'];
    //         const randomEffect = effects[Math.floor(Math.random() * effects.length)];
    //         createComicEffect(card, randomEffect);
    //     });
        
    //     card.addEventListener('mouseleave', () => {
    //         card.style.transform = `rotate(${randomRotation}deg)`;
    //     });
    // });
    
    // Add motion lines to comic panels
    const panels = document.querySelectorAll('.comic-panel');
    
    panels.forEach(panel => {
        const lines = document.createElement('div');
        lines.classList.add('motion-lines');
        panel.appendChild(lines);
    });
});

// Intersection Observer for Elements
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, observerOptions);
    
    // Observe all sections and elements that should animate in
    document.querySelectorAll('section, .project-card, .achievement-card, .skill-category').forEach(item => {
        appearOnScroll.observe(item);
    });
});

// Add particle effect to hero section
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    const particles = 50;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 20 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Set random shape and color
        const shapes = ['circle', 'square', 'triangle'];
        const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-color)'];
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.classList.add(shape);
        particle.style.backgroundColor = color;
        
        hero.appendChild(particle);
    }
});

// Interactive Social Links
// document.addEventListener('DOMContentLoaded', () => {
//     const socialLinks = document.querySelectorAll('.social-links a');
    
//     socialLinks.forEach(link => {
//         link.addEventListener('mouseenter', () => {
//             const effects = ['CLICK', 'HI', 'HEY', 'HELLO'];
//             const randomEffect = effects[Math.floor(Math.random() * effects.length)];
//             createComicEffect(link, randomEffect);
//         });
//     });
// });

// Interactive Profile Photo
document.addEventListener('DOMContentLoaded', () => {
    const profilePhoto = document.querySelector('.profile-photo img');
    
    if (profilePhoto) {
        profilePhoto.addEventListener('click', () => {
            const effect = document.createElement('div');
            effect.textContent = 'HI THERE!';
            effect.classList.add('boom');
            effect.style.position = 'absolute';
            effect.style.top = '-20px';
            effect.style.right = '-40px';
            
            profilePhoto.parentElement.appendChild(effect);
            
            setTimeout(() => {
                effect.remove();
            }, 2000);
        });
        
        // Add a subtle hover effect
        profilePhoto.addEventListener('mouseenter', () => {
            profilePhoto.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        profilePhoto.addEventListener('mouseleave', () => {
            profilePhoto.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});

// Parallax Effect
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const moveX = (mouseX - 0.5) * 20;
    const moveY = (mouseY - 0.5) * 20;
    
    hero.style.backgroundPosition = `calc(50% + ${moveX}px) calc(50% + ${moveY}px)`;
    
    // Move hero content slightly for parallax effect
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translate(${moveX * 0.5}px, ${moveY * 0.5}px)`;
    }
});

// Highlight active nav link based on current page or hash
function setActiveNavLink() {
    const links = document.querySelectorAll('.nav-menu a');
    const currentPath = window.location.pathname.split('/').pop();
    const currentHash = window.location.hash;
    let activeSet = false;
    links.forEach(link => {
        link.classList.remove('active');
    });
    links.forEach(link => {
        if (activeSet) return;
        const linkHref = link.getAttribute('href');
        if (!linkHref) return;
        // Skip About and Skills links
        if (linkHref === '#about' || linkHref === '#skills' || linkHref === 'index.html#about' || linkHref === 'index.html#skills') {
            return;
        }
        // For full page links (projects.html, research.html, achievements.html)
        if (!linkHref.startsWith('#') && linkHref === currentPath) {
            link.classList.add('active');
            activeSet = true;
            return;
        }
        // For section links on index.html (except About/Skills)
        if ((currentPath === '' || currentPath === 'index.html') && linkHref.startsWith('#') && linkHref === currentHash) {
            link.classList.add('active');
            activeSet = true;
            return;
        }
        // For links like index.html#contact (except About/Skills)
        if (linkHref.startsWith('index.html#')) {
            const [file, hash] = linkHref.split('#');
            if ((currentPath === '' || currentPath === 'index.html') && ('#' + window.location.hash.replace('#','')) === ('#' + hash)) {
                link.classList.add('active');
                activeSet = true;
                return;
            }
            }
        });
    }
// On DOMContentLoaded, ensure no nav link is active by default, then set the correct one
window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
    setActiveNavLink();
});
window.addEventListener('hashchange', setActiveNavLink);

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    const themeText = themeToggle ? themeToggle.querySelector('.theme-text') : null;
    const darkModeClass = 'dark-mode';
    
    // Check if this is the first visit (no theme saved)
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        // First visit - set light mode (do NOT add dark mode class)
        document.body.classList.remove(darkModeClass);
        if (icon) { 
            icon.classList.add('fa-sun'); 
            icon.classList.remove('fa-moon'); 
        }
        if (themeText) {
            themeText.textContent = 'Light Mode';
        }
        localStorage.setItem('theme', 'light');
    } else {
        // Not first visit - apply saved theme
        if (savedTheme === 'dark') {
            document.body.classList.add(darkModeClass);
            if (icon) { 
                icon.classList.remove('fa-sun'); 
                icon.classList.add('fa-moon'); 
            }
            if (themeText) {
                themeText.textContent = 'Dark Mode';
            }
        } else {
            document.body.classList.remove(darkModeClass);
            if (icon) { 
                icon.classList.add('fa-sun'); 
                icon.classList.remove('fa-moon'); 
            }
            if (themeText) {
                themeText.textContent = 'Light Mode';
            }
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle(darkModeClass);
            const isDark = document.body.classList.contains(darkModeClass);
            
            if (icon) {
                icon.classList.toggle('fa-moon', isDark);
                icon.classList.toggle('fa-sun', !isDark);
                // Bounce animation
                icon.classList.add('theme-bounce');
                icon.addEventListener('animationend', function handler() {
                    icon.classList.remove('theme-bounce');
                    icon.removeEventListener('animationend', handler);
                });
                // Pulse animation
                const pulse = document.createElement('div');
                pulse.className = 'theme-pulse';
                themeToggle.appendChild(pulse);
                pulse.addEventListener('animationend', () => pulse.remove());
            }
            
            if (themeText) {
                themeText.textContent = isDark ? 'Dark Mode' : 'Light Mode';
            }
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});

// Typewriter effect for About Me paragraph

document.addEventListener('DOMContentLoaded', () => {
    const aboutPara = document.getElementById('about-typewriter');
    if (aboutPara) {
        const aboutText = aboutPara.textContent;
        aboutPara.textContent = '';
        let aboutIndex = 0;
        function typeAbout() {
            if (aboutIndex < aboutText.length) {
                aboutPara.textContent += aboutText.charAt(aboutIndex);
                aboutIndex++;
                setTimeout(typeAbout, 30);
            }
        }
        setTimeout(typeAbout, 1000);
    }
});

// Header hide/show on scroll: separate for desktop and mobile
function headerScrollDesktop() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');
    function onScroll() {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollY = currentScrollY;
    }
    window.addEventListener('scroll', onScroll);
    // Return a cleanup function
    return () => window.removeEventListener('scroll', onScroll);
}

function headerScrollMobile() {
    let lastScrollY = 0;
    const header = document.querySelector('header');
    const navMenu = document.querySelector('.nav-menu');
    // Always use window for scrolling on mobile
    let scrollElement = window;
    function getScrollY() {
        return window.scrollY;
    }
    function onScroll() {
        if (navMenu && navMenu.classList.contains('active')) return;
        const currentScrollY = getScrollY();
        if (currentScrollY > lastScrollY && currentScrollY > 40) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollY = currentScrollY;
    }
    scrollElement.addEventListener('scroll', onScroll);
    // Return a cleanup function
    return () => scrollElement.removeEventListener('scroll', onScroll);
}

let cleanupHeaderScroll = null;
function setupHeaderScroll() {
    console.log('setupHeaderScroll called, window.innerWidth:', window.innerWidth);
    if (cleanupHeaderScroll) cleanupHeaderScroll();
    if (window.innerWidth > 768) {
        console.log('Activating desktop scroll handler');
        cleanupHeaderScroll = headerScrollDesktop();
    } else {
        console.log('Activating mobile scroll handler');
        cleanupHeaderScroll = headerScrollMobile();
    }
}
window.addEventListener('resize', setupHeaderScroll);
window.addEventListener('DOMContentLoaded', setupHeaderScroll);

window.addEventListener('scroll', function() {
    console.log('Global scroll event fired', window.scrollY);
});