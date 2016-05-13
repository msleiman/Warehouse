$(function(){

	// Send virtual pageviews if the customer is not logged in when checking out and they are redirected to the login/register page.
	if (digitalData.page.title.indexOf('Log in' || 'Register') >= 0) {
		ga('main.ec:setAction','checkout', {'step': 2});
		ga('rollUp.ec:setAction','checkout', {'step': 2});

		ga('main.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/checkout/vpv/login');
    ga('rollUp.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/checkout/vpv/login');
	}

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

  // Checkout form - don't add blur function to student code input field as we have a separate event for that below
  $('input,select','#primary, #secondary').not('input.voucher-code2, .apply-voucher2').blur(function() {
    var eventAction = $(this).parents('form').attr('id');
    var eventlabel = $('label[for="' + $(this).attr('name') + '"]');
    if (eventlabel.length != 0) {
      eventlabel = eventlabel.text();
    }
		else {
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

	// Send an event to GA when a student code is submitted on checkout.
	$('body').on('click', '.apply-voucher2', function(){
		var studentCodeSubmitted = $('input.voucher-code2').val();
		if (studentCodeSubmitted.length > 0) {
			ga(
				'main.send',
				'event',
				'Checkout',
				'Student discount'
			);
		}
	});

	// Report the stage the user is at when they proceed through Checkout
	// Step 1: Delivery
	if ($('.checkout-progress-indicator .active span span').text() == 'Delivery') {

		ga('main.ec:setAction','checkout', {'step': 3});
		ga('rollUp.ec:setAction','checkout', {'step': 3});

		var checkoutURLParameters = digitalData.page.url.split('?').pop();
		// Check for parameters in the page URL to see if the user has logged in during checkout, is using Guest Checkout, or was logged in before checkout.
		// Drop session cookies so we can inspect the checkout method on the Order Confirmation page.

		if ( checkoutURLParameters.indexOf('analyticsLoginType=checkout%20login') >= 0 ) { // If user has logged in during checkout
			// Don't send a VPV. Send a normal pageview.
			document.cookie = 'userCheckoutType=userLoggedInDuringCheckout;path=/';
			sendPageviews();
		}

		else if ( checkoutURLParameters.indexOf('analyticsLoginType=guest%20checkout') >= 0 ) { // If the user is using Guest Checkout
			document.cookie = 'userCheckoutType=userUsingGuestCheckout;path=/';
			sendPageviews();
		}

		else { // If the user was already logged in before checkout, send a VPV.
			document.cookie = 'userCheckoutType=userLoggedInBeforeCheckout;path=/';

			ga('main.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/checkout/vpv/registered');
	    ga('rollUp.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/checkout/vpv/registered');
		}

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

	// Step 2: Your Details (also known as the Billing page)
	if ($('.checkout-progress-indicator .active span span').text() == 'Your Details') {

		ga('main.ec:setAction','checkout', {'step': 4});
		ga('rollUp.ec:setAction','checkout', {'step': 4});
		sendPageviews();

		$('body').on('click', '.button_primary[type=submit]', function(){
			ga(
				'main.send',
				'event',
				'Checkout',
				'Submit',
				'Your Details'
			);

			ga('main.ec:setAction','checkout', {'step': 5});
			ga('rollUp.ec:setAction','checkout', {'step': 5});

			// Send virtual pageviews of the payment page.
			ga('main.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/vpv/payment');
			ga('rollUp.send', 'pageview', '/' + digitalData.site.country.toLowerCase() + '/vpv/payment');
		});
	}

	function sendPageviews() {
		ga('main.send', {
			hitType: 'pageview',
			page: digitalData.page.canonical || digitalData.page.url,
			location: location.href,
			title: digitalData.page.title
		});

		ga('rollUp.send', {
			hitType: 'pageview',
			page: digitalData.page.canonical || digitalData.page.url,
			location: location.href,
			title: digitalData.page.title
		});
	}

});
