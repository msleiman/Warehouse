// The below code sets a cookie if the user has come from a Linkshare referral link. Linkshare appends a ?siteID= parameter
// to our URLs which we need to detect and set a cookie that contains the site ID.
// e.g. A referral link might look like http://www.warehouse.co.uk/gb?siteID=1KW2Xiq9xN0-4.c_9w1X8XpO94TU14hg3D

(function(){
  var urlParametersArray = window.location.href.split('&');

  for (var i = 0; i < urlParametersArray.length; i++) {
    if (urlParametersArray[i].indexOf('_term') > 0) {
      var linkshareReferrerID = urlParametersArray[i].split('=').pop();
      console.log(linkshareReferrerID);

      var currentDate = new Date();
      var currentDatePlus30Days = currentDate.setDate(currentDate.getDate() + 30);

      document.cookie = 'linkshareReferrerID=' + linkshareReferrerID + '; expires=' + new Date(currentDatePlus30Days).toUTCString();
      document.cookie = 'linkshareReferralLastArrivalTime=' + Math.round(new Date().getTime()/1000); + ';'; // The Unix timestamp for when the user first arrived via the referral link.
    }
  }

})();
