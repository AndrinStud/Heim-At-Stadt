class PicturePuzzle {
    constructor() {        
        this.mainElement = document.getElementById('picturePuzzle');
        this.backgroundImage = new Image();

        this.defensiveArchitecture = document.getElementById('defensiveArchitecture');
        this.squattedHouse = document.getElementById('squattedHouse');
        this.servicedApartments = document.getElementById('servicedApartments');
        this.smartCity = document.getElementById('smartCity');
        this.podcast = document.getElementById('podcast');

        this.isHoveringDefensiveArchitecture = false;
        this.isHoveringSquattedHouse = false;
        this.isHoveringServicedApartments = false;
        this.isHoveringSmartCity = false;
        this.isHoveringPodcast = false;
    }

    static redirectToDefensiveArchitecture() {
        window.location.href = 'sites/DefensiveArchitektur.php';
    }
    
    static redirectToSquattedHouse() {
        window.location.href = 'sites/Hausbesetzung.php';
    }
    
    static redirectToServicedApartments() {
        window.location.href = 'sites/ServicedApartments.php';
    }
    
    static redirectToSmartCity() {
        window.location.href = 'sites/SmartCity.php';
    }
    
    static redirectToPodcast() {
        window.open('https://open.spotify.com/show/6VrQMTrcKcIwBZdBUiqksx?si=45XMnEBaSuivcg1DRX6dBg', '_blank');
    }

    setSize() {
        var elementWidth = this.mainElement.clientWidth;
        var elementHeight = this.mainElement.clientHeight;
        var imageAspectRatio = this.backgroundImage.width / this.backgroundImage.height;
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
        this.mainElement.style.width = effectiveWidth + 'px';
        this.mainElement.style.height = effectiveHeight + 'px';
    }

    createPieces(event) {
        var rect = this.mainElement.getBoundingClientRect();
        var x = event.clientX - rect.left; // x position within the element
        var y = event.clientY - rect.top;  // y position within the element

        var xPercent = (x / rect.width) * 100;
        var yPercent = (y / rect.height) * 100;

        var isInDefensiveArchitecture = xPercent >= 16 && xPercent <= 36 && yPercent >= 10 && yPercent <= 38;
        var isInSquattedHouse = xPercent >= 65 && xPercent <= 87 && yPercent >= 39 && yPercent <= 74;
        var isInServicedApartments = xPercent >= 40 && xPercent <= 52 && yPercent >= 11 && yPercent <= 34;
        var isInSmartCity = xPercent >= 75 && xPercent <= 87 && yPercent >= 0 && yPercent <= 32;
        var isInPodcast = xPercent >= 18 && xPercent <= 34 && yPercent >= 52 && yPercent <= 79;

        if (isInDefensiveArchitecture && !this.isHoveringDefensiveArchitecture) {
            this.defensiveArchitecture.classList.add('defensiveArchitectureColored');
            this.isHoveringDefensiveArchitecture = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToDefensiveArchitecture);
            this.mainElement.style.cursor = 'pointer'; // Change cursor to pointer
        } else if (!isInDefensiveArchitecture && this.isHoveringDefensiveArchitecture) {
            this.defensiveArchitecture.classList.remove('defensiveArchitectureColored');
            this.isHoveringDefensiveArchitecture = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToDefensiveArchitecture);
            this.mainElement.style.cursor = 'default'; // Change cursor back to default
        }

        if (isInSquattedHouse && !this.isHoveringSquattedHouse) {
            this.squattedHouse.classList.add('squattedHouseColored');
            this.isHoveringSquattedHouse = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToSquattedHouse);
            this.mainElement.style.cursor = 'pointer'; // Change cursor to pointer
        } else if (!isInSquattedHouse && this.isHoveringSquattedHouse) {
            this.squattedHouse.classList.remove('squattedHouseColored');
            this.isHoveringSquattedHouse = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToSquattedHouse);
            this.mainElement.style.cursor = 'default'; // Change cursor back to default
        }

        if (isInServicedApartments && !this.isHoveringServicedApartments) {
            this.servicedApartments.classList.add('servicedApartmentsColored');
            this.isHoveringServicedApartments = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToServicedApartments);
            this.mainElement.style.cursor = 'pointer';
        } else if (!isInServicedApartments && this.isHoveringServicedApartments) {
            this.servicedApartments.classList.remove('servicedApartmentsColored');
            this.isHoveringServicedApartments = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToServicedApartments);
            this.mainElement.style.cursor = 'default';
        }

        if (isInSmartCity && !this.isHoveringSmartCity) {
            this.smartCity.classList.add('smartCityColored');
            this.isHoveringSmartCity = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToSmartCity);
            this.mainElement.style.cursor = 'pointer';
        } else if (!isInSmartCity && this.isHoveringSmartCity) {
            this.smartCity.classList.remove('smartCityColored');
            this.isHoveringSmartCity = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToSmartCity);
            this.mainElement.style.cursor = 'default';
        }

        if (isInPodcast && !this.isHoveringPodcast) {
            this.podcast.classList.add('podcastColored');
            this.isHoveringPodcast = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToPodcast);
            this.mainElement.style.cursor = 'pointer';
        } else if (!isInPodcast && this.isHoveringPodcast) {
            this.podcast.classList.remove('podcastColored');
            this.isHoveringPodcast = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToPodcast);
            this.mainElement.style.cursor = 'default';
        }
    }
    
    static buildPuzzle(puzzle) {
        puzzle.setSize();
        puzzle.mainElement.addEventListener('mousemove', event => {
            puzzle.createPieces(event)
        });

        // Schritt 4: Navigation definieren und Hover hinzufügen
        let navDefensiveArchitecture = document.getElementById('navDefensiveArchitecture');
        let navSquattedHouse = document.getElementById('navSquattedHouse');
        let navServicedApartments = document.getElementById('navServicedApartments');
        let navSmartCity = document.getElementById('navSmartCity');
        let navPodcast = document.getElementById('navPodcast');

        navDefensiveArchitecture.addEventListener('mouseover', function() {
            puzzle.defensiveArchitecture.classList.add('defensiveArchitectureColored');
        });
        navDefensiveArchitecture.addEventListener('mouseout', function() {
            puzzle.defensiveArchitecture.classList.remove('defensiveArchitectureColored');
        });
        navSquattedHouse.addEventListener('mouseover', function() {
            puzzle.squattedHouse.classList.add('squattedHouseColored');
        });
        navSquattedHouse.addEventListener('mouseout', function() {
            puzzle.squattedHouse.classList.remove('squattedHouseColored');
        });
        navServicedApartments.addEventListener('mouseover', function() {
            puzzle.servicedApartments.classList.add('servicedApartmentsColored');
        });
        navServicedApartments.addEventListener('mouseout', function() {
            puzzle.servicedApartments.classList.remove('servicedApartmentsColored');
        });
        navSmartCity.addEventListener('mouseover', function() {
            puzzle.smartCity.classList.add('smartCityColored');
        });
        navSmartCity.addEventListener('mouseout', function() {
            puzzle.smartCity.classList.remove('smartCityColored');
        });
        navPodcast.addEventListener('mouseover', function() {
            puzzle.podcast.classList.add('podcastColored');
        });
        navPodcast.addEventListener('mouseout', function() {
            puzzle.podcast.classList.remove('podcastColored');
        });
    }

    loadPuzzle() {
        // Schritt 1: Bild laden
        var computedStyle = getComputedStyle(this.mainElement);
        this.backgroundImage.src = computedStyle.backgroundImage.slice(5, -2);
        this.backgroundImage.onload = PicturePuzzle.buildPuzzle(this);
    }
}

export { PicturePuzzle };