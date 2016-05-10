$(document).ready(function(){
  // Hide the store receipts link for all countries except GB and IE
  if ( document.location.pathname.indexOf('gb') >= 0 || document.location.pathname.indexOf('ie') >= 0 ) {
    // Do not hide the Store Receipts link.
  }
  else {
    $('li.lhn-registered a[title="Store Receipts"]').parent().hide();
  }
});
