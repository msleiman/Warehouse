<?php

require_once('EmailExporter.php');
//
$emailExport = new EmailExporter();
$emailExport->extractEmails();
$emailExport->convertToMailchimp();
// $emailExport->convertToEDialog();
echo "file Converted";

// echo get_current_user();

// $emailExport->convertToEDialog();


// ////////////////////////////////////////////////////////////////////////// //

// require_once('SFTPConnection.php');
//
// echo "PHP_INT_SIZE " . PHP_INT_SIZE;
//
//
// $eReceiptConnection = new SFTPConnection();
// echo "Connecting...";
// try {
//   $eReceiptConnection->connect();
// } catch (Exception $e) {
//     echo 'Caught exception: ',  $e->getMessage(), "\n";
// }
// echo "Connection ended";



?>
