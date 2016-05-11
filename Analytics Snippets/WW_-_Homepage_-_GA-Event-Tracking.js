$(function() {

  $('#hphero1').click(function(){
    ga('main.send', 'event', 'Homepage', 'Hero 1', $(this).find('a').attr('href'));
  });

  $('#hphero2').click(function(){
    ga('main.send', 'event', 'Homepage', 'Hero 2', $(this).find('a').attr('href'));
  });

  $('#hphero3').click(function(){
    ga('main.send', 'event', 'Homepage', 'Hero 3', $(this).find('a').attr('href'));
  });

  $('div[data-ga-label="2-slice-left"]').click(function(){
    ga('main.send', 'event', 'Homepage', 'Top Section 1 - 1', $(this).find('a').attr('href'));
  });

  $('div[data-ga-label="2-slice-right"]').click(function(){
    ga('main.send', 'event', 'Homepage', 'Top Section 1 - 2', $(this).find('a').attr('href'));
  });

  $('div[data-ga-label="9-slice-left"]').click(function(){
    ga('main.send', 'event', 'Homepage', 'Top Section 2 - 1', $(this).find('a').attr('href'));
  });

  $('div[data-ga-label="9-slice-right"]').click(function(){
    ga('main.send', 'event', 'Homepage', 'Top Section 2 - 2', $(this).find('a').attr('href'));
  });

});
