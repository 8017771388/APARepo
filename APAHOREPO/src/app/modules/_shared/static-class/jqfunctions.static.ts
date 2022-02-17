declare var jQuery: any; // JQuery

export class JqFunctions {
    /********* delete cookie ********/
    static deleteLocalStorage() {
        let cookies = document.cookie.split(';');
        //console.log('cookies', cookies);
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].split('=');
            //var eqPos = cookie.indexOf('=');
            //var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            // document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
            
            //this.setCookie(cookie[0], '', -1)
            let name = cookie[0];
            let value = '';
            let expireDays = -1;
            let path = '';


            let d:Date = new Date();
            d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
            let expires:string = `expires=${d.toUTCString()}`;
            let cpath:string = path ? `; path=${path}` : '';
            document.cookie = `${name}=${value}; ${expires}${cpath}`
        }
        sessionStorage.clear();
    }

    static windowResize(isFullPage = false) {
        if (!isFullPage) {
            jQuery('#page-outer').css({
                height: jQuery(window).height() - jQuery('#page-outer-navbar').height() + 'px'
            });
        } else {
            jQuery('#page-outer').css({
                height: jQuery(window).height() + 'px'
            });
        }
    }
}
