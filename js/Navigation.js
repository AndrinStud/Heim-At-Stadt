class DesktopMenu {
    constructor() {
        document.getElementById('toggleMenu').addEventListener('click', DesktopMenu.createMenu);
    }

    static createMenu() {
        var menu = document.getElementById('menu');
        var toggle = document.getElementById('toggleMenu');
        menu.classList.toggle('open');
        toggle.classList.toggle('open');
    }
}

class MobileMenu {
    constructor(slimmed = false) {
        this.slimmed = slimmed;
        document.getElementById('hamburgerIcon').addEventListener('click', MobileMenu.createMenu.bind(this));
    }

    static createMenu() {
        var mobileLinks = document.getElementById("mobileNavBottom");
        if (!this.slimmed) {
            var realMain = document.getElementById('main');
        }
        else {
            mobileLinks.style.marginBottom = "2vh";
        }
        if (mobileLinks.style.display === "flex") {
            mobileLinks.style.display = "none";
            if (!this.slimmed) {
                realMain.style.top = "50%";
                realMain.style.transform = "translateY(-50%)";
                realMain.style.bottom = "unset";
            }
        } else {
            mobileLinks.style.display = "flex";
            if (!this.slimmed) {
                realMain.style.top = "unset";
                realMain.style.transform = "none";
                realMain.style.bottom = "0";
            }
        }
    }
}

export { DesktopMenu, MobileMenu };