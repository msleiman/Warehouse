$(function(){

  // Clicking on a Baynote recommended product
  $('body').on('click', '#recommended-products .baynote-pod-list-item', function(){
    var clickedBaynoteRecommendedProduct = $(this).find('.product-tile').attr('data-itemid').substring(0,8);
    ga('main.send', 'event', 'We recommend', 'Click', clickedBaynoteRecommendedProduct);
  });

  // Save item
  $('body').on('click', '.product_details .save_for_later', function() {
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
  $('body').on('click', '#shop-the-look', function() {
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

  // Track clicks on thumbnails
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
  $('body').on('click', 'button.store-locator-search', function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    // Get first 3 digits of postcode entered.
    var postCode = $('#dwfrm_storelocator_postalCode').val().substring(0,3).toUpperCase();
    if (postCode.match(/\d+/g) != null) { // If the postcode contains a number (e.g. is not a town name) then send the postcode.
      ga( 'main.set', { 'dimension13': postCode } );
    }
    ga(
      'main.send',
      'event',
      'Find store',
      'Submit',
      eventLabel
    );
  });

  // Find in a store - Find nearest button
  $('body').on('click', '#nearest-store', function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    // Get first 3 digits of postcode entered.
    var postCode = $('#dwfrm_storelocator_postalCode').val().substring(0,3).toUpperCase();
    if (postCode.match(/\d+/g) != null) { // If the postcode contains a number (e.g. is not a town name) then send the postcode.
      ga( 'main.set', { 'dimension13': postCode } );
    }
    ga(
      'main.send',
      'event',
      'Find store',
      'Nearest',
      eventLabel
    );
  });

  // Size out of stock
  $('body').on('click', 'a.va-size-select', function() {
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    var sizesOutOfStock = ''; // empty string to store sizes that are OOS

    $('.va-size-select-selectBox-dropdown-menu ul li').each(function(){
      if ( $(this).hasClass('selectBox-disabled') ) { // If size is OOS
        // Strip text from string so only the size number remains
        var outOfStockSize = $(this).find('a').html().replace(/\D/g,'') + ' ';
        sizesOutOfStock += outOfStockSize; // Add to string
      }
    });
    ga( 'main.set', { 'dimension1': sizesOutOfStock } );
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
        ga('main.ec:addProduct',{
          'id': digitalData.page.product.id.substring(0,8),
          'name': digitalData.page.product.name,
          'category': digitalData.page.product.masterCategory,
          'variant': digitalData.page.product.id.substring(0,8).slice(-2) // Last two digits of SKU = colour ID
        });
        ga('main.ec:setAction', 'add');
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

  // Click 'Read more' link
  $('a.morelink').click(function(){
    var eventLabel = $('.updatingPdpMainsku').text().trim();
    ga(
      'main.send',
      'event',
      'Read more',
      'Item page',
      eventLabel
    );
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
