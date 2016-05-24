/*!
 * @preserve
 * jquery.scrolldepth.js | v0.9.1
 * Copyright (c) 2016 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 * NOTE THAT THIS PLUGIN HAS BEEN CUSTOMISED FOR BLOG EVENTS AND TO CHANGE THE GA(SEND) EVENT TO GA(MAIN.SEND) EVENT AS WE USE THE 'MAIN' TRACKER - THIS IS A CUSTOM WAREHOUSE MODIFICATION.
 */

$(function(){

  if (window.isBlogPage == true) { // This global variable is set just before we initialise the blog tracking property.
    !function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=e(require("jquery")):e(jQuery)}(function(e){"use strict";var n,t,o,i,r={minHeight:0,elements:[],percentage:!0,userTiming:!0,pixelDepth:!0,nonInteraction:!0,gaGlobal:!1,gtmOverride:!1},l=e(window),a=[],c=!1,u=0;e.scrollDepth=function(p){function h(e,r,l,a){i?(i({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:e,eventLabel:r,eventValue:1,eventNonInteraction:p.nonInteraction}),p.pixelDepth&&arguments.length>2&&l>u&&(u=l,i({event:"ScrollDistance",eventCategory:"Scroll Depth",eventAction:"Pixel Depth",eventLabel:d(l),eventValue:1,eventNonInteraction:p.nonInteraction})),p.userTiming&&arguments.length>3&&i({event:"ScrollTiming",eventCategory:"Scroll Depth",eventAction:e,eventLabel:r,eventTiming:a})):(n&&(window[o]("main.send","event","Scroll Depth",r,{nonInteraction:p.nonInteraction}),p.pixelDepth&&arguments.length>2&&l>u&&(u=l,window[o]("main.send","event","Scroll Depth","Pixel Depth",d(l),1,{nonInteraction:p.nonInteraction})),p.userTiming&&arguments.length>3&&window[o]("main.send","timing","Scroll Depth",e,a,r)),t&&(_gaq.push(["_trackEvent","Scroll Depth",e,r,1,p.nonInteraction]),p.pixelDepth&&arguments.length>2&&l>u&&(u=l,_gaq.push(["_trackEvent","Scroll Depth","Pixel Depth",d(l),1,p.nonInteraction])),p.userTiming&&arguments.length>3&&_gaq.push(["_trackTiming","Scroll Depth",e,a,r,100])))}function s(e){return{"25%":parseInt(.25*e,10),"50%":parseInt(.5*e,10),"75%":parseInt(.75*e,10),"100%":e-5}}function f(n,t,o){e.each(n,function(n,i){-1===e.inArray(n,a)&&t>=i&&(h("Percentage",n,t,o),a.push(n))})}function g(n,t,o){e.each(n,function(n,i){-1===e.inArray(i,a)&&e(i).length&&t>=e(i).offset().top&&(h("Elements",i,t,o),a.push(i))})}function d(e){return(250*Math.floor(e/250)).toString()}function m(){D()}function v(e,n){var t,o,i,r=null,l=0,a=function(){l=new Date,r=null,i=e.apply(t,o)};return function(){var c=new Date;l||(l=c);var u=n-(c-l);return t=this,o=arguments,0>=u?(clearTimeout(r),r=null,l=c,i=e.apply(t,o)):r||(r=setTimeout(a,u)),i}}function D(){c=!0,l.on("scroll.scrollDepth",v(function(){var n=e(document).height(),t=window.innerHeight?window.innerHeight:l.height(),o=l.scrollTop()+t,i=s(n),r=+new Date-y;return a.length>=p.elements.length+(p.percentage?4:0)?(l.off("scroll.scrollDepth"),void(c=!1)):(p.elements&&g(p.elements,o,r),void(p.percentage&&f(i,o,r)))},500))}var y=+new Date;p=e.extend({},r,p),e(document).height()<p.minHeight||(p.gaGlobal?(n=!0,o=p.gaGlobal):"function"==typeof ga?(n=!0,o="ga"):"function"==typeof __gaTracker&&(n=!0,o="__gaTracker"),"undefined"!=typeof _gaq&&"function"==typeof _gaq.push&&(t=!0),"function"==typeof p.eventHandler?i=p.eventHandler:"undefined"==typeof dataLayer||"function"!=typeof dataLayer.push||p.gtmOverride||(i=function(e){dataLayer.push(e)}),e.scrollDepth.reset=function(){a=[],u=0,l.off("scroll.scrollDepth"),D()},e.scrollDepth.addElements=function(n){"undefined"!=typeof n&&e.isArray(n)&&(e.merge(p.elements,n),c||D())},e.scrollDepth.removeElements=function(n){"undefined"!=typeof n&&e.isArray(n)&&e.each(n,function(n,t){var o=e.inArray(t,p.elements),i=e.inArray(t,a);-1!=o&&p.elements.splice(o,1),-1!=i&&a.splice(i,1)})},m())}});

    jQuery.scrollDepth({
      userTiming: false,
      pixelDepth: false,
      nonInteraction: true
    });
  }

});
