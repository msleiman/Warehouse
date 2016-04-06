$(window).load(function(){
  var studentBeansTrackingIframe = '<iframe src="https://studentbeansnetwork.go2cloud.org/aff_l?offer_id=153&adv_sub=' + digitalData.orderId + '&amount=' + digitalData.bag.totals.subTotal + '" scrolling="no" frameborder="0" width="1" height="1"></iframe>';
  $('body').append(studentBeansTrackingIframe);
});
