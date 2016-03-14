var app = angular.module('neighborToolApp');

app.controller('profileCtrl', function($scope) {
	
	/*
		userData- An array of user objects in the database. Each object has a name, address, profileImg, and preferredContactInfo 
	*/
	$scope.userData = 
		{ name: "Cole Reasch", profileImg: "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAKvAAAAJDRkZjNhYmE5LTIzNWUtNGU0ZS04ZTBmLWVhMmYwZjY2NThmYg.jpg",
			address: "Provo, Utah", preferredContactInfo: "Provo Forever"}
		

	$scope.ownedTools = [];
	$scope.testTools = [];
	$scope.updateMode = false;
	$scope.editMode = false;
	$scope.displayProgramTools = false;
	$scope.displayDoneButton = false;
	
	/*
		setEditMode()- sets the editMode variable to a boolean "state".
					state: boolean 
					return: void 		
	*/
	$scope.setEditMode = function(state) {
		$scope.editMode = state;
	}	
	
	/*
		showProfileInfo()- returns a boolean on whether or not the profile page should display the normal profile information.
						return: boolean
	
	*/
	$scope.showProfileInfo = function() {
		if($scope.editMode === true) 
			return false;
		else
			return true;
	}
	
	/*
		showEditProfileInfo()- returns a boolean on whether or not the profile page should display the text boxes to edit the profile information.
						return: boolean
	
	*/
	$scope.showEditProfileInfo = function() {
		if($scope.editMode === true) 
			return true;
		else
			return false;
	}
	
	/*
		allProgramTools- An array of each tool objects in the database. Each object has a genus tool, and an array of species tools. 
	*/
	$scope.allProgramTools = [
		
		{genusTool: "hammer", speciesTools: ["war", "sledge"], clicked: false},
		{genusTool: "screw driver", speciesTools: ["phillips", "flat"], clicked: false}
	];
	
	/*
		updateToolButton()- when this function is called, it sets
											the updateMode, displayProgramTools, and doneButtonDisplay variables to true.
							This method is called when the user hits the "Update Tool List" button on the gui.
	*/
	$scope.updateToolButton = function() {
		
		$scope.updateMode = true;
		
		$scope.displayProgramTools = true;
		
		$scope.displayDoneButton = true;
	}
	
	/*
		endAddTool()- vpid 
		
			Function sets the clicked variable in each object in the allProgramTools array to false.
			Also closes the displayProgramsTools section. This function is used when the
			"Done" button is clicked.
	*/
	$scope.endAddTool = function() {
		
		$scope.displayProgramTools = false;
		
		for(var i = 0; i < $scope.allProgramTools.length; i++) {
			
			$scope.allProgramTools[i].clicked = false;
		}
		
		$scope.updateMode = false;
		$scope.displayDoneButton = false;
	}
	
	/*
		setClickOnChildrenTools()-> void 
									
			tool: Tool object with genusTool, speciesTools[], and clicked properties.
									
			sets the genus tool's object ".clicked" property to the oppositite of the boolean state it is in.
			This occurs on the tool object when the corresponding check box is clicked on the edit tool section.
			Setting the genusTool.clicked to true means the checkbox on this feature should display as clicked.
			Setting the genusTool.clicked to false means the checkbox on this feature should display as "not clicked."
	*/
	$scope.setClickOnTools = function(tool){
		
		if(tool.clicked === false)
			tool.clicked = true;
		else
			tool.clicked = false;
	}
	
	/*
		isGenusToolOwned(tool)- index/int
		
				tool: Tool object with genusTool, speciesTools[], and clicked properties.
		
				Scrolls through the user's owned tools and returns an index of the "passed in parameter tool" if it has the genus tool. 
					Else it returns a -1.
	*/
	$scope.isGenusToolOwned = function(tool) {
		
		for(var i = 0; i < $scope.ownedTools.length; i++) {
			
			if(tool.genusTool === $scope.ownedTools[i].genusTool) {
				return i;
			}
		}
		return -1;
	}
	
	/*
		isToolOwned(gTool, sTool)- index/int
		
			   gTool: name of genus tool
			   sTool: name of species tool

			   Scrolls through the user's owned tools and its speciesTool[] and returns an index of the "passed in parameter tool" if it
					has the exact tool. Else it returns a -1.
	*/
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
	
	/*
		isToolOwnedBoolean()-> boolean
		
		gTool: Name of genus tool
		sTool: Name of species tool
		
		Calls isToolOwned(gTool, sTool). If this call returns a -1, isToolOwned(gTool,sTool) will return false. Else will 
			return true.
	*/
	$scope.isToolOwnedBoolean = function(gTool, sTool){
		
		var toolOwned = $scope.isToolOwned(gTool, sTool);
		
		if(toolOwned === -1) {
			return false;
		} else {
			return true;
		}
	}
	
	/*
		updateTool(gTool, sTool)-> void
		
		gTool: name of genus tool
		sTool: name of species tool
		
		
		
		Checks to see if the genus Tool and species Tool are owned by the user. 
		If the user doesn't have the genus tool. It will push the genus tool/species tool pair into the user's ownedTools array.
			The object will have one genus tool, and an array of specie tools.
		If the user occupies the same genus tool but not the species tool, it will locate the object with the same genus tool name in the
			owned tools array. Then will push on the species to the species array of the object.
		If the user owns the species tool, it will delete it from the owned tools category. If the specific genus tool's species 
			array is size one, it will delete the genus tool also.

	*/
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

});