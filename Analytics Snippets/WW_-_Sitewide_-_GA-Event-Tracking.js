$(function(){

  // Fire a Virtual Pageview when a user clicks on an auto-suggested search result in the search bar.
  $('body').on('click', '.search-suggestion-right-panel-product', function(){
    var searchTerm = $('input#q').val();
    var numberOfAutoSuggestedSearchResults = $('.search-suggestion-right-panel-product, .search-suggestion-right-panel-product-last').length.toString();

    ga('main.set', { 'dimension9': numberOfAutoSuggestedSearchResults } );
    ga('main.send', 'pageview', document.location.pathname + '/vpv/search/' + searchTerm);
    ga('rollUp.send', 'pageview', document.location.pathname + '/vpv/search/' + searchTerm);
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
    var eventLabel = $(this).parents('.product-tile').attr('data-itemid');
    ga(
      'main.send',
      'event',
      'Recently view',
      'Click',
      eventLabel
    );
  });

  $('#recommended_products').on('click', 'a', function(e) {
    var eventLabel = $(this).parents('.product-tile').attr('data-itemid');
    ga(
      'main.send',
      'event',
      'We recommend',
      'Click',
      eventLabel
    );
  });

  $('#similar_products').on('click', 'a', function(e) {
    var eventLabel = $(this).parents('.product-tile').attr('data-itemid');
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
