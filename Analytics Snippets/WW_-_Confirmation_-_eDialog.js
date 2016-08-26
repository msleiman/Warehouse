// This is the eDialog pixel code to go on the Order Confirmation page.

(function() {

  /* START EDIALOG UTIL FUNCTIONS */

  function getEDID() {
    var n = "ed198816550=";
    var cookies = document.cookie;
    var start = cookies.indexOf(n);
    if (start == -1) {
      return null;
    }
    start += n.length;
    var end = cookies.indexOf(";", start);
    if (end == -1) {
      end = cookies.length;
    };
    return cookies.substring(start, end);
  }

  function trackEDID(i) {
    f = getEDID();
    if (f != null) {
      $('body').append('<img src="https://pd.ed10.net/p/0G/3OOX22J/9O?CEDID=' + f + '&' + i + '" height=1 width=1>');
    }
  }

  /* END EDIALOG UTIL FUNCTIONS */

  // Generate a string with the order total, order ID and order currency.
  // m = order total. Send it including VAT but excluding delivery.
  // pk = order ID
  var initialString = 'm=' + digitalData.bag.totals.subTotal + '&pk=' + digitalData.orderId + '&currency=' + digitalData.site.currency + '&rows=';

  // Map the array of products in the order into a string to be used in the tracking pixel.
  var productSkuString = '';

  if ( digitalData.bag.products != 'undefined' ) {
    for (var i = 0; i < digitalData.bag.products.length; i++) {
      productSkuString += 'row=' + (i + 1) + '&id=' + digitalData.bag.products[i].id.substring(0, 8) + '&';
      productSkuString += 'quantity=' + digitalData.bag.products[i].quantity + '&';
      productSkuString += 'price=' + digitalData.bag.products[i].price + '|';
    }

    // Remove trailing pipe ('|') from product SKU string and urlencode it.
    productSkuString = encodeURIComponent(productSkuString.slice(0, -1));

    edialogString = initialString + productSkuString;
    console.log(edialogString);

    trackEDID(edialogString);
  }

}());
