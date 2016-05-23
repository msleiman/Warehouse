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
        }
        else if (splitCookieArray[i].indexOf('linkshareReferralLastArrivalTime') >= 0) {
          var linkshareReferralLastArrivalTime = splitCookieArray[i].split('=').pop(); // Get Linkshare referral ID from cookie.
          console.log('Linkshare last arrival time is ' + linkshareReferralLastArrivalTime);
        }
      }

      var referralPartnersWhoSupplyPromocodes = ["LO*Bm04MZwo", "YthxajYG2HM", "izUPF8VmRng", "JQVrNPzxpPM", "OOTtr9mlaCk", "KCcFoIlFdRk", "7fdK7OSF2L8"];

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

      // This function returns true if the user has been referred by a partner who supplies promo codes, and the user used any promocode.
      function userHasBeenReferredByPartnerWhoSuppliesPromocodesAndUserUsedPromocode() {
        if (userHasBeenReferredByPartnerWhoSuppliesPromocodes() == true) {
          if (digitalData.bag.promocodes.length > 0) {
            console.log('The user has come from a referral partner who provides a promocode, and they used promocode(s) "' + digitalData.bag.promocodes + '"');
            return true;
          }
          else {
            console.error('The user came from a referral partner that provides promocodes, but did not apply any promocodes. The pixel will not fire.');
            return false; // return false if the user did not use a promocode from a referral partner.
          }
        }
      }

      // CONDITION 2 - ** CURRENTLY DISABLED **:
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

      // CONDITION 3 - ** CURRENTLY DISABLED **:
      // If the user came to the site less than 24 hours before from one of our own emails, do not track.
      // Find when the user came to the site from the email campaign by checking the timestamp of the __utmz parameter which is set by Google Analytics.
      // This function returns true when the user did visit the site from an email campaign in the last 24 hours.
      function userVisitedSiteFromEmailCampaignWithinLast24Hours() {
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

      // CONDITION 4:
      // If the user has added something to their bag within the last 20 minutes before arriving from Linkshare, then return true.
      // We track this because if a user has added something to their bag within the last 20 minutes and then arrives from Linkshare,
      // we should not fire the pixel as they could go to Linkshare for a discount and return to us after intending to make a full price purchase.
      function userAddedToBagWithinLast20MinutesBeforeLinkshareReferralArrival() {
        for (var i = 0; i < splitCookieArray.length; i++) {
          if (splitCookieArray[i].indexOf('lastAddToBagEventTimestamp') >= 0) {
            var userLastAddedToBagTimestamp = parseInt(splitCookieArray[i].split('=')[1]);
            console.log('The user last added to their bag at timestamp ' + userLastAddedToBagTimestamp);
            var addToBagVsReferralTimestampDifference = linkshareReferralLastArrivalTime - userLastAddedToBagTimestamp;
            console.log('The time difference between adding to bag and being referred from Linkshare is ' + addToBagVsReferralTimestampDifference.toString() + ' seconds.');
            if ( (addToBagVsReferralTimestampDifference >= 0) && (addToBagVsReferralTimestampDifference <= 1200) ) { // If the time difference between now and the last time the user added to bag is less or equal to 20 minutes
              console.error('The user last added to bag in the last 20 minutes or less before arriving from Linkshare. We will not fire a tracking pixel.');
              return true;
              break;
            }
            else if (addToBagVsReferralTimestampDifference < 0 ) {
              console.log('The user last added to bag after arriving from Linkshare. Continue.');
              return false;
            }
            if ( (addToBagVsReferralTimestampDifference > 1200) ) {
              console.log('The user last added to bag more than 20 minutes after arriving from Linkshare. Continue.');
              return false;
            }
          }
        }
      }

      // Now work out if we should show the tracking pixel or not.
      if (
          (userHasBeenReferredByPartnerWhoSuppliesPromocodes() == false || userHasBeenReferredByPartnerWhoSuppliesPromocodesAndUserUsedPromocode() == true) // If user is referred from a referral partner that supplies promo codes, they must use a promo code, or they must be referred by a partner that does not use promo codes.
          && (userAddedToBagWithinLast20MinutesBeforeLinkshareReferralArrival() == false)
          // && (userPurchasedWithinLast30Minutes() == false)
          // && (userVisitedSiteFromEmailCampaignWithinLast24Hours() == false)
        ) {
          // Create the Linkshare tracking pixel
          console.log('The Linkshare tracking pixel should be fired. Creating pixel...');
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
