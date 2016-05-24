/*

This JS snippet shows the Rate Email modal (HTML in footer) if the user comes to the site with
rate email parameters (e.g. warehouse.co.uk/gb?r=5).

The user then has the opportunity to add more information to their rating.

*/

$(document).ready(function(){
  if ( window.location.href.indexOf('?r=') >= 0 ) {

    // Get parameters in URL that were sent from the rate.php file that creates the initial record. Convert them into a JS object.
    var paramsString = window.location.href.split('?').pop();
    var paramsObj = JSON.parse('{"' + decodeURI(paramsString).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

    $('#rate-email').show();

    // Use the supplied parameters to populate the hidden fields in the form for ID and rating.
    $('#rate-email-comment-form input[name="rating"]').val(paramsObj.r);
    $('#rate-email-comment-form input[name="id"]').val(paramsObj.i);

    // Update the stars to show new rating.
    populateStars(parseInt(paramsObj.r));

    $('.fstar').click(function(){
      var selectedRating = $(this).attr('data-to');
      $('#rate-email-comment-form input[name="rating"]').val(selectedRating); // Update hidden input field for rating.
      populateStars(parseInt(selectedRating)); // Update the stars to reflect new rating.
    });

    function populateStars(numberOfStars) {
      var stars = $('.fstar');

      $('.fstar').each(function(){
        $(this).removeClass('selected');
      });

      for (var i = 0; i < numberOfStars; i++) {
        $(stars[i]).addClass('selected');
      }
    }
  }

  // When the user is redirected to a URL with a parameter of ?rer= (after filling in the form), show a success/error popup.
  if ( window.location.href.indexOf('?rer=') >= 0 ) {

    var code = window.location.href.split('?').pop().split('=').pop();
    var title, message, track;
    switch(code) {
      case '200':
        title   = 'Thank you for your feedback!';
        message = 'We really value your opinion.';
        track   = 'Success';
        break;

      default:
        title   = 'An unknown error has occurred';
        message = 'Please try again later.';
        track   = 'Unknown_Error';
      break;
    }

      $('body').append('<div id="rate-email" class="rate-email-popup response">\
          <div class="rate-email-form">\
              <span class="close"></span>\
              <h2>'+title+'</h2>\
              <p>'+message+'</p>\
          </div>\
      </div>');

      setTimeout(function(){
        $('#rate-email').remove();
      }, 3000);
  }
});
