// This file adds the order details into the Linkshare Cadence data layer.

$(function(){

  var rm_trans = {
      orderid : digitalData.orderId,
      currency: digitalData.site.currency,
      customerStatus: digitalData.customer.status,
      conversionType: 'Sale',
      customerID: digitalData.customer.id,
      discountCode: digitalData.bag.promocodes,
      discountAmount: parseFloat(digitalData.bag.totals.discount),
      taxAmount: 0.00,
      lineitems : [] // Empty array to hold product objects
  };

  // Iterate through the bag object and push each product into the Linkshare data layer.
  for (var i = 0; i < digitalData.bag.products.length; i++) {
    var product = digitalData.bag.products[i];
    var obj = {
      quantity: parseInt(product.quantity),
      unitPrice: parseFloat(product.price).toFixed(2),
      unitPriceLessTax: 0.00,
      SKU: product.id.substring(0,8),
      productName: product.name
    }
    rm_trans.lineitems.push(obj);
  }

  /*Do not edit any information beneath this line*/
  if(!window.DataLayer){window.DataLayer={Sale:{Basket:rm_trans}}}else{DataLayer.Sale=DataLayer.Sale||{Basket:rm_trans};DataLayer.Sale.Basket=DataLayer.Sale.Basket||rm_trans}DataLayer.Sale.Basket.Ready = true;

});
