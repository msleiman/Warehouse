$(function(){

  ga('main.ec:setAction','checkout', {'step': 1});
  ga('rollUp.ec:setAction','checkout', {'step': 1});

  // Send virtual pageviews depending on if the customer is already logged in or not
  if (digitalData.customer.id.length > 0) {
    ga('main.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/cart/vpv/registered');
    ga('rollUp.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/cart/vpv/registered');
  }
  else {
    ga('main.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/cart/vpv/guest');
    ga('rollUp.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/cart/vpv/guest');
  }

  // Click on Just Arrived in nav
  $('body').on('click', 'li#just_arrived_top_nav', function(){
    ga(
      'main.send',
      'event',
      'Bag',
      'Click',
      'Just arrived'
    );
  });

  // Move to wishlist button click
  $('.add-to-wishlist' ).click(function(e){
    var eventLabel = $(this).parents('.cart-row').find('.hidden-product-id').attr('value').substring(0,8);
    ga('main.ec:addProduct',{
      'id': eventLabel,
      'name': $(this).parents('tbody').find('.item-title a').html(),
      'category': $(this).parents('tbody').find('.item-title a').attr('href').split('/')[3],
      'variant': eventLabel.slice(-2) // Last two digits of SKU = colour ID
    });
    ga('main.ec:setAction', 'remove');
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
    ga('main.ec:addProduct',{
      'id': eventLabel,
      'name': $(this).parents('tbody').find('.item-title a').html(),
      'category': $(this).parents('tbody').find('.item-title a').attr('href').split('/')[3],
      'variant': eventLabel.slice(-2) // Last two digits of SKU = colour ID
    });
    ga('main.ec:setAction', 'remove');
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
