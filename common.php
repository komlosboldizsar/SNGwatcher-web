<?php
	$DATA_TYPES = array('current', 'settings');
	
	function getSngsRaw() {
		$sngsCsv = file_get_contents("data/sngs.csv");
		$sngsCsv = str_replace("\r", "", $sngsCsv);
		$sngsRaw = explode("\n", $sngsCsv);
	}
?>