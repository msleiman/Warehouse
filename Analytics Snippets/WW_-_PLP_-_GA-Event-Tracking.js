$(function(){

	// Report a VPV to GA when more products are loaded onto the screen from infinite scroll.
	$(window).load(function(){
		// Collect an initial number of products displayed on the page.
		var numberOfProductsShown = $('li.grid-tile').length;
		$(window).scroll(function(){
			if ($('li.grid-tile').length > numberOfProductsShown) {
				numberOfProductsShown = $('li.grid-tile').length;
				var currentPageNumber = window.location.search.split('=').pop(); // Get current page number.
				ga('main.send', 'pageview', document.location.pathname + 'vpv/length/' + currentPageNumber);
		    ga('rollUp.send', 'pageview', document.location.pathname + 'vpv/length/' + currentPageNumber);
			}
		});
	});

	// When something on the search results page (search page or category page - the latter is a search too) is clicked
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
		var productName = $( this ).parents( '.product-tile-grid' ).find( '.name-link' ).text().trim().toLowerCase().replace(/\s/g, '-');

		// If the user has clicked to add the item to cart (i.e. Quick Buy)
		if ( $( this ).hasClass( 'quickviewbutton' ) ) {
			ga('main.ec:addProduct',{
				'id': 		eightDigitSKU,
				'name': 	productName,
				'category': digitalData.page.category.id
			});
			ga('main.send', 'event', 'Quick buy', 'Click', eightDigitSKU );
		}

		// If the user has clicked to add the item to their wishlist (aka 'Save Item')
		else if ( $( this ).hasClass( 'wl-action' ) || $( this ).hasClass( 'save_for_later' ) )	{
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

  // Filters
  $('#main').on('click', '.filters_wrapper li a', function(e) {
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
	$(window).load(function(){ // Use window load as otherwise the GA event fires prematurely.
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
