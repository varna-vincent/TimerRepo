'use strict';

/**
 * @ngdoc function
 * @name angularJsTimerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularJsTimerApp
 */
angular.module('angularJsTimerApp')
  .controller('MainCtrl', function ($scope, $interval) {

  	var stopTime;
  	var roundCount;
  	$scope.onlyNumbers = '/^\d+$/';
  	$scope.options = [{'value' : 0, 'text' : 'hrs'},
  					  {'value' : 1, 'text' : 'min'},
  					  {'value' : 2, 'text' : 'sec'}];

  	var init = function () {

		$scope.selectedStartTimeUnit = 2;
	  	$scope.selectedRestPeriodUnit = 2;
	  	$scope.secTime = '00';
	  	$scope.minTime = '00';
	  	$scope.hourTime = '00';
	  	$scope.startTime = 0;
	  	$scope.rounds = 0;
	  	$scope.restPeriod = 0;
	  	$scope.timerRunning = false;
	  	$scope.onRest = true;
	  	$scope.timeLeft = 0;
  	}

  	init();

  	$scope.startTimer = function() {
		$scope.startTime = 2;
		$scope.rounds = 2;
		$scope.restPeriod = 0;
  		roundCount = $scope.rounds - 1;

  		startTicking();
  	};

  	var startTicking = function() {

		$scope.timerRunning = true;
  		getTimeLeft();
  		if($scope.timeLeft > 0) {
  			stopTime = $interval(timerFunction, 1000);
  		}
  	};

  	var timerFunction = function() { 

		if($scope.timeLeft > 0) {
			showTime(); 
		} else {
			showTime();
			$interval.cancel(stopTime);
			$scope.timerRunning = false;
			$scope.timeLeft = 0;

			if($scope.restPeriod > 0) {
				getRestTimeLeft();
				$scope.onRest = false;
				stopTime = $interval(timerFunction, 1000);
			} else if(roundCount > 0) {
				roundCount--;
				startTicking();
			}
		}
	};

  	$scope.pauseTimer = function(stopCompletely) {

  		if(stopCompletely) {
  			init();
  		} else {
  			$scope.timerRunning = false;
  		}
  		$interval.cancel(stopTime);
  	};

  	var getTimeLeft = function() {

  		if($scope.timeLeft == 0) {
	  		if($scope.selectedStartTimeUnit == 0) {
	  			$scope.timeLeft = $scope.startTime * 60 * 60;
	  		} else if($scope.selectedStartTimeUnit == 1) {
	  			$scope.timeLeft = $scope.startTime * 60;
	  		}  else if($scope.selectedStartTimeUnit == 2) {
	  			$scope.timeLeft = $scope.startTime;
	  		}
	  	}
  	};

  	var getRestTimeLeft = function() {
  		if($scope.timeLeft == 0) {
	  		if($scope.selectedRestPeriodUnit == 0) {
	  			$scope.timeLeft = $scope.restPeriod * 60 * 60;
	  		} else if($scope.selectedRestPeriodUnit == 1) {
	  			$scope.timeLeft = $scope.restPeriod * 60;
	  		}  else if($scope.selectedRestPeriodUnit == 2) {
	  			$scope.timeLeft = $scope.restPeriod;
	  		}
	  	}
  	};

  	var showTime = function() {

  		if($scope.selectedStartTimeUnit == 0) {
  			if($scope.timeLeft >= 3600) {
  				$scope.hourTime = Math.floor($scope.timeLeft / 3600);
				$scope.minTime = Math.floor(($scope.timeLeft % 3600) / 60);
				$scope.secTime = ($scope.timeLeft % 3600) % 60;
  			} else if($scope.timeLeft > 60) {
  				setMinutesTime();
  			} else {
  				setSecondsTime();
  			}
  		} else if($scope.selectedStartTimeUnit == 1) {  			
  			if($scope.timeLeft > 60) {
  				setMinutesTime();
  			} else {
  				setSecondsTime();
  			}
  		} else if($scope.selectedStartTimeUnit == 2) {
  			setSecondsTime();
  		}

  		$scope.timeLeft--;
  	};

  	var setSecondsTime = function() {
  		$scope.hourTime = 0;
		$scope.minTime = 0;
		$scope.secTime = $scope.timeLeft;
  	};

  	var setMinutesTime = function() { 
  		$scope.hourTime = 0; 		
		$scope.minTime = Math.floor($scope.timeLeft / 60);
		$scope.secTime = $scope.timeLeft % 60;
  	};

  });
