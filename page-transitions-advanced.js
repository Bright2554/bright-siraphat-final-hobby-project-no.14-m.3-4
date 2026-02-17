// Advanced Page Transitions with Gradient Sweep Effect

class PageTransition {
    constructor() {
        this.isTransitioning = false;
        this.init();
    }
    
    init() {
        this.addTransitionStyles();
        this.attachLinkListeners();
        this.animatePageIn();
    }
    
    attachLinkListeners() {
        const links = document.querySelectorAll('a:not([href^="http"]):not([href^="mailto"]):not([href^="#"]):not([target="_blank"])');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && !href.startsWith('javascript:') && !this.isTransitioning) {
                    e.preventDefault();
                    this.navigate(href);
                }
            });
        });
    }
    
    navigate(url) {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        
        this.createTransitionScreen();
        this.animateOut(() => {
            window.location.href = url;
        });
    }
    
    createTransitionScreen() {
        const screen = document.createElement('div');
        screen.className = 'transition-screen';
        screen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, #181f2f 0%, #22304a 50%, #181f2f 100%);
            background-size: 200% 100%;
            z-index: 99999;
            pointer-events: none;
            opacity: 0;
        `;
        document.body.appendChild(screen);
        return screen;
    }
    
    animateOut(callback) {
        const header = document.querySelector('header');
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');
        const screen = document.querySelector('.transition-screen');
        
        // Stagger animations for elements moving out
        if (footer) {
            footer.style.animation = 'slideOutDown 0.4s ease-in-out forwards';
        }
        
        if (main) {
            main.style.animation = 'slideOutDown 0.5s ease-in-out 0.1s forwards';
        }
        
        if (header) {
            header.style.animation = 'slideOutDown 0.6s ease-in-out 0.2s forwards';
        }
        
        // Gradient sweep transition
        if (screen) {
            screen.style.animation = 'gradientSweepIn 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s forwards';
        }
        
        setTimeout(callback, 1200);
    }
    
    animatePageIn() {
        const screen = document.querySelector('.transition-screen');
        if (screen) {
            screen.style.animation = 'gradientSweepOut 0.6s cubic-bezier(0.8, 0, 0.6, 1) forwards';
            setTimeout(() => screen.remove(), 600);
        }
        
        const header = document.querySelector('header');
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');
        
        // Set initial state for incoming elements
        [header, main, footer].forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
            }
        });
        
        // Stagger animation in with easing
        setTimeout(() => {
            if (header) {
                header.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }
        }, 200);
        
        setTimeout(() => {
            if (main) {
                main.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                main.style.opacity = '1';
                main.style.transform = 'translateY(0)';
            }
        }, 350);
        
        setTimeout(() => {
            if (footer) {
                footer.style.transition = 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
                footer.style.opacity = '1';
                footer.style.transform = 'translateY(0)';
            }
        }, 500);
        
        // Clean up transitions
        setTimeout(() => {
            [header, main, footer].forEach(el => {
                if (el) el.style.transition = 'none';
            });
            this.isTransitioning = false;
        }, 1100);
    }
    
    addTransitionStyles() {
        if (document.querySelector('style[data-page-transitions]')) return;
        
        const style = document.createElement('style');
        style.setAttribute('data-page-transitions', 'true');
        style.textContent = `
            /* Gradient Sweep In - Page transition overlay */
            @keyframes gradientSweepIn {
                0% {
                    opacity: 0;
                    background-position: -100% 0;
                }
                1% {
                    opacity: 1;
                }
                100% {
                    opacity: 1;
                    background-position: 100% 0;
                }
            }
            
            /* Gradient Sweep Out - Overlay disappears */
            @keyframes gradientSweepOut {
                0% {
                    opacity: 1;
                    background-position: -100% 0;
                }
                99% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    background-position: 100% 0;
                }
            }
            
            /* Slide Out Down - Elements exit */
            @keyframes slideOutDown {
                from {
                    opacity: 1;
                    transform: translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateY(40px);
                }
            }
            
            /* Ensure elements are visible by default */
            header, main, footer {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    new PageTransition();
});

// Re-initialize on back button
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const pt = new PageTransition();
        pt.animatePageIn();
    }
});