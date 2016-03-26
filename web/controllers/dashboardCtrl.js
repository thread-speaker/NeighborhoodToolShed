var app = angular.module('neighborToolApp');

app.controller('dashboardCtrl',["$scope", "$firebaseArray",
	function($scope, $firebaseArray) {

		var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
		var tools = ref.child("tools");
		var newTools = ref.child("newTools");
	
		if(!window.localStorage.queries) {
			
			$scope.commonQueries = [
				{
					"query" : "Drill"
				}
			];
		} else {
			
			var queries = window.localStorage.queries.split(',');
			
			$scope.commonQueries = [];
			
			for(var i = 0; i < queries.length; i++) {
				
				$scope.commonQueries.push({ "query" : queries[i] });
			}
		}

		$scope.addDropDown = function(input) {
			var idx = $scope.commonQueries.indexOf(input) + 1;
			$scope.commonQueries.splice(idx, 0,
				{ "query" : "" }
			);
		};

		$scope.commonTools = $firebaseArray(tools.orderByChild("genus"));
		$scope.isFirstInstanceOf = function(value, index, array){
				var i = -1;
				for (var variable in array) {
					if (array[variable].genus == value.genus){
						i = variable;
						break;
					}
				}
			return i == index ;
		};

		$scope.goClick = function() {
			var filterString = "";
			for(i = 0; i < $scope.commonQueries.length; i++){
				if($scope.commonQueries[i].query.length > 0){
					if(filterString.length == 0)
						filterString += $scope.commonQueries[i].query;
					else
						filterString += "," + $scope.commonQueries[i].query;
				}
			}

			window.localStorage.queries=filterString
			window.location =  "#SearchCriteria";
			
			
			
		};
	}
]);
