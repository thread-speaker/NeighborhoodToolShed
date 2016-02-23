var app = angular.module('neighborToolApp');

app.controller('profileCtrl', function($scope) {
	$scope.data = [];
	
	var ownedTools = [
		
		{tool: "hammer", status: "out"},
		{tool: "screwdriver", status: "in"} 
		
	]
	$scope.ownedTools = ownedTools;
});