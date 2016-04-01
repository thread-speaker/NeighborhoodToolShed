var app = angular.module('neighborToolApp');

app.controller('loginController', ['$scope', 'loginServices', function($scope, loginServices) {
	$scope.loginFacebook = function() {
		loginServices.loginFacebook(function() {
			$scope.$apply();
			window.location = "#/";
		});
	}		
}]);
