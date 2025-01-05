import './Bubble.js';
import { PicturePuzzle } from './PicturePuzzle.js';
import { DesktopMenu, MobileMenu } from './Navigation.js';

window.onload = function() {
    new DesktopMenu();
    new MobileMenu();

    let picturePuzzle = new PicturePuzzle();
    picturePuzzle.loadPuzzle();

    // Bei Grössenänderung des Fensters das Puzzle neu laden
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.location.reload();
        }, 500);
    });
};