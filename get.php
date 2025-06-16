<?php

  header('Access-Control-Allow-Origin: *');

  $paramSng = $_GET['sng'];
  $paramData = $_GET['data'];

  if (!isset($paramSng))
    die('Missing parameter: SNG');

  //if (!isset($paramData))
    //die('Missing parameter: DATA');

  $DATA_TYPES = array('current', 'settings');
//  if (!in_array($paramData, $DATA_TYPES))
//    die('Wrong data type');

  $sngsCsv = file_get_contents("data/sngs.csv");
  $sngsCsv = str_replace("\r", "", $sngsCsv);
  $sngsRaw = explode("\n", $sngsCsv);
  $found = false;
  foreach ($sngsRaw as $sngRaw) {
    $sngData = explode(",", $sngRaw);
    if ($sngData[0] == $paramSng)
      $found = true;
  }

  if (!$found)
    die('SNG not existing');

  header('Content-Type', 'text/json');
  echo file_get_contents("data/$paramSng.json", $data);

?>
