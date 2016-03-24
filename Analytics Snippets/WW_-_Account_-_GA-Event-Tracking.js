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
