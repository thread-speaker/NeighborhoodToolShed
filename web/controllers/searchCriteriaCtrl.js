var app = angular.module('neighborToolApp');

app.controller('searchCriteriaCtrl',
	function($scope, $route, $firebaseArray) {
    var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
	var tools = ref.child("tools");

    //Grab search queries
    $scope.queries = window.localStorage.queries.split(',');

    //Add them to the ng-repeat array;
    $scope.queryResults = $firebaseArray(tools.orderByChild("genus"));

    $scope.matchesQueries = function(value, index, array){
        return $scope.queries.indexOf(value.genus) >= 0;
    };

	$scope.searchAll = function() {
		var toolsSearched = [];
		for(var i = 0; i < $scope.queryResults.length; i++){
			if( $scope.queries.indexOf( $scope.queryResults[i].genus ) >= 0 )
				toolsSearched.push($scope.queryResults[i]);
		}
		window.localStorage.toolsSearched = JSON.stringify(toolsSearched);
		window.location = "#users";
	}

	$scope.searchSelected = function() {
		var toolsSearched = [];
		for(var i = 0; i < $scope.queryResults.length; i++){
			if($scope.queryResults[i].checked)
				toolsSearched.push($scope.queryResults[i]);
		}
		window.localStorage.toolsSearched = JSON.stringify(toolsSearched);
		window.location = "#users";
	}
	
	$scope.goBack = function() {
		window.location = "#/";
	}
	
	$scope.checkChange = function(tool) {
		var idx = $scope.queryResults.indexOf(tool);
		$scope.queryResults[idx].checked = !$scope.queryResults[idx].checked;
	}
	
	$scope.isFirstGenus = function(tool) {
		var idx = $scope.queryResults.indexOf(tool);
		if(idx == 0)
			return true;
		else if($scope.queryResults[idx - 1].genus != $scope.queryResults[idx].genus)
			return true;
		else
			return false;
	}
});
