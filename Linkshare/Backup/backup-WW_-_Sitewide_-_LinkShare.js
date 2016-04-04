(function () {
    window.createCookie=function(e,n,o){var t;if(o){var r=new Date;r.setTime(r.getTime()+24*o*60*60*1e3),t="; expires="+r.toGMTString()}else t="";document.cookie=e+"="+n+t+"; path=/"},window.readCookie=function(e){for(var n=e+"=",o=document.cookie.split(";"),t=0;t<o.length;t++){for(var r=o[t];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(n))return r.substring(n.length,r.length)}return null},window.eraseCookie=function(e){createCookie(e,"",-1)},window.getParam=function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+e+"=([^&#]*)"),o=n.exec(location.search);return null==o?"":decodeURIComponent(o[1].replace(/\+/g," "))};
    if ( getParam( 'utm_source' ) == 'linkshare' )
    {
        var pcAff = ["SNgfG0hYjYc","GKxlq8aATrc","M0Btaa*1C/A","j27T8dfNK2Y","izUPF8VmRng","cee60rzNd0s","trXoB*GYSXg","gB*veoSGZ*I","5hFybtq1JGE","msEJUTIZPIc","eExdyzaFMJU","7JmHI9AonM4","LO*Bm04MZwo","e7oUVT7m07k","mXjg8EndEnU","VEDuFfiaY3w","8ILMXayhlms","PMLjQ05Vxh8","y65CiupGSs4","YthxajYG2HM","3w57gQxcGGY","vQuCZKBwqVA","eT0FHZ9YML8","3izd6hN5HL0","HorbUw/2HUk","COo67xzJ7ak","HZTiTQY91mw","RBmn*k1W7V8","6oDRBot4Bb0","5gPCHz8CFb0","z6BIKIwQ3BY","zpRF/YcWXXo","09T6PHqZTKA","khoAjSF0w9c","pevSgrJXxN4","Ux1ppAflp/Q","y0XP3tcUyus","LxResIKWjfg","h*1hRBiaxzk","B6jY6bUx3q8","KOntE1mUxyw","/Opi820SY/0","uIvfknSTTzk","YxHs42358jk","x*SKPIZqpRw","ZF0TcNPEnH8","XLP/T7bMZC0","3zxbuy0ybU0","TodWoqWcHJI","bJIUz45Afb0","9CGqNUoKmgs","WxZXCYwb5Kw","DoZEtukLMxs","D*Cr3GUE9zI","QF9ufS8kUao","kaaWQMSaDFo","mwcg1GLXqRY","gkagJ3kjyfI","q4HiRh0*Hr0","*HfdapVdZS0","YKIqMWuOxY0","7fdK7OSF2L8","Lw35eCRxfKo","if*7KCltIj4","sZJy7sNwtFo","zgt6V8OWHkg","JQVrNPzxpPM","Hlwxd9/QOT4","gg42cCWzNdg","fvF4BH3LWEA","FsBH6IXGhA4","KCcFoIlFdRk","ry9lt6MvnU8","iL8bX0peoXc","x7G3utLuOcA"];
        var isPcAff = false;
        var term = getParam( 'utm_term' );
        for ( var i in pcAff)
        {
            if ( pcAff[i] == term ) {
                isPcAff = true;
                break;
            }
        }
        createCookie('linkshareElegible', isPcAff + '_-_' + new Date().getTime() + '_-_' + getParam( 'utm_term' ), 30);
    }
    if ( getParam( 'utm_source' ) == 'email' )
    {
        createCookie('emailReferral', 'true_-_' + new Date().getTime() + '_-_' + getParam( 'utm_campaign' ), 30);
    }
})();
