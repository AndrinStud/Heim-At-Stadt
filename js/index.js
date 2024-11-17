function redirectToDefensiveArchitecture() {
    window.location.href = 'sites/DefensiveArchitektur.html';
}

function redirectToSquattedHouse() {
    window.location.href = 'sites/Hausbesetzung.html';
}

window.onload = function() {
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
            } else if (!isInDefensiveArchitecture && isHoveringDefensiveArchitecture) {
                defensiveArchitecture.classList.remove('defensiveArchitectureColored');
                isHoveringDefensiveArchitecture = false;
                mainElement.removeEventListener('click', redirectToDefensiveArchitecture);
            }

            if (isInSquattedHouse && !isHoveringSquattedHouse) {
                squattedHouse.classList.add('squattedHouseColored');
                isHoveringSquattedHouse = true;
                mainElement.addEventListener('click', redirectToSquattedHouse);
            } else if (!isInSquattedHouse && isHoveringSquattedHouse) {
                squattedHouse.classList.remove('squattedHouseColored');
                isHoveringSquattedHouse = false;
                mainElement.removeEventListener('click', redirectToSquattedHouse);
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