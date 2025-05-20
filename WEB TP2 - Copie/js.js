// Master Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js if container exists
    initParticles();
    
    // Add hover effects to service cards
    setupServiceCards();
    
    // Add smooth scroll to all links
    setupSmoothNavigation();
});

function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: "#ffffff" 
                },
                shape: { 
                    type: "circle" 
                },
                opacity: { 
                    value: 0.5, 
                    random: true 
                },
                size: { 
                    value: 3, 
                    random: true 
                },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: "#ffffff", 
                    opacity: 0.4, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 2, 
                    direction: "none", 
                    random: true, 
                    straight: false, 
                    out_mode: "out" 
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "repulse" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    }
                }
            }
        });
    }
}

function setupServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        // Mouse enter effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
            this.style.background = 'rgba(255, 255, 255, 0.15)';
            
            // Animate the wave
            const wave = this.querySelector('.card-wave');
            wave.style.transform = 'scaleX(1)';
        });
        
        // Mouse leave effect
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            
            // Reset the wave
            const wave = this.querySelector('.card-wave');
            wave.style.transform = 'scaleX(0)';
        });
        
        // Click effect
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1)';
            }, 150);
        });
    });
}

function setupSmoothNavigation() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navigation function for master page
function navigateTo(url) {
    // Add page transition out class
    document.body.classList.add('page-transition-out');
    
    // Delay navigation to allow animation to complete
    setTimeout(() => {
        window.location.href = url;
    }, 800);
}