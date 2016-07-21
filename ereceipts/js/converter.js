checkBrowserCompatibility();

var couponIdPrefix = 'fresca_';
var convertToUppercase = false;

$('#form_code_converter').submit(function(e) {
  e.preventDefault();
  onFormSubmit();
});

function checkBrowserCompatibility(argument) {
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    $('#form_code_converter_wrapper').removeAttr('disabled');
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
}

function onFormSubmit(argument) {
  readEReceiptFile();
}

function readEReceiptFile() {
  var fileTobeRead = document.getElementById('inputFile').files[0];
  var fileReader = new FileReader();
  fileReader.onload = function (e) {
    processEReceiptFile(fileReader.result);
  }
  fileReader.readAsText(fileTobeRead);
}

function ValidateEmail(mail)
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true);
  }else {
    return (false);
  }
}

function processEReceiptFile(eReceiptLines) {
  var eReceiptLines = eReceiptLines
  .split("\n");
  eReceiptLines.shift();
  if ($('input[name=format]:checked').val() === 'mailchimp') {
    exportToMailChimp(eReceiptLines);
  }else if ($('input[name=format]:checked').val() === 'edialog') {
    exportToEDialog(eReceiptLines);
  }

}

function exportToMailChimp(eReceiptLines) {
  // couponIdPrefix + $('#couponId').val();
  var email = '';
  var name = '';
  var emailList = '';
  var processed_codes_start = '"Brand","Email Address","First Name","Transaction ID","Store reference","Date","Basket value","Product list (SKU)","Marketing opt in status (True or False)"';
  var processed_codes_end = "";
  var brand = $('input[name=brand]:checked').val();

  $(eReceiptLines).each(function(index, receipt) {
    try {
      receipt = JSON.parse(receipt);
      // Coupon codes have 7 parameters in Fresca
      if (
        (typeof receipt.identifier != 'undefined') &&
        (ValidateEmail(receipt.identifier))
      ) {
        email = receipt.identifier;
        name = receipt.properties.first_name;
        transaction_id = receipt.transaction_id;
        store_reference = receipt.store_reference;
        date = receipt.timestamp.substring(0,10);
        basket_value = receipt.total;

        // Get a pipe separated list of SKUs in this order
        var SkuString = '';

        for (var item in receipt.items) {
          console.log(receipt.items[item].properties.product_code);
          SkuString += receipt.items[item].properties.product_code + '|'
        }

        product_list = SkuString.substring(0, SkuString.length - 1);
        marketing_opt_in = receipt.properties.opt_in;
        emailList += '\n'+ brand + ',' + email + ',' + name + ',' + transaction_id + ',' + store_reference + ',' + date + ',' + basket_value + ',' + product_list + ',' + marketing_opt_in;
      }
    } catch (e) {
      console.log('String is not in JSON format.');
    }
  });
  emailList   = processed_codes_start + emailList + processed_codes_end;
  var blob = new Blob([emailList], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "exportedEmailsForMailchimp.csv");
}
function exportToEDialog(eReceiptLines) {
  // couponIdPrefix + $('#couponId').val();
  var email = '';
  var name = '';
  var emailList = '';
  var processed_codes_start = 'CID	BRAND EMAIL	NAME TRANSACTION_ID STORE_REFERENCE DATE BASKET_VALUE PRODUCT_LIST MARKETING_OPT_IN';
  var processed_codes_end = "";
  var brand = $('input[name=brand]:checked').val();

  $.each(eReceiptLines, function(index, receipt) {
    try {
      receipt = JSON.parse(receipt);
      // Coupon codes have 7 parameters in Fresca
      if (
        (typeof receipt.identifier != 'undefined') &&
        (ValidateEmail(receipt.identifier))
      ) {
        email = receipt.identifier;
        name = receipt.properties.first_name;
        transaction_id = receipt.transaction_id;
        store_reference = receipt.store_reference;
        date = receipt.timestamp.substring(0,10);
        basket_value = receipt.total;

        // Get a pipe separated list of SKUs in this order
        var SkuString = '';

        for (var item in receipt.items) {
          console.log(receipt.items[item].properties.product_code);
          SkuString += receipt.items[item].properties.product_code + '|'
        }

        product_list = SkuString.substring(0, SkuString.length - 1);
        marketing_opt_in = receipt.properties.opt_in;
        emailList += '\n'+ brand + ',' + email + ',' + name + ',' + transaction_id + ',' + store_reference + ',' + date + ',' + basket_value + ',' + product_list + ',' + marketing_opt_in;
      }
    } catch (e) {
      console.log('String is not in JSON format.');
    }
  });
  emailList   = processed_codes_start + emailList + processed_codes_end;
  var blob = new Blob([emailList], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "exportedEmailsForEdialog.txt");

}
