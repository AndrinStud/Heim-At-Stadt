import { Bubble } from './Bubble.js';
import { PicturePuzzle } from './PicturePuzzle.js';
import { DesktopMenu, MobileMenu } from './Navigation.js';

document.addEventListener("DOMContentLoaded", function () {
    let mainBubble = new Bubble(true, '#main-bubble');
    mainBubble.initMain();
});

window.onload = function() {
    new DesktopMenu();
    new MobileMenu();

    let picturePuzzle = new PicturePuzzle();
    picturePuzzle.load();

    // Bei Grössenänderung des Fensters das Puzzle neu laden
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.location.reload();
        }, 500);
    });
};