var uaurl = '//www.google-analytics.com/analytics.js';
//var uaurl = '//www.google-analytics.com/analytics_debug.js';
var gaid;
var row = false;

// If the loaded page is a blog page, define a Google Analytics tracker ID to use
if ( window.location.pathname.indexOf('/blog') >= 0 ) {
  gaid = 'UA-72009637-11';
}

else if (gaid === undefined) { // If the page is not a blog page, select a country-specific tracker.
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

// Send pageviews ONLY IF the page is not a Basket/Cart, Checkout or Order Confirmation page.

if ( (digitalData.page.instanceID.indexOf('_Cart') >= 0) || (digitalData.page.instanceID.indexOf('_Checkout') >= 0) || (digitalData.page.instanceID.indexOf('_OrderConfirmation') >= 0) ) {
  // The page is Basket/Cart, Checkout or Order Confirmation page. We have VPVs for these pages - do not fire regular pageviews.
}

else if ( window.location.pathname.indexOf('/blog') >= 0 ) { // If we are on a blog page, send a page view with correct titles.
  ga('main.send', {
    hitType: 'pageview',
    page: digitalData.page.canonical || digitalData.page.url,
    location: location.href,
    title: document.title
  });

  ga('rollUp.send', {
    hitType: 'pageview',
    page: digitalData.page.canonical || digitalData.page.url,
    location: location.href,
    title: document.title
  });
}

else { // If the page is a regular websit page, send a pageview
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
}
