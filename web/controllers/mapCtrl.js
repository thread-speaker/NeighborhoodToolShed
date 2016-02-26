//Data
var cities = [
    {
        title : 'Toronto',
        desc : 'This is the best city in the world!',
        lat : 43.7000,
        lon : -79.4000
    },
    {
        title : 'New York',
        desc : 'This city is aiiiiite!',
        lat : 40.6700,
        lon : -73.9400
    },
    {
        title : 'Chicago',
        desc : 'This is the second best city in the world!',
        lat : 41.8819,
        lon : -87.6278
    },
    {
        title : 'Los Angeles',
        desc : 'This city is live!',
        lat : 34.0500,
        lon : -118.2500
    },
    {
        title : 'Las Vegas',
        desc : 'Sin City...\'nuff said!',
        lat : 36.0800,
        lon : -115.1522
    }
];

//Angular App Module and Controller
var app = angular.module('neighborToolApp');

app.directive('map', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {
            mapname: '@',
            mapmarkers: '@',
        },
        template: '<div id="map" style="height:420px;width:600px;"></div>',
        controller: 'mapCtrl',
    };
});

app.controller('mapCtrl', function ($scope) {
    $scope.mapname = $scope.mapname || "map";
    var element = document.getElementById('map');
    element.id = $scope.mapname;

    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }

    $scope.map = new google.maps.Map(element, mapOptions);

    $scope.mapmarkers = $scope.mapmarkers || [{
        title : 'Toronto',
        desc : 'This is the best city in the world!',
        lat : 43.7000,
        lon : -79.4000
    }];
    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info) {
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.lon),
            title: info.title
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
    }  

    for (i = 0; i < $scope.mapmarkers.length; i++){
        createMarker($scope.mapmarkers[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }
});

/*
<div ng-app="mapsApp" ng-controller="MapCtrl">
    <div id="map"></div>
    <div id="class" ng-repeat="marker in markers | orderBy : 'title'">
         <a href="#" ng-click="openInfoWindow($event, marker)">{{marker.title}}</a>
    </div>
</div>
/*

/*
#map {
    height:420px;
    width:600px;
}
.infoWindowContent {
    font-size:  14px !important;
    border-top: 1px solid #ccc;
    padding-top: 10px;
}
h2 {
    margin-bottom:0;
    margin-top: 0;
}
*/
