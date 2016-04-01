$(function(){
  // Click to send Saved Items to a friend
  $('a#send-to-friend').click(function(){
    ga(
      'main.send',
      'event',
      'Wishlist',
      'Click - Share'
    );
  });

  // When a user drags and drops items in their wishlist, fire an event. Wait until the window has loaded for jQuery Sortable to initialise.
  $(window).load(function(){
    // Fire event by attaching the change listener to the jQuery UI Sortable plugin.
    $("#wishlist-items-container").sortable({
      change: function( event, ui ) {
        var movedItem = ui.item[0];
        var movedItemSKU = $(movedItem).find('.saved_item_image > img').attr('src').split('/').pop().split('_')[1];
        ga(
          'main.send',
          'event',
          'Wishlist',
          'Drag and Drop',
          movedItemSKU
        );
      }
    });
  });

  // Submit form to send item to a friend
  $('body').on('click', '#send-to-friend-form .send-button', function() {
    ga(
      'main.send',
      'event',
      'Wishlist',
      'Submit - Share'
    );
  });

});
