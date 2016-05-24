$(function(){

  if (window.isBlogPage == true) { // This global variable is set just before we initialise the blog tracking property.

    // Track clicks on the blog navigation menu
    $('li.menu-item a').click(function(){
      ga(
        'main.send',
        'event',
        'Blog',
        'Nav',
        $(this).text()
      );
    });

    // Track clicks on social links
    $('.insta_feed').click(function(){
      ga(
        'main.send',
        'event',
        'Social',
        'Click',
        'Instagram'
      );
    });

    $('.twitter_feed').click(function(){
      ga(
        'main.send',
        'event',
        'Social',
        'Click',
        'Twitter'
      );
    });

    $('ul.shop-module li a').click(function(){
      ga(
        'main.send',
        'event',
        'Blog',
        'Product',
        $(this).attr('data-id')
      );
    });

  }

});
