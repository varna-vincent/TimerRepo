'use strict';

/**
 * @ngdoc overview
 * @name angularJsTimerApp
 * @description
 * # angularJsTimerApp
 *
 * Main module of the application.
 */
angular
  .module('angularJsTimerApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
