import './textBubble.js';

function redirectToDefensiveArchitecture() {
    window.location.href = 'sites/DefensiveArchitektur.php';
}

function redirectToSquattedHouse() {
    window.location.href = 'sites/Hausbesetzung.php';
}

function redirectToServicedApartments() {
    window.location.href = 'sites/ServicedApartments.php';
}

function redirectToSmartCity() {
    window.location.href = 'sites/SmartCity.php';
}

function redirectToPodcast() {
    window.open('https://open.spotify.com/show/6VrQMTrcKcIwBZdBUiqksx?si=45XMnEBaSuivcg1DRX6dBg', '_blank');
}

window.onload = function() {
    //Schritt 1: Toggle Menü Desktop einrichten
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
        var effectiveHeight;
        if (imageAspectRatio > elementAspectRatio) {
            effectiveWidth = elementWidth;
            effectiveHeight = elementWidth / imageAspectRatio;
        } else {
            effectiveHeight = elementHeight;
            effectiveWidth = elementHeight * imageAspectRatio;
        }
        console.log('Effective background image width: ' + effectiveWidth + 'px. Setting main element width to ' + effectiveWidth + 'px.');
        console.log('Effective background image height: ' + effectiveHeight + 'px. Setting main element height to ' + effectiveHeight + 'px.');
        mainElement.style.width = effectiveWidth + 'px';
        mainElement.style.height = effectiveHeight + 'px';

        //Schritte 2: Variablen für die Bereiche definieren
        var defensiveArchitecture = document.getElementById('defensiveArchitecture');
        var squattedHouse = document.getElementById('squattedHouse');
        var servicedApartments = document.getElementById('servicedApartments');
        var smartCity = document.getElementById('smartCity');
        var podcast = document.getElementById('podcast');

        // Schritt 3: Bildereiche definieren und Hover hinzufügen
        var isHoveringDefensiveArchitecture = false;
        var isHoveringSquattedHouse = false;
        var isHoveringServicedApartments = false;
        var isHoveringSmartCity = false;
        var isHoveringPodcast = false;

        mainElement.addEventListener('mousemove', function(event) {
            var rect = mainElement.getBoundingClientRect();
            var x = event.clientX - rect.left; // x position within the element
            var y = event.clientY - rect.top;  // y position within the element

            var xPercent = (x / rect.width) * 100;
            var yPercent = (y / rect.height) * 100;

            var isInDefensiveArchitecture = xPercent >= 16 && xPercent <= 36 && yPercent >= 10 && yPercent <= 38;
            var isInSquattedHouse = xPercent >= 65 && xPercent <= 87 && yPercent >= 39 && yPercent <= 74;
            var isInServicedApartments = xPercent >= 40 && xPercent <= 52 && yPercent >= 11 && yPercent <= 34;
            var isInSmartCity = xPercent >= 75 && xPercent <= 87 && yPercent >= 0 && yPercent <= 32;
            var isInPodcast = xPercent >= 18 && xPercent <= 34 && yPercent >= 52 && yPercent <= 79;

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

            if (isInServicedApartments && !isHoveringServicedApartments) {
                servicedApartments.classList.add('servicedApartmentsColored');
                isHoveringServicedApartments = true;
                mainElement.addEventListener('click', redirectToServicedApartments);
                mainElement.style.cursor = 'pointer';
            } else if (!isInServicedApartments && isHoveringServicedApartments) {
                servicedApartments.classList.remove('servicedApartmentsColored');
                isHoveringServicedApartments = false;
                mainElement.removeEventListener('click', redirectToServicedApartments);
                mainElement.style.cursor = 'default';
            }

            if (isInSmartCity && !isHoveringSmartCity) {
                smartCity.classList.add('smartCityColored');
                isHoveringSmartCity = true;
                mainElement.addEventListener('click', redirectToSmartCity);
                mainElement.style.cursor = 'pointer';
            } else if (!isInSmartCity && isHoveringSmartCity) {
                smartCity.classList.remove('smartCityColored');
                isHoveringSmartCity = false;
                mainElement.removeEventListener('click', redirectToSmartCity);
                mainElement.style.cursor = 'default';
            }

            if (isInPodcast && !isHoveringPodcast) {
                podcast.classList.add('podcastColored');
                isHoveringPodcast = true;
                mainElement.addEventListener('click', redirectToPodcast);
                mainElement.style.cursor = 'pointer';
            } else if (!isInPodcast && isHoveringPodcast) {
                podcast.classList.remove('podcastColored');
                isHoveringPodcast = false;
                mainElement.removeEventListener('click', redirectToPodcast);
                mainElement.style.cursor = 'default';
            }
        });

        // Schritt 4: Navigation definieren und Hover hinzufügen
        var navDefensiveArchitecture = document.getElementById('navDefensiveArchitecture');
        var navSquattedHouse = document.getElementById('navSquattedHouse');
        var navServicedApartments = document.getElementById('navServicedApartments');
        var navSmartCity = document.getElementById('navSmartCity');
        var navPodcast = document.getElementById('navPodcast');

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
        navServicedApartments.addEventListener('mouseover', function() {
            servicedApartments.classList.add('servicedApartmentsColored');
        });
        navServicedApartments.addEventListener('mouseout', function() {
            servicedApartments.classList.remove('servicedApartmentsColored');
        });
        navSmartCity.addEventListener('mouseover', function() {
            smartCity.classList.add('smartCityColored');
        });
        navSmartCity.addEventListener('mouseout', function() {
            smartCity.classList.remove('smartCityColored');
        });
        navPodcast.addEventListener('mouseover', function() {
            podcast.classList.add('podcastColored');
        });
        navPodcast.addEventListener('mouseout', function() {
            podcast.classList.remove('podcastColored');
        });
    };
    
    // Schritt 5: Toggle Menü Mobile einrichten
    document.getElementById('hamburgerIcon').addEventListener('click', function() {
        var mobileLinks = document.getElementById("mobileNavBottom");
        var realMain = document.getElementById('main');
        if (mobileLinks.style.display === "flex") {
            mobileLinks.style.display = "none";
            realMain.style.top = "50%";
            realMain.style.transform = "translateY(-50%)";
            realMain.style.bottom = "unset";
        } else {
            mobileLinks.style.display = "flex";
            realMain.style.top = "unset";
            realMain.style.transform = "none";
            realMain.style.bottom = "0";
        }
    });
};