var uaurl = '//www.google-analytics.com/analytics.js';
//var uaurl = '//www.google-analytics.com/analytics_debug.js';
var gaid;
var row = false;
switch (window.digitalData.site.country) {
  case 'GB':
  case 'NI':
    gaid = 'UA-72009637-1';
    break;
  case 'IE':
    gaid = 'UA-72009637-2';
    break;
  case 'AU':
  case 'NZ':
    gaid = 'UA-72009637-3';
    break;
  case 'DE':
  case 'AT':
    gaid = 'UA-72009637-4';
    break;
  case 'FR':
    gaid = 'UA-72009637-5';
    break;
  case 'NL':
    gaid = 'UA-72009637-6';
    break;
  case 'SE':
    gaid = 'UA-72009637-7';
    break;
  case 'US':
  case 'CA':
    gaid = 'UA-72009637-8';
    break;
  default:
    //Rest of the World
    gaid = 'UA-72009637-9';
    row = true;
    break;
}
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', uaurl, 'ga');
//window.ga_debug = {trace: true}; //Uncomment for verbose debugging

ga('create', gaid, 'auto', {
  'name': 'main',
  allowLinker: true
});

ga('create', 'UA-72009637-10', 'auto', {
  'name': 'rollUp',
  allowLinker: true
});

ga('main.require', 'linker');
ga('rollUp.require', 'linker');
ga('rollUp.require', 'ec');
ga('main.require', 'ec');
ga('main.require', 'displayfeatures');
ga('rollUp.require', 'displayfeatures');
ga('main.linker:autoLink', ['warehouse-london.com', 'andotherbrands.com']);
ga('rollUp.linker:autoLink', ['warehouse-london.com', 'andotherbrands.com']);

if (typeof(digitalData) != 'undefined' && typeof(digitalData.customer) != 'undefined' && typeof(digitalData.customer.id) != 'undefined') {
  ga('main.set', 'userId', digitalData.customer.id);
  ga('rollUp.set', 'userId', digitalData.customer.id);

  ga( 'main.set', { 'dimension11': digitalData.customer.id } );
  ga( 'rollUp.set', { 'dimension11': digitalData.customer.id } );
}

if (row) {
  ga('main.set', {
    'dimension10': window.digitalData.site.country
  });
  ga('rollUp.set', {
    'dimension10': window.digitalData.site.country
  });
}

window.optimizely = window.optimizely || [];
window.optimizely.push("activateUniversalAnalytics");

if (digitalData.page.instanceID.indexOf('_OrderConfirmation_') > -1) {

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
} // End if on Order Confirmation page.

ga('main.send', {
  hitType: 'pageview',
  page: digitalData.page.canonical || digitalData.page.url,
  location: location.href,
  title: digitalData.page.title
});

ga('rollUp.send', {
  hitType: 'pageview',
  page: digitalData.page.canonical || digitalData.page.url,
  location: location.href,
  title: digitalData.page.title
});
