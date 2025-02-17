import { Bubble } from './Bubble.js';

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
        window.location.href = 'sites/UntilPublication.html';
    }
    
    static redirectToServicedApartments() {
        window.location.href = 'sites/ServicedApartments.php';
    }
    
    static redirectToSmartCity() {
        window.location.href = 'sites/SmartCity.php';
    }
    
    static redirectToPodcast() {
        window.location.href = 'sites/Podcast.html';
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
        this.mainElement.style.width = effectiveWidth + 'px';
        this.mainElement.style.height = effectiveHeight + 'px';
    }

    createDefArcBubble() {
        let rect = this.mainElement.getBoundingClientRect();
        let mainDifferenceToTop = rect.top;
        let mainDifferenceToLeft = rect.left;
        let mainWidth = rect.width;
        let mainHeight = rect.height;
        let x = mainDifferenceToLeft + mainWidth * 0.1;
        let y = mainDifferenceToTop + mainHeight * 0.35;
        return new Bubble(false, '#dev-arc-bubble', x, y, mainWidth, mainHeight, true);
    }

    createSerAptBubble() {
        let rect = this.mainElement.getBoundingClientRect();
        let mainDifferenceToTop = rect.top;
        let mainDifferenceToLeft = rect.left;
        let mainWidth = rect.width;
        let mainHeight = rect.height;
        let x = mainDifferenceToLeft + mainWidth * 0.3;
        let y = mainDifferenceToTop + mainHeight * 0.35;
        return new Bubble(false, '#ser-apt-bubble', x, y, mainWidth, mainHeight, true);
    }

    createSmaCitBubble() {
        let rect = this.mainElement.getBoundingClientRect();
        let mainDifferenceToTop = rect.top;
        let mainDifferenceToLeft = rect.left;
        let mainWidth = rect.width;
        let mainHeight = rect.height;
        let x = mainDifferenceToLeft + mainWidth * 0.65;
        let y = mainDifferenceToTop + mainHeight * 0.3;
        return new Bubble(false, '#sma-cit-bubble', x, y, mainWidth, mainHeight, true);
    }

    createPodcastBubble() {
        let rect = this.mainElement.getBoundingClientRect();
        let mainDifferenceToTop = rect.top;
        let mainDifferenceToLeft = rect.left;
        let mainWidth = rect.width;
        let mainHeight = rect.height;
        let x = mainDifferenceToLeft + mainWidth * 0.13;
        let y = mainDifferenceToTop + mainHeight * 0.38;
        return new Bubble(false, '#podcast-bubble', x, y, mainWidth, mainHeight);
    }

    createSquHouBubble() {
        let rect = this.mainElement.getBoundingClientRect();
        let mainDifferenceToTop = rect.top;
        let mainDifferenceToLeft = rect.left;
        let mainWidth = rect.width;
        let mainHeight = rect.height;
        let x = mainDifferenceToLeft + mainWidth * 0.52;
        let y = mainDifferenceToTop + mainHeight * 0.25;
        return new Bubble(false, '#squ-hou-bubble', x, y, mainWidth, mainHeight);
    }

    createPieces(event, bubbles) {
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
            bubbles.defArcBubble.load();
            this.defensiveArchitecture.classList.add('defensiveArchitectureColored');
            this.isHoveringDefensiveArchitecture = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToDefensiveArchitecture);
            this.mainElement.style.cursor = 'pointer'; // Change cursor to pointer
        } else if (!isInDefensiveArchitecture && this.isHoveringDefensiveArchitecture) {
            bubbles.defArcBubble.hide();
            this.defensiveArchitecture.classList.remove('defensiveArchitectureColored');
            this.isHoveringDefensiveArchitecture = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToDefensiveArchitecture);
            this.mainElement.style.cursor = 'default'; // Change cursor back to default
        }

        if (isInSquattedHouse && !this.isHoveringSquattedHouse) {
            bubbles.squHouBubble.load();
            this.squattedHouse.classList.add('squattedHouseColored');
            this.isHoveringSquattedHouse = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToSquattedHouse);
            this.mainElement.style.cursor = 'pointer'; // Change cursor to pointer
        } else if (!isInSquattedHouse && this.isHoveringSquattedHouse) {
            bubbles.squHouBubble.hide();
            this.squattedHouse.classList.remove('squattedHouseColored');
            this.isHoveringSquattedHouse = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToSquattedHouse);
            this.mainElement.style.cursor = 'default'; // Change cursor back to default
        }

        if (isInServicedApartments && !this.isHoveringServicedApartments) {
            bubbles.serAptBubble.load();
            this.servicedApartments.classList.add('servicedApartmentsColored');
            this.isHoveringServicedApartments = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToServicedApartments);
            this.mainElement.style.cursor = 'pointer';
        } else if (!isInServicedApartments && this.isHoveringServicedApartments) {
            bubbles.serAptBubble.hide();
            this.servicedApartments.classList.remove('servicedApartmentsColored');
            this.isHoveringServicedApartments = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToServicedApartments);
            this.mainElement.style.cursor = 'default';
        }

        if (isInSmartCity && !this.isHoveringSmartCity) {
            bubbles.smaCitBubble.load();
            this.smartCity.classList.add('smartCityColored');
            this.isHoveringSmartCity = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToSmartCity);
            this.mainElement.style.cursor = 'pointer';
        } else if (!isInSmartCity && this.isHoveringSmartCity) {
            bubbles.smaCitBubble.hide();
            this.smartCity.classList.remove('smartCityColored');
            this.isHoveringSmartCity = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToSmartCity);
            this.mainElement.style.cursor = 'default';
        }

        if (isInPodcast && !this.isHoveringPodcast) {
            bubbles.podcastBubble.load();
            this.podcast.classList.add('podcastColored');
            this.isHoveringPodcast = true;
            this.mainElement.addEventListener('click', PicturePuzzle.redirectToPodcast);
            this.mainElement.style.cursor = 'pointer';
        } else if (!isInPodcast && this.isHoveringPodcast) {
            bubbles.podcastBubble.hide();
            this.podcast.classList.remove('podcastColored');
            this.isHoveringPodcast = false;
            this.mainElement.removeEventListener('click', PicturePuzzle.redirectToPodcast);
            this.mainElement.style.cursor = 'default';
        }
    }

    static changeNavPuzzleItemConnection(puzzleItem, connectClass, connected){
        if (!connected){
            puzzleItem.classList.add(connectClass);
        }
        else {
            puzzleItem.classList.remove(connectClass);
        }
    }

    connectNavToPuzzle(){
        let navAndPuzzleClasses = [
            { piece: this.defensiveArchitecture, nav: document.getElementById('navDefensiveArchitecture'), class: 'defensiveArchitectureColored' },
            { piece: this.squattedHouse, nav: document.getElementById('navSquattedHouse'), class: 'squattedHouseColored' },
            { piece: this.servicedApartments, nav: document.getElementById('navServicedApartments'), class: 'servicedApartmentsColored' },
            { piece: this.smartCity, nav: document.getElementById('navSmartCity'), class: 'smartCityColored' },
            { piece: this.podcast, nav: document.getElementById('navPodcast'), class: 'podcastColored' }
        ];

        navAndPuzzleClasses.forEach(element => {
            element.nav.addEventListener('mouseover', () => PicturePuzzle.changeNavPuzzleItemConnection(element.piece, element.class, false));
            element.nav.addEventListener('mouseout', () => PicturePuzzle.changeNavPuzzleItemConnection(element.piece, element.class, true));
        });
    }
    
    static buildPuzzle(puzzle) {
        puzzle.setSize();
        let bubbles = {
            defArcBubble: puzzle.createDefArcBubble(),
            serAptBubble: puzzle.createSerAptBubble(),
            smaCitBubble: puzzle.createSmaCitBubble(),
            podcastBubble: puzzle.createPodcastBubble(),
            squHouBubble: puzzle.createSquHouBubble()
        }
        puzzle.mainElement.addEventListener('mousemove', event => {
            puzzle.createPieces(event, bubbles);
        });
        puzzle.connectNavToPuzzle();
    }

    load() {
        var computedStyle = getComputedStyle(this.mainElement);
        this.backgroundImage.src = computedStyle.backgroundImage.slice(5, -2);
        this.backgroundImage.onload = PicturePuzzle.buildPuzzle(this);
    }
}

export { PicturePuzzle };