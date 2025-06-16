<?php

  $paramSng = $_POST['sng'];
  $paramKey = $_POST['key'];
  $data = $_POST['data'];

  if (!isset($paramSng))
    die('Missing parameter: SNG');

  if (!isset($paramKey))
    die('Missing parameter: KEY');

  if (!isset($data))
    die('Missing data');

  $sngsCsv = file_get_contents("data/sngs.csv");
  $sngsCsv = str_replace("\r", "", $sngsCsv);
  $sngsRaw = explode("\n", $sngsCsv);
  $keyFound = NULL;
  foreach ($sngsRaw as $sngRaw) {
    $sngData = explode(",", $sngRaw);
    if ($sngData[0] == $paramSng)
      $keyFound = $sngData[1];
  }

  if (is_null($keyFound))
    die('SNG not existing');

  if ($keyFound != $paramKey)
    die('Invalid key!');

  file_put_contents("data/$paramSng.json", $data);
  echo "Successful update for $paramSng.";

?>

