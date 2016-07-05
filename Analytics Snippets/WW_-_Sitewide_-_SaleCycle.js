// This is the SaleCycle pixel code to go on the Order Confirmation page.

$(function(){
  if (digitalData.site.country == 'AU' || digitalData.site.country == 'US' || digitalData.site.country == 'DE' || digitalData.site.country == 'FR' || digitalData.site.country == 'NL' || digitalData.site.country == 'SE') {
    // Test code
    if (window.location.href.indexOf('staging') >= 0) {
      try {var __scP=(document.location.protocol=="https:")?"https://":"http://";
    	var __scS=document.createElement("script");__scS.type="text/javascript";
    	__scS.async=true;__scS.src=__scP+"d16fk4ms6rqz1v.cloudfront.net/capture/UAT/WAREHOUSE.js";
    	document.getElementsByTagName("head")[0].appendChild(__scS);}catch(e){}
    }

    else {

      // Production code: mobile
      if ( $(window).width() <= 768 ) {
        try {var __scP=(document.location.protocol=="https:")?"https://":"http://";
      	var __scS=document.createElement("script");__scS.type="text/javascript";
      	__scS.async=true;__scS.src=__scP+"d16fk4ms6rqz1v.cloudfront.net/capture/mobile/WAREHOUSE.js";
      	document.getElementsByTagName("head")[0].appendChild(__scS);}catch(e){}
      }

      // Production code: desktop
      else {
        try {var __scP=(document.location.protocol=="https:")?"https://":"http://";
      	var __scS=document.createElement("script");__scS.type="text/javascript";
      	__scS.async=true;__scS.src=__scP+"d16fk4ms6rqz1v.cloudfront.net/capture/WAREHOUSE.js";
      	document.getElementsByTagName("head")[0].appendChild(__scS);}catch(e){}
      }

    }

  }

});
