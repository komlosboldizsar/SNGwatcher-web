<?php

  $paramSng = $_POST['sng'];
  $paramKey = $_POST['key'];
  $paramType = $_POST['type'];
  $data = $_POST['data'];

  if (!isset($paramSng))
    die('Missing parameter: SNG');

  if (!isset($paramKey))
    die('Missing parameter: KEY');

  if (!isset($paramType))
    die('Missing parameter: TYPE');

  if (!in_array($paramType, $DATA_TYPES))
    die('Wrong data type');

  if (!isset($data))
    die('Missing data');

  $keyFound = NULL;
  foreach (getSngsRaw() as $sngRaw) {
    $sngData = explode(",", $sngRaw);
    if ($sngData[0] == $paramSng)
      $keyFound = $sngData[1];
  }

  if (is_null($keyFound))
    die('SNG not existing');

  if ($keyFound != $paramKey)
    die('Invalid key!');

  file_put_contents("data/".$paramSng."__".$paramData.".json", $data);
  echo "Successful [$paramType] update for [$paramSng].";

?>

