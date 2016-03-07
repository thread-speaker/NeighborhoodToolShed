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
		return 'Reed'; //mock situation
	}
	// function isAuth() {
	// }
	$scope.saveTransaction = function(t) {
		// transactions.$save(t);
	}
	$scope.sendRequest = function(t) {
		// transactions.$save(t);
		// transactions.$push(t);
	}
	// function Transaction(t) {
	// 	this._t_obj = t;
	// 	this.save = function(t) {
	// 		// transactions.$save(t);
	// 	}
	// 	this.sendRequest = function(t) {
	// 		// transactions.$push(t);
	// 		transactions.push(t);
	// 	}
	// }
	
	// $scope.userInvolvement = function(t) {
	// 	if(t.borrower == getUserId())
	// 		return "borrower"
	// 	else if(t.lender == getUserId())
	// 		return "lender"
	// 	else
	// 		throw "user is neither borrower nor lender in transaction!"
	// }
	$scope.createNewRequest = function() {
		t = {
			Lender: "",
			Borrower: getUserId(),
			status: "",
			ToolLoaned: "",
			Start: "",
			End: ""
		};
		transactions.push(t);
		return t;
		// return new CreateTransaction(t);	
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
		saveTransaction(t);
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
	}
	

	// $scope.isBorrower = function(t) {
	// 	if(t.borrower == getUserId())
	// 		return true;
	// 	return false;
	// }
	// $scope.isLender = function(t) {
	// 	if(t.lender == getUserId())
	// 		return true;
	// 	return false;
	// }
	$scope.statuses = {
		PENDING: 0,
		APPROVED: 1,
		REJECTED: 2,
		COMMITED: 3,
		CANCELLED: 4
	};
	// function Transaction() {
	// 	this.status = statutes.PENDING;
	// 	this.updateStatus = function() {
	// }

	// transactions.on("child_added", function(snapshot) {
	// 	//if this user is Lender
	// 	t = snapshot.val()
	// 	if(getUid() == t.lender) {
	// 	
	// 	} else if(getUid() == t.borrower) {
	// 	
	// 	} else throw "transaction item doesn't belong to this user";
	// 	//$scope.transactions.push(new LenderTransaction(...))
	// 	//else if ...
	// 	//else error
	// });
	// //Borrower API
	// $scope.requestTool = function() {
	// $scope.confirmTransaction = function() {
	// //Lender API
	// $scope.transactionHistory = function() {
	// 	//use user id, auth data...
	// 	//...
	// 	//return transactions as list of transaction objects
	// }
});
var mockTransactions =[ { transactionStatus: 'approved',
    Lender: 'Bob',
    Borrower: 'Reed',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'cancelled',
    Lender: 'Reed',
    Borrower: 'Bob',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'rejected',
    Lender: 'Bob',
    Borrower: 'Reed',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Jamie',
    Borrower: 'Reed',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Reed',
    Borrower: 'Avery',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Reed',
    Borrower: 'Bob',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Avery',
    Borrower: 'Reed',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'pending',
    Lender: 'Reed',
    Borrower: 'Bob',
    ToolLoaned: 'wrench',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'pending',
    Lender: 'Reed',
    Borrower: 'Alice',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Reed',
    Borrower: 'Bob',
    ToolLoaned: 'hammer',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Reed',
    Borrower: 'Avery',
    ToolLoaned: 'hammer',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Ashton',
    Borrower: 'Reed',
    ToolLoaned: 'hammer',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Alice',
    Borrower: 'Reed',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Reed',
    Borrower: 'Ashton',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'approved',
    Lender: 'Reed',
    Borrower: 'Alice',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'cancelled',
    Lender: 'Stevia',
    Borrower: 'Reed',
    ToolLoaned: 'wrench',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Bob',
    Borrower: 'Reed',
    ToolLoaned: 'wrench',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'pending',
    Lender: 'Reed',
    Borrower: 'Ashton',
    ToolLoaned: 'nail-gun',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'cancelled',
    Lender: 'Alice',
    Borrower: 'Reed',
    ToolLoaned: 'screwdriver',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } },
  { transactionStatus: 'committed',
    Lender: 'Avery',
    Borrower: 'Reed',
    ToolLoaned: 'hammer',
    TransactionPeriod: 
     { Start: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)',
       End: 'Sun Mar 06 2016 15:52:47 GMT-0700 (MST)' } } ]; 
