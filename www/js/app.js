angular.module('rcApp', ['ngResource', 'ngRoute', 'shoppinpal.mobile-menu']);

angular.module('rcApp').config(
  function ($locationProvider, $routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      }).
      when('/projects', {
        templateUrl: 'partials/menu.html',
        controller: 'projectCtrl'
      }).
      when('/projects/:projectId', {
        templateUrl: 'partials/menu.html',
        controller: 'issuesCtrl'
      }).
      when('/issues', {
        templateUrl: 'partials/menu.html',
        controller: 'issuesCtrl'
      }).
      when('/issues/:issuesId', {
        templateUrl: 'partials/menu.html',
        controller: 'issueDetailsCtrl'
      }).
      when('/profile', {
        templateUrl: 'partials/menu.html',
        controller: 'profileCtrl'
      });

	});
