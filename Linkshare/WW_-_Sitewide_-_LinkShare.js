// The below code sets a cookie if the user has come from a Linkshare referral link. Linkshare appends a &utm_term= parameter
// to our URLs which we need to detect and set a cookie that contains the referrer ID.
// e.g. A referral link might look like http://www.warehouse.co.uk/gb?siteID=1KW2Xiq9xN0-4.c_9w1X8XpO94TU14hg3D

var currentDate = new Date();
var currentDatePlus30Days = currentDate.setDate(currentDate.getDate() + 30);

(function(){
  var urlParametersArray = window.location.href.split('&');

  for (var i = 0; i < urlParametersArray.length; i++) {
    if (urlParametersArray[i].indexOf('utm_term') >= 0) {
      var linkshareReferrerID = urlParametersArray[i].split('=').pop();
      console.log('Linkshare referral detected. Referrer ID is ' + linkshareReferrerID);

      // Set the linkshareReferrerID cookie and let it expire in 30 days from now.
      document.cookie = 'linkshareReferrerID=' + linkshareReferrerID + '; expires=' + new Date(currentDatePlus30Days).toUTCString() + '; path=/';
      // The Unix timestamp for when the user first arrived via the referral link.
      document.cookie = 'linkshareReferralLastArrivalTime=' + Math.round(new Date().getTime()/1000).toString() + '; expires=' + new Date(currentDatePlus30Days).toUTCString() + '; path=/';
      break;
    }
    else {
      console.log('No utm_term parameter detected.');
    }
  }
})();

// Create a function that creates a cookie when a user adds something to bag.
window.setLastAddToBagEventTimestampCookie = function(){
  var currentDate = new Date();
  var currentDatePlus30Days = currentDate.setDate(currentDate.getDate() + 30);
  document.cookie = 'lastAddToBagEventTimestamp=' + Math.round(new Date().getTime()/1000).toString() + '; expires=' + new Date(currentDatePlus30Days).toUTCString() + '; path=/';
  console.log('set lastAddToBagEventTimestamp cookie');
}
