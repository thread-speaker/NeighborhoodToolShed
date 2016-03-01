var app = angular.module('neighborToolApp');

app.controller('loginController',
	function($scope, $route, $firebaseArray) {
    var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
    var users = ref.child("users");

    var location = {};


    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {

    }
    function showPosition(position){
      location =  {"latitude": position.coords.latitude, "longitude":position.coords.longitude };
      //TODO reverse geocoding
      // https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
    }

    $scope.loginFacebook = function(){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
    $scope.$apply( function() {
        $scope.name = authData.facebook.displayName;
        var updateObj = {}
        updateObj[authData.uid + "/name"] = authData.facebook.displayName;
        updateObj[authData.uid + "/email"] = authData.facebook.email;
        updateObj[authData.uid + "/location"] = location;
        //Use update so we don't destroy data we're not mentioning.
        users.update(updateObj);
        }
      );
    },{
      remember: "default",
      scope: "email,user_likes"
    });
  };

});
