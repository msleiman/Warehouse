$(function(){

	$( '#RegistrationForm' ).on( 'blur', 'input, select, checkbox', function(){
		ga('main.send', 'event', 'create-account', 'field_lost-focus', $( this ).attr( 'name' ) );
	});

	/* Fire the Create account submit action only when the user's registration is confirmed (i.e. when they are redirected
		 to a url like /gb/account?registration=true). This is because they may encounter server-side validation errors
	   before registration is confirmed, and so a normal submit action is not good enough.
	*/
	if (window.location.href.indexOf('registration=true') >= 0) {
		ga('main.send', 'event', 'Create account', 'Submit - Create account');
	};

	$( '.pg-checkout-login .right_column' ).on( 'submit', 'form', function(){
		if ( $( '#dwfrm_login_signupnewsletter' ).is( ':checked' ) )
		{
			ga('main.send', 'event', 'Newsletter', 'Sign-up', window.location.href );
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

	// Report the stage the user is at when they proceed through Checkout
	// Step 1: Delivery
	if ($('.checkout-progress-indicator .active span span').text() == 'Delivery') {
		$('body').on('click', '#address-form .button_primary', function(){
			ga(
				'main.send',
				'event',
				'Checkout',
				'Submit',
				'Delivery'
			);
		});
	}

	// Step 2: Your Details
	if ($('.checkout-progress-indicator .active span span').text() == 'Your Details') {
		$('body').on('click', '.button_primary[type=submit]', function(){
			ga(
				'main.send',
				'event',
				'Checkout',
				'Submit',
				'Your Details'
			);
		});
	}

});
