<?php
/**
 * Email exporter
 */
class EmailExporter
{
  private $receiptEmailsArray;

  function __construct()
  {
  }

  public function extractEmails()
  {
    $receiptFilePath = "to_convert/wh/uk/receipts_20160124.json";
    $receiptFile = fopen($receiptFilePath, "r") or die("Unable to open file!");
    $receiptContent = fread($receiptFile,filesize( $receiptFilePath ));
    fclose($receiptFile);
    $receiptArray = explode("\n", $receiptContent);
    $this->receiptEmailsArray = array();
    foreach ($receiptArray as $value) {
      $receiptJson = json_decode($value);
      if (isset($receiptJson->{'identifier'})) {
        $email = $receiptJson->{'identifier'};
        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
          // echo $email;
          // echo "<br>";
          array_push($this->receiptEmailsArray, $email);
        }
      }
    }

      echo count($this->receiptEmailsArray);
  }
  private function checkConversionType()
  {
    $CONVERT_TO='edialog';
    if ( strcmp( $_POST['convert_to'], 'mailchimp' )) {
      $CONVERT_TO='mailchimp';
    }
  }
  public function convertToEDialog()
  {
    echo count($this->receiptEmailsArray);
    $eDialogFile = fopen('converted_edialog/wh/uk/receipts_20160124.txt', 'w+') or die("Unable to create file!");
    $header = 'CID	EMAIL	BRAND';
    $brand = 'OASIS';
    fwrite($eDialogFile, $header);
    foreach ($this->receiptEmailsArray as $email) {
      fwrite($eDialogFile, "\n	".$email.'	'.$brand);
    }
    fclose($eDialogFile);
  }
  public function convertToMailchimp()
  {
    echo count($this->receiptEmailsArray);
    $mailChimpFile = fopen('converted_mailchimp/wh/uk/receipts_20160124.csv', 'w+') or die("Unable to create file!");
    $header = '"Email Address"';
    fwrite($mailChimpFile, $header);
    foreach ($this->receiptEmailsArray as $email) {
      fwrite($mailChimpFile, "\n".$email);
    }
    fclose($mailChimpFile);
  }
}
?>
