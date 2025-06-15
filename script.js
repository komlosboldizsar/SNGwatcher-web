function updateSngData() {
	$.get('https://sngwatcher.kboldi.hu/get.php?data=current&sng=' + SNG_ID, function(dataString) {
		
		var data = JSON.parse(dataString);
		
		var valueCN = data.cn/100;
		document.getElementById('field-cn').innerText = valueCN.toFixed(1) + ' dB';
		var blockCN = document.getElementById('block-cn');
		blockCN.classList.remove('good');
		blockCN.classList.remove('warning');
		blockCN.classList.remove('bad');
		if ((valueCN >= SETTINGS.ranges.good.min) && (valueCN <= SETTINGS.ranges.good.max))
			blockCN.classList.add('good');
		else if ((valueCN >= SETTINGS.ranges.warning.min) && (valueCN <= SETTINGS.ranges.warning.max))
			blockCN.classList.add('warning');
		else
			blockCN.classList.add('bad');
		
		var valueTimestamp = Date.parse(data.Timestamp);
		document.getElementById('field-timestamp').innerText = (new Date(valueTimestamp)).toLocaleString();
		if ((Date.now() - valueTimestamp) > 10 * 1000)
			document.getElementById('row-timestamp').classList.add('warning');
		else
			document.getElementById('row-timestamp').classList.remove('warning');
		
	});
}

// This part not working, using fixed settings
function updateRangeData() {
	$.get('https://sngwatcher.kboldi.hu/get.php?data=settings&sng=' + SNG_ID, function(dataString) {
		SETTINGS = JSON.parse(dataString);
	});
}

var SETTINGS = {
	'ranges': {
		'good': {
			'min': 3.0,
			'max': 4.5
		},
		'warning': {
			'min': 2.0,
			'max': 5.0
		}
	}
};

$(function(){
	updateSngData();
	setInterval(updateSngData, 1000);
});




