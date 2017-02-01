angular.module('wish').controller('ImageCtrl', 
	function($scope,$cordovaToast,PouchDb,$state,$cordovaCamera,$ionicModal) {

	$scope.img=[];


  $scope.data = {
    showDelete: false
  };
  
	PouchDb.getAll().then(function (result) {
   		
   		for(var i=result.rows.length-1;i>=0;i--){
	        

   			if(result.rows[i].doc.isImage && result.rows[i].doc.isImage==true){
	        	var obj = {
	            	"_id": result.rows[i].doc._id,
	            	"_rev":result.rows[i].doc._rev,
	            	"image":result.rows[i].doc.image
	           	}
	        	$scope.img.push(obj);
	        }
	    }
	    $scope.images=angular.copy($scope.img);
	    $scope.$apply();
    
	}).catch(function (err) {
	    console.log("error fetch ---"+err);
	});


 $scope.upload = function() {
       try{
		        var options = {
		            quality : 75,
		            destinationType : Camera.DestinationType.DATA_URL,
		            sourceType : Camera.PictureSourceType.CAMERA,
		            allowEdit : true,
		            encodingType: Camera.EncodingType.JPEG,
		            popoverOptions: CameraPopoverOptions,
		            targetWidth: 500,
		            targetHeight: 500,
		            saveToPhotoAlbum: false
		        };
		        $cordovaCamera.getPicture(options).then(function(imageData) {


						var timeStamp = String(new Date().getTime());

						var item = {
						        "_id": timeStamp,
								"image":imageData,
								"isImage":true
						       	}


		            PouchDb.add(item).then(function() {
		                

		            	       /*	$scope.img.push(item);
	        
	    						$scope.images=angular.copy($scope.img);

	    						$scope.$apply();
	    						*/
		                		if($cordovaToast){
												 $cordovaToast
													.show('Image Added', 'short', 'center')
													.then(function(success) {
													  // success
													  //$state.reload();	
													  $state.go("home.status")
													}, function (error) {
													  // error
													});
										 		}
								else{
										console.log("Added success")
									}
									console.log("added");




		            });
		        }, function(error) {
		            console.error(error);
		        });
		  }
		  catch(err){
		  	alert( err );
		  	throw err;
		  }
	}

	$scope.showImages = function(index) {
		
		//$scope.src=index;
		$scope.activeSlide=index;
		$scope.showModal('templates/image-popover.html');
	}

	$scope.showModal = function(templateUrl) {
		$ionicModal.fromTemplateUrl(templateUrl, {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function(modal) {
			$scope.modal = modal;
			$scope.modal.show();
		});
	}
 
	// Close the modal
	$scope.closeModal = function() {
		$scope.modal.hide();
		$scope.modal.remove()
	};

	$scope.deleteImage=function(img){
		
		console.log("delete ---"+img);
		
  		PouchDb.remove(img).then(function(res) {

  			if($cordovaToast){
							 $cordovaToast
								.show('Image Deleted', 'short', 'center')
								.then(function(success) {
								  // success
								}, function (error) {
								  // error
								});
					 }
		
			      console.log("Document deleted successfully");
			      if($scope.img){
			      	var obj=_.find($scope.images,{_id:img._id});
			   		if(obj){
			   			$scope.img.splice(obj,1);
		  				$scope.images.splice(obj,1);
		  				$scope.$apply();
		  			}
		  			
			   	  }
		});
	}


});