(function () {
    try
    {
        var fireLinkshare = false;
        var lsCookie = readCookie('linkshareElegible');
        var emCookie = readCookie('emailReferral');
        var meetsPcCriteria = true;
        if ( lsCookie )
        {
            var cP = lsCookie.split('_-_');
            var timestamp = new Date().getTime() - (30 * 60 * 1000);
            var cookieTime = new Date( parseInt( cP[1] ) );
            if ( cP[0] == 'true' )
            {
                if ( digitalData.bag.promocodes.length < 1 )
                {
                    meetsPcCriteria = false;
                }
            }
            if ( timestamp > cookieTime )
            {
                if ( emCookie )
                {
                    cP = emCookie.split('_-_');
                    timestamp = new Date().getTime() - (24 * 60 * 60 * 1000);
                    cookieTime = new Date( parseInt( cP[1] ) );
                    if ( timestamp > cookieTime )
                    {
                        fireLinkshare = true;
                    }
                }
                else
                {
                    fireLinkshare = true;
                }
            }
        }
        if ( meetsPcCriteria && fireLinkshare )
        {
            var prefix = 'n_';
            if(digitalData.customer.status != 'new')
            {
                prefix = 'r_';
            }
            var taxP = 20 + 100;
            var tSku = [], tPri = [], tDis = [], tNam = [], tQty = [], fDis = 0;
            for(var i in digitalData.bag.products)
            {
                var c = digitalData.bag.products[i];
                tSku.push( prefix + c.id );
                tPri.push( Math.ceil( c.price * 10000 / taxP ) );
                tDis.push( c.discount * 100 );
                tNam.push( encodeURIComponent( c.name ) );
                tQty.push( parseInt( c.quantity ) );
            }
            for(var i in tDis)
            {
                fDis += tDis[i];
            }
            if(fDis > 0){
                tSku.push( prefix + "Discount" );
                tPri.push( fDis * -1 );
                tNam.push( "Discount" );
                tQty.push( 0 );
            }
            var src = document.location.protocol + "//track.linksynergy.com/ep";
                src += "?mid=36373";
                src += "&ord="      + digitalData.orderId;
                src += "&skulist="  + tSku.join('|');
                src += "&qlist="    + tQty.join('|');
                src += "&amtlist="  + tPri.join('|');
                src += "&cur="      + digitalData.site.currency;
                src += "&namelist=" + tNam.join('|');
                src += "&img=1";
            var img = new Image();
                img.src = src;
                img.style.display = "none";
            document.body.appendChild(img);
        }
    }
    catch(e)
    {
            //linkshareError
    }
})();
