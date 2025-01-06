import { Cookie } from "./Cookie.js";

class Bubble {
    constructor(mainBubble, bubbleX = null, bubbleY = null) {
        this.bubble = document.querySelector('.speech-bubble');
        this.bubbleX = bubbleX;
        this.bubbleY = bubbleY;
        if (mainBubble) {
            this.logo = document.querySelector('.logo');
            this.closeButton = document.querySelector('.speech-bubble .close-button');
            this.bubbleVisible = false; // Track visibility state
            this.firstInteraction = true; // Track if it's the first interaction
            this.fiCookie = new Cookie('firstInteraction');
            if (this.fiCookie.value == '')
                this.fiCookie.setCookie(0, 1);
            else if (this.fiCookie.value == 1)
                this.firstInteraction = false;
        }
        window.addEventListener('resize', () => this.load());
    }

    setMainEventListeners() {
        // Show/hide bubble on hover after the first interaction
        this.logo.addEventListener('mouseenter', () => {
            if (!this.firstInteraction) {
                this.showAndPosition();
            }
        });

        this.logo.addEventListener('mouseleave', () => {
            if (!this.firstInteraction) {
                this.hide();
            }
        });

        this.closeButton.addEventListener('click', () => {
            this.hide();
            this.firstInteraction = false; // Disable close button after first interaction
            this.fiCookie.setCookie(1, 1);
            this.closeButton.style.display = 'none'; // Hide the close button permanently
        });
    }

    position() {
        const logoRect = this.logo.getBoundingClientRect();
        this.bubbleX = logoRect.left + (logoRect.width / 2) - (this.bubble.offsetWidth / 2);
        this.bubbleY = logoRect.top - this.bubble.offsetHeight - 50; // 50px above the logo

        // Apply the calculated position
        this.bubble.style.left = `${this.bubbleX}px`;
        this.bubble.style.top = `${this.bubbleY}px`;
    }

    show() {
        if (!this.bubbleVisible) {
            this.bubble.style.display = 'block'; // Ensure visible
            this.bubble.style.opacity = '0'; // Start invisible
            this.bubble.style.transform = 'translateY(-10px)'; // Offset for animation
    
            // Trigger animation
            requestAnimationFrame(() => {
                this.bubble.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                this.bubble.style.opacity = '1';
                this.bubble.style.transform = 'translateY(0)';
            });
    
            this.bubbleVisible = true; // Update state
        }
    }

    showAndPosition() {
        this.show();
        this.position();
    }

    hide() {
        if (this.bubbleVisible) {
            this.bubble.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.bubble.style.opacity = '0'; // Fade out
            this.bubble.style.transform = 'translateY(-10px)'; // Move upward
    
            // Wait for transition to complete before hiding
            this.bubble.addEventListener(
                'transitionend',
                () => {
                    this.bubble.style.display = 'none';
                },
                { once: true }
            );
    
            this.bubbleVisible = false; // Update state
        }
    }

    load() {
        if (this.bubbleVisible){
            if (window.innerWidth < 574) {
                this.hide();
            }
            else {
                this.position();
            }
        }
        else if (window.innerWidth >= 574) {
            this.showAndPosition();
        }
    }

    initMain(){
        if (this.firstInteraction) {
            this.load();
        }
        else {
            this.closeButton.style.display = 'none';
        }
        this.setMainEventListeners();
    }
}

export { Bubble };