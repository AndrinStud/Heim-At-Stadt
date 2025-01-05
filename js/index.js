import './textBubble.js';
import { PicturePuzzle } from './PicturePuzzle.js';

window.onload = function() {
    //Schritt 1: Toggle Menü Desktop einrichten
    document.getElementById('toggleMenu').addEventListener('click', function() {
        var menu = document.getElementById('menu');
        var toggle = document.getElementById('toggleMenu');
        menu.classList.toggle('open');
        toggle.classList.toggle('open');
    });

    // Schritt 2: PicturePuzzle einrichten
    let picturePuzzle = new PicturePuzzle();
    picturePuzzle.loadPuzzle();
    
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