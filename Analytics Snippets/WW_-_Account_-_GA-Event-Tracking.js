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
});
