// Based off of W3Schools' example on how to set and get cookies:
// https://www.w3schools.com/js/js_cookies.asp

class Cookie {
    constructor(cookieName) {
        this.name = cookieName;
        this.value = this.getCookie(cookieName);
    }

    getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
    }

    setCookie(cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = this.name + "=" + cvalue + ";" + expires + ";path=/";
    }
}

export { Cookie };