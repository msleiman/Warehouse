$(function() {

  // Clicking on a homepage section
  $('#top-hero a').click(function(){
    ga('main.ec:addPromo',{
      'id': $(this).attr('href'),
      'name': 'Hero',
      'creative': $(this).attr('data-ga-creative'),
      'position': '1'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', 'Hero', $(this).attr('href'));
  });

  $('.parallax-window a').click(function(){
    ga('main.ec:addPromo',{
      'id': $(this).attr('href'),
      'name': 'Below 1',
      'creative': $('.parallax-window').attr('data-ga-creative'),
      'position': '2'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', 'Below 1', $(this).attr('href'));
  });

  $('.lookbook-carousel-item a').click(function(){
    ga('main.ec:addPromo',{
      'id': $(this).attr('href'),
      'name': $(this).attr('data-ga-action'),
      'creative': $(this).attr('data-ga-creative'),
      'position': '3'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', $(this).attr('data-ga-action'), $(this).attr('href'));
  });

  // Video tracking (position 4) is handled in the HTML element itself.

  $('.homepage-split-video-flexslider a').click(function(){
    ga('main.ec:addPromo',{
      'id': $(this).attr('href'),
      'name': 'Below 2',
      'creative': $(this).attr('data-ga-creative'),
      'position': '5'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', 'Below 2', $(this).attr('href'));
  });

  $('.emmas-edit-carousel-item a').click(function(){
    ga('main.ec:addPromo',{
      'id': $(this).attr('href'),
      'name': $(this).attr('data-ga-action'),
      'creative': $(this).attr('data-ga-creative'),
      'position': '6'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', $(this).attr('data-ga-action'), $(this).attr('href'));
  });


});
