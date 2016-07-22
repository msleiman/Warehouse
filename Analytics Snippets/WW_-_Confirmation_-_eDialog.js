// This is the eDialog pixel code to go on the Order Confirmation page.

(function() {

  /* START EDIALOG UTIL FUNCTIONS */

  function storeEDID() {
    var thirtyDays = (60 * 60 * 1000 * 24) * 30;
    var vals = document.location.search;
    var start = vals.indexOf("EDID=");
    if (start != -1) {
      var end = vals.indexOf("&", start);
      if (end == -1) {
        end = vals.length;
      }
      var date = new Date();
      date.setTime(date.getTime() + thirtyDays);
      document.cookie = vals.substring(start, end) + "; expires=" + date.toGMTString() + "; path=/";
    }
  }

  function getEDID() {
    var n = "EDID=";
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

  for (var i = 0; i < digitalData.products.length; i++) {
    productSkuString += 'row=' + (i + 1) + '&id=' + digitalData.products[i].id.substring(0, 8) + '&';
    productSkuString += 'quantity=' + digitalData.products[i].quantity + '&';
    productSkuString += 'price=' + digitalData.products[i].price + '|';
  }

  // Remove trailing pipe ('|') from product SKU string and urlencode it.
  productSkuString = encodeURIComponent(productSkuString.slice(0, -1));

  edialogString = initialString + productSkuString;
  // console.log(edialogString);

  trackEDID(edialogString);

}());
