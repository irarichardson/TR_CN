function loginController($rootScope,$translate,$scope,$http,globalvars) {
    
	$scope.userDetails  = {};
	$scope.tempuserDetails  = {};
	
	$scope.isEditableProfile = false;
	$scope.userPictureString = '';
	
	$scope.loginId  = {};
	$scope.password  = {};
	$scope.role  = {};
	$scope.deviceToken  = {};
	
	$scope.currentClass  = {};
	$scope.tempcurrentClass  = {};
	
	$rootScope.myLanguage = '';
	
	$scope.profileDetails = {};
	
	$scope.settings = {
			showEmail  : false
	};
	
	$scope.settings  = {
			recieveNotifications  : false
	}; 
	
	$rootScope.myProfile = {
			show  : false
	};
	
	$scope.parseDate = function(dateString) {
		return Date.parse(dateString);
    };
	
	$rootScope.loginView = {
		    show  : true
	};
	
	$scope.loginoption = {
		    show  : true
	};
	
	$scope.$on('navigateToClassHome', function(event,boardEntry) {
		$scope.$broadcast('goToClassHome',boardEntry);
		}
	);
	
	$scope.$on('setMyClasses', function(event,myClasses) {
		alert(" in login controller");
		$rootScope.$broadcast('setMyClasses',myClasses);
		}
	);

	
	$scope.cleanData = function(){
		$scope.user = {};
		$scope.loginId  = {};
		$scope.password  = {};
		$scope.deviceToken  = {};
		$scope.currentClass  = {};
		$scope.tempcurrentClass  = {};
		$scope.tempuserDetails ={};
		$scope.$broadcast('dashboardDetails', null);
	//	$scope.processedDashboardDetails
	//	$scope.recentDashboardDetails = {};
	//	$scope.dashboardDetails = {};
	//	$scope.myClasses = [];
		$scope.$broadcast('weekList', null);
	
//		$scope.dayList = {};
//		$scope.fileList = {};
//		$scope.asgList = {};
//		$scope.eventList = {};
		
		sessionStorage.clear();
	};
	
	
/*	$rootScope.currentLanguageCode = localStorage.getItem("currentLanguageCode");
 
 		if($rootScope.currentLanguageCode=="en") {
			$rootScope.selectedLang='English';
			$translate.use('en');

		}
		else if($rootScope.currentLanguageCode=="zh_CN") {
		   $rootScope.selectedLang='Chinese';
		   $translate.use('zh_CN');
		}
		else if($rootScope.currentLanguageCode==undefined || $rootScope.currentLanguageCode=='') {
		   $rootScope.selectedLang='English';
		   $translate.use('en');
		   localStorage.setItem("currentLanguageCode",'en');
		   $rootScope.currentLanguageCode='en';
		   }

	$scope.changeLanguage = function (language) {
		if(language!=$rootScope.selectedLang) {
			localStorage.setItem("currentLanguageCode",language);
			$route.reload();
			}
	};
	
	$scope.toggleLang = function ($scope) {
        $translate.uses() === 'en'? $translate.uses('zh_CN') : $translate.uses('en');
    };
	*/
	$scope.selectedLang = "English";
	
	$scope.changeLanguage = function(lang) {
        $translate.uses(lang)
		if(lang == 'en') {
			$scope.selectedLang = "English";
			$rootScope.myLanguage = "en";
		}
		else if(lang == 'zh_CN') {
        	$scope.selectedLang = "Chinese";
			$rootScope.myLanguage = "zh_CN";
         	   }
		else if(lang == 'de') {
        	$scope.selectedLang = "German";
			$rootScope.myLanguage = "de";
		}
		
	};
	
	
	$scope.flagClass = 'flag-england';
	
/*	$scope.flagClass = function(lang) {
		
		
		if(lang == 'en') {
			$scope.flagClass = "flag-england";
		}
		else if(lang == 'zh_CN') {
        	$scope.flagClass = "flag-cn";
         	   }
		else if(lang == 'de') {
        	$scope.flagClass = "flag-de";
		}
        return flagClass;
    }; */
	
	$scope.registerClickHandle = function() {
		$scope.cleanData();
		$("#loginDetailsScreen").hide();
		$("#userRegisterScreen").show();
		$("#forgotPasswordScreen").hide();
	};

	$scope.register = function(role) {
		$scope.cleanData();
		$("#roleSelectScreen").hide();
		$("#userRegisterScreen").show();
		$("#forgotPasswordScreen").hide();
		$scope.role  = role;
	};

	$scope.forgotpasswordClickHandle = function() {
		$scope.cleanData();
		$("#loginDetailsScreen").hide();
		$("#userRegisterScreen").hide();
		$("#forgotPasswordScreen").show();
	};
	
	$scope.loginClickHandle = function() {
		$scope.cleanData();
		$("#loginDetailsScreen").show();
		$("#userRegisterScreen").hide();
		$("#forgotPasswordScreen").hide();
	};
	
	$scope.login = function(role) {
		$scope.cleanData();
		$("#loginDetailsScreen").show();
		$("#roleSelectScreen").hide();
		$("#forgotPasswordScreen").hide();
		$scope.role  = role;
	};
	
	$scope.switchToSettings = function() {
		$rootScope.dashboard.show = false;
		$rootScope.myProfile.show = true;
		//$scope.getProfileSettings();
	};
	
	$scope.gotoLoginView = function() {
		   $scope.loginView.show = true;
		   $scope.cleanData();
		   $("#roleSelectScreen").show();
		   $("#loginDetailsScreen").hide();
		   $("#userRegisterScreen").hide();
		   $("#forgotPasswordScreen").hide();
	};
	
	$scope.getProfileSettings = function() {
    	var request = $http({
     		method: "GET",
     		url: "http://54.201.216.190/TeachReach/api/service/user/profile-details", 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:$rootScope.myLanguage , 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.userDetails = data.object;
			   $scope.tempuserDetails = angular.copy($scope.userDetails);
           }
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         	}
         );
	 };
	 
	 $scope.updateProfile = function() {
		$scope.updateUserDetails();
		$scope.updateSettings();
	 };
	 
	 $scope.uploadUserPic = function(files) {
    	 var files = !!files ? files : [];
	        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
	 
	        if (/^image/.test( files[0].type)){ // only image file
	            var reader = new FileReader(); // instance of the FileReader
	            reader.readAsDataURL(files[0]); // read the local file
	 
	            reader.onload = function(event) {
			           var dataString = event.target.result;
			           
			           $('#userimagePreview')
	                   .attr('src', dataString)
	                   .width(100)
	                   .height(100);
					
					$('#userimagePreview2')
	                   .attr('src', dataString)
	                   .width(100)
	                   .height(100);
			           
			           var firstPart =  dataString.split(',')[0];
			           var secondPart = dataString.split(',')[1];
			           
			           dataString = secondPart;
			           
			           $scope.userPictureString = dataString;	          
	            }
	        }
    };
	 
	 $scope.updateUserDetails = function() {
    	var request = $http({
     		method: "PUT",
     		url: "http://54.201.216.190/TeachReach/api/service/user/profile-details", 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
    	 	data: {picture:$scope.userPictureString,lastName: $scope.tempuserDetails.lastName, university:$scope.tempuserDetails.university,website:$scope.tempuserDetails.website,session:$scope.tempuserDetails.session,authToken:globalvars.getUserDetails().authToken,gender:$scope.tempuserDetails.gender,userName:$scope.tempuserDetails.userName,firstName:$scope.tempuserDetails.firstName,biography:$scope.tempuserDetails.biography}
         });

    	request.success(
           function(data) {
        	  $scope.userDetails = data.object;
			  $scope.tempuserDetails = angular.copy($scope.userDetails);
    		  globalvars.setUserDetails($scope.userDetails);
           }
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.cleanData();
         		alert("Update Failed");
         		$scope.userDetails  =  data || "Request failed";
         	}
         );
    	    	
	};
	 
	 
	 $scope.updateSettings = function() {
		 var request = $http({
	     		method: "POST",
	     		url: "http://54.201.216.190/TeachReach/api/service/user/save-user-settings", 
	     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
	     		data: {"languageCode":"en",showEmail:$scope.settings.showEmail  , pushNotification: $scope.settings.recieveNotifications}
	         });

	         request.success(
	           function(data) {
	        		$scope.isEditableProfile = true;
	        		//$scope.getProfileSettings();
	        	    $scope.isEditableProfile = false;
					alert(data.message);
				}
	         );
	         
	         request.error(
	         	function(data, status) {
	         		console.log(status);
	         	}
	         );
	 };
	
	$scope.logoutUser = function() {
        
    	var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/user/logout", 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.userDetails = data.object;
			   $scope.cleanData();
        	   $scope.loginView.show = true;
        	   $scope.loginoption.show = true;
        	   $scope.loginId = {};
        	   $scope.password  = {};
			   $rootScope.$broadcast('weekList', null);
			   sessionStorage.clear();
        	   $rootScope.loginView.show = true;
        	   $("#loginDetailsScreen").hide();
   			   $("#roleSelectScreen").show();
   			   $("#userRegisterScreen").hide();
			   $("#forgotPasswordScreen").hide();
   	       	   alert("You have been logged out successfully.");
           }
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.userDetails  =  data || "Request failed";
         		alert("Logout Failed");
         	}
         );
	};
	
	$scope.registerUser = function(user) {
    	var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/user/sign-up-user", 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
    	    data: { firstName: user.firstName, lastName : user.lastName,emailId:user.emailId,password:user.password,picture:$scope.userPictureString,userName:user.screenName, deviceToken:"",role: $scope.role}
         });

    	request.success(
           function(data) {
			   $("html, body").animate({scrollTop: 0 }, "slow");
			   $scope.userRole = $scope.role;
        	   $scope.userDetails = data.object;
			   $scope.tempuserDetails = angular.copy($scope.userDetails);
    		   globalvars.setUserDetails($scope.userDetails);
    	       $rootScope.loginView.show = false;
        	   $scope.$broadcast('getDashBoardDetails');
			   $scope.$broadcast('getMyActivities',$scope.userDetails.userId);
        	   $scope.$broadcast('getMyClasses');
           }
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.cleanData();
         		alert("Registration Failed");
         		$scope.userDetails  =  data || "Request failed";
         	}
         );
    	    	
	};
	
	
	$scope.myImage = function($scope) {
    	$scope.myImage='';
    	$scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
  };
	
	
	//Forgot Password Function
	$scope.forgotpasswordUser = function(userInfo) {
    	var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/user/forgot-password", 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', 'Accept-Language': 'en'},
    	    data: { emailId:userInfo.emailId,deviceToken:"",role: $scope.role}
         });

    	request.success(
           function(data) {
        	   $scope.login($scope.role);
        	   alert("The password has been sent to your registered email ID.");
           }
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.cleanData();
         		alert("The password could not be sent. Please try again.");
			}
         );
    	    	
	};
	
	$scope.gotoHome = function(){
		 $scope.$broadcast('getDashBoardDetails',$scope.userDetails.authToken);
	};
	
	 $scope.$on('udpateClassHeader', function(e,subjectClass) {
		 $scope.currentClass  = subjectClass;
		 $scope.tempcurrentClass  = angular.copy($scope.currentClass);
	 	}
	 );
	
	$scope.loginUser = function() {
    	//alert('id - '  + $scope.loginId + ' - password - ' + $scope.password + '- role - ' + $scope.role);
        
    	var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/user/validate-login", 
     		headers: {'Accept' :'application/json','Content-Type' :'application/json','Accept-Language': 'en'},
          	data: { emailId: $scope.loginId, password : $scope.password,deviceToken:'', role: $scope.role}
             //url: "http://54.201.216.190/TeachReach/api/service/class/view-classes",
         });

         request.success(
           function(data) {
        	   $scope.userDetails = data.object;
			   $scope.tempuserDetails = angular.copy($scope.userDetails);
    		   globalvars.setUserDetails($scope.userDetails);
    	       $rootScope.loginView.show = false;
    	       	$rootScope.$broadcast('getTabClass','0');
			   	$scope.$broadcast('getDashBoardDetails');
        	    $scope.$broadcast('getMyActivities',$scope.userDetails.userId);
        	    $scope.$broadcast('getMyClasses');
			    $scope.$broadcast('getDashBoardDetails');
			   	
           }
         );
         
         request.error(
         	function(data, status) {
				console.log(status);
         	//	$scope.loginId  = {};
         		$scope.password  = {};
         		//alert(data.error.message);
				alert("Please enter the email and/or password.");
         		$scope.userDetails  =  data || "Request failed";
         	}
         );
    	
    	
     };

}