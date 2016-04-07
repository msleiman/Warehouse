/*
 * jQuery v1.9.1 included
 */

$(document).ready(function() {
  // social share popups
  $(".share a").click(function(e) {
    e.preventDefault();
    window.open(this.href, "", "height = 500, width = 500");
  });

  // toggle the share dropdown in communities
  $(".share-label").on("click", function(e) {
    e.stopPropagation();
    var isSelected = this.getAttribute("aria-selected") == "true";
    this.setAttribute("aria-selected", !isSelected);
    $(".share-label").not(this).attr("aria-selected", "false");
  });

  $(document).on("click", function() {
    $(".share-label").attr("aria-selected", "false");
  });

  // show form controls when the textarea receives focus or backbutton is used and value exists
  var $answerbodyTextarea = $(".answer-body textarea"),
  $answerFormControls = $(".answer-form-controls"),
  $commentContainerTextarea = $(".comment-container textarea"),
  $commentContainerFormControls = $(".comment-form-controls");

  $answerbodyTextarea.one("focus", function() {
    $answerFormControls.show();
  });

  $commentContainerTextarea.one("focus", function() {
    $commentContainerFormControls.show();
  });

  if($commentContainerTextarea.val() !== "") {
    $commentContainerFormControls.show();
  }

  if($answerbodyTextarea.val() !== "") {
    $answerFormControls.show();
  }
  $("form#new_request input#request_custom_fields_22665586").val("brand_warehouse");
$("form#new_request input#request_custom_fields_22881816").val("country_uk");

});

$(function(){
  //$('.category-tree').append($('.track-order'));
  //$('.track-order').show();

  jQuery('.category-tree section.category').each(function(){
    jQuery(this).prepend('<img class="icon" src="//blog.warehouse.co.uk/blog/DMW/assets/images/common/legacy/'+jQuery(this).find('h2').text().trim().toLowerCase().replace(' ', '-')+'.png" alt="'+jQuery(this).find('h2').text().trim()+'" onload="setToHighest()" />');
    jQuery(this).find('.see-all-articles').wrapInner('<span/>');
  	if(
      jQuery(this).find('.article-list li').length <= 6 &&
      //jQuery(this).find('.article-list li').length > 3 &&
      jQuery(this).find('.see-all-articles').length == 0
    ){
  		jQuery(this).append('<a href="' + jQuery(this).find('h2 a').attr('href') + '" class="see-all-articles"><span>SEE ALL ' + jQuery(this).find('.article-list li').length + ' ARTICLES</span></a>');
  	}
  });

	setToHighest();
  //accomodateTracker();

  /*$('a.tracker').click(function(e){
  	e.preventDefault();
    if($('#track-popup-holder').css('opacity') == 0){
      $('#track-popup').slideDown();
      $('html, body').animate({scrollTop: $('#track-popup').offset().top - 100 });
      $('section.section > .tracker').hide();
      $('.category.track-order').height('auto');
    }else{
      $('#track-popup-holder').fadeIn();
      $('#track-popup').show();
    }
  });

  $(document).on('click', '#track-popup-holder, #track-popup span.close', function(){
  	$('#track-popup-holder').fadeOut();
  });

  $('#track-popup span.close').click(function(){
  	$('#track-popup-holder').fadeOut();
  });

  $('#track-popup').click(function(e){
  	e.stopPropagation();
  });*/

  $('.m-'+$('.breadcrumbs li').last().text().toLowerCase().replace(' ', '-')).addClass('active');

  $(document).on('click', '.go-back', function(e){
    e.preventDefault();
  	window.history.back();
  });

  $('.see-all-articles').each(function(){
  		$(this).attr('href', $(this).parents('section.category').find('h2 a').attr('href'));
  });

  $('.open-contact-us').on('click', function(e){
  	e.preventDefault();
    window.open('https://warehousefashions.zendesk.com/hc/en-us/requests/new?ticket_form_id=53881', '_blank', 'toolbar=no, scrollbars=yes, resizable=yes, width=400, height=600');
  });

}); //END READY

$(window).resize(function(){
  $('.category-tree section.category').css('height', 'auto');
	setToHighest();
  //accomodateTracker();
});

function setToHighest(){
 	var h = 0;
  $('.category-tree section.category').each(function(){
  	if($(this).height() > h){
    	 h = $(this).height();
    }
  });
	$('.category-tree section.category').height(h);
}

/*
var trackUrl = '';
var prefix = 'WR0';

function trackPackage(){
	var a = $('.postcodeInput');
	a.css('border', '1px solid #f00');

	var orderInput = $('.orderInput');
    var postCode = $('.postcodeInput');

    if(orderInput[0].value == '')
        orderInput.css('border', '1px solid #f00');
    else
        orderInput.css('border', '');

    if(postCode[0].value == '')
            postCode.css('border', '1px solid #f00');
    else
            postCode.css('border', '');

    if(orderInput[0].value != '' && postCode[0].value != ''){
            trackUrl = 'http://www.dpd.co.uk/tracking/trackingSearch.do?search.searchType=7&search.senderRef='+ prefix + orderInput[0].value +'&search.postcode=' + postCode[0].value + '&search.searchScope=';
            trackUrl = 'http://dm.metapack.com/metatrack/track?retailerId=232&orderRef='+ prefix + orderInput[0].value +'&missingUrl=' + encodeURIComponent(trackUrl);
            window.open(trackUrl, '_blank');
    }
    return false;
}

function trackPackage2(){
    var orderInput = $('.orderInput2');
    var postCode = $('.postcodeInput2');

    if(orderInput[0].value == '')
        orderInput.css('border', '1px solid #f00');
    else
        orderInput.css('border', '');

    if(postCode[0].value == '')
        postCode.css('border', '1px solid #f00');
    else
        postCode.css('border', '');

    if(orderInput[0].value != '' && postCode[0].value != ''){
            trackUrl = 'http://www.dpd.co.uk/tracking/trackingSearch.do?search.searchType=7&search.senderRef='+ prefix + orderInput[0].value +'&search.postcode=' + postCode[0].value + '&search.searchScope=';
            window.open(trackUrl, '_blank');
    }
    return false;
}

function accomodateTracker(){
  if($('#track-popup-holder').css('opacity') == 0){
    if($('#wh-submenu').length == 0){
      $('section.track-order').append($('#track-popup').hide());
    }else{
      $('#wh-submenu > ul > li').last().append($('#track-popup').hide())
    }
    $('#track-popup-holder').hide();
  }else{
    $('#track-popup-holder').append($('#track-popup'));
    $('section.section > .tracker').show();
  }
}
*/
