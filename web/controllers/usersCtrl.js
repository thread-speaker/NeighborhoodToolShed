var app = angular.module('neighborToolApp');

app.controller('usersCtrl',
  function($scope, $route, $firebaseArray) {
    var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
		var tools = ref.child("tools");

    //Grab search queries
    $scope.queries = $route.current.params.filter.split(',');

    //Add them to the ng-repeat array;
    $scope.queryResults = [];
    for (var i in $scope.queries){
      var query = $scope.queries[i];
      tools.orderByChild("genus")
          .startAt(query).endAt(query + "\uf8ff")
          .on("child_added", function(snapshot){
            $scope.$apply(function(){  //Do it NOW
              $scope.queryResults.push(snapshot.val());
            });
          });
    }



  }
);
