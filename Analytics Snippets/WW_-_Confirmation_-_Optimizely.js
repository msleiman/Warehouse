// This is the Optimizely goal tracking code to go on the Order Confirmation page.

$(function(){
   window.optimizely = window.optimizely || [];
   window.optimizely.push(['trackEvent', 'Total Revenue', {'revenue': parseInt(digitalData.bag.totals.subTotal) * 100}]);
});
