// This is the Polyvore pixel code to go on the Order Confirmation page.

(function(){

  // Map the array of products in the order into a string to be used in the tracking pixel.
  var productSkuString = '';
  var productSkuArray = digitalData.bag.products

  productSkuArray.map(function(product){
    productSkuString += product.id.substring(0,8) + ',';
  });

  // Remove trailing comma from product SKU string.
  productSkuString = productSkuString.slice(0, -1);

  // Calculate the subtotal without VAT; convert it to a string with 2 decimal places.
  var subTotalExVat = (parseFloat(digitalData.bag.totals.subTotal) * 0.83333333333).toFixed(2);

  var polyvoreTrackingPixel = '<img width="1" height="1" src="https://www.polyvore.com/conversion/beacon.gif?adv=warehouse.co.uk&amt=' + subTotalExVat + '&oid=' + digitalData.orderId + '&skus=' + productSkuString + '&cur=' + digitalData.site.currency + '">';

  $('body').append(polyvoreTrackingPixel);
}());
