// This is for general Google Analytics tracking code that is to be fired on the Order Confirmation page.

(function(){

  ga('ec:setAction','checkout', {'step': 6});

  // If the user used guest checkout in this session, we need to fire a VPV to indicate this.
  var splitCookieArray = document.cookie.split(';')
  for (var i = 0; i < splitCookieArray.length; i++) {
    if (splitCookieArray[i].indexOf('userCheckoutType') >= 0) {
      var userCheckoutType = splitCookieArray[i].split('=').pop(); // Get the user checkout type (e.g. guest) from a session cookie that was set during checkout.

      if (userCheckoutType == 'userUsingGuestCheckout') {
        ga('main.send', 'pageview', '/confirmorder/vpv/guest');
  	    ga('rollUp.send', 'pageview', '/confirmorder/vpv/guest');
      }

      else { // If the user didn't use Guest Checkout, they must be registered. Send a VPV.
        ga('main.send', 'pageview', '/confirmorder/vpv/registered');
  	    ga('rollUp.send', 'pageview', '/confirmorder/vpv/registered');
      }
      break;
    }
  }

}());
