var app = angular.module('neighborToolApp');

app.controller('monsonCtrl',
	function($scope) {
		$scope.cities = [
		    {
			title : 'Toronto',
			content : 'This is the best city in the world!',
			lat : 43.7000,
			lon : -79.4000
		    },
		    {
			title : 'New York',
			content : 'This city is aiiiiite!',
			lat : 40.6700,
			lon : -73.9400
		    },
		    {
			title : 'Chicago',
			content : 'This is the second best city in the world!',
			lat : 41.8819,
			lon : -87.6278
		    },
		    {
			title : 'Los Angeles',
			content : 'This city is live!',
			lat : 34.0500,
			lon : -118.2500
		    },
		    {
			title : 'Las Vegas',
			content : 'Sin City...\'nuff said!',
			lat : 36.0800,
			lon : -115.1522
		    }
		];
		
		$scope.mapOptions = {
			zoom: 4,
			center: new google.maps.LatLng(40.0000, -98.0000),
			mapTypeId: google.maps.MapTypeId.TERRAIN
		};
	}
);
