function utilsController($scope,$rootScope, $http, globalvars) {
    var tabClasses;
    
    //$scope.classId = globalvars.setClassId(1321);
    $scope.myClasses = [];
	$scope.role = {};
    
    function initTabs() {
      tabClasses = ["","","","","","","","","","","","",""];
    }
	
	$scope.toggleLang = function ($scope) {
        $translate.uses() === 'en'? $translate.uses('zh_CN') : $translate.uses('en');
    };
    
    $scope.getTabClass = function (tabNum) {
      return tabClasses[tabNum];
		$scope.activeTabNumber = tabNum;
		$scope.style = function(value) {
          return { "background-color": value };
      }
    };
    
    $scope.getTabPaneClass = function (tabNum) {
      return "tab-pane " + tabClasses[tabNum];
    }
	
	$scope.$on('setMyClasses', function(e,myClasses) {
			alert("hello");
		 	$scope.myClasses = myClasses;
	 	}
	 );
    
    $scope.getTabData = function (tabNum) {
    	if(tabNum == 0){
        	//send event to get fist tab data
    		$scope.$broadcast('getDashBoardDetails');
    		$scope.myClasses = globalvars.getMyClasses();
			//alert($scope.myClasses.length);
        }
        if(tabNum == 1){
        	//send event to get fist tab data
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getComments','all');
			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see class wall.");
				}
				else{
					alert("Please add a class to see class wall. If you don't have class number, please contact your teacher to provide class number and password.");
				}
			}
        }
        else if(tabNum == 2){
        	//send event to get second tab data
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getFileDetails','ln');
			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see Lecture Notes.");
				}
				else{
					alert("Please add a class to see Lecture Notes. If you don't have class number, please contact your teacher to provide class number and password.");
				}
			}
        	
        }
        else if(tabNum == 3){
        	//send event to get third tab data
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getFileDetails','al');
			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see Audio Lectures.");
				}
				else{
					alert("Please add a class to see Audio Lectures. If you don't have class number, please contact your teacher to provide class number and password.");
				}
				
			}
        	
        }
        else if(tabNum == 4){
        	//send event to get fourth tab data
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getFileDetails','vl');
			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see Video Lectures.");
				}
				else{
					alert("Please add a class to see Video Lectures. If you don't have class number, please contact your teacher to provide class number and password.");
				}
			}
        	
        }
        else if(tabNum == 5){
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getFileDetails','dc');
			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see Documents.");
				}
				else{
					alert("Please add a class to see Documents. If you don't have class number, please contact your teacher to provide class number and password.");
				}
				
			}
        	
        }
        else if(tabNum == 6){
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getASGDetails','as');
			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see Assignments.");
				}
				else{
					alert("Please add a class to see Assignments. If you don't have class number, please contact your teacher to provide class number and password.");
				}
				
			}
        	
        }
        else if(tabNum == 7){
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getASGDetails','sub');
			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see Submissions.");
				}
				else{
					alert("Please add a class to see Submissions. If you don't have class number, please contact your teacher to provide class number and password.");
				}
			
			}
        	
        }
        else if(tabNum == 8){
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getASGDetails','gr');
			}
			else{
				if($scope.role == 'teacher'){
					$scope.setActiveTab(0);
					alert("Please create a class to see Grades.");
					
				}
				else{
					alert("Please add a class to see Grades. If you don't have class number, please contact your teacher to provide class number and password.");
				}
			}
        	
        }
        else if(tabNum == 9){
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getEventsDetails','ev');
 			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see Calendar.");
				}
				else{
					alert("Please add a class to see Calendar. If you don't have class number, please contact your teacher to provide class number and password.");
				}
			}
        }	
        else if(tabNum == 10){
        	//$scope.$broadcast('getClassSettings','cs');
			if($scope.myClasses.length !=0){
				$scope.$broadcast('getClassSettings','cs');
 			}
			else{
				if($scope.role == 'teacher'){
					alert("Please create a class to see class settings.");
				}
				else{
					alert("Please add a class to see class settings. If you don't have class number, please contact your teacher to provide class number and password.");
				}
			}
        }
    }
    
    $scope.setActiveTab = function (tabNum) {
		
      $rootScope.myProfile.show = false;
      initTabs();
      tabClasses[tabNum] = "active";
	  $scope.role = globalvars.getUserDetails().role;
	  $scope.myClasses = globalvars.getMyClasses();
	  $scope.getTabData(tabNum);
    };
    
    $scope.$on('goToClassHome', function(event,boardEntry) {
			var tabNum = 1;
			var type ='';
			if(boardEntry.type == "Docs"){
				tabNum = 5;
				type = 'dc'
			} else if(boardEntry.type == "Audios"){
				tabNum = 3;
				type = 'al';
			} else if(boardEntry.type == "Videos"){
				tabNum = 4;
				type = 'vl';
			} else if(boardEntry.type == "Assignments"){
				tabNum = 6;
				type = 'as';
			} else if(boardEntry.type == "Submissions"){
				tabNum = 7;
				type = 'sub';
			} else if(boardEntry.type == "Grades"){
				tabNum = 8;
				type = 'gr';
			} else if(boardEntry.type == "LectureNotes"){
				tabNum = 2;
				type = 'ln';
			} else if(boardEntry.type == "ev"){
				tabNum = 9;
			} else if(boardEntry.type == "cd"){
				tabNum = 1;
				type = 'cd';
			}
		
			$scope.classId = globalvars.setClassId(boardEntry.classId);
			
			var myClasses = globalvars.getMyClasses();
			
			var subjectClass = {};
			
			for(j=0;j<myClasses.length;j++){
				if(myClasses[j].subjectClass.classId == $scope.classId){
					subjectClass = myClasses[j].subjectClass;
				}
			}
			
			$("html, body").animate({scrollTop: 0}, "slow");
			
			$rootScope.$broadcast('udpateClassHeader',subjectClass);
		
			//$rootScope.$broadcast('getMyClasses');
			
			if(tabNum == 1){
				  $rootScope.myProfile.show = false;
			      initTabs();
			      tabClasses[tabNum] = "active";
			}else{
				$scope.setActiveTab(tabNum);
			}
			
			if(type == 'al' || type == 'vl' || type == 'ln' ||type == 'dc'){
				$rootScope.$broadcast('openFileTree',type,boardEntry.weekName,boardEntry.day,boardEntry.documentId);
			}
			
			if(type == 'as' || type == 'sub' || type == 'gr'){
				$rootScope.$broadcast('openASGTree',type,boardEntry.documentId);
			}
			
			if(type == 'cd'){
				$rootScope.$broadcast('showCommentDetails',boardEntry.commentId);
			}
		}
	);
    
    //Initialize 
    initTabs();
    $scope.setActiveTab(0);
}

