// Decorations.js - Advanced interactive enhancements for Bright's Hobbies website

document.addEventListener('DOMContentLoaded', function() {
    initAdvancedParticles();
    initCardInteractions();
    initScrollAnimations();
    initTextEffects();
    initMouseTracker();
    initGlowEffect();
    initCursorFollower();
});

// Advanced floating particles with multiple layers
function initAdvancedParticles() {
    const container = document.body;
    
    // Create multiple layers of decorative particles
    for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            
            const size = Math.random() * 120 + 40;
            const duration = Math.random() * 25 + 20;
            const delay = Math.random() * 5;
            const colors = [
                'rgba(0, 217, 255, 0.1)',
                'rgba(157, 78, 221, 0.08)',
                'rgba(255, 214, 10, 0.07)'
            ];
            
            particle.style.cssText = `
                position: fixed;
                pointer-events: none;
                z-index: ${layer};
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${duration}s infinite ease-in-out ${delay}s;
                filter: blur(${Math.random() * 2}px);
            `;
            container.appendChild(particle);
        }
    }
    
    // Add keyframe animations
    if (!document.querySelector('style[data-particles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-particles', 'true');
        style.textContent = `
            @keyframes float-particle {
                0%, 100% { 
                    transform: translate(0, 0) scale(1) rotate(0deg); 
                }
                25% { 
                    transform: translate(50px, -50px) scale(1.15) rotate(90deg); 
                }
                50% { 
                    transform: translate(-30px, -100px) scale(0.9) rotate(180deg); 
                }
                75% { 
                    transform: translate(-50px, -40px) scale(1.08) rotate(270deg); 
                }
            }
            
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes glow-pulse {
                0%, 100% { 
                    box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);
                }
                50% { 
                    box-shadow: 0 0 40px rgba(0, 217, 255, 0.7);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced card interactions with multiple effects
function initCardInteractions() {
    const cards = document.querySelectorAll('.hobbies-grid li, .game-card, .about-me');
    
    cards.forEach((card, index) => {
        card.style.setProperty('--delay', `${index * 0.1}s`);
        
        card.addEventListener('mouseenter', function() {
            this.style.filter = 'drop-shadow(0 0 30px rgba(0, 217, 255, 0.5)) drop-shadow(0 0 60px rgba(157, 78, 221, 0.3))';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.filter = 'drop-shadow(0 0 0px rgba(0, 217, 255, 0))';
        });
        
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            createAdvancedRipple(e);
        });
        
        // Add light pulse on hover
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'glow-pulse 0.6s ease-in-out';
        });
    });
}

// Advanced ripple effect with multiple rings
function createAdvancedRipple(event) {
    const card = event.currentTarget;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const circle = document.createElement('span');
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * (1 + i * 0.3);
            const x = event.clientX - rect.left - size / 2;
            const y = event.clientY - rect.top - size / 2;
            
            circle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                border: 2px solid rgba(0, 217, 255, ${0.6 - i * 0.15});
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple-wave 0.8s ease-out forwards;
            `;
            
            // Add ripple animation if not exists
            if (!document.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', 'true');
                style.textContent = `
                    @keyframes ripple-wave {
                        from {
                            transform: scale(0);
                            opacity: 1;
                        }
                        to {
                            transform: scale(1);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            card.style.position = 'relative';
            card.style.overflow = 'hidden';
            card.appendChild(circle);
            
            setTimeout(() => circle.remove(), 800);
        }, i * 100);
    }
}

// Enhanced scroll animations with stagger effect
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.about-me, .hobbies-grid li, .game-card, .hobby-content, .hobby-table-section, .games-section').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for animations
    if (!document.querySelector('style[data-scroll-animate]')) {
        const style = document.createElement('style');
        style.setAttribute('data-scroll-animate', 'true');
        style.textContent = `
            .about-me, 
            .hobbies-grid li, 
            .game-card, 
            .hobby-content, 
            .hobby-table-section,
            .games-section {
                opacity: 1;
            }
            
            .animate-in {
                animation: slideInUp 0.8s ease-out forwards !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced text effects with multiple glow layers
function initTextEffects() {
    const headers = document.querySelectorAll('h2, h3');
    
    headers.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.style.textShadow = `
                0 0 20px rgba(0, 217, 255, 0.6),
                0 0 40px rgba(0, 217, 255, 0.3),
                0 2px 8px rgba(0,0,0,0.3)
            `;
            this.style.letterSpacing = '0.1em';
        });
        
        header.addEventListener('mouseleave', function() {
            this.style.textShadow = '0 0 15px rgba(0, 217, 255, 0.4)';
            this.style.letterSpacing = '0.05em';
        });
    });
}

// Advanced mouse tracker with parallax and lighting
function initMouseTracker() {
    const header = document.querySelector('header');
    
    if (header) {
        document.addEventListener('mousemove', function(e) {
            const rect = header.getBoundingClientRect();
            
            if (e.clientY < rect.bottom) {
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                // Parallax effect
                const moveX = (x - 0.5) * 20;
                const moveY = (y - 0.5) * 10;
                
                header.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
                
                // Create subtle light effect
                const lightX = e.clientX - rect.left;
                const lightY = e.clientY - rect.top;
                
                header.style.setProperty('--light-x', `${lightX}px`);
                header.style.setProperty('--light-y', `${lightY}px`);
            }
        });
    }
}

// Add subtle glow effect to interactive elements
function initGlowEffect() {
    const style = document.createElement('style');
    style.textContent = `
        a, button, .game-card-link {
            position: relative;
        }
        
        a::after, button::after, .game-card-link::after {
            content: "";
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 217, 255, 0.15) 0%, transparent 70%);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            border-radius: inherit;
        }
        
        a:hover::after, button:hover::after, .game-card-link:hover::after {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// Custom cursor follower with new colors
function initCursorFollower() {
    // Create cursor follower elements
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.9), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        display: none;
        box-shadow: 0 0 20px rgba(0, 217, 255, 0.6), 0 0 40px rgba(157, 78, 221, 0.3);
        mix-blend-mode: screen;
    `;
    
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    cursorTrail.style.cssText = `
        position: fixed;
        width: 25px;
        height: 25px;
        border: 2px solid rgba(0, 217, 255, 0.4);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        display: none;
        box-shadow: 0 0 15px rgba(157, 78, 221, 0.3);
    `;
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorTrail);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;}