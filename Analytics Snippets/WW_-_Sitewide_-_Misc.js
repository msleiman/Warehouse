$(function(){

  /* Get EDID from eDialog if user lands on the site after clicking an email. */
  var thirtyDays = (60 * 60 * 1000 * 24) * 30;
  var vals = document.location.search;
  var start = vals.indexOf("EDID=");
  if (start != -1) {
    var end = vals.indexOf("&", start);
    if (end == -1) {
      end = vals.length;
    }
    var date = new Date();
    date.setTime(date.getTime() + thirtyDays);
    document.cookie = vals.substring(start, end) + "; expires=" + date.toGMTString() + "; path=/";
  }

});
