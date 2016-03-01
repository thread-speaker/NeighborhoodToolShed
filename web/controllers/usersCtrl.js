var app = angular.module('neighborToolApp');

app.controller('usersCtrl',
	function($scope, $route, $firebaseObject) {
    var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
		var tools = ref.child("tools");
    var newTools = ref.child("newTools");
    $scope.users = ref.child("users");
		var toolsSearched = [];
		if(window.localStorage.toolsSearched)
			toolsSearched = JSON.parse(window.localStorage.toolsSearched)

    var users = {};
    for (var t in toolsSearched){
      var tool = toolsSearched[t];
      var toolsUsers = newTools.child(tool.genus).child(tool.species).child("users").on("child_added", function(snap){
        var uid = snap.key();
        console.log(uid);
        var user = $scope.users.child(uid).on("child_added", function(snap){
          var key = snap.key();
          var val = snap.val();
          if (!users.hasOwnProperty(uid))
            users[uid] = {};
          $scope.$apply(function(){users[uid][key] = val;});

          console.log(users[uid]);
        });
      });
    }

		if(toolsSearched.length > 0)
			$scope.usersToDisplay = usersWithTools(toolsSearched);
		else
			$scope.usersToDisplay = [
				{
					"name" : "EVERYONE"
				}
			]

    function usersWithTools(toolsSearched) {
        // console.log(toolsSearched);
        first = toolsSearched[0];
        test = $firebaseObject(newTools.child(first.genus).child(first.species));
        // test.$loaded(function(){});
        return users;
      }
	}
);


// return [
// 	{
// 		"username" : "Curt"
// 	},
// 	{
// 		"username" : "Paul"
// 	}
// ];

function distance(loc1, loc2) { //miles
  lat1 = loc1.latitude;
  lon1 = loc1.longitude;
  lat2 = loc2.latitude;
  lon2 = loc2.longitude;
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)) * 0.621371; // 2 * R; R = 6371 km
}
