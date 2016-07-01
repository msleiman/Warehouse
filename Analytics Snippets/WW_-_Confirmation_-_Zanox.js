// This is the Zanox pixel code to go on the Order Confirmation page.

$(function(){

  if (digitalData.site.country == 'DE' || digitalData.site.country == 'FR' || digitalData.site.country == 'NL' || digitalData.site.country == 'SE' ) {

    var XMLString = '<z><o>';

    for (product in digitalData.bag.products) {
      console.log(digitalData.bag.products[product]);
      var itemXML = '<so cid="' + digitalData.bag.products[product].masterCategory + '" pnr="' + digitalData.bag.products[product].id + '" up="' + ( parseFloat(digitalData.bag.products[product].price) / parseFloat(digitalData.bag.products[product].quantity) ).toFixed(2) + '" qty="' + digitalData.bag.products[product].quantity + '">'
      XMLString += itemXML;
    }

    XMLString += '</o></z>'

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = 'https://ad.zanox.com/pps/?15559C2019130518&mode=[[1]]&CID=[[basket]]&CustomerID=[[' + digitalData.customer.id + ']]&OrderID=[[' + digitalData.orderId + ']]&CurrencySymbol=[[' + digitalData.site.currency + ']]&TotalPrice=[[' + digitalData.bag.totals.subTotal + ']]&XML=[[' + XMLString + ']]';    // use this for linked script
    document.body.appendChild(script);
    $('body').append('<noscript><img src="https://ad.zanox.com/pps/?15559C2019130518&mode=[[2]]&CID=[[basket]]&CustomerID=[[' + digitalData.customer.id + ']]&OrderID=[[' + digitalData.orderId + ']]&CurrencySymbol=[[' + digitalData.site.currency + ']]&TotalPrice=[[' + digitalData.bag.totals.subTotal + ']]&XML=[[' + XMLString + ']]" width="1" height="1" /></noscript>');
  }

});
