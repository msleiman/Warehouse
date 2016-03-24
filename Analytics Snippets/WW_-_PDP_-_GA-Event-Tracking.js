$(function(){
  // Save item
  $('.product_details .save_for_later').click(function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Save item',
      'Item page',
      eventLabel
    );
  });
  // Shop the look
  $('#shop-the-look').click(function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Shop the look',
      'Click',
      eventLabel
    );
  });
  // Information tabs
  $('.product_tabs .tabs_buttons>li a').click(function() {
    var eventAction = $(this).text().trim();
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Item tab',
      eventAction,
      eventLabel
    );
  });
  // Picture interaction
  $('.product_images').on(
    'click',
    '.click-zoom,.productthumbnail,.flex-prev,.flex-next',
    function(e) {
      var eventAction = '';
      if ($(e.currentTarget).hasClass('click-zoom')) {
        eventAction = 'Zoom in';
      }else if ($(e.currentTarget).hasClass('productthumbnail')) {
        eventAction = 'Zoom in';
      }else if ($(e.currentTarget).hasClass('flex-prev')) {
        eventAction = 'Left';
      }else if ($(e.currentTarget).hasClass('flex-next')) {
        eventAction = 'Right';
      }
      var eventLabel = $('.updatingPdpMainsku').text().trim();
      ga(
        'main.send',
        'event',
        'Picture interaction',
        eventAction,
        eventLabel
      );
    }
  );
  $('#thumbnails').on('click', '.thumbnail-link', function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Picture interaction',
      'Small',
      eventLabel
    );
  });
  // Find in a store button click
  $('#check-store-availability').click(function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Find store',
      'Click',
      eventLabel
    );
  });
  // Find in a store - Postcode
  var postCode = '';
  // TO-DO: set postCode
  ga( 'main.set', { 'dimension13': postCode } );
  $('body').on('submit', '#stockCheckForm', function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Find store',
      'Submit',
      eventLabel
    );
  });
  // Find in a store - Find nearest button
  $('body').on('click', '#stockCheckForm', function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Find store',
      'Nearest',
      eventLabel
    );
  });
  // Size out of stock
  $('.product-variations select.va-size-select').change(function(event) {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Size select',
      'Click',
      eventLabel
    );
  });
  // Next/Previous
  $('#product-nav-container').on('click', 'a', function(e) {
    var eventAction = '';
    if ($(e.currentTarget).parent().hasClass('product-previous')) {
      eventAction = 'Previous';
    }else if ($(e.currentTarget).parent().hasClass('product-next')) {
      eventAction = 'Next';
    }
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Navigation',
      eventAction,
      eventLabel
    );
  });
  // Add to bag
  $('.product_details').on('click', '.action-addtocart', function() {
    setTimeout(function () {
      if ($('.select-product-size-message').length===0) {
        var eventLabel = $('.updatingPdpMainsku').text().trim();
        ga(
          'main.send',
          'event',
          'Add to bag',
          'Submit',
          eventLabel
        );
      }
    }, 100);
  });
  // Social Share
  $('.product_details').on('click', '.social_buttons a', function(e) {
      var eventLabel = '';
      if ($(e.currentTarget).hasClass('addthis_button_facebook')) {
        eventLabel = 'Facebook';
      }else if ($(e.currentTarget).hasClass('addthis_button_twitter')) {
        eventLabel = 'Twitter';
      }else if ($(e.currentTarget).hasClass('addthis_button_google_plusone_share')) {
        eventLabel = 'Google +';
      }else if ($(e.currentTarget).hasClass('addthis_button_pinterest')) {
        eventLabel = 'Pinterest';
      }
      ga(
        'main.send',
        'event',
        'Social',
        'Click',
        eventLabel
      );
  });
});
