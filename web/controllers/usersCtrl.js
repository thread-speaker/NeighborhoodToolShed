var app = angular.module('neighborToolApp');

app.controller('usersCtrl',
  function($scope, $route, $firebaseObject, $filter) {
    //Get Location
    var orderBy = $filter('orderBy');
    var location = {};
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {}

    function showPosition(position) {
      location = {
        "latitude": position.coords.latitude,
        "longitude": position.coords.longitude
      };
      //TODO reverse geocoding
      // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
    }

    var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
    var tools = ref.child("tools");
    var newTools = ref.child("newTools");
    $scope.users = ref.child("users");
		
    var toolsSearched = [];
    if (window.localStorage.toolsSearched)
      toolsSearched = JSON.parse(window.localStorage.toolsSearched)

    var users = [];
    // var users = {};
    for (var t in toolsSearched) {
      var tool = toolsSearched[t];
      var toolsUsers = newTools.child(tool.genus).child(tool.species).child("users").on("child_added", function(snap) {
        var uid = snap.key();
        // console.log(uid);
        var user = $firebaseObject($scope.users.child(uid));
        user.$loaded(function() {
          var distance = $scope.distance(location, user.location);
          user.distance = distance;
          users.sort(function(a, b) { //Sort by distance from here;
            return a.distance - b.distance;
          });
          $scope.usersToDisplay = users.filter(function(item, pos, arry) { //Get rid of duplicate uids
            return !pos || item["$id"] != arry[pos - 1]["$id"];
          });
        });
        users.push(user);
        // user.on("child_added", function(snap){
        // 	// console.log("apply");
        //   var key = snap.key();
        //   var val = snap.val();
        //
        //
        //   if (!users.hasOwnProperty(uid)){
        //     users[uid] = {};
        // 	}
        // 	if (key == "location"){
        // 		var distance = $scope.distance(location, val);
        // 		users[uid]["distance"] = distance;
        // 	}
        //
        //   $scope.$apply(function(){users[uid][key] = val;});
        //
        //   // console.log("users" + users);
        // });


        // user.once("value", function(snap){
        // 	console.log("test");
        // 	users = orderBy(users, "distance", false);
        // });
        //
      });
    }

    if (toolsSearched.length > 0)
      $scope.usersToDisplay = usersWithTools(toolsSearched);
    else
      $scope.usersToDisplay = [{
        "name": "EVERYONE"
      }]

    function usersWithTools(toolsSearched) {
      // console.log(toolsSearched);
      // first = toolsSearched[0];
      // test = $firebaseObject(newTools.child(first.genus).child(first.species));
      // test.$loaded(function(){});
      return users;
    };

    $scope.testOrder = function(predicate) {
      console.log("predicate");
      return 0;
    }

    $scope.distance = function(loc1, loc2) { //miles
      lat1 = loc1.latitude;
      lon1 = loc1.longitude;
      lat2 = loc2.latitude;
      lon2 = loc2.longitude;
      var p = 0.017453292519943295; // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

      return 12742 * Math.asin(Math.sqrt(a)) * 0.621371; // 2 * R; R = 6371 km
    };
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
