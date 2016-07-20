$(function(){

	// Report a VPV to GA when more products are loaded onto the screen from infinite scroll.
	$(window).load(function(){
		// Collect an initial number of products displayed on the page.
		var numberOfProductsShown = $('li.grid-tile').length;
		$(window).scroll(function(){
			if ($('li.grid-tile').length > numberOfProductsShown) {
				numberOfProductsShown = $('li.grid-tile').length;

				// If the user is on a search results page, send different events as search has the search term as the parameter as well as the page number.
				if (window.location.href.indexOf('search') >= 0) {
					if (window.location.search.indexOf('page') >= 0) {
						var currentPageNumber = window.location.search.split('=').pop() // Get current page number.
					}
					else {
						var currentPageNumber = '1'; // If no page number set in URL, set it to 1.
					}
					ga('main.send', 'pageview', document.location.pathname + '/vpv/length/' + currentPageNumber);
			    ga('rollUp.send', 'pageview', document.location.pathname + '/vpv/length/' + currentPageNumber);
				}

				else {
					if (window.location.search.indexOf('page') >= 0) {
						var currentPageNumber = window.location.search.split('=').pop() // Get current page number.
					}
					else {
						var currentPageNumber = '1'; // If no page number set in URL, set it to 1.
					}
					ga('main.send', 'pageview', document.location.pathname + 'vpv/length/' + currentPageNumber);
			    ga('rollUp.send', 'pageview', document.location.pathname + 'vpv/length/' + currentPageNumber);
				}

			}
		});
	});

	// When something on the search results page (search page or category page - the latter is a search too) is clicked
	$(document).ready(function(){
		$( '.search-result-content' ).on( 'click', '.quickviewbutton, .thumb-link, .product-action, .name-link, .save_for_later', function(){
			if ( $( '.sort-by_container > #imagesize' ).val() == 0 ) {
				ga( 'main.set', { 'dimension3': 'large' } );
			}
			else {
				ga( 'main.set', { 'dimension3': 'small' } );
			}
			if ( $( '.sort-by_container > #imageview' ).val() == 0 ) {
				ga( 'main.set', { 'dimension4': 'product' } );
			}
			else {
				ga( 'main.set', { 'dimension4': 'model' } );
			}
			if ( $( '.sort-by_container > #hideinfo' ).val() == 0 )	{
				ga( 'main.set', { 'dimension5': 'show' } );
			}
			else {
				ga( 'main.set', { 'dimension5': 'hide' } );
			}

			ga( 'main.set', { 'dimension6': $( 'form[name="Product-Sorting-Options"] select option:selected' ).text().trim().toLowerCase().replace(/\s/g, '-') } );
			var productImageURL = $( this ).parents( '.product-tile-grid' ).find( '.flex-active-slide .thumb-link > img' ).attr( 'src' );
			var eightDigitSKU = productImageURL.split('/').pop().split('_')[1];
			var sixDigitSKU = eightDigitSKU.substring(0,6);
			var productName = $(".product-tile[data-itemid='" + sixDigitSKU + "']").find('a.name-link').attr('title');

			// If the user has clicked to add the item to cart (i.e. Quick Buy)
			if ( $(this).hasClass('quickviewbutton') ) {
				console.log('quick buy button clicked');
				setTimeout(function(){ // Set a delay to allow the Quick Buy modal to appear
					var refreshInterval = setInterval(function(){
						if ( $('.product-tile[data-itemid="' + sixDigitSKU + '"]').find('.action-addtocart.product-action.add-to-cart.button_primary').attr('title') == 'Add to Bag') {
							$('.product-tile[data-itemid="' + sixDigitSKU + '"]').find('.action-addtocart.product-action.add-to-cart.button_primary').click(function(){
							var productPrice = $('.product-tile[data-itemid="' + sixDigitSKU + '"]').find('.product-price span').first().text().trim().substring(1);

							// GA tracking
							ga('main.ec:addProduct', {
								'id': 		eightDigitSKU,
								'name': 	productName,
								'category': digitalData.page.category.id
							});
							ga('main.ec:setAction', 'add');
							ga('main.send', 'event', 'Quick buy', 'Click', eightDigitSKU);

							// Coremetrics tracking
							/* cmCreateShopAction5Tag(
			          eightDigitSKU,
			          productName,
			          "1",
			          productPrice
			        ); */

							window.setLastAddToBagEventTimestampCookie(); // Set a cookie that contains a timestamp for this add to bag event. This function is set in Sitewide - Linkshare JS file.
						});
						clearInterval(refreshInterval);
						}
						else {
							console.log('Add To Bag not active');
						}
					}, 500); // End interval
				}, 2500); // End setTimeout
			}

			// If the user has clicked to add the item to their wishlist (aka 'Save Item')
			else if ( $( this ).hasClass( 'save_for_later' ) )	{
				ga('main.send', 'event', 'Save item', 'Click', eightDigitSKU );
			}

			else if ( $( this ).hasClass( 'thumb-link' ) ) { // If the user has clicked the image to view the PDP
				if (window.location.href.indexOf('search') > 0) { // If user is on the search page and not on category/section page
					ga('main.send', 'event', 'Picture', 'Search Results', eightDigitSKU );
				}
				else { // If the user is on a category/section page
					ga('main.send', 'event', 'Picture', 'Section', eightDigitSKU );
				}
			}
		});

		// Submit action is blocked by Demandware code. We therefore need to listed for the click event.
		setTimeout(function(){
			$('.store-locator-search').click(function(){
				setTimeout(function(){
					$('li.store:not(.hidden) a').click(function(){ // When a store name is clicked on...

						var storeName = $(this).attr('title');
						// Get first 3 digits of postcode entered.
						var addressArray = $('#dwfrm_storelocator_postalCode').val().split(' ');
						for (var i = 0; i < addressArray.length; i++) {
							if (addressArray[i].match(/\d+/g) != null) { // If the item in the array contains a number (i.e. is a postcode), send it as a custom dimension.
								ga( 'main.set', { 'dimension13': addressArray[i].substring(0,3) } );
								ga( 'main.send', 'event', 'Shop by store', 'Store', storeName );
								break;
							}
						}
					});
				}, 1000);
			});
		}, 1500);
	});

  // Filters
  $('#main').on('click', '.filters_wrapper ul:not(".available_in_store") li a', function(e) {
    var eventAction = '';
    if ($(e.currentTarget).parent().hasClass('selected')) {
      eventAction = 'Remove filter';
    }
		else if ($(e.currentTarget).parents('.active_refinements').length > 0) {
      eventAction = 'Remove filter';
    }
		else {
      eventAction = 'Add filter';
    }
    var eventLabel = $(e.currentTarget).children('label').text().split('(')[0].trim();
    ga(
      'main.send',
      'event',
      'Filter',
      eventAction,
      eventLabel
    );
  });

	// When the user reaches the end of the PLP
	$(document).ready(function(){
		setTimeout(function(){
			if (window.location.href.indexOf('search?') >= 0) { // If the user is on a search results page, fire a different GA event.
				var refreshInterval = setInterval(function() { // Start a timer that checks to see if the user is at the end of the page (minus footer and Recently Viewed sections)
					if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - $('footer').height() - $('#recently-viewed-baynote').height() )) {
						clearInterval(refreshInterval); // Cancel the timer.
						ga(
							'main.send',
							'event',
							'Dynamic load',
							'Search Results',
							window.location.href
						);
					}
				}, 200);
			}

			else { // If the user is on a normal PLP section (aka category) page - i.e. NOT a search page, fire a different GA event.
				var refreshInterval = setInterval(function() { // Start a timer that checks to see if the user is at the end of the page (minus footer and Recently Viewed sections)
					if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - $('footer').height() - $('#recently-viewed-baynote').height() )) {
						clearInterval(refreshInterval); // Cancel the timer.
						ga(
							'main.send',
							'event',
							'Dynamic load',
							'Section',
							window.location.href
						);
					}
				}, 200);
			}
		}, 2000);


		// Track when the price slider is moved.
		$('.price_slider #range_slider').slider({
		  change: function( event, ui ) {
				ga(
					'main.send',
					'event',
					'LHN Price',
					'LHN Price Filter',
					'Slide'
				);
		  }
		});

	});

});
