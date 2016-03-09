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
	
	$scope.allProgramTools = [
		
		{parentTool: "hammer", childrenTools: ["war", "sledge"], clicked: false},
		{parentTool: "screw driver", childrenTools: ["philips", "flat"], clicked: false},
	];
	
	$scope.addTool = function() {
		
		$scope.displayProgramTools = true;
		
		$scope.doneButtonDisplay = true;
	}
	
	/*endAddTool- Function sets the clicked variable in each object in the allProgramTools array to false.
					Also closes the displayProgramsTools section. This function is used when the
					"Done" button is clicked.*/
	$scope.endAddTool = function() {
		
		$scope.displayProgramTools = false;
		
		for(var i = 0; i < $scope.allProgramTools.length; i++) {
			
			$scope.allProgramTools[i].clicked = false;
		}
		
		$scope.doneButtonDisplay = false;
	}
	
	$scope.displayProgramTools = false;
	
	$scope.doneButtonDisplay = false;
	
	$scope.displayChildrenTools = function(parentTool){
		
		if(parentTool.clicked === false)
			parentTool.clicked = true;
		else
			parentTool.clicked = false;
	}
	
	var rentalTools = [
	
		{tool: "screw driver", dueDate: "02/2/16"},
		{tool: "wrench", dueDate: "12/8/16"},
		{tool: "screws", dueDate: "04/1/16"},
		{tool: "sledge hammer", dueDate: "03/2/16"}
	]
	$scope.rentalTools = rentalTools;
});