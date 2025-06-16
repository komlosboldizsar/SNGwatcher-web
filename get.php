<?php

  header('Access-Control-Allow-Origin: *');

  $paramSng = $_GET['sng'];
  $paramType = $_GET['type'];

  if (!isset($paramSng))
    die('Missing parameter: SNG');

  if (!isset($paramType))
    die('Missing parameter: TYPE');

  if (!in_array($paramType, $DATA_TYPES))
    die('Wrong data type');

  $found = false;
  foreach (getSngsRaw() as $sngRaw) {
    $sngData = explode(",", $sngRaw);
    if ($sngData[0] == $paramSng)
      $found = true;
  }

  if (!$found)
    die('SNG not existing');

  header('Content-Type', 'text/json');
  echo file_get_contents("data/".$paramSng."__".$paramType.".json");

?>
