$(function() {

  $(document).on('click', '.hphero > a', function() {
    ga('main.send', 'event', 'homepage', 'hero_click', $(this).parent().attr('id').toLowerCase() + '_-_' + $(this).attr('href'));
  });

  $(document).on('click', '.hphalf > a', function() {
    ga('main.send', 'event', 'homepage', 'half-box_click', $(this).parent().attr('id').toLowerCase() + '_-_' + $(this).attr('href'));
  });
  
});
