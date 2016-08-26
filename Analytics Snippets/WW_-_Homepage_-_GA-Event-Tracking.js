$(function() {

  // Clicking on a homepage section
  $('#top-hero').click(function(){
    ga('main.send', 'event', 'Homepage', 'Hero 1', $(this).find('a').attr('href'));
  });

  $('.parallax-window a').click(function(){
    ga('main.send', 'event', 'Homepage', 'Hero 2', $(this).attr('href'));
  });

  $('.lookbook-carousel-item a').click(function(){
    ga('main.send', 'event', 'Homepage', 'Shop the look', $(this).attr('href'));
  });

});
