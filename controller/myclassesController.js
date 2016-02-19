function myclassesController($scope,$rootScope, $http,globalvars) {
	
	$scope.isEditable = false;
	
	$scope.pictureString = '';
	
	$scope.selectedClass = null;
	
	$scope.parseDate = function(dateString) {
        return Date.parse(dateString);
    };
    
    $scope.updateClassWall = function(subjectClass) {
    	$("html, body").animate({scrollTop: 0 }, "slow");
    	$scope.classId = globalvars.setClassId(subjectClass.classId);
    	//$rootScope.$emit('getComments','all');
    	$rootScope.$broadcast('getComments','all');
    	$rootScope.$broadcast('filterRecentUpdates');
    	$rootScope.$broadcast('udpateClassHeader',subjectClass);
		$scope.selectedClass = subjectClass;
		//$rootScope.$broadcast('getMyClasses');

    };
	
	$scope.scrollToTop = function() {
		$("html, body").animate({scrollTop: 10 }, "slow");
	};
	
	$scope.classes  = [];
	
	$scope.newClassMaster = {};
	
	$scope.$on('getMyClasses', function(e) {
		getMyClasses();
	});
	
	$scope.addPicture = function() {
	       $("#uploadPic").each(function() {
	           var $input = $(this);
	           var inputFiles = this.files;
		       if(inputFiles == undefined || inputFiles.length == 0) return;
		       var inputFile = inputFiles[0];
		       var reader = new FileReader();
		       reader.onload = function(event) {
		           var dataString = event.target.result;
		           
		           $('#imagePreview')
                   .attr('src', dataString)
                   .width(100)
                   .height(100);
				   
				   $('#imagePreview2')
                   .attr('src', dataString)
                   .width(100)
                   .height(100);
		           
		           var firstPart =  dataString.split(',')[0];
		           var secondPart = dataString.split(',')[1];
		           
		           dataString = secondPart;
		           
		           var fileName = inputFile.name;
		           
		           var fileExtension = firstPart.split('/')[1].split(';')[0];
		       };
//		       reader.onloadend = function(){ // set image data as background of div
//	                $("#imagePreview").attr("src", "url("+this.result+")");
//	            }
		       reader.onerror = function(event) {
		           alert("Try Again - ERROR: " + event.target.error.code);
		       };
		       reader.readAsDataURL(inputFile);
	       });
	};
	
	$scope.reset = function() {
        $scope.newclass = angular.copy($scope.newClassMaster);
    };
    
    $scope.showModal = false;
    
    $scope.colors = [
      {
        value: 'df2a2f',
        label: '#df2a2f'
      },
      {
          value: 'ea3c9e',
          label: '#ea3c9e'
      },
      {
          value: 'cb5ed1',
          label: '#cb5ed1'
      },
      {
          value: '9629f4',
          label: '#9629f4'
      },
      {
          value: '4d8ada',
          label: '#4d8ada'
      },
      {
          value: '2cc3e2',
          label: '#2cc3e2'
      },
      {
          value: '29d196',
          label: '#29d196'
      },
      {
          value: '7ad64d',
          label: '#7ad64d'
      },
      {
          value: 'd6d062',
          label: '#d6d062'
      },
      {
          value: 'eaa23c',
          label: '#eaa23c'
      },
      {
          value: '4f2551',
          label: '#4f2551'
      },
      {
          value: 'bb1a38',
          label: '#bb1a38'
      },
      {
          value: '1c9168',
          label: '#1c9168'
      },
      {
          value: '0d004c',
          label: '#0d004c'
      },
      {
          value: 'a82415',
          label: '#a82415'
      },
      {
          value: 'f1c40f',
          label: '#f1c40f'
      }
    ];
   
    $scope.reset();
    
    $scope.handleAddClass = function(myclass) {
		//alert(newclass.name + "  " + newclass.code + "  " + newclass.password + "  " + newclass.session + "  " + newclass.color );
		$scope.newClassMaster = angular.copy(myclass);
		
		var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/class/add-class", 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
     		data: {classNumber:myclass.number,password:myclass.password,pushNotification:false }
         });

         request.success(
           function(data) {
        	   $("#addClassPopup").modal('toggle');
        	   alert("Congratulations!!! The class has been successfully added.");
			   getMyClasses();
           	}
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$("#addClassPopup").modal('toggle');
         		alert("Sorry!!! The class could not be added. Please try again or contact the teacher.");
         		//$scope.classes  =  data || "Request failed";
         	}
         );
     };
    
     $scope.uploadPic = function(files) {
    	 var files = !!files ? files : [];
	        if (!files.length || !window.FileReader) return; // no file selected, or no FileReader support
	 
	        if (/^image/.test( files[0].type)){ // only image file
	            var reader = new FileReader(); // instance of the FileReader
	            reader.readAsDataURL(files[0]); // read the local file
	 
	            reader.onload = function(event) {
			           var dataString = event.target.result;
			           
			           $('#imagePreview')
	                   .attr('src', dataString)
	                   .width(100)
	                   .height(100);
					
					   $('#imagePreview2')
	                   .attr('src', dataString)
	                   .width(100)
	                   .height(100);
			           
			           var firstPart =  dataString.split(',')[0];
			           var secondPart = dataString.split(',')[1];
			           
			           dataString = secondPart;
			           
			           $scope.pictureString = dataString;	          
	            }
	        }
    };
    
	
	$scope.handleCreateClass = function(newclass) {
		//alert(newclass.name + "  " + newclass.code + "  " + newclass.password + "  " + newclass.session + "  " + newclass.color );
		$scope.newClassMaster = angular.copy(newclass);
		$scope.loading = true;
		
		var request = $http({
    		method: "POST",
    		url: "http://54.201.216.190/TeachReach/api/service/class/create-class", 
    		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
			    data: {name:newclass.name,password:newclass.password,code:newclass.code,session:newclass.session,picture:$scope.pictureString,colorCode:newclass.color,pushNotification:false }
        });

        request.success(
          function(data) {
       	   $("#createClassPopup").modal('toggle');
       	   alert("Congratulations!!! The class has been successfully created.");
		   getMyClasses();
		   $scope.loading = false;
          	}
        );
        
        request.error(
        	function(data, status) {
        		console.log(status);
        		$("#createClassPopup").modal('toggle');
        		alert("The class could not be created. Please try again.");
        		//$scope.classes  =  data || "Request failed";
				$scope.loading = false;
        	}
        );
		       
     };
     
     $scope.updateClass = function(cClass) {
 		
         var request = $http({
      		method: "PUT",
      		url: "http://54.201.216.190/TeachReach/api/service/class/edit-class", 
      		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'},
         	data :{picture:$scope.pictureString,session: cClass.session,classId:cClass.classId,name:cClass.name,pushNotification:false,code:cClass.code,colorCode:cClass.colorCode,password:cClass.password}
          });

          request.success(
            function(data) {
         	   $scope.updateStatus = data.status;
			   $scope.isEditable = false;
         	   alert('The class details have been successfully updated.');
		   	   $rootScope.$broadcast('getMyClasses');
			   getMyClasses();
			
          });
          
          request.error(
          	function(data, status) {
          		console.log(status);
          		$scope.updateStatus = data.status || "Request failed";
          		alert('Class updation failed');
          });
 	};
 	    
	$scope.handleDeleteClass = function(classId) {
		
		$scope.newClassMaster = angular.copy($scope.classes[0].subjectClass);
		
		var request = $http({
    		method: "DELETE",
    		url: "http://54.201.216.190/TeachReach/api/service/class/delete-class/"  + classId, 
    		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
        });

        request.success(
          function(data, status) {
			//$rootScope.$apply(function() {
  			// remove the item from the array 
		//	});
       	  $("#deleteClassPopup").modal('toggle');
		  alert('The class has been successfully deleted.');
		  $rootScope.$broadcast('getMyClasses');
		  getMyClasses();
			 // $scope.$parent.getMyClasses(); //Add Either this or the below one
			  
	//	$timeout( function () {
    		// broadcast down to all directive children
    //	$scope.$broadcast('getMyClasses');
	//	}, 1);
			  
          	}
        );
        
        request.error(
        	function(data, status) {
        		console.log(status);
        		$("#deleteClassPopup").modal('toggle');
        		alert("The class could not be deleted. Please try again.");
        		//$scope.classes  =  data || "Request failed";
        	}
        );
		       
     };
	
    function getMyClasses() {
    	$scope.loading = true;
		$scope.classes = {};
    	var request = $http({
     		method: "GET",
     		url: "http://54.201.216.190/TeachReach/api/service/class/view-classes", 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.classes = data.object;
			   $scope.classId = globalvars.setClassId($scope.classes[0].subjectClass.classId);
        	   //$rootScope.$emit('getComments','all');
	           $rootScope.$broadcast('getComments','all');
	           $rootScope.$broadcast('udpateClassHeader',$scope.classes[0].subjectClass);
	           window.setTimeout(function() {
	        	   $rootScope.$broadcast('filterRecentUpdates');
	           }, 500);
        	   globalvars.setMyClasses(data.object);
			   $rootScope.$emit('setMyClasses',data.object);
			   $scope.loading = false;
			  // $scope.apply();
           	}
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.classes  =  [];
         		globalvars.setMyClasses($scope.classes);
         		if($scope.classes.length == 0){      		   
         		   $("#classwallTabs").prop( "disabled", true );
         		   function notify() {
         			   alert( "Add or create class to see element content" );
         			 }
         	   }
         	   else{
         		   $("#classwallTabs").prop( "disabled", false );
         	   }
         	$scope.loading = false;  
         	}
         );
     };
     

}