$(function(){
$( '.search-result-content' ).on( 'click', '.thumb-link, .product-action, .name-link, .save_for_later', function(){
	if ( $( '.sort-by_container > #imagesize' ).val() == 0 )
	{
		ga( 'main.set', { 'dimension3': 'large' } );
	}
	else
	{
		ga( 'main.set', { 'dimension3': 'small' } );
	}
	if ( $( '.sort-by_container > #imageview' ).val() == 0 )
	{
		ga( 'main.set', { 'dimension4': 'product' } );
	}
	else
	{
		ga( 'main.set', { 'dimension4': 'model' } );
	}
	if ( $( '.sort-by_container > #hideinfo' ).val() == 0 )
	{
		ga( 'main.set', { 'dimension5': 'show' } );
	}
	else
	{
		ga( 'main.set', { 'dimension5': 'hide' } );
	}
	ga( 'main.set', { 'dimension6': $( 'form[name="Product-Sorting-Options"] select option:selected' ).text().trim().toLowerCase().replace(/\s/g, '-') } );
	var purl = $( this ).parents( '.product-tile-grid' ).find( '.name-link' ).attr( 'href' );
	var pid1 = purl.split( '.html' );
	var pid2 = pid1[0].split( '/' );
	var pidf = pid2[ pid2.length - 1 ];
	var pnam = $( this ).parents( '.product-tile-grid' ).find( '.name-link' ).text().trim().toLowerCase().replace(/\s/g, '-');
	if ( $( this ).hasClass( 'action-addtocart' ) )
	{
		ga('main.ec:addProduct',{
			'id': 		pidf,
			'name': 	pnam,
			'category': digitalData.page.category.id
		});
		ga('main.send', 'event', 'plp', 'add-to-bag', pidf + '_-_' + pnam );
	}
	else if ( $( this ).hasClass( 'wl-action' ) || $( this ).hasClass( 'save_for_later' ) )
	{
		ga('main.send', 'event', 'plp', 'add-to-whishlist', pidf + '_-_' + pnam );
	}
	else
	{
		ga('main.send', 'event', 'plp', 'view-pdp', pidf + '_-_' + pnam );
	}
});
    // Filters
  $('#main').on('click', '.filters_wrapper li a', function(e) {
    var eventAction = '';
    if ($(e.currentTarget).parent().hasClass('selected')) {
      eventAction = 'Remove filter';
    }else if ($(e.currentTarget).parents('.active_refinements').length > 0){
      eventAction = 'Remove filter';
    }else{
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
});
