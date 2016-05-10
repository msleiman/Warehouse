jQuery(document).ready(function(){

  jQuery('button').click(function(){
    var inputUrl = jQuery('#inputUrl').val();
    var slug = inputUrl.split('/').pop();
    var outputUrl = '<a href="http://www.warehouse.co.uk/blog/' + slug + '.html" target="blank">http://www.warehouse.co.uk/blog/' + slug + '.html</a>';
    jQuery('#outputUrl h3').html(outputUrl);
  });



});
