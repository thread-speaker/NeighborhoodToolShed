var app = angular.module('neighborToolApp');
app.controller('dtbCtrl', function($scope, $route, $firebaseArray) {
	/*
	   var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
	   var transactions = ref.child("transactions");	
	   $scope.transactions = $firebaseArray(transactions);
	   */

	// $scope.transactions = mockTransactions; //use mockup until DBs populated	
	$scope.mockUserId = "";
	$scope.mockUsers = mockUsers;
	$scope.mockTools = mockTools;

	$scope.genMockTransactionList = function(n, thisUser) {
		$scope.mockUserId = thisUser;
		console.log("mockUserId: " + $scope.mockUserId);
		var result = [];
		for(var i=0; i < n; i++) {
			var usrA = "";
			var usrB = "";
			var nn = randomNum(0,2);
			if(nn == 0) {
				usrA = thisUser;
				usrB = randomUser();
			} else {
				usrB = thisUser;
				usrA = randomUser();
			}
			result.push({
				transactionStatus: randomStatus(),
				Lender: usrA,
				Borrower: usrB,
				ToolLoaned: randomTool(),
				TransactionPeriod: randomPeriod()	
			});
		}
		// $scope.mockTransactions = result;
		$scope.transactions = result;
		// return result;
	}
	$scope.genMockTransactionList(12, "Tim");
	
	$scope.getUserId = function() {
		// return ref.getAuth().uid;
		return $scope.mockUserId;
	}
	
	$scope.saveTransaction = function(t) {
		// transactions.$save(t);
	}

	$scope.sendNewRequest = function(t) {
		if(t.transactionStatus == "new")
			t.transactionStatus = "pending"
		else
			throw "transaction status not valid. not sending request."
		$scope.saveTransaction(t);
	}

	$scope.createNewRequest = function() {
		t = {
			Lender: "",
			Borrower: $scope.getUserId(),
			transactionStatus: "new",
			ToolLoaned: "",
			TransactionPeriod: {
				Start: Date(),
				End: ""
			}
		};
		$scope.transactions.push(t);
		return t;
	}

	$scope.getEndDate = function(dateStr, weeks) {
		date = new Date(dateStr);
		//http://stackoverflow.com/questions/6963311/add-days-to-a-date-object
		return new Date(date.setTime(date.getTime() + 7*weeks*86400000)).toString();
	}

	$scope.advanceTransaction = function(t) {
		switch(t.transactionStatus) {
			case "pending": 
				t.transactionStatus = "approved";
				break;
			case "approved":
				t.transactionStatus = "committed";
				break;
			case "rejected":
				throw "transaction cannot be advanced further";
				break;
			case "committed":
				throw "transaction cannot be advanced further";
				break;
			case "cancelled":
				throw "transaction cannot be advanced further";
				break;
			default: throw "Unrecognized transactionStatus: " + t.transactionStatus;
		}
		$scope.saveTransaction(t);
	}

	$scope.termTransaction = function(t) {
		switch(t.transactionStatus) {
			case "pending": 
				t.transactionStatus = "rejected";
				break;
			case "approved": 
				t.transactionStatus = "cancelled";
				break;
			case "rejected":
				throw "transaction already terminated";
				break;
			case "commited":
				throw "transaction already terminated";
				break;
			case "cancelled":
				throw "transaction already terminated";
				break;
			default: throw "Unrecognized transactionStatus: " + t.transactionStatus;
		}
		$scope.saveTransaction(t);
	}
});
var mockUsers = ["Victoria", "Bill", "Laurel", "Tim", "Benjamin","Amy"];
var mockTools = ["wrench","hammer","screwdriver","nail-gun"];
// var mockTransactions = [];
var statuses = ["pending","approved","rejected","cancelled", "committed"]
function randomNum(a,b) {
	return Math.floor(Math.random()*(b-a)) + a;
}

function randomFromList(items) {
	return items[randomNum(0,items.length)];
}


function randomPeriod(){
	var monthA = randomNum(1,12);
	var dayA = randomNum(1,32);
	var hourA = randomNum(1,24);
	var minA = randomNum(1,60);

	var monthB = randomNum(monthA+1,13);
	var dayB = randomNum(1,32);
	var hourB = randomNum(1,24);
	var minB = randomNum(1,60);
	return {
		Start: (new Date(2016,monthA,dayA,hourA)).toString(),
			End: (new Date(2016,monthB,dayB,hourB)).toString()
	}
}
function randomUser(){
	return randomFromList(mockUsers);
}
function randomTool(){
	return randomFromList(mockTools);
}
function randomStatus(){
	return randomFromList(statuses);
}
