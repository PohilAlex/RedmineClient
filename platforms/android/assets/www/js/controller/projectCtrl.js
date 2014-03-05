var projectOffset = 0;
var projectLimit = 5;
var projectLoadCount = 0;
var projectTotalCount = 0;

angular.module('rcApp').controller('projectCtrl', ['$scope', '$rootScope', '$http', '$location', 'Projects', 'ApiErrorHandler',
  function ($scope, $rootScope, $http, $location, Projects, ApiErrorHandler) {
  	
  	$scope.title = 'Projects';
  	$scope.section='Projects';	
    if ($scope.projects == undefined) {
  	 $scope.projects = [];
    }
    if ($scope.projects.length == 0) {
  	 loadProjectData();
    }
  	
  	$scope.isProjectEmpty = function() {
  		return $scope.projects.length == 0;
  	}

    $scope.isProjectLoad = function() {
      return projectTotalCount == projectLoadCount;
    }

  	$scope.loadMoreProject = function() {
  		projectOffset = projectOffset + projectLimit;
  		loadProjectData();
  	};	

  	function loadProjectData() {
  		var api_key = JSON.parse(localStorage.getItem('user')).api_key;
  		var params = {'key': api_key, 'offset': projectOffset, 'limit': projectLimit}
      var data = Projects.query(params, 
        function() {
          $scope.projects = $scope.projects.concat(data.projects);
          projectLoadCount = $scope.projects.length;
            projectTotalCount = data.total_count;  
        },
        function(httpResponse) {
          ApiErrorHandler.handle(httpResponse);
        });
  		/*$http({method: 'GET', url: projectUrl, headers: {'X-Redmine-API-Key': api_key + 'ss'}, params: params})
  		.success(function(data) {
  			$scope.projects = $scope.projects.concat(data.projects);
  			//$rootScope.projects = $scope.projects;
  			projectLoadCount = $scope.projects.length;
        	projectTotalCount = data.total_count;
  		})
  		.error(function(data, status) {
  			if (status == 401) {
  				$location.path("/")
  			} else  if (status == 404) {
            	alert('Conection problem');  
          	} else {
  				alert('Project fail');
  			}
  		});*/
  	}
  }]);