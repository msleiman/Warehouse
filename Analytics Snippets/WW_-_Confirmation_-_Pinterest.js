// This is the Pinterest pixel code to go on the Order Confirmation page.

$(function(){

  $('body').append('<img height="1" width="1" style="display:none;" alt="" src="https://ct.pinterest.com/?tid=Heag3cZB5xX&value=' + digitalData.bag.totals.subTotal + '&quantity=' + digitalData.bag.totals.quantity + '"/>');

});
