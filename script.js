// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navClose = document.querySelector('.nav-close');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navClose.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
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
        
        // Smooth scroll for internal section links (not for external or buttons)
        const href = link.getAttribute('href');
        if (href && href.startsWith('#') && !link.classList.contains('btn-primary')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                // Custom bounce scroll effect
                const startY = window.scrollY;
                const endY = target.getBoundingClientRect().top + window.scrollY;
                const duration = 900;
                let startTime = null;
                function easeOutBounce(t) {
                    const n1 = 7.5625, d1 = 2.75;
                    if (t < 1 / d1) {
                        return n1 * t * t;
                    } else if (t < 2 / d1) {
                        return n1 * (t -= 1.5 / d1) * t + 0.75;
                    } else if (t < 2.5 / d1) {
                        return n1 * (t -= 2.25 / d1) * t + 0.9375;
                    } else {
                        return n1 * (t -= 2.625 / d1) * t + 0.984375;
                    }
                }
                function animateScroll(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    let t = Math.min(timeElapsed / duration, 1);
                    t = easeOutBounce(t);
                    window.scrollTo(0, startY + (endY - startY) * t);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                }
                requestAnimationFrame(animateScroll);
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
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero h1');
    const heroText = document.querySelector('.hero p');
    
    if (heroTitle && heroText) {
        const titleText = heroTitle.textContent;
        const descText = heroText.textContent;
        
        heroTitle.textContent = '';
        heroText.textContent = '';
        
        let titleIndex = 0;
        let descIndex = 0;
        
        function typeTitle() {
            if (titleIndex < titleText.length) {
                heroTitle.textContent += titleText.charAt(titleIndex);
                titleIndex++;
                setTimeout(typeTitle, 100);
            } else {
                setTimeout(typeDesc, 500);
            }
        }
        
        function typeDesc() {
            if (descIndex < descText.length) {
                heroText.textContent += descText.charAt(descIndex);
                descIndex++;
                setTimeout(typeDesc, 50);
            }
        }
        
        setTimeout(typeTitle, 500);
    }
});

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

// Add special effect to Contact Me button
document.addEventListener('DOMContentLoaded', () => {
    const contactBtn = document.querySelector('.nav-menu a.btn-primary');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', (e) => {
            // Comic-style bounce scroll to contact section
            const href = contactBtn.getAttribute('href');
            if (href && href.startsWith('#')) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const startY = window.scrollY;
                    const endY = target.getBoundingClientRect().top + window.scrollY;
                    const duration = 900;
                    let startTime = null;
                    function easeOutBounce(t) {
                        const n1 = 7.5625, d1 = 2.75;
                        if (t < 1 / d1) {
                            return n1 * t * t;
                        } else if (t < 2 / d1) {
                            return n1 * (t -= 1.5 / d1) * t + 0.75;
                        } else if (t < 2.5 / d1) {
                            return n1 * (t -= 2.25 / d1) * t + 0.9375;
                        } else {
                            return n1 * (t -= 2.625 / d1) * t + 0.984375;
                        }
                    }
                    function animateScroll(currentTime) {
                        if (!startTime) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        let t = Math.min(timeElapsed / duration, 1);
                        t = easeOutBounce(t);
                        window.scrollTo(0, startY + (endY - startY) * t);
                        if (timeElapsed < duration) {
                            requestAnimationFrame(animateScroll);
                        }
                    }
                    requestAnimationFrame(animateScroll);
                }
            }
            // Create multiple stars/sparkles around the button
            for (let i = 0; i < 10; i++) {
                const star = document.createElement('div');
                star.classList.add('btn-star');
                // Random position around the button
                const angle = Math.random() * Math.PI * 2; // Random angle
                const distance = 40 + Math.random() * 30; // Random distance (40-70px)
                const rect = contactBtn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                star.style.left = `${x}px`;
                star.style.top = `${y}px`;
                // Random delay for staggered animation
                star.style.animationDelay = `${Math.random() * 0.2}s`;
                document.body.appendChild(star);
                // Remove after animation completes
                setTimeout(() => {
                    star.remove();
                }, 1000);
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle ? themeToggle.querySelector('i') : null;
    const themeText = themeToggle ? themeToggle.querySelector('.theme-text') : null;
    const darkModeClass = 'dark-mode';
    
    // Check if this is the first visit (no theme saved)
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        // First visit - set dark mode
        document.body.classList.add(darkModeClass);
        if (icon) { 
            icon.classList.remove('fa-moon'); 
            icon.classList.add('fa-sun'); 
        }
        if (themeText) {
            themeText.textContent = 'Dark Mode';
        }
        localStorage.setItem('theme', 'dark');
    } else {
        // Not first visit - apply saved theme
        if (savedTheme === 'dark') {
            document.body.classList.add(darkModeClass);
            if (icon) { 
                icon.classList.remove('fa-moon'); 
                icon.classList.add('fa-sun'); 
            }
            if (themeText) {
                themeText.textContent = 'Dark Mode';
            }
        } else {
            document.body.classList.remove(darkModeClass);
            if (icon) { 
                icon.classList.add('fa-moon'); 
                icon.classList.remove('fa-sun'); 
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
                icon.classList.toggle('fa-moon', !isDark);
                icon.classList.toggle('fa-sun', isDark);
            }
            
            if (themeText) {
                themeText.textContent = isDark ? 'Dark Mode' : 'Light Mode';
            }
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }
});