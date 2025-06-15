var updateCurrentDataErrorCounter = 0;
var updateCurrentDataTooOld = false;

var blockCN, blockErrorServer, blockErrorIRD, fieldCN, fieldTimestamp, rowTimestamp;

function updateCurrentDataSuccess(dataString) {
	
	var data = JSON.parse(dataString);
		
	var valueCN = data.cn/100;
	fieldCN.innerText = (valueCN >= 0) ? (valueCN.toFixed(1) + ' dB') : 'NO CR';
	blockCN.classList.remove('good');
	blockCN.classList.remove('warning');
	blockCN.classList.remove('bad');
	blockCN.classList.remove('no-carrier');
	if ((valueCN >= SETTINGS.ranges.good.min) && (valueCN <= SETTINGS.ranges.good.max))
		blockCN.classList.add('good');
	else if ((valueCN >= SETTINGS.ranges.warning.min) && (valueCN <= SETTINGS.ranges.warning.max))
		blockCN.classList.add('warning');
	else if (valueCN >= 0)
		blockCN.classList.add('bad');
	else
		blockCN.classList.add('no-carrier');
	
	var valueTimestamp = Date.parse(data.Timestamp);
	fieldTimestamp.innerText = (new Date(valueTimestamp)).toLocaleString();
	updateCurrentDataTooOld = ((Date.now() - valueTimestamp) > 10 * 1000);
	if (updateCurrentDataTooOld)
		rowTimestamp.classList.add('warning');
	else
		rowTimestamp.classList.remove('warning');
	
	updateCurrentDataErrorCounter = 0;
	updateCurrentDataErrorHandler();
	
}

function updateCurrentDataError() {
	updateCurrentDataErrorCounter++;
	updateCurrentDataErrorHandler();
}

function updateCurrentDataErrorHandler() {
	if (updateCurrentDataErrorCounter > 3) {
		blockErrorServer.style.display = 'block';
		blockErrorIRD.style.display = 'none';
		blockCN.classList.add('dim');
	} else if (updateCurrentDataTooOld) {
		blockErrorServer.style.display = 'none';
		blockErrorIRD.style.display = 'block';
		blockCN.classList.add('dim');
	} else {
		blockErrorServer.style.display = 'none';
		blockErrorIRD.style.display = 'none';
		blockCN.classList.remove('dim');
	}
}

function updateCurrentData() {
	$.get('get.php?data=current&sng=' + SNG_ID)
     .done(updateCurrentDataSuccess);
}

// This part not working, using fixed settings
function updateRangeData() {
	$.get('get.php?data=settings&sng=' + SNG_ID, function(dataString) {
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
	
	blockCN = document.getElementById('block-cn');
	blockErrorServer = document.getElementById('block-error-server');
	blockErrorIRD = document.getElementById('block-error-ird');
	fieldCN = document.getElementById('field-cn');
	fieldTimestamp = document.getElementById('field-timestamp');
	rowTimestamp = document.getElementById('row-timestamp');
	
	updateCurrentData();
	setInterval(updateCurrentData, 1000);
	
});




