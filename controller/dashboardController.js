function dashboardController($rootScope,$scope, $http, globalvars) {
	$scope.dashboardDetails = {};
	$scope.processedDashboardDetails = {};
	$scope.recentDashboardDetails = {};
	$scope.dashboardDetails = {};
	$scope.myClasses = [];
	
	$scope.loading = true;
	
	$rootScope.dashboard = {
			show  : true
	};

//$scope.dashboard = $rootScope.dashboard;
	
	$scope.$on('getDashBoardDetails', function(e) {
    		//$rootScope.dashboard.show = true;
    		$rootScope.myProfile.show = false;
    		$("#commentsWall").show();
    		getDashBoard();
		}
    );
	
	 $scope.$on('filterRecentUpdates', function(e) {
		 	filterDashBoardData();
	 	}
	 );
	 
	 $scope.$on('myClasses', function(e,myClasses) {
		 	$scope.myClasses = myClasses;
	 	}
	 );
	 
	 function filterDashBoardData(){
		 var filteredProcessedDashboardDetails = [];
		 var items = angular.copy($scope.recentDashboardDetails);
			for (var i = 0; i < items.length; i++) {
			      var item = items[i];
			      if ( globalvars.getClassId() == item.classId) {
			    	  filteredProcessedDashboardDetails.push(item);
			      }
			} 
			$scope.processedDashboardDetails = filteredProcessedDashboardDetails; 
			$scope.myClasses = globalvars.getMyClasses();
	 };
    
    function getDashBoard() {
		
		$scope.loading = true;
		
    	var request = $http({
     		method: "GET",
     		url: "http://54.201.216.190/TeachReach/api/service/user/dashboard-details",
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   		$scope.totalDisplayed = 10;
        	   		$scope.loadMore = function (numberofitems) {
        	   			$scope.totalDisplayed += 15;
						//$scope.totalDisplayed = (numberofitems <= 0) ? $scope.dashboardDetails.length : numberofitems;
        	   		};
        	   		// $scope.loading = true;
        	   		$scope.dashboardDetails = data;
        	   		$scope.dashBoardCommentList();
        	   		filterDashBoardData();
        	   		$scope.loading = false;
           	}
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.dashboardDetails  =  data || "Request failed";
         	}
         );
     };

	
	  $scope.dashBoardCommentList= function() {

		var eventList = $scope.dashboardDetails.object.eventList;

		for(j=0;j<eventList.length;j++){
			eventList[j].displaytype = 'Calendar Event';
			eventList[j].type = 'ev';
			eventList[j].classId = eventList[j].classId ;
			eventList[j].displaytext = eventList[j].eventTitle;
			eventList[j].displayinfo = 'Scheduled at ' + eventList[j].scheduleTime;
			eventList[j].imagePath = 'assets/images/Calendar_icon.png';
		}
		
		var bcList = $scope.dashboardDetails.object.broadcastedCommentList;

		for(i=0;i<bcList.length;i++){
			bcList[i].modifiedTime = bcList[i].postedTime;

			bcList[i].displaytype = 'Broadcast Message';
			
			bcList[i].type = 'cd';

			bcList[i].displaytext = bcList[i].commentText;

			bcList[i].displayinfo = bcList[i].picture;
			bcList[i].classId = bcList[i].subjectClass.classId;
			
			bcList[i].subjectClass = bcList[i].subjectClass;
			
			bcList[i].className = bcList[i].subjectClass.name;

			bcList[i].classColorCode = bcList[i].subjectClass.colorCode;

			bcList[i].commentId = bcList[i].commentId;

			bcList[i].imagePath = 'assets/images/Broadcast_icon.png';
		}
				
		var documentList = $scope.dashboardDetails.object.documentList;

		for(k=0;k<documentList.length;k++){
			documentList[k].displaytype = getDocType(documentList[k].type);
			//documentList[k].displaytext = documentList[k]. name + '.' + documentList[k].extension;

			documentList[k].displaytext = documentList[k].name;
			
			documentList[k].documentId = documentList[k].documentId;
			
			documentList[k].classId = documentList[k].classId;

			documentList[k].displayinfo = documentList[k].weekName + ' - ' + documentList[k].day + documentList[k].assignmentName;
			
			documentList[k].imagePath = 'assets/images/' +  documentList[k].type   + '.png' ;
			
			documentList[k].weekName = documentList[k].weekName;

			documentList[k].day = documentList[k].day;
			
			documentList[k].type = documentList[k].type;
			
			documentList[k].assignmentName = documentList[k].assignmentName;
		}
		
		$scope.recentDashboardDetails = eventList.concat(bcList).concat(documentList);
		$scope.processedDashboardDetails = angular.copy($scope.recentDashboardDetails);
	}
	
	$scope.navigateToClassHome= function(boardEntry) {
		$scope.$emit('navigateToClassHome',boardEntry);
	}	  
	
	function getDocType(type){
		var doctype = '';

		if(type == "Docs"){
			doctype = 'Document';
		} else if(type == "Audios"){
			doctype = 'Audio Lecture';
		} else if(type == "Videos"){
			doctype = 'Video Lecture';
		} else if(type == "Assignments"){
			doctype = 'Assignment';
		} else if(type == "Submissions"){
			doctype = 'Submission';
		} else if(type == "Grades"){
			doctype = 'Grade';
		} else if(type == "LectureNotes"){
			doctype = 'Lecture Note';
		}
		
		return doctype;
	}
	
}