<?php

  header('Access-Control-Allow-Origin: *');

  $paramSng = $_GET['sng'];
  $paramData = $_GET['data'];

  if (!isset($paramSng))
    die('Missing parameter: SNG');

  if (!isset($paramData))
    die('Missing parameter: DATA');

  //if (!in_array($paramData, $DATA_TYPES))
    //die('Wrong data type');

  $found = false;
  foreach (getSngsRaw() as $sngRaw) {
    $sngData = explode(",", $sngRaw);
    if ($sngData[0] == $paramSng)
      $found = true;
  }

  if (!$found)
    die('SNG not existing');

  header('Content-Type', 'text/json');
  echo file_get_contents("data/$paramSng.json");

?>
