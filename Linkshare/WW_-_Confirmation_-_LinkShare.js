function fireLinksharePixel() {
  // Check for the presence of the Linkshare cookie to see if the user has come to the site from Linkshare in the last 30 days.
  // If it is present, we will show the tracking pixel on the Order Confirmation page.
  // Remember, the cookie is set to expire after 30 days so we don't need to check when it was set, just that it exists.
  if (document.cookie.indexOf('linkshareReferrerID') >= 0) {
    console.log('Linkshare referrer cookie detected.');
    if ( digitalData.page.type == 'OrderConfirmation') {

      // Check if the user received a discount on their bag by using a promocode. If they did, record the amount as an integer.
      // Note: this is different to receiving a discount on a product because it is on sale.
      if (parseFloat(digitalData.bag.totals.discount) < 0) {
        var userReceivedAPromocodeDiscount = true;
        var userPromocodeDiscountAmount = parseFloat(digitalData.bag.totals.discount);
        console.log('The user used a promo code to receive a discount on their order. We will send this to Linkshare if the pixel fires.');
      }
      else {
        var userReceivedAPromocodeDiscount = false;
      }

      // Split the website's cookies into an array that we can access later.
      // Capture the Linkshare referrer's ID from a cookie that's set by the WW_-_Sitewide_-_LinkShare code snippet in CoreMetrics.
      var splitCookieArray = document.cookie.split(';')
      for (var i = 0; i < splitCookieArray.length; i++) {
        if (splitCookieArray[i].indexOf('linkshareReferrerID') >= 0) {
          var linkshareReferrerID = splitCookieArray[i].split('=').pop(); // Get Linkshare referral ID from cookie.
          console.log('Linkshare cookie detected - referrer ID is ' + linkshareReferrerID);
          break;
        }
      }

      var referralPartnersWhoSupplyPromocodes = ["SNgfG0hYjYc","GKxlq8aATrc","M0Btaa*1C/A","j27T8dfNK2Y","izUPF8VmRng","cee60rzNd0s",
      "trXoB*GYSXg","gB*veoSGZ*I","5hFybtq1JGE","msEJUTIZPIc","eExdyzaFMJU","7JmHI9AonM4","LO*Bm04MZwo","e7oUVT7m07k",
      "mXjg8EndEnU","VEDuFfiaY3w","8ILMXayhlms","PMLjQ05Vxh8","y65CiupGSs4","YthxajYG2HM","3w57gQxcGGY","vQuCZKBwqVA",
      "eT0FHZ9YML8","3izd6hN5HL0","HorbUw/2HUk","COo67xzJ7ak","HZTiTQY91mw","RBmn*k1W7V8","6oDRBot4Bb0","5gPCHz8CFb0",
      "z6BIKIwQ3BY","zpRF/YcWXXo","09T6PHqZTKA","khoAjSF0w9c","pevSgrJXxN4","Ux1ppAflp/Q","y0XP3tcUyus","LxResIKWjfg",
      "h*1hRBiaxzk","B6jY6bUx3q8","KOntE1mUxyw","/Opi820SY/0","uIvfknSTTzk","YxHs42358jk","x*SKPIZqpRw","ZF0TcNPEnH8",
      "XLP/T7bMZC0","3zxbuy0ybU0","TodWoqWcHJI","bJIUz45Afb0","9CGqNUoKmgs","WxZXCYwb5Kw","DoZEtukLMxs","D*Cr3GUE9zI",
      "QF9ufS8kUao","kaaWQMSaDFo","mwcg1GLXqRY","gkagJ3kjyfI","q4HiRh0*Hr0","*HfdapVdZS0","YKIqMWuOxY0","7fdK7OSF2L8",
      "Lw35eCRxfKo","if*7KCltIj4","sZJy7sNwtFo","zgt6V8OWHkg","JQVrNPzxpPM","Hlwxd9/QOT4","gg42cCWzNdg","fvF4BH3LWEA",
      "FsBH6IXGhA4","KCcFoIlFdRk","ry9lt6MvnU8","iL8bX0peoXc","x7G3utLuOcA"];

      var referralPartnerPromoCodes = ["LSTEST20"];

      // CONDITION 1:
      // Check if the referral partner is part of a list of partners that provide vouchers, and check that the user has applied any coupons.
      // This is split into two functions.

      // This function returns true if the user has been referred by a partner who supplies coupons.
      function userHasBeenReferredByPartnerWhoSuppliesPromocodes() {
        for (var i = 0; i < referralPartnersWhoSupplyPromocodes.length; i++) {
          if (linkshareReferrerID == referralPartnersWhoSupplyPromocodes[i]) { // If the referrer is in the list of referral partners who supply voucher codes
            console.log('The user has been referred by a partner who supplies promocodes');
            return true;
            break;
          }
        }
        console.log('The user has not been referred by a partner who supplies coupons.');
        return false; // If the user has not been referred by a partner who supplies coupons, then return false. This means the pixel can still fire.
      }

      // This function returns true if the user has been referred by a partner who supplies promo codes, and the user used a referral partner promocode.
      function userUsedPromocodeFromReferralPartner() {
        if (userHasBeenReferredByPartnerWhoSuppliesPromocodes() == true) {
          for (var i = 0; i < referralPartnerPromoCodes.length; i++) {
            if (digitalData.bag.promocodes.indexOf(referralPartnerPromoCodes[i]) >= 0) { // If the promocodes used contain a referral partner voucher code
              console.log('The user has used a promo code from a referral partner.');
              return true;
              break;
            }
          }
        }
        console.error('The user has not used a promo code from a referral partner. The pixel will not fire.');
        return false; // return false if the user did not use a promocode from a referral partner.
      }

      // CONDITION 2:
      // User has purchased from our site within the last 30 minutes. If this is the case, do not track.
      // This function returns true if the user has purchased from our site within the last 30 minutes.
      function userPurchasedWithinLast30Minutes() {
        for (var i = 0; i < splitCookieArray.length; i++) {
          if (splitCookieArray[i].indexOf('userLastPurchased') >= 0) {
            var userLastPurchasedTimestamp = parseInt(splitCookieArray[i].split('=')[1]);
            console.log('The user last purchased at timestamp ' + userLastPurchasedTimestamp);
            if ( (Math.round(new Date().getTime()/1000) - userLastPurchasedTimestamp) <= 1800) { // If the time difference between now and the last time the user purchased is less than 30 minutes
              console.error('The user has purchased within the last 30 minutes. We will not fire a tracking pixel.');
              return true;
              break;
            }
            else {
              console.log('The time difference between now and the time the user last purchased is greater than 30 minutes.');
              return false; // Return false if the time difference is greater than 30 minutes
            }
          }
        }
        console.log('The userLastPurchased cookie does not exist.');
        return false; // Return false if the cookie doesn't exist.
      }

      // CONDITION 3:
      // If the user came to the site less than 24 hours before from one of our own emails, do not track.
      // Find when the user came to the site from the email campaign by checking the timestamp of the __utmz parameter which is set by Google Analytics.
      // This function returns true when the user did visit the site from an email campaign in the last 24 hours.
      function userVisitedSiteFromEmailCampaignWithinLast24Hours() {
        var splitCookieArray = document.cookie.split(';')
        for (var i = 0; i < splitCookieArray.length; i++) {
          if (splitCookieArray[i].indexOf('__utmz') >= 0) {
            var gaEmailCampaignArrivalTimestamp = parseInt(splitCookieArray[i].split('=')[1].split('.')[1]);

            if ( (Math.round(new Date().getTime()/1000) - gaEmailCampaignArrivalTimestamp) < 86400) { // If time difference between now and the time the user arrived from the email is < 24 hours
              console.error('The user visited the site from an email campaign in the last 24 hours. The pixel will not fire.');
              return true;
            }
            else {
              console.log('The user visited the site from an email campaign over 24 hours ago.');
              return false;
            }
          }
        }
        console.log('Could not find an email campaign cookie.');
        return false; // Return false if we could not find the cookie.
      };

      // Now work out if we should show the tracking pixel or not.
      if (
          (userHasBeenReferredByPartnerWhoSuppliesPromocodes() == false || userUsedPromocodeFromReferralPartner() == true) && // If user is referred from a referral partner that supplies promo codes, they must use a promo code, or they must be referred by a partner that does not use promo codes.
          (userPurchasedWithinLast30Minutes() == false) &&
          (userVisitedSiteFromEmailCampaignWithinLast24Hours() == false)
        ) {
          // Create the Linkshare tracking pixel
          console.log('Creating linkshareTrackingPixel...');
          var linkshareTrackingPixel = '<img src="https://track.linksynergy.com/ep?';
          linkshareTrackingPixel += 'mid=36373'; // Add in merchant ID
          linkshareTrackingPixel += '&ord=' + digitalData.orderId; // Add in order ID
          linkshareTrackingPixel += '&skulist='; // Add in order ID

          // Generate a pipe-delimited ('|') list of SKUs in this order
          for (var i = 0; i < Object.keys(digitalData.bag.products).length; i++) {
            if (i != Object.keys(digitalData.bag.products).length - 1) { // If i is not the last element in the array, then add a pipe ('|')
              linkshareTrackingPixel += digitalData.bag.products[i].id + '|';
            }
            else {
              linkshareTrackingPixel += digitalData.bag.products[i].id;
            }
          }

          if (userReceivedAPromocodeDiscount == true) {
            linkshareTrackingPixel += '|Discount';
          }

          // Add in order quantities
          linkshareTrackingPixel += '&qlist=';

          // Generate a pipe-delimited ('|') list of quantities, in the same order as the skulist above
          for (var i = 0; i < Object.keys(digitalData.bag.products).length; i++) {
            if (i != Object.keys(digitalData.bag.products).length - 1) { // If i is not the last element in the array, then add a pipe ('|')
              linkshareTrackingPixel += digitalData.bag.products[i].quantity + '|';
            }
            else {
              linkshareTrackingPixel += digitalData.bag.products[i].quantity;
            }
          }

          if (userReceivedAPromocodeDiscount == true) {
            linkshareTrackingPixel += '|0';
          }

          // Add in order prices
          linkshareTrackingPixel += '&amtlist=';

          // Generate a pipe-delimited ('|') list of amounts for each item, in the same order as the skulist and qlist above
          for (var i = 0; i < Object.keys(digitalData.bag.products).length; i++) {
            if (i != Object.keys(digitalData.bag.products).length - 1) { // If i is not the last element in the array, then add a pipe ('|')
              linkshareTrackingPixel += (Math.floor(digitalData.bag.products[i].price * 0.833333 * 100)) + '|'; // Multiply by 0.833333 to remove VAT
            }
            else {
              linkshareTrackingPixel += Math.floor(digitalData.bag.products[i].price * 0.833333 * 100);
            }
          }

          if (userReceivedAPromocodeDiscount == true) {
            linkshareTrackingPixel += '|' + Math.floor(userPromocodeDiscountAmount * 0.833333 * 100).toString();
          }

          // Add in currency of this order
          linkshareTrackingPixel += '&cur=' + digitalData.site.currency;
          linkshareTrackingPixel += '&img=1">';

          console.log(linkshareTrackingPixel);
          console.log('Appending Linkshare tracking pixel to DOM...')
          $('body').append(linkshareTrackingPixel);
          console.log('Appended Linkshare tracking pixel to DOM.')
      }

      else {
        // Do not fire the tracking pixel as the conditions have not been met.
      }
    }
    else {
      console.error('User is not on the Order Confirmation page. Linkshare pixel will not fire.');
    }
  }

  else {
    console.error('No Linkshare cookie detected. Linkshare pixel will not fire.');
  }

  // Set a cookie to tell us the time that the user last purchased on the Warehouse site, to expire in 1 year's time.
  if (digitalData.page.type == 'OrderConfirmation') {
    var currentDate = new Date();
    var currentDatePlus1Year = Math.floor(currentDate.setDate(currentDate.getDate() + 365));
    document.cookie = 'userLastPurchased=' + Math.floor(Date.now()/1000) + '; expires=' + new Date(currentDatePlus1Year).toUTCString();
  }

};

// Run function. ** The below function call should be uncommented out for production, and commented out for test mode. **
fireLinksharePixel();
