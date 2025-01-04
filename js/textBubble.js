document.addEventListener("DOMContentLoaded", function () {
    const bubble = document.querySelector('.speech-bubble');
    const logo = document.querySelector('.logo');
    const closeButton = document.querySelector('.speech-bubble .close-button');

    let bubbleVisible = false; // Track visibility state
    let firstInteraction = true; // Track if it's the first interaction

    function positionBubble() {
        const logoRect = logo.getBoundingClientRect();

        // Calculate the bubble's position above the logo
        const bubbleX = logoRect.left + (logoRect.width / 2) - (bubble.offsetWidth / 2);
        const bubbleY = logoRect.top - bubble.offsetHeight - 50; // 50px above the logo

        // Apply the calculated position
        bubble.style.left = `${bubbleX}px`;
        bubble.style.top = `${bubbleY}px`;
    }

    // Show the bubble with animation
    function showBubble() {
        if (!bubbleVisible) {
            bubble.style.display = 'block'; // Ensure visible
            bubble.style.opacity = '0'; // Start invisible
            bubble.style.transform = 'translateY(-10px)'; // Offset for animation

            // Trigger animation
            requestAnimationFrame(() => {
                bubble.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                bubble.style.opacity = '1';
                bubble.style.transform = 'translateY(0)';
            });

            bubbleVisible = true; // Update state
        }
    }

    // Hide the bubble with animation
    function hideBubble() {
        if (bubbleVisible) {
            bubble.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            bubble.style.opacity = '0'; // Fade out
            bubble.style.transform = 'translateY(-10px)'; // Move upward

            // Wait for transition to complete before hiding
            bubble.addEventListener(
                'transitionend',
                () => {
                    bubble.style.display = 'none';
                },
                { once: true }
            );

            bubbleVisible = false; // Update state
        }
    }

    // Initially show the bubble on page load
    if (window.innerWidth >= 574) {
        showBubble();
        positionBubble();
    }

    // Reposition the bubble on window resize
    window.addEventListener('resize', function () {
        if (bubbleVisible) {
            positionBubble();
        }
        if (window.innerWidth < 574) {
            hideBubble();
        }
        else if (window.innerWidth >= 574) {
            showBubble();
            positionBubble();
        }
    });

    // Close the bubble with the X button on first interaction
    closeButton.addEventListener('click', function () {
        hideBubble();
        firstInteraction = false; // Disable close button after first interaction
        closeButton.style.display = 'none'; // Hide the close button permanently
    });

    // Show/hide bubble on hover after the first interaction
    logo.addEventListener('mouseenter', function () {
        if (!firstInteraction) {
            showBubble();
        }
    });

    logo.addEventListener('mouseleave', function () {
        if (!firstInteraction) {
            hideBubble();
        }
    });
});