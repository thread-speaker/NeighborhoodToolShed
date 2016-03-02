var app = angular.module('neighborToolApp');

app.controller('profileCtrl', function($scope) {
		
	$scope.userData = 
		{ name: "Cole Reasch", profileImg: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAKvAAAAJDRkZjNhYmE5LTIzNWUtNGU0ZS04ZTBmLWVhMmYwZjY2NThmYg.jpg",
			address: "Provo, Utah", preferredContactInfo: "Provo Forever"}
		

	$scope.ownedTools = [];
	$scope.testTools = [];
	$scope.updateMode = false;
	$scope.editMode = false;
	
	$scope.isEditMode = function() {
		$scope.editMode = true;
		
	}
	
	$scope.showProfileInfo = function() {
		if($scope.editMode === true) 
			return false;
		else
			return true;
	}
	
	$scope.showEditProfileInfo = function() {
		if($scope.editMode === true) 
			return true;
		else
			return false;
	}
	
	$scope.finishEditMode = function() {
		$scope.editMode = false;
		
	}
	
	$scope.allProgramTools = [
		
		{genusTool: "hammer", speciesTools: ["war", "sledge"], clicked: false},
		{genusTool: "screw driver", speciesTools: ["phillips", "flat"], clicked: false},
	];
	
	$scope.updateToolButton = function() {
		
		$scope.updateMode = true;
		
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
		
		$scope.updateMode = false;
		$scope.doneButtonDisplay = false;
	}
	
	$scope.displayProgramTools = false;
	
	$scope.doneButtonDisplay = false;
	
	$scope.displayChildrenTools = function(genusTool){
		
		if(genusTool.clicked === false)
			genusTool.clicked = true;
		else
			genusTool.clicked = false;
	}
	
	$scope.testA = [];

	$scope.isGenusToolOwned = function(gTool) {
		
		for(var i = 0; i < $scope.ownedTools.length; i++) {
			
			if(gTool.genusTool === $scope.ownedTools[i].genusTool) {
				return i;
			}
		}
		return -1;
	}
	
	$scope.isToolOwned = function(gTool, sTool){
		for(var i = 0; i < $scope.ownedTools.length; i++) {
			
			if(gTool.genusTool === $scope.ownedTools[i].genusTool) {
				
				var speciesTools = $scope.ownedTools[i].speciesTools;
				for(var x = 0; x < speciesTools.length; x++) {
					
					if(sTool === speciesTools[x]) {
						return x;
					}
				}
			}
		}
		return -1;
	}
	
	$scope.isToolOwnedBoolean = function(gTool, sTool){
		for(var i = 0; i < $scope.ownedTools.length; i++) {
			
			if(gTool.genusTool === $scope.ownedTools[i].genusTool) {
				
				var speciesTools = $scope.ownedTools[i].speciesTools;
				for(var x = 0; x < speciesTools.length; x++) {
					
					if(sTool === speciesTools[x]) {
						return true;
					}
				}
			}
		}
		return false;
	}
	
	$scope.updateTool = function(gTool, sTool){
		
		var speciesIndex = $scope.isToolOwned(gTool,sTool);
		
		var genusIndex = $scope.isGenusToolOwned(gTool);
		
		if(genusIndex === -1) {
			$scope.ownedTools.push({genusTool: gTool.genusTool, speciesTools: [sTool]});
		} else if(speciesIndex === -1 && genusIndex != -1) {
			$scope.ownedTools[genusIndex].speciesTools.push(sTool);
		} else {
	
			if($scope.ownedTools[genusIndex].speciesTools.length === 1) {
				
				$scope.ownedTools.splice(genusIndex, 1);
			}
			else {
				$scope.ownedTools[genusIndex].speciesTools.splice(speciesIndex, 1);
			}
		}
	}
	
	var rentalTools = [
	
		{tool: "screw driver", dueDate: "02/2/16"},
		{tool: "wrench", dueDate: "12/8/16"},
		{tool: "screws", dueDate: "04/1/16"},
		{tool: "sledge hammer", dueDate: "03/2/16"}
	]
	$scope.rentalTools = rentalTools;
});