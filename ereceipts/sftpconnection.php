<?php
class SFTPConnection
{
  // SSH Host
  private $ssh_host = 'ftp.ereceipts.co.uk';
  // SSH Port
  private $ssh_port = 22;
  // SSH Server Fingerprint
  private $ssh_server_fp = 'ce:5a:21:32:5f:34:79:4d:a8:d7:82:b7:0c:cd:28:86';
  // SSH Username
  private $ssh_auth_user = 'warehouse';
  // SSH Public Key File
  private $ssh_auth_pub = 'public_key.pub';
  // SSH Private Key File
  private $ssh_auth_priv = 'private_key';
  // SSH Private Key Passphrase (null == no passphrase)
  private $ssh_auth_pass;
  // SSH Connection
  private $connection;

  private $sftp;

  public function connect() {
    try {
      echo "Test 0";
      if (!($this->connection = ssh2_connect($this->ssh_host, $this->ssh_port))) {
        throw new Exception('Cannot connect to server');
      }
      echo "Test 1";
      $fingerprint = ssh2_fingerprint($this->connection, SSH2_FINGERPRINT_MD5 | SSH2_FINGERPRINT_HEX);
      if (strcmp($this->ssh_server_fp, $fingerprint) !== 0) {
        throw new Exception('Unable to verify server identity!');
      }
      echo "Test 2";
      if (!ssh2_auth_pubkey_file($this->connection, $this->ssh_auth_user, $this->ssh_auth_pub, $this->ssh_auth_priv, $this->ssh_auth_pass)) {
        throw new Exception('Autentication rejected by server');
      }else {
        echo "Server connected successfully.";
      }
    } catch (Exception $e) {
      echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
  }

  public function login($username, $password)
  {
    if (! @ssh2_auth_password($this->connection, $username, $password))
    throw new Exception("Could not authenticate with username $username " . "and password $password.");
    $this->sftp = @ssh2_sftp($this->connection);
    if (! $this->sftp)
    throw new Exception("Could not initialize SFTP subsystem.");
  }

  public function uploadFile($local_file, $remote_file)
  {
    $sftp = $this->sftp;
    $stream = @fopen("ssh2.sftp://$sftp$remote_file", 'w');
    if (! $stream)
    throw new Exception("Could not open file: $remote_file");
    $data_to_send = @file_get_contents($local_file);
    if ($data_to_send === false)
    throw new Exception("Could not open local file: $local_file.");
    if (@fwrite($stream, $data_to_send) === false)
    throw new Exception("Could not send data from file: $local_file.");
    @fclose($stream);
  }

  function scanFilesystem($remote_file) {
    $sftp = $this->sftp;
    $dir = "ssh2.sftp://$sftp$remote_file";
    $tempArray = array();
    $handle = opendir($dir);
    // List all the files
    while (false !== ($file = readdir($handle))) {
      if (substr("$file", 0, 1) != "."){
        if(is_dir($file)){
          //                $tempArray[$file] = $this->scanFilesystem("$dir/$file");
        } else {
          $tempArray[]=$file;
        }
      }
    }
    closedir($handle);
    return $tempArray;
  }

  public function receiveFile($remote_file, $local_file)
  {
    $sftp = $this->sftp;
    $stream = @fopen("ssh2.sftp://$sftp$remote_file", 'r');
    if (! $stream)
    throw new Exception("Could not open file: $remote_file");
    $contents = fread($stream, filesize("ssh2.sftp://$sftp$remote_file"));
    file_put_contents ($local_file, $contents);
    @fclose($stream);
  }

  public function deleteFile($remote_file){
    $sftp = $this->sftp;
    unlink("ssh2.sftp://$sftp$remote_file");
  }
}
?>
