function redirectToDefensiveArchitecture() {
    window.location.href = 'sites/DefensiveArchitektur.html';
}

function redirectToSquattedHouse() {
    window.location.href = 'sites/Hausbesetzung.html';
}

window.onload = function() {
    //Schritt 1: Toggle Menü einrichten
    document.getElementById('toggleMenu').addEventListener('click', function() {
        var menu = document.getElementById('menu');
        var toggle = document.getElementById('toggleMenu');
        menu.classList.toggle('open');
        toggle.classList.toggle('open');
      });

    // Schritt 1: Bild laden
    var mainElement = document.getElementById('picturePuzzle');
    var computedStyle = getComputedStyle(mainElement);
    var backgroundImage = new Image();
    backgroundImage.src = computedStyle.backgroundImage.slice(5, -2);
    backgroundImage.onload = function() {
        var elementWidth = mainElement.clientWidth;
        var elementHeight = mainElement.clientHeight;
        var imageAspectRatio = backgroundImage.width / backgroundImage.height;
        var elementAspectRatio = elementWidth / elementHeight;
        var effectiveWidth;
        if (imageAspectRatio > elementAspectRatio) {
            effectiveWidth = elementWidth;
        } else {
            effectiveWidth = elementHeight * imageAspectRatio;
        }
        console.log('Effective background image width: ' + effectiveWidth + 'px. Setting main element width to ' + effectiveWidth + 'px.');
        mainElement.style.width = effectiveWidth + 'px';

        //Schritte 2: Variablen für die Bereiche definieren
        var defensiveArchitecture = document.getElementById('defensiveArchitecture');
        var squattedHouse = document.getElementById('squattedHouse');

        // Schritt 3: Bildereiche definieren und Hover hinzufügen
        var isHoveringDefensiveArchitecture = false;
        var isHoveringSquattedHouse = false;
        mainElement.addEventListener('mousemove', function(event) {
            var rect = mainElement.getBoundingClientRect();
            var x = event.clientX - rect.left; // x position within the element
            var y = event.clientY - rect.top;  // y position within the element

            var xPercent = (x / rect.width) * 100;
            var yPercent = (y / rect.height) * 100;

            var isInDefensiveArchitecture = xPercent >= 1 && xPercent <= 31 && yPercent >= 62 && yPercent <= 88;
            var isInSquattedHouse = xPercent >= 72 && xPercent <= 99 && yPercent >= 28 && yPercent <= 75;

            if (isInDefensiveArchitecture && !isHoveringDefensiveArchitecture) {
                defensiveArchitecture.classList.add('defensiveArchitectureColored');
                isHoveringDefensiveArchitecture = true;
                mainElement.addEventListener('click', redirectToDefensiveArchitecture);
                mainElement.style.cursor = 'pointer'; // Change cursor to pointer
            } else if (!isInDefensiveArchitecture && isHoveringDefensiveArchitecture) {
                defensiveArchitecture.classList.remove('defensiveArchitectureColored');
                isHoveringDefensiveArchitecture = false;
                mainElement.removeEventListener('click', redirectToDefensiveArchitecture);
                mainElement.style.cursor = 'default'; // Change cursor back to default
            }

            if (isInSquattedHouse && !isHoveringSquattedHouse) {
                squattedHouse.classList.add('squattedHouseColored');
                isHoveringSquattedHouse = true;
                mainElement.addEventListener('click', redirectToSquattedHouse);
                mainElement.style.cursor = 'pointer'; // Change cursor to pointer
            } else if (!isInSquattedHouse && isHoveringSquattedHouse) {
                squattedHouse.classList.remove('squattedHouseColored');
                isHoveringSquattedHouse = false;
                mainElement.removeEventListener('click', redirectToSquattedHouse);
                mainElement.style.cursor = 'default'; // Change cursor back to default
            }
        });

        // Schritt 4: Navigation definieren und Hover hinzufügen
        var navDefensiveArchitecture = document.getElementById('navDefensiveArchitecture');
        var navSquattedHouse = document.getElementById('navSquattedHouse');
        navDefensiveArchitecture.addEventListener('mouseover', function() {
            defensiveArchitecture.classList.add('defensiveArchitectureColored');
        });
        navDefensiveArchitecture.addEventListener('mouseout', function() {
            defensiveArchitecture.classList.remove('defensiveArchitectureColored');
        });
        navSquattedHouse.addEventListener('mouseover', function() {
            squattedHouse.classList.add('squattedHouseColored');
        });
        navSquattedHouse.addEventListener('mouseout', function() {
            squattedHouse.classList.remove('squattedHouseColored');
        });
    };
};


document.addEventListener("DOMContentLoaded", function () {
    const bubble = document.querySelector('.speech-bubble');
    const logo = document.querySelector('.logo');
    const closeButton = document.querySelector('.speech-bubble .close-button');

    let bubbleVisible = false; // Track the visibility state

    function positionBubble() {
        const logoRect = logo.getBoundingClientRect();
    
        // Calculate the bubble's position above the logo
        const bubbleX = logoRect.left + (logoRect.width / 2) - (bubble.offsetWidth / 2);
        const bubbleY = logoRect.top - bubble.offsetHeight - 50; // Adjust the offset to 50px above the logo
    
        // Apply the calculated position
        bubble.style.left = `${bubbleX}px`;
        bubble.style.top = `${bubbleY}px`;
    }

    // Show the bubble with animation
    function showBubble() {
    if (!bubbleVisible) {
        bubble.style.display = 'block'; // Ensure the bubble is visible
        bubble.style.opacity = '0'; // Start invisible
        bubble.style.transform = 'translateY(-10px)'; // Slight offset for animation

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

            // Wait for the transition to end before hiding completely
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

    // Show the bubble on hover over the logo
    logo.addEventListener('mouseenter', function () {
        showBubble();
    });

    // Hide the bubble on clicking the "X" button
    closeButton.addEventListener('click', function () {
        hideBubble();
    });

    // Reposition the bubble on window resize
    window.addEventListener('resize', function () {
        if (bubbleVisible) {
            positionBubble();
        }
    });

    // Initially show the bubble on page load
    showBubble();
});





// Rotating Text Functionality
let words = document.querySelectorAll(".word");
words.forEach(word => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach(letter => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1"; // Removed 'as HTMLElement'

let rotateText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  // Rotate out letters of current word
  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, i * 80);
  });
  // Reveal and rotate in letters of next word
  nextWord.style.opacity = "1"; // Removed 'as HTMLElement'
  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + i * 80);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

rotateText();
setInterval(rotateText, 4000);
