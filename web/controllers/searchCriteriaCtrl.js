var app = angular.module('neighborToolApp');

app.controller('searchCriteriaCtrl',
	function($scope, $route, $firebaseArray) {
    var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
		var tools = ref.child("tools");

    //Grab search queries
    $scope.queries = $route.current.params.filter.split(',');

    //Add them to the ng-repeat array;
    $scope.queryResults = $firebaseArray(tools.orderByChild("genus"));

    $scope.matchesQueries = function(value, index, array){
        return $scope.queries.indexOf(value.genus) >= 0;
    };


});