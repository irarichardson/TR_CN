function myActivitiesController($scope, $http, globalvars) {
	
	$scope.activities  = {};
	$scope.myClasses = [];
	$scope.loading = true;
	
	$scope.$on('getMyActivities', function(e,userId) {
		getMyActivities(userId);
		}
	);
	
	$scope.$on('setMyClasses', function(e,myClasses) {
			alert("from activities");
		 	$scope.myClasses = myClasses;
	 	}
	 );
    	
    function getMyActivities(id) {
    		var activitiesUrl = "http://54.201.216.190/TeachReach/api/service/user/user-activities/" + id;
    		
            var request = $http({
         		method: "GET",
         		url: activitiesUrl, 
         		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
             });

             request.success(
               function(data) {
	
					$scope.totalDisplayed = 5;
					$scope.loadMore = function (numberofitems) {
					$scope.totalDisplayed += 5;
					 //$scope.totalDisplayed = (numberofitems <= 0) ? $scope.activities.length : numberofitems;
					};
            	   $scope.activities = data.object;
				   $scope.loading = false;
				  				  
               }
             );
             
             request.error(
             	function(data, status) {
             		console.log(status);
             		$scope.activities = data || "Request failed";
             	}
             );
      };

}