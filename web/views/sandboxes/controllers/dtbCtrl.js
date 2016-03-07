var app = angular.module('neighborToolApp');
app.controller('dtbCtrl', function($scope, $route, $firebaseArray) {
	/*
	   var ref = new Firebase("https://amber-torch-1283.firebaseio.com/");
	   var transactions = ref.child("transactions");	
	   $scope.transactions = $firebaseArray(transactions);
	   */
	$scope.transactions = mockTransactions; //use mockup until DBs populated
	$scope.getUserId = function() {
		// return ref.getAuth().uid;
		return mockUserId;
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
	
	$scope.mockUsers = ["Reed", "Alice","Bob","Stevia","Jamie","Avery","Ashton"];
	$scope.mockTools = ["wrench","hammer","screwdriver","nail-gun"];
});
var mockUserId = "Reed";
// var mockTools = ["wrench","hammer","screwdriver","nail-gun"];
var mockTransactions

var mockTransactions = [ { transactionStatus: 'committed',
    Lender: 'Reed',
    Borrower: 'Alice',
    ToolLoaned: 'hammer',
    TransactionPeriod: 
     { Start: 'Sat Sep 17 2016 21:00:00 GMT-0600 (MDT)',
       End: 'Thu Nov 24 2016 02:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Avery',
    Borrower: 'Reed',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Fri Jun 24 2016 18:00:00 GMT-0600 (MDT)',
       End: 'Tue Aug 16 2016 17:00:00 GMT-0600 (MDT)' } },
  { transactionStatus: 'committed',
    Lender: 'Reed',
    Borrower: 'Avery',
    ToolLoaned: 'wrench',
    TransactionPeriod: 
     { Start: 'Thu Sep 22 2016 12:00:00 GMT-0600 (MDT)',
       End: 'Fri Nov 04 2016 17:00:00 GMT-0600 (MDT)' } },
  { transactionStatus: 'committed',
    Lender: 'Reed',
    Borrower: 'Stevia',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Tue Nov 01 2016 19:00:00 GMT-0600 (MDT)',
       End: 'Fri Jan 27 2017 21:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Reed',
    Borrower: 'Bob',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Thu Dec 15 2016 01:00:00 GMT-0700 (MST)',
       End: 'Wed Jan 18 2017 23:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'pending',
    Lender: 'Reed',
    Borrower: 'Ashton',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Sun Oct 16 2016 03:00:00 GMT-0600 (MDT)',
       End: 'Fri Dec 16 2016 08:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'cancelled',
    Lender: 'Stevia',
    Borrower: 'Reed',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Wed Feb 03 2016 19:00:00 GMT-0700 (MST)',
       End: 'Thu Oct 20 2016 05:00:00 GMT-0600 (MDT)' } },
  { transactionStatus: 'rejected',
    Lender: 'Reed',
    Borrower: 'Jamie',
    ToolLoaned: 'hammer',
    TransactionPeriod: 
     { Start: 'Tue Nov 29 2016 15:00:00 GMT-0700 (MST)',
       End: 'Thu Jan 26 2017 13:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Stevia',
    Borrower: 'Reed',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Thu Nov 17 2016 06:00:00 GMT-0700 (MST)',
       End: 'Thu Jan 05 2017 14:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'pending',
    Lender: 'Stevia',
    Borrower: 'Reed',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sat Oct 08 2016 21:00:00 GMT-0600 (MDT)',
       End: 'Thu Nov 10 2016 02:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Alice',
    Borrower: 'Reed',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Tue Sep 13 2016 12:00:00 GMT-0600 (MDT)',
       End: 'Fri Dec 16 2016 11:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'pending',
    Lender: 'Alice',
    Borrower: 'Reed',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Tue Aug 16 2016 09:00:00 GMT-0600 (MDT)',
       End: 'Fri Oct 07 2016 04:00:00 GMT-0600 (MDT)' } },
  { transactionStatus: 'rejected',
    Lender: 'Alice',
    Borrower: 'Reed',
    ToolLoaned: 'wrench',
    TransactionPeriod: 
     { Start: 'Thu Aug 25 2016 06:00:00 GMT-0600 (MDT)',
       End: 'Thu Nov 24 2016 05:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'pending',
    Lender: 'Reed',
    Borrower: 'Avery',
    ToolLoaned: 'wrench',
    TransactionPeriod: 
     { Start: 'Sat Dec 31 2016 07:00:00 GMT-0700 (MST)',
       End: 'Mon Jan 16 2017 06:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Reed',
    Borrower: 'Jamie',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Mon Dec 19 2016 12:00:00 GMT-0700 (MST)',
       End: 'Sat Jan 21 2017 16:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'cancelled',
    Lender: 'Reed',
    Borrower: 'Ashton',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Fri Nov 11 2016 07:00:00 GMT-0700 (MST)',
       End: 'Fri Jan 20 2017 01:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'cancelled',
    Lender: 'Reed',
    Borrower: 'Jamie',
    ToolLoaned: 'hammer',
    TransactionPeriod: 
     { Start: 'Mon Apr 25 2016 14:00:00 GMT-0600 (MDT)',
       End: 'Thu Jan 05 2017 18:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'rejected',
    Lender: 'Reed',
    Borrower: 'Avery',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Oct 09 2016 17:00:00 GMT-0600 (MDT)',
       End: 'Wed Dec 14 2016 19:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Stevia',
    Borrower: 'Reed',
    ToolLoaned: 'wrench',
    TransactionPeriod: 
     { Start: 'Mon Sep 26 2016 17:00:00 GMT-0600 (MDT)',
       End: 'Mon Jan 30 2017 17:00:00 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Ashton',
    Borrower: 'Reed',
    ToolLoaned: 'wrench',
    TransactionPeriod: 
     { Start: 'Fri Mar 04 2016 08:00:00 GMT-0700 (MST)',
       End: 'Sun May 29 2016 07:00:00 GMT-0600 (MDT)' } } ]; 
