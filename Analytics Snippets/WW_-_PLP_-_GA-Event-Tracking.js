$(function(){

	// Report a VPV to GA when more products are loaded onto the screen from infinite scroll.
	$(window).load(function(){

		// Collect an initial number of products displayed on the page.
		var numberOfProductsLoadedSoFar = $('li.grid-tile').length;

		// Send initial collection of products to GA. NOTE: Javelin have the class name for items on the first page as being 'page_0', not 'page_1'. By contrast, we use a currentPageNumber variable of 1 for the first page.
		function collectNewProductImpressions(latestPageNumber) {
			latestPageNumber -= 1; // Subtract 1 because Javelin use the class 'page_0' for products belonging to the first page of results.
			$('li.grid-tile').each(function(index){
				// Some items in the grid are not products, so check for that. Additionally, we only want to send newly loaded items, so only add impressions for newly loaded items.
				if ( ( $(this).attr('data-colors-to-show') != undefined) && ( $(this).hasClass('page_' + latestPageNumber) )) {
					ga('rollUp.ec:addImpression', {
						'id': $(this).find('.product-tile').attr('data-firstproductid').substr(0,8),
						'name': $(this).find('a.name-link').text().trim(),
						'category': digitalData.page.category.id,
						'list': 'PLP',
						'position': index + 1
					});
				}
			});
		}

		// Send initial product impressions.
		var latestPageNumber = 1; // Set the highest page number viewed so far on this page. This is so we do not send impressions multiple times for the same product.
		collectNewProductImpressions(latestPageNumber);
		ga('rollUp.send', 'event', 'PLP', 'Page initial load', 'Page ' + latestPageNumber, {
			nonInteraction: true
		});

		$(window).scroll(function(){ // When the user scrolls, check to see if more products have been added in by infinite scroll
			if ($('li.grid-tile').length > numberOfProductsLoadedSoFar) {
				numberOfProductsLoadedSoFar = $('li.grid-tile').length;

				// If the user is on a search results page, send different events as search has the search term as the parameter as well as the page number.
				if (window.location.href.indexOf('search') >= 0) {
					if (window.location.search.indexOf('page') >= 0) {
						var currentPageNumber = window.location.search.split('=').pop() // Get current page number.
					}
					else {
						var currentPageNumber = '1'; // If no page number set in URL, set it to 1.
					}

					// Check to see if the DOM has any new items added to it. Remember, the classes used in the DOM (e.g.page_0) are 1 less than the currentPageNumber, so just use the currentPageNumber to express the next batch of products.
					if ( $('li.page_' + latestPageNumber).length > 0) {
						latestPageNumber += 1; // Update the latest page number
						collectNewProductImpressions(latestPageNumber);
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

					// Check to see if the DOM has any new items added to it. Remember, the classes used in the DOM (e.g.page_0) are 1 less than the currentPageNumber, so just use the currentPageNumber to express the next batch of products.
					if ( $('li.page_' + latestPageNumber).length > 0) {
						latestPageNumber += 1;
						collectNewProductImpressions(latestPageNumber);
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

			ga( 'main.set', {
				'dimension6': $( 'form[name="Product-Sorting-Options"] select option:selected' ).text().trim().toLowerCase().replace(/\s/g, '-')
			});
			var clickedProduct = $(this).parents('.product-tile-grid').find('.product-tile' )
			var tenDigitSKU = $(clickedProduct).attr('data-firstproductid');
			var eightDigitSKU = tenDigitSKU.substring(0,8);
			var productName = $(clickedProduct).find('a.name-link').attr('title');
			var productCurrentPrice = $(clickedProduct).find('.price-sales').text().trim().substring(1); // The product's current price (if on sale or not on sale)
			var productOriginalPrice = $(clickedProduct).find('.price-standard').text().trim().substring(1) || ''; // If the product is on sale, this is the original price.

			// If the user has clicked to add the item to cart (i.e. Quick Buy)
			if ( $(this).hasClass('quickviewbutton') ) {
				console.log('quick buy button clicked');
				setTimeout(function(){ // Set a delay to allow the Quick Buy modal to appear
					var refreshInterval = setInterval(function(){
						if ( $(clickedProduct).find('.action-addtocart.product-action.add-to-cart.button_primary').attr('title') == 'Add to Bag') {
							$(clickedProduct).find('.action-addtocart.product-action.add-to-cart.button_primary').click(function(){

							// GA tracking
							ga('main.ec:addProduct', {
								'id': 		eightDigitSKU,
								'name': 	productName,
								'category': digitalData.page.category.id,
								'variant': eightDigitSKU.slice(-2), // Last two digits of SKU = colour ID
								'price': productCurrentPrice,
								'dimension12': productOriginalPrice
							});
							ga('main.ec:setAction', 'add');
							ga('main.send', 'event', 'Quick buy', 'Click', eightDigitSKU);

							// Coremetrics tracking
							cmCreateShopAction5Tag(
			          eightDigitSKU,
			          productName,
			          "1",
			          productCurrentPrice
			        );
							cmDisplayShop5s();

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

		$('body').one('click', '.top_filters a', function(){
			if ( $(this).attr('data-imagesize')  && !$(this).hasClass('active') ) { // If the filter that controls image size is clicked and it is not the active one, fire event
				ga(
					'main.send',
					'event',
					'PLP Image Size',
					'Click',
					$(this).text()
				);

				ga(
					'rollUp.send',
					'event',
					'PLP Image Size',
					'Click',
					$(this).text()
				);
			}
		});

	}); // end doc ready function

});
