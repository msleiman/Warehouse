// The below code sets a cookie if the user has come from a Linkshare referral link. Linkshare appends a ?siteID= parameter
// to our URLs which we need to detect and set a cookie that contains the site ID.
// e.g. A referral link might look like http://www.warehouse.co.uk/gb?siteID=1KW2Xiq9xN0-4.c_9w1X8XpO94TU14hg3D

(function(){
  if (window.location.href.indexOf('?siteID=') > 0) {
    var linkshareReferrerID = window.location.href.split('?siteID=').pop();
    document.cookie = 'linkshareReferrerID=' + linkshareReferrerID + ';'; // When does the cookie expire?
    document.cookie = 'linkshareReferralLastArrivalTime=' + Math.round(new Date().getTime()/1000); + ';'; // The Unix timestamp for when the user first arrived via the referral link.
  }

})();
