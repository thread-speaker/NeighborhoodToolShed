var app = angular.module('neighborToolApp');

app.controller('profileCtrl', function($scope) {
	
	$scope.userData = 
		{ name: "Paul Cloward", profileImg: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAKvAAAAJDRkZjNhYmE5LTIzNWUtNGU0ZS04ZTBmLWVhMmYwZjY2NThmYg.jpg",
			address: "Provo, Utah", preferredContactInfo: "Provo Forever"}
	
	var ownedTools = [
		
		{tool: "hammer", status: "out"},
		{tool: "screw driver", status: "in"},
		{tool: "screw driver", status: "in"}, 
		{tool: "screw driver", status: "in"},
		{tool: "screw driver", status: "in"}, 
		
	]
	$scope.ownedTools = ownedTools;
	
	
	
	$scope.addTool = function() {
		
		var x = document.getElementById("myText").value;
		
		if(x != "")
		$scope.ownedTools.push({tool: x, status: "in"});
	}
	
	var rentalTools = [
	
		{tool: "screw driver", dueDate: "02/2/16"},
		{tool: "wrench", dueDate: "12/8/16"},
		{tool: "screws", dueDate: "04/1/16"},
		{tool: "sledge hammer", dueDate: "03/2/16"}
	]
	$scope.rentalTools = rentalTools;
});