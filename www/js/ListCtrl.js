
angular.module('wish').controller('ListCtrl', function($scope,PouchDb,$cordovaToast,$ionicHistory) {

	$scope.wishes=[];

	$scope.filteredRes=[]
	$scope.$on("$ionicView.enter", function () {
	   $ionicHistory.clearCache();
	   $ionicHistory.clearHistory();
});


	PouchDb.getAll().then(function (result) {
   		
   		for(var i=result.rows.length-1;i>=0;i--){

   		if(!result.rows[i].doc.isImage){
	        var obj = {
	            "_id": result.rows[i].doc._id,
	            "text": result.rows[i].doc.text,
	            "_rev":result.rows[i].doc._rev,
	            "type":result.rows[i].doc.type
	        }
	        $scope.wishes.push(obj);
	       } 
	    }
	    $scope.filteredRes=angular.copy($scope.wishes);
	    $scope.$apply();
    
	}).catch(function (err) {
	    console.log("error fetch ---"+err);
	});


	$scope.filter=function(type){

		if(type=="Reset"){
			$scope.filteredRes= angular.copy($scope.wishes);
			return;
		}
		$scope.filteredRes= _.filter(angular.copy($scope.wishes),{type:type});

	}



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
			   		if(obj){
		  				$scope.wishes.splice(obj,1);
		  				$scope.filteredRes.splice(obj,1);
		  				$scope.$apply();
		  			}
		  			
			   	  }
		});
	}

})

