
angular.module('wish').controller('ListCtrl', function($scope,PouchDb,$cordovaToast,$ionicHistory) {

	$scope.wishes=[];

	$scope.$on("$ionicView.enter", function () {
   $ionicHistory.clearCache();
   $ionicHistory.clearHistory();
});


	$scope.getStyle=function(type){

		var c="pink";

		if(type=="Memory")
			c="yellow !important";
		
		if(type=="Wish")
			c="blue";

		if(type=="Characteristics")
			c="yellow";

		if(type=="Sad Moments")
			c="red";

		console.log(type +" ---"+c);
		return {
        	"background-color" : c
		}

	}

	PouchDb.getAll().then(function (result) {
   		
   		for(var i=result.rows.length-1;i>=0;i--){
	        var obj = {
	            "_id": result.rows[i].doc._id,
	            "text": result.rows[i].doc.text,
	            "_rev":result.rows[i].doc._rev,
	            "type":result.rows[i].doc.type
	        }
	        $scope.wishes.push(obj);
	        $scope.$apply();
	    }
    
	}).catch(function (err) {
	    console.log("eeror fetch ---"+err);
	});

  $scope.data = {
    showDelete: false
  };
  
	 $scope.data = {
    showReorder: false
  };
	
	$scope.deleteWish=function(wish){
		
		console.log("delete ---"+wish);
		
  		PouchDb.remove(wish).then(function(res) {

  			if($cordovaToast){
							 $cordovaToast
								.show('Wish Deleted', 'short', 'center')
								.then(function(success) {
								  // success
								}, function (error) {
								  // error
								});
					 }
		
			      console.log("Document deleted successfully");
			      if($scope.wishes){
			      	var obj=_.find($scope.wishes,{_id:wish._id});
			   		if(obj)
		  				$scope.wishes.splice(obj,1);
		  			$scope.$apply();
			   	  }
		});
	}

})

