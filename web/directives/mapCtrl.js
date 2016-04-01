//Angular App Module and Controller
var app = angular.module('neighborToolApp');

app.directive('map', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            mapid: '@',
            mapmarkers: '=',
			options:'=',
        },
        template: '<div id="map"></div>',
        controller: 'mapCtrl',
    };
});

app.controller('mapCtrl', function ($scope) {
    $scope.mapid = $scope.mapid || "map";
    var element = document.getElementById('map');
    element.id = $scope.mapid;

	//TODO: Add custimization
    var mapOptions = $scope.options || {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(element, mapOptions);

    $scope.mapmarkers = $scope.mapmarkers || [];
    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info) {
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lon),
            title: info.title,
			//icon: some .png or whatever
        });
        marker.content = info.content;
        
        google.maps.event.addListener(marker, 'click', function() {
	    var fullContent = "";
	    if (marker.title) {
	        fullContent += "<h2>" + marker.title + "</h2>";
	    }
	    if (marker.content) {
                fullContent += marker.content;
	    }
            infoWindow.setContent(fullContent);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
    }  

    for (var i = 0; i < $scope.mapmarkers.length; i++){
        createMarker($scope.mapmarkers[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
});
