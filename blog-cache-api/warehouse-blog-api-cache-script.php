<?php

/*
  This script gets the Warehouse Blog as JSON from the Wordpress API and stores it as a local file. 
*/

$jsonAPI = file_get_contents('https://public-api.wordpress.com/rest/v1/sites/95161596/posts');
file_put_contents('warehouse-blog-api-cached-response.json', $jsonAPI);

?>
