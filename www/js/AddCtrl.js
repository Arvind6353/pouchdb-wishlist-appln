

angular.module('wish').controller('AddCtrl', function($scope,$cordovaToast,PouchDb,$state) {


$scope.items=[];


$scope.typeList=[

	{text:"Wish"},
	{text:"Memory"},
	{text:"Characteristics"},
	{text:"Sad Moments"}

]

$scope.wish={
	msg:"",
	type:""
};


$scope.addWish=function(){


	var timeStamp = String(new Date().getTime());

	var item = {
	        "_id": timeStamp,
			"text": $scope.wish.msg,
			"type":$scope.wish.type
	       	}


	PouchDb.add(item).then(function(response){

			if($cordovaToast){
							 $cordovaToast
								.show('Wish Added', 'short', 'center')
								.then(function(success) {
								  // success

								  $state.go("home.status")
								}, function (error) {
								  // error
								});
					 }
			else{
					console.log("Added success")
				}
			console.log("added");

	}).catch(function (err) {
        console.log("error in additin "+err);
    });


}

// speech recognition
var recognizer = new SpeechRecognition();
    	  recognizer.continuous = true;
  		recognizer.interimResults = true;
 recognizer.onresult = function(event) {
        if (event.results.length > 0) {
          $scope.wish.msg = event.results[0][0].transcript;
          $scope.$apply()
        }
     };

 $scope.record = function() {
      
      recognizer.start();

 };
   
   $scope.stopRecord=function(){
	
		recognizer.stop();
      
   };   

 // end of speech recognition   
 


})
