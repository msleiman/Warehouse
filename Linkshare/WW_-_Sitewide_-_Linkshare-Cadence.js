// This script fires the global Linkshare script sitewide.

(function(url) {
	/*Tracking Bootstrap
	Set Up DataLayer objects/properties here*/
	if (!window.DataLayer) {
	  window.DataLayer = {};
	}
	if (!DataLayer.events) {
	  DataLayer.events = {};
	}
	DataLayer.events.SiteSection = "1";

	var loc, ct = document.createElement("script");
	ct.type = "text/javascript";
	ct.async = true;
	ct.src = url;
	loc = document.getElementsByTagName('script')[0];
	loc.parentNode.insertBefore(ct, loc);
}(document.location.protocol + "//js.rmtag.com/111904.ct.js"));
