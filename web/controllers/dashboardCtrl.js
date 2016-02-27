var app = angular.module('neighborToolApp');

app.controller('dashboardCtrl',["$scope", "$firebaseArray",
	function($scope, $firebaseArray) {

		var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
		var tools = ref.child("tools");
		var newTools = ref.child("newTools");

		$scope.commonQueries = [
			{
				"query" : "Drill"
			}
		];

		$scope.addDropDown = function(input) {
			var idx = $scope.commonQueries.indexOf(input) + 1;
			$scope.commonQueries.splice(idx, 0,
				{ "query" : "" }
			);
		};

		$scope.customQueries = [
			{
				"query" : ""
			}
		];

		$scope.addSearch = function(input) {
			var idx = $scope.customQueries.indexOf(input) + 1;
			$scope.customQueries.splice(idx, 0,
				{ "query" : "" }
			);
		};

		// $scope.commonTools = ["hammer", "saw", "wrench"];
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
		// tools.orderByChild("genus").on("child_added", function(snapshot){
		// 	if ($scope.commonTools.indexOf(snapshot.val().genus) == -1)
    //   {// Only add if value is unique
		// 		$scope.$apply(function(){
		// 			$scope.commonTools.push(snapshot.val().genus);
		// 			// console.log("added: " + snapshot.val().genus);
		// 		});
		//
		// 	}
    // });

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

			for(i = 0; i < $scope.customQueries.length; i++){
				if($scope.customQueries[i].query.length > 0){
					if(filterString.length == 0)
						filterString += $scope.customQueries[i].query;
					else
						filterString += "," + $scope.customQueries[i].query;
				}
			}

			if(filterString.length == 0)
				softAler("Please select one or more tools.")

			window.location =  "#SearchCriteria?filter=" + filterString;
		};


		$scope.usersNearby = //give me all the users within (x) miles
		[
			{
				"username" : "csmerrell",
				"tools" : ["hammer", "saw", "screwdriver"]
			},
			{
				"username" : "somedude",
				"tools" : ["screwdriver", "level", "wrench"]
			}
		];

		$scope.usersWithTool = function(str) {
			if(!str)
				return $scope.usersNearby;

			var filteredUsers = [];
			for(i = 0; i < $scope.usersNearby.length; i++){
				var tools = $scope.usersNearby[i].tools;
				for(j = 0; j < tools.length; j++){
					if(tools[j].indexOf(str) != -1) {
						filteredUsers.push($scope.usersNearby[i])
						break;
					}
				}
			}
			return filteredUsers;
		};
	}
]);
