$(function(){
$( '#RegistrationForm' ).on( 'blur', 'input, select, checkbox', function(){
	ga('main.send', 'event', 'create-account', 'field_lost-focus', $( this ).attr( 'name' ) );
});
$( '#RegistrationForm' ).on( 'submit', function(){
	ga('main.send', 'event', 'create-account', 'submit', $( '#dwfrm_profile_address_country' ).val() );
});
$( '.pg-checkout-login .right_column' ).on( 'submit', 'form', function(){
	if ( $( '#dwfrm_login_signupnewsletter' ).is( ':checked' ) )
	{
		ga('main.send', 'event', 'newsletter', 'sign-up', window.location.href );
	}
});
  // Checkout form
  $('input,select','#primary, #secondary').blur(function() {
    var eventAction = $(this).parents('form').attr('id');
    var eventlabel = $('label[for="' + $(this).attr('name') + '"]');
    if (eventlabel.length != 0) {
      eventlabel = eventlabel.text();
    }else {
      eventlabel = $(this).attr('placeholder');
    }
    if ((typeof eventlabel === 'undefined') || eventlabel === false) {
      eventlabel = $(this).attr('id');
    }
    if ((typeof eventlabel != 'undefined') && eventlabel != false) {
      eventlabel = eventlabel.trim().replace(/^\s+|\s+$/g, '').replace(/(\r\n|\n|\r)/gm,'-');
    }
    ga(
      'main.send',
      'event',
      'Checkout',
      eventAction,
      eventlabel
    );
  });
});
