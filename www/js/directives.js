angular.module('rcApp').directive('backButton', ['Navigation', function(Navigation){
    return {
      restrict: 'A',
 
      link: function(scope, element, attrs) {
        element.bind('click', goBack);
 
        function goBack() {
          Navigation.back();
          //history.back();
          scope.$apply();
        }
      }
    }
}]);