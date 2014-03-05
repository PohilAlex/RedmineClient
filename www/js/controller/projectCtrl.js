var projectOffset = 0;
var projectLimit = 5;
var projectLoadCount = 0;
var projectTotalCount = 0;

angular.module('rcApp').controller('projectCtrl', ['$scope', '$rootScope', '$http', '$location', 'Projects', 'ApiErrorHandler', 'Navigation', 'DataLoader',
  function ($scope, $rootScope, $http, $location, Projects, ApiErrorHandler, Navigation, DataLoader) {
  	Navigation.add($location.url());
  	$scope.title = 'Projects';
  	$scope.section='Projects';	
    $scope.projects = DataLoader.getEntityInstance('project');
    $scope.projects.loadData = function() {
      var api_key = JSON.parse(localStorage.getItem('user')).api_key;
      var params = {'key': api_key, 'offset': $scope.projects.offset, 'limit': $scope.projects.limit}
      var data = Projects.query(params, 
        function() {
          $scope.projects.data = $scope.projects.data.concat(data.projects);
          $scope.projects.loadCount = $scope.projects.data.length;
          $scope.projects.totalCount = data.total_count;
        },
        function(httpResponse) {
          ApiErrorHandler.handle(httpResponse);
        });   
    }

    if ($scope.projects.isEmpty()) {
      $scope.projects.loadData();
    }

  	$scope.isProjectEmpty = function() {
      return $scope.projects.isEmpty();
  	}

    $scope.isProjectLoad = function() {
      return $scope.projects.isLoad();
    }

  	$scope.loadMoreProject = function() {
      $scope.projects.loadMore();
  	};	

  }]);