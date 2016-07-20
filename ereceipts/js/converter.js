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
  var processed_codes_start = '"Email Address","First Name"';
  var processed_codes_end = "";

  $.each(eReceiptLines, function(index, receipt) {
    try {
      receipt = JSON.parse(receipt);
      // Coupon codes have 7 parameters in Fresca
      if (
        (typeof receipt.properties.first_name != 'undefined') &&
        (ValidateEmail(receipt.properties.first_name))
      ) {
        name = receipt.properties.first_name;
      }
      if (
        (typeof receipt.identifier != 'undefined') &&
        (ValidateEmail(receipt.identifier))
      ) {
        email = receipt.identifier;
        emailList = emailList + '\n'+ email + ',' + name ;
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
  var processed_codes_start = 'CID	EMAIL	BRAND';
  var processed_codes_end = "";
  var brand = $('input[name=brand]:checked').val();

  $.each(eReceiptLines, function(index, receipt) {
    try {
      receipt = JSON.parse(receipt);
      // Coupon codes have 7 parameters in Fresca
      if (
        (typeof receipt.properties.first_name != 'undefined') &&
        (ValidateEmail(receipt.properties.first_name))
      ) {
        name = receipt.properties.first_name;
      }
      if (
        (typeof receipt.identifier != 'undefined') &&
        (ValidateEmail(receipt.identifier))
      ) {
        email = receipt.identifier;
        emailList = emailList + '\n	'+ email + '	' + name + '	' + brand;
      }
    } catch (e) {
      console.log('String is not in JSON format.');
    }
  });
  emailList   = processed_codes_start + emailList + processed_codes_end;
  var blob = new Blob([emailList], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "exportedEmailsForEdialog.txt");

}
