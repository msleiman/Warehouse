$(function(){
  // Move to wishlist button click
  $('.add-to-wishlist' ).click(function(){
    var eventLabel = $(this).parents('.cart-row').find('.hidden-product-id').attr('value');
    ga(
      'main.send',
      'event',
      'Bag',
      'Click - Move to wishlist',
      eventLabel
    );
  });
  // Checkout button
  $('.bag-header .cart-action-checkout button').click(function(){
    ga(
      'main.send',
      'event',
      'Bag',
      'Click',
      'Checkout Top'
    );
  });
  // Checkout button
  $('.cart-actions .cart-action-checkout button').click(function(){
    ga(
      'main.send',
      'event',
      'Bag',
      'Click',
      'Checkout Bottom'
    );
  });
  // Save all items
  $('.cart-action-move-all-to-saved-for-later button').click(function(){
    ga(
      'main.send',
      'event',
      'Bag',
      'Click',
      'Save items'
    );
  });
  // Click on item
  $('.cart_img_title a').click(function(){
    var eventLabel = $(this).parents('.cart_img_title').next().find('.hidden-product-id').attr('value');
    ga(
      'main.send',
      'event',
      'Bag',
      'Item',
      eventLabel
    );
  });
  // Remove from bag
  $('.item-user-actions button' ).click(function(){
    var eventLabel = $(this).parents('.cart-row').find('.hidden-product-id').attr('value').substring(0,8);
    ga(
      'main.send',
      'event',
      'Checkout',
      'Remove',
      eventLabel
    );
  });
  // Change size,quantity
  $('select.cart-select-size').change(function() {
    ga(
      'main.send',
      'event',
      'Checkout',
      'Change',
      'Size'
    );
  });
  $('select.cart-select-qty').change(function(){
    ga(
      'main.send',
      'event',
      'Checkout',
      'Change',
      'Quantity'
    );
  });
});
