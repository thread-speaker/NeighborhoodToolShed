var app = angular.module('neighborToolApp');

app.controller('homeViewCtrl', function($scope) {
	$scope.commonTools = ["hammer", "saw", "wrench"];	
	
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
	}
	
});