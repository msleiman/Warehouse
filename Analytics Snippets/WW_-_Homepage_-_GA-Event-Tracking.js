$(function() {

  // Clicking on a homepage section
  $('#top-hero').click(function(){
    ga('main.ec:addProduct',{
      'id': 'homepage_hero_1',
      'name': 'Homepage Hero 1',
      'creative': 'wk26_hero_its_a_new_day',
      'position': '1'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', 'Hero 1', $(this).find('a').attr('href'));
  });

  $('.parallax-window a').click(function(){
    ga('main.ec:addProduct',{
      'id': 'homepage_hero_2',
      'name': 'Homepage Hero 2',
      'creative': 'wk26_parallax',
      'position': '2'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', 'Hero 2', $(this).attr('href'));
  });

  $('.lookbook-carousel-item a').click(function(){
    ga('main.ec:addProduct',{
      'id': 'carousel_bottom',
      'name': 'Carousel - Shop The Look',
      'creative': 'wk26_the_lookbook_edit',
      'position': '3'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', 'Shop the look', $(this).attr('href'));
  });

  $('.emmas-edit-carousel-item a').click(function(){
    ga('main.ec:addProduct',{
      'id': 'carousel_bottom',
      'name': 'Carousel - Bottom',
      'creative': 'wk26_emmas_edit_carousel',
      'position': '6'
    });
    ga('main.ec:setAction', 'promo_click');
    ga('main.send', 'event', 'Homepage', 'Carousel - Bottom', $(this).attr('href'));
  });


});
