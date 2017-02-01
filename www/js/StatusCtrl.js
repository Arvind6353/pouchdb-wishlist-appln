
angular.module('wish').controller('StatusCtrl', function($scope,PouchDb,$ionicPopup,$cordovaLocalNotification) {


if(localStorage.getItem('name'))
	$scope.userName=localStorage.getItem('name');

$scope.memoryCount=0;
$scope.charCount=0;
$scope.sadMomCount=0;
$scope.wishCount=0;
$scope.imageCount=0;
var c=0;
var c1=0;
PouchDb.getAll().then(function (result) {
   		 
   		for(var i=result.rows.length-1;i>=0;i--){
	       
	       if(!result.rows[i].doc.isImage){
	     
	        var obj = {
	            "_id": result.rows[i].doc._id,
	            "text": result.rows[i].doc.text,
	            "_rev":result.rows[i].doc._rev,
	            "type":result.rows[i].doc.type
	        }
	    	
	    	c++; 

		     if(obj.type=="Memory")
		     	$scope.memoryCount++;

		     if(obj.type=="Wish")
		     	$scope.wishCount++;

		     if(obj.type=="Characteristics")
		     	$scope.charCount++;

		     if(obj.type=="Sad Moments")
		     	$scope.sadMomCount++;

		        $scope.$apply();
			}
			else c1++;
		}

	   	if(result.rows) {	
	    	$scope.wishesCount=c;
	    	$scope.imageCount=c1;
	    }
		else    
			$scope.wishesCount=0;
	    $scope.$apply();
	    
	}).catch(function (err) {
	    console.log("eeror fetch ---"+err);
	});

	

if(!localStorage.getItem('name')){
	 
			  var promptPopup = $ionicPopup.prompt({
				 title: 'Title',
				 template: 'Your Name',
				 inputType: 'text',
				 inputPlaceholder: 'Enter user name'
			  });
				
			  promptPopup.then(function(res) {
				 console.log(res);
				 localStorage.setItem('name',res);
				 $scope.userName=res;

			 		var da=new Date();
					if(da.getHours()<=7){
						da.setHours(7);
					}
					else{
						da.setDate(da.getDate()+1)
						da.setHours(7);
					}

						da.setHours(7);
						da.setMinutes(45);
						da.setSeconds(0);
				

				   $cordovaLocalNotification.schedule({
					id: 99990,
					title: "Good Day "+res+" :)",
					text:"Time to Update the Wish Lists",
					firstAt: da,
					every:"day",
					sound:"file://bgm.mp3"
				  }).then(function (result) {
							
				  });
				


				 
			  });
				
		   };

})
