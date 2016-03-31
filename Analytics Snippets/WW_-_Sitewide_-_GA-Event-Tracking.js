$(function(){
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
});
