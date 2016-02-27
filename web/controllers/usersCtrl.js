var app = angular.module('neighborToolApp');

app.controller('usersCtrl',
	function($scope, $route, $firebaseArray) {
		var toolsSearched = [];
		if(window.localStorage.toolsSearched)
			toolsSearched = JSON.parse(window.localStorage.toolsSearched)
		
		if(toolsSearched.length > 0)
			$scope.usersToDisplay = usersWithTools(toolsSearched);
		else
			$scope.usersToDisplay = [
				{
					"username" : "EVERYONE"
				}
			]
	}
);

function usersWithTools(toolsSearched) {
	return [
		{
			"username" : "Curt"
		},
		{
			"username" : "Paul"
		}
	];
}
