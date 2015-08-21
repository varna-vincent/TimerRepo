var interval;
var startTime;
var rounds;
var restPeriod;

$(document).ready(function(){
	$('#pauseBtn').hide();
});

function setTimer() {

	if(validate()) {
		startTime = document.getElementById('startTime').value;
		rounds = document.getElementById('rounds').value;
		restPeriod = document.getElementById('restPeriod').value;

		if(startTime > 0) {			
			startTicking(startTime, true);
		} else if(startTime == 0) {
			startTicking(startTime, false);
		}
	}
}

function startTicking(startTime, downwards) {
	
	if(downwards) {		
		interval = setInterval(function(){
			if(startTime >= 0) {
				displayTime(startTime--);
			} else {				
				if(rounds > 0) {
					startTime = document.getElementById('startTime').value;
					startTicking(startTime, true);
					rounds--;
				} else {
					pauseTimer(false);
				}
			}
		},1000);
	} else {
		displayTime(startTime++);
	}
}

function pauseTimer(stopCompletely) {
	window.clearInterval(interval);
	if(stopCompletely) {
		document.getElementById("seconds").innerHTML = 0;
		document.getElementById('startTime').value = 0;
		document.getElementById('rounds').value = 0;
		document.getElementById('restPeriod').value = 0;
	} else {
		document.getElementById('startTime').value = document.getElementById("seconds").innerHTML;
	}
	$('#pauseBtn').hide();
	$('#playBtn').show();
}

function displayTime(timeRemaining) {
	$('#playBtn').hide();
	$('#pauseBtn').show();
	document.getElementById("seconds").innerHTML = timeRemaining;
}

function validate() {
	return true;
}

function validateElement(obj) {

	var id = $(obj).attr('id');
	var regex = '/^\d*[1-9]\d*$/';
	var result = true;
	if(!regex.test(document.getElementById(id).value)) {
		document.getElementById(id).value = 0;
		result = false;
	}
	return result;
}