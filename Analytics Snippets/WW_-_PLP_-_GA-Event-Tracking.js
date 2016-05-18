$(function(){

	// Report a VPV to GA when more products are loaded onto the screen from infinite scroll.
	$(window).load(function(){
		// Collect an initial number of products displayed on the page.
		var numberOfProductsShown = $('li.grid-tile').length;
		$(window).scroll(function(){
			if ($('li.grid-tile').length > numberOfProductsShown) {
				numberOfProductsShown = $('li.grid-tile').length;
				var currentPageNumber = window.location.search.split('=').pop() || '1'; // Get current page number. If no page number set in URL, set it to 1.
				ga('main.send', 'pageview', document.location.pathname + 'vpv/length/' + currentPageNumber);
		    ga('rollUp.send', 'pageview', document.location.pathname + 'vpv/length/' + currentPageNumber);
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
			var productName = $(".product-tile[data-itemid='" + sixDigitSKU + "']").find('a.name-link').text().trim();

			// If the user has clicked to add the item to cart (i.e. Quick Buy)
			if ( $(this).hasClass('quickviewbutton') ) {
				console.log('quick buy button clicked');
				setTimeout(function(){ // Set a delay to allow the Quick Buy modal to appear
					var refreshInterval = setInterval(function(){
						if ( $('.product-tile[data-itemid="' + sixDigitSKU + '"]').find('.action-addtocart.product-action.add-to-cart.button_primary').attr('title') == 'Add to Bag') {
							console.log('found add to bag button');
							$('.product-tile[data-itemid="' + sixDigitSKU + '"]').find('.action-addtocart.product-action.add-to-cart.button_primary').click(function(){
							console.log('add to cart button clicked');
							ga('main.ec:addProduct',{
								'id': 		eightDigitSKU,
								'name': 	productName,
								'category': digitalData.page.category.id
							});
							ga('main.ec:setAction', 'add');
							ga('main.send', 'event', 'Quick buy', 'Click', eightDigitSKU);
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

		$('#storeAvailablityForm').submit(function(){
			console.log('form submitted');
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

	});

});
