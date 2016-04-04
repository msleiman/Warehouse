(function() {
  try {
    var fireLinkshare = false;
    var lsCookie = readCookie('linkshareElegible');
    var emCookie = readCookie('emailReferral');
    var meetsPcCriteria = true;

    if (lsCookie) {
      var cP = lsCookie.split('_-_');
      console.log('Linkshare cookie stored:');
      console.log(cP);
      var timestamp = new Date().getTime() - (30 * 60 * 1000);
      var cookieTime = new Date(parseInt(cP[1]));

      if (cP[0] == 'true') {
        console.log('needs voucher: true');
        if (digitalData.bag.promocodes.length < 1) {
          console.log('no codes used');
          console.log('First rule NOT met.');
          console.log('Linkshare should NOT fire.');
          meetsPcCriteria = false;
        } else {
          console.log('voucher used.');
          console.log('First rule met.');
        }
      } else {
        console.log('needs voucher: false.');
        console.log('First rule met.');
      }

      if (timestamp > cookieTime) {
        console.log('More than 30 min from landing');
        console.log('Second rule met.');
        if (emCookie) {
          console.log('Has email referral');
          cP = emCookie.split('_-_');
          timestamp = new Date().getTime() - (24 * 60 * 60 * 1000);
          cookieTime = new Date(parseInt(cP[1]));

          if (timestamp > cookieTime) {
            console.log('More than 24 hs from landing through an email');
            console.log('Third rule met.');
            console.log('Linkshare should fire.');
            fireLinkshare = true;
          } else {
            console.log('Less than 24 hs from landing through an email');
            console.log('Third rule NOT met.');
            console.log('Linkshare should NOT fire.');
          }
        } else {
          console.log('No email referral');
          console.log('Third rule met.');
          console.log('Linkshare should fire.');
          fireLinkshare = true;
        }
      } else {
        console.log('Less than 30 min from landing');
        console.log('Second rule NOT met.');
        console.log('Linkshare should NOT fire.');
      }
    }

    if (meetsPcCriteria && fireLinkshare) {
      console.log('Linkshare fired!');
      var prefix = 'n_';
      if (digitalData.customer.status != 'new') {
        prefix = 'r_';
      }
      var taxP = 20 + 100;
      var tSku = [],
        tPri = [],
        tDis = [],
        tNam = [],
        tQty = [],
        fDis = 0;
      for (var i in digitalData.bag.products) {
        var c = digitalData.bag.products[i];
        tSku.push(prefix + c.id);
        tPri.push((c.price * 10000 / taxP) * c.quantity);
        tDis.push(c.discount * 100);
        tNam.push(encodeURIComponent(c.name));
        tQty.push(parseInt(c.quantity));
      }
      for (var i in tDis) {
        fDis += tDis[i];
      }
      if (fDis > 0) {
        tSku.push(prefix + "Discount");
        tPri.push(fDis * -1);
        tNam.push("Discount");
        tQty.push(0);
      }
      var src = document.location.protocol + "//track.linksynergy.com/ep";
      src += "?mid=36373";
      src += "&ord=" + digitalData.orderId;
      src += "&skulist=" + tSku.join('|');
      src += "&qlist=" + tQty.join('|');
      src += "&amtlist=" + tPri.join('|');
      src += "&cur=" + digitalData.site.currency;
      src += "&namelist=" + tNam.join('|');
      src += "&img=1";
      var img = new Image();
      img.src = src;
      img.style.display = "none";
      document.body.appendChild(img);
    } else {
      console.log('Linkshare NOT fired!');
    }
  } catch (e) {
    //linkshareError
  }
})();
