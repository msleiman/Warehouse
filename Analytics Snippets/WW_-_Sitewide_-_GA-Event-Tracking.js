$(function(){

  // When a user searches, fire a virtual pageview if the search term redirects to a static page instead of a search results page.
  // Create an object containing the search rules for the site (in the format 'searchTerm': 'redirectURL')
  var searchRules = {
    '90mins'                  : '/delivery-and-returns',
    '90 minute delivery'      : '/delivery-and-returns',
    '90 minutes'              : '/delivery-and-returns',
    'delivery'                : '/delivery-and-returns',
    'Next day'                : '/delivery-and-returns',
    'Next Day Delivery'       : '/delivery-and-returns',
    'Nominated Day'           : '/delivery-and-returns',
    'Nominated Day Delivery'  : '/delivery-and-returns',
    'returns'                 : '/delivery-and-returns',
    'Same Day Delivery'       : '/delivery-and-returns',
    'Same Day Delivery'       : '/delivery-and-returns',
    'Standard Delivery'       : '/delivery-and-returns',
    'accessories'             : '/accessories',
    'accessory'               : '/accessories',
    'careers'                 : '/join-us',
    'jobs'                    : '/join-us',
    'contact'                 : '/contact-us',
    'contact us'              : '/contact-us',
    'help'                    : '/contact-us',
    'denim'                   : '/ware-denim',
    'jean'                    : '/ware-denim',
    'jeans'                   : '/ware-denim',
    'dres'                    : '/clothing/dresses',
    'dress'                   : '/clothing/dresses',
    'dresse'                  : '/clothing/dresses',
    'dresses'                 : '/clothing/dresses',
    'dresses'                 : '/clothing/dresses',
    'dresss'                  : '/clothing/dresses',
    'dressses'                : '/clothing/dresses',
    'search'                  : '/new-in-all',
    'warehouse'               : '/new-in-all',
    'store'                   : '/store-locator',
    'store info'              : '/store-locator',
    'store information'       : '/store-locator',
    'store locator'           : '/store-locator',
    'store selector'          : '/store-locator',
    'top'                     : '/all-tops',
    'tops'                    : '/all-tops'
  }
  var searchRulesKeys = Object.keys(searchRules); // Create array of the keys for the searchRules object so we can loop through it.

  $('.header-search form').submit(function(){
    var searchTerm = $('input#q').val();
    var numberOfAutoSuggestedSearchResults = $('.search-suggestion-right-panel-product, .search-suggestion-right-panel-product-last').length.toString();
    for (var i = 0; i < searchRulesKeys.length; i++ ) {
      if (searchTerm == searchRulesKeys[i] ) { // If the search term equals a key in the redirect rules, send a GA virtual pageview.
        ga('main.set', { 'dimension9': numberOfAutoSuggestedSearchResults } );
        ga('rollUp.set', { 'dimension9': numberOfAutoSuggestedSearchResults } );
        ga('main.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + searchRules[searchRulesKeys[i]] + '/vpv/search/' + searchTerm);
        ga('rollUp.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + searchRules[searchRulesKeys[i]] + '/vpv/search/' + searchTerm);
      }
    }
  });

  // Fire a Virtual Pageview when a user clicks on an auto-suggested search result in the search bar.
  $('body').on('click', '.search-suggestion-right-panel-product', function(){
    var searchTerm = $('input#q').val();
    var numberOfAutoSuggestedSearchResults = $('.search-suggestion-right-panel-product, .search-suggestion-right-panel-product-last').length.toString();
    var pathname = document.location.pathname;

    // If the current pathname has a '/' at the end (e.g. /gb/jewellery/), then do not add a '/' to the beginning of the VPV URL.
    if ( pathname.substring(pathname.length -1) == '/' ) {
      var vpvURL = pathname + 'vpv/search/' + searchTerm;
    }
    else {
      var vpvURL = pathname + '/vpv/search/' + searchTerm;
    }

    ga('main.set', { 'dimension9': numberOfAutoSuggestedSearchResults } );
    ga('rollUp.set', { 'dimension9': numberOfAutoSuggestedSearchResults } );
    ga('main.send', 'pageview', vpvURL);
    ga('rollUp.send', 'pageview', vpvURL);
  });

  $( '.header_navigation' ).on( 'click', 'li.subsubitems > ul > li > a', function(){
    var eventAction = $(this).text().trim().toLowerCase();
    var eventLabel = 'Category';
  	ga(
      'main.send',
      'event',
      'topnav',
      eventAction,
      eventLabel
    );
  });

  // Fire an event when the user hovers over the Bag link in the nav.
  $('li#mini-cart').hover(function(){
    // When user hovers
    ga(
      'main.send',
      'event',
      'Bag - Nav',
      'Hover',
      window.location.href
    );
  },
  function(){
    // When user hovers off
  });

  // Fire event when the Checkout link is clicked when hovering over the Bag link in the navigation
  $('body').on('click', '.mini-cart-link-checkout.checkout-button', function(){
    ga(
      'main.send',
      'event',
      'Bag - Nav',
      'Checkout',
      window.location.href
    );
  });

  // Fire event when the View Bag link is clicked when hovering over the Bag link in the navigation
  $('body').on('click', '.mini-cart-link-cart.checkout-button', function(){
    ga(
      'main.send',
      'event',
      'Bag - Nav',
      'View bag',
      window.location.href
    );
  });

  $('#navigation').on('click', '.right_slot_container a', (function () {
    var eventAction = $(this).text().trim().toLowerCase();
    var eventLabel = 'Picture';
    ga(
      'main.send',
      'event',
      'topnav',
      eventAction,
      eventLabel
    );
  }));

  $('#recently-viewed-baynote').on('click', 'a', function(e) {
    var eventLabel = $(this).parents('.product-tile').attr('data-itemid').substring(0,8);
    ga(
      'main.send',
      'event',
      'Recently viewed',
      'Click',
      eventLabel
    );
  });

  $('#recommended_products').on('click', 'a', function(e) {
    var eventLabel = $(this).parents('.product-tile').attr('data-itemid').substring(0,8);
    ga(
      'main.send',
      'event',
      'We recommend',
      'Click',
      eventLabel
    );
  });

  $('#similar_products').on('click', 'a', function(e) {
    var eventLabel = $(this).parents('.product-tile').attr('data-itemid').substring(0,8);
    ga(
      'main.send',
      'event',
      'Similar items',
      'Click',
      eventLabel
    );
  });

  $('.social-links').on('click', 'a', function(e) {
    var eventLabel = $('span',this).text().trim();
    ga(
      'main.send',
      'event',
      'Social',
      'Follow us',
      eventLabel
    );
  });

  $( '.newsletter-signup' ).on( 'submit', '#sign-up', function(){
  	ga('main.send', 'event', 'newsletter', 'footer_submit', window.location.href );
  });

  // Report all 404 errors to GA
  setTimeout(function(){
    if ( window.location.href.indexOf('404?') > 0 ) {
      var brokenLinkThatUserRequested = decodeURIComponent(window.location.href.split('=').pop());
      ga(
        'main.send',
        'event',
        '404 Queries',
        'View',
        brokenLinkThatUserRequested
      );
    };
  }, 750);

});
