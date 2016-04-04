(function() {

  var whitelist = [
    "n7wd7kbg18Q",
    "znnwmcCiFOo",
    "linkshare39334",
    "2508088",
    "2360299",
    "3izd6hN5HL0",
    "aVQgr87v4uQ"
  ];

  var now = new Date();

  if (now < new Date(2015, 2, 17)) {
    whitelist.push("iODj/jNq/gk");
  }

  for (var i = 0; i < whitelist.length; i++) {
    if (window.location.href.indexOf(whitelist[i]) !== -1) {
      setCookie("qbLinkshareWhitelisted", "yes", 365);
      return;
    }
  }

  function setCookie(name, value, days) {

    var expires;

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    } else {
      expires = "";
    }

    document.cookie = name + "=" + value + expires + "; path=/";
  }

}());

function(session, cb) {

  var sessionIterator = function(cb) {

    for (var i = 0; i < session.referrer.length; i++) {
      var val = cb(session.referrer[i]);

      if (val !== undefined) {
        return val;
      }
    }
  };

  var rules = {

    _30mins: 30 * 60 * 1000,
    _24hrs: 24 * 60 * 60 * 1000,
    _now: (new Date()).getTime(),

    //Returns true if linkshare is the referrer in the given referral object
    _referrerIsLinkshare: function(referrer) {
      return referrer.landing.indexOf("utm_source=linkshare") !== -1;
    },

    //Returns an array of linkshare referrer terms
    _getReferrerTerms: function() {

      var terms = [];

      sessionIterator(function(referrer) {
        var match = referrer.landing.match(/utm_term=([^&$#]+)/);
        if (rules._referrerIsLinkshare(referrer) && match) {
          terms.push(match[1]);
        }
      });

      return terms;
    },

    //Returns true if linkshare is a referrer in the user's lifetime
    hasLinkshareReferral: function() {

      return sessionIterator(function(referrer) {
        if (rules._referrerIsLinkshare(referrer)) {
          return true;
        }
      }) || false;
    },

    //Returns true if linkshare is whitelisted
    hasWhitelistedReferral: function() {
      return document.cookie.indexOf("qbLinkshareWhitelisted=yes") !== -1;
    },

    voucherReferral: function() {

      var getCookie = function(name) {

        var nameEQ = name + "=";
        var ca = document.cookie.split(";");

        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];

          while (c.charAt(0) === " ") {
            c = c.substring(1, c.length);
          }

          if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
          }
        }

        return null;
      };

      var date = new Date();
      var startDate = new Date(2015, 3, 28);
      var endDate = new Date(2015, 4, 6);

      var voucher = 'WHGRAZIA25';
      var voucherWhiteList = false;

      if (getCookie("voucherCodeUsed") === voucher && startDate < date && date < endDate) {
        voucherWhiteList = true;
      }

      return voucherWhiteList;
    },

    //Returns true if there was an email referral in the last 24 hours
    hasRecentEmailReferral: function() {

      return sessionIterator(function(referrer) {

        if (referrer.landing.indexOf("utm_medium=email") !== -1 && rules._now - referrer.time <= rules._24hrs) {
          return true;
        }
      }) || false;
    },

    //Returns true if user has a recent linkshare referral and:
    //  - user has no old referrals and first referral wasn't linkshare
    //  OR
    //  - user has old referrals and no old linkshare referrals
    isGoalHanger: function() {

      var hasOldLinkshareReferral = false;
      var hasOldReferral = false;
      var hasRecentLinkshareReferral = false;
      var firstReferralIsLinkshare = rules._referrerIsLinkshare(session.referrer[0]);

      sessionIterator(function(referrer) {

        //if the referrer are older than the last 30 mins ...
        if (rules._now - referrer.time > rules._30mins) {
          hasOldReferral = true;

          //if its a linkshare referrer ...
          if (rules._referrerIsLinkshare(referrer)) {
            hasOldLinkshareReferral = true;
          }

          //its younger than 30 mins
        } else {
          if (rules._referrerIsLinkshare(referrer)) {
            hasRecentLinkshareReferral = true;
          }
        }
      });

      return hasRecentLinkshareReferral && ((!hasOldReferral && !firstReferralIsLinkshare) || (hasOldReferral && !hasOldLinkshareReferral));
    }

  };

  //Tag will fire if linkshare is any referrer, there hasn't been a recent email referral and the user is not goal hanging.

  //If a referral is whitelisted it will fire regardless of the other rules.
  window.tagWillFire = rules.hasWhitelistedReferral() || ((rules.hasLinkshareReferral() || rules.voucherReferral()) && !rules.hasRecentEmailReferral() && !rules.isGoalHanger());

  //set the dedupe rules to window
  window.dedupeRules = {
    whitelisted: rules.hasWhitelistedReferral(),
    linkshareIsAReferrer: rules.hasLinkshareReferral(),
    recentEmailReferral: rules.hasRecentEmailReferral(),
    voucherReferral: rules.voucherReferral(),
    goalHanger: rules.isGoalHanger()
  };

  //set the dedupe terms to the window
  window.dedupeTerms = rules._getReferrerTerms();

  if (window.tagWillFire) {
    cb();
  }
}


//ON CONFIRMATION PAGE
(function() {
    try {
      var prefix = 'n_';
      if (cmLayer.customerStatus != 'New') {
        prefix = 'r_';
      }
      var tmpPrices = cmLayer.shoppingBagProductPrice.split(',');
      var tmpSkus = cmLayer.shoppingBagProductIds.split(',');
      var tmpDiscounts = cmLayer.shoppingBagProductDiscount / Promo.split(',');
      var tmpNames = cmLayer.shoppingBagProductName.split(',');
      var tmpQty = cmLayer.shoppingBagProductName.split(',');
      var newPrices, newSkus, newNames, newQty;
      var taxPercentage = parseInt(cmLayer.tax * 100 / cmLayer.subTotal) + 100;
      for (var i = 0; i < tmpSkus.length; i++) {
        tmpDiscounts[i] = (tmpDiscounts[i] * 100) * 100 / taxPercentage;
        newPrices.push((tmpPrices[i] * 100) * 100 / taxPercentage; newQty.push(tmpQty[i]); newSkus.push(tmpSkus[i]); newNames.push(tmpNames[i]);
          if (tmpDiscounts[i] < 0) {
            newPrices.push(tmpDiscounts[i]);
            newQty.push(0);
            newSkus.push('Discount');
            newNames.push('Discount');
          }
        }
        var prices = tmpPrices.join('|');
        var src = document.location.protocol + "//track.linksynergy.com/ep";
        src += "?mid=36373";
        src += "&ord=" + cmLayer.orderId;
        src += "&skulist=" + newSkus.join('|');
        src += "&qlist=" + newQty.join('|');
        src += "&amtlist=" + newPrices.join('|');
        src += "&cur=" + cmLayer.currency;
        src += "&namelist=" + newNames.join('|');
        var img = new Image();
        img.src = src;
        img.style.display = "none";
        document.body.appendChild(img);
      } catch (e) {
        //linkshareError
      }
    })();
