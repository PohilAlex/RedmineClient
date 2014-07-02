angular.module('rcApp').controller('issueDetailsCtrl', ['$scope', '$http', '$routeParams', '$location', 'Issues', 'ApiErrorHandler', 'Navigation',
	function ($scope, $http, $routeParams, $location, Issues, ApiErrorHandler, Navigation) {
		Navigation.add($location.url());
		$scope.section='IssueDetails';
		$scope.note = {data : ""};
	  	var api_key = JSON.parse(localStorage.getItem('user')).api_key;
	  	var issuesId = $routeParams.issuesId;

		var data = Issues.get({'key':api_key, 'issueId':issuesId}, 
			function(){
				$scope.issue = data.issue;
				$scope.title = data.issue.subject;
			},
			function(httpResponse) {
				ApiErrorHandler.handle(httpResponse);		
			});


		$scope.addNote = function() {
			var newIssue = {'issue' : {'notes' : $scope.note.data}};
			Issues.update({'key':api_key, 'issueId':issuesId}, newIssue, 
				function() {
					alert('Success');
				}, 
				function(httpResponse) {
					ApiErrorHandler.handle(httpResponse);
				});
		};
		$scope.isIssueDetailsLoad = function() {
			return $scope.issue != undefined;
		}

  }]);