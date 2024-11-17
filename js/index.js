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

        // Schritt 3: Bereiche definieren und Hover-Ereignis hinzufügen
        var isHovering = false;
        mainElement.addEventListener('mousemove', function(event) {
            var rect = mainElement.getBoundingClientRect();
            var x = event.clientX - rect.left; // x position within the element
            var y = event.clientY - rect.top;  // y position within the element

            var xPercent = (x / rect.width) * 100;
            var yPercent = (y / rect.height) * 100;

            var isInDefinedArea = xPercent >= 1 && xPercent <= 31 && yPercent >= 62 && yPercent <= 88;

            if (isInDefinedArea && !isHovering) {
                defensiveArchitecture.classList.add('defensiveArchitectureColored');
                isHovering = true;
            } else if (!isInDefinedArea && isHovering) {
                defensiveArchitecture.classList.remove('defensiveArchitectureColored');
                isHovering = false;
            }
        });
    };
};