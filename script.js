// Mobile Menu Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
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
        
        // Show a comic exclamation
        const exclamation = document.createElement('div');
        const phrases = ['BOOM!', 'POW!', 'ZAP!', 'CLICK!', 'WOOSH!'];
        exclamation.textContent = phrases[Math.floor(Math.random() * phrases.length)];
        exclamation.classList.add('nav-exclamation');
        document.body.appendChild(exclamation);
        
        exclamation.style.top = `${e.clientY - 30}px`;
        exclamation.style.left = `${e.clientX + 20}px`;
        
        // Remove after animation completes
        setTimeout(() => {
            exclamation.remove();
        }, 1000);
        
        setTimeout(() => {
            effect.remove();
        }, 600);
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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just simulate a successful submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
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