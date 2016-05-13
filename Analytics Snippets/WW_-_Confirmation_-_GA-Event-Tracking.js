// This is for general Google Analytics tracking code that is to be fired on the Order Confirmation page.

(function(){

  ga('main.ec:setAction','checkout', {'step': 6});
  ga('rollUp.ec:setAction','checkout', {'step': 6});

  // Set delivery option as custom dimension
  ga( 'main.set', { 'dimension7': digitalData.delivery.id } );
  ga( 'rollUp.set', { 'dimension7': digitalData.delivery.id } );

  var p = digitalData.bag.products;
  for (var i in p) {
    ga('main.ec:addProduct', {
      'id': p[i].id,
      'name': p[i].name,
      'category': p[i].masterCategory,
      'variant': p[i].colour,
      'price': p[i].price,
      'quantity': p[i].quantity
    });

    ga('rollUp.ec:addProduct', {
      'id': p[i].id,
      'name': p[i].name,
      'category': p[i].masterCategory,
      'variant': p[i].colour,
      'price': p[i].price,
      'quantity': p[i].quantity
    });
  }

  ga('main.ec:setAction', 'purchase', {
    'id': digitalData.orderId,
    'revenue': digitalData.bag.totals.grandTotal,
    'tax': 0,
    'shipping': digitalData.delivery.price,
    'coupon': digitalData.bag.promocodes
  });

  ga('rollUp.ec:setAction', 'purchase', {
    'id': digitalData.orderId,
    'revenue': digitalData.bag.totals.grandTotal,
    'tax': 0,
    'shipping': digitalData.delivery.price,
    'coupon': digitalData.bag.promocodes
  });

  // If the user used guest checkout in this session, we need to fire a VPV to indicate this.
  var splitCookieArray = document.cookie.split(';')
  for (var i = 0; i < splitCookieArray.length; i++) {
    if (splitCookieArray[i].indexOf('userCheckoutType') >= 0) {
      var userCheckoutType = splitCookieArray[i].split('=').pop(); // Get the user checkout type (e.g. guest) from a session cookie that was set during checkout.

      if (userCheckoutType == 'userUsingGuestCheckout') {
        ga('main.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/confirmorder/vpv/guest');
  	    ga('rollUp.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/confirmorder/vpv/guest');
      }

      else { // If the user didn't use Guest Checkout, they must be registered. Send a VPV.
        ga('main.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/confirmorder/vpv/registered');
  	    ga('rollUp.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/confirmorder/vpv/registered');
      }
      break;
    }
  }

}());
