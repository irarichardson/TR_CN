function classWallController($rootScope,$scope, $http, globalvars) {
	
	//$scope.friends = {};
	
//	$scope.getFriendList = function(userId) {
//		$scope.friends = getFriendList(userId);
//	};
	
	$scope.loading = true;
	
	$scope.isBroadcast = true;
	
	$scope.selectedComment = {};
	
	$scope.commentDetails = {};
	
	$scope.toggleLang = function ($scope) {
        $translate.uses() === 'en'? $translate.uses('zh_CN') : $translate.uses('en');
    };
		
	$scope.getCommentList = function(filterType) {
		
		$scope.loading = true;
        var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/comment-list",
     		data: {classId: globalvars.getClassId(), filterBy :filterType},
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'}
     	});

         request.success(
           function(data) {
		   $scope.totalDisplayed = 10;
		   $scope.loadMore = function (numberofitems) {
  		   $scope.totalDisplayed += 10;  
		   };
        	   $scope.comments =  data;
			   $scope.loading = false;
        	   $scope.switchToClassWall();
			   tabClasses[tabNum] = "active";
			   
           }
         );         
         request.error(
         	function(data, status) {
         		console.log(status);
				$scope.loading = false;
         		$scope.comments =  (data || "Request failed");				
         	}
         );
    };
	
	$scope.getSearchedCommentList = function(searchKeyword, filterType) {
        var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/comment-list",
     		data: {classId: globalvars.getClassId(), searchString :searchKeyword,  filterBy :filterType},
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'}
     	});

         request.success(
           function(data) {
		   $scope.totalDisplayed = 10;
		   $scope.loadMore = function (numberofitems) {
  		   $scope.totalDisplayed += 10;  
		   };
        	   $scope.comments =  data;
        	   $scope.switchToClassWall();
			   tabClasses[tabNum] = "active";
           }
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.comments =  (data || "Request failed");
         	}
         );
    };
  
    $scope.submitComment = function(commentText) {
      var request = $http({
   		method: "POST",
   		url: "http://54.201.216.190/TeachReach/api/service/comment/post-comment",
   		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
   		data : {classId:globalvars.getClassId(),commentText:commentText,broadcast:$scope.isBroadcast ,picture:"" }
   	  });

       request.success(
         function(data) {
        	 $scope.getCommentList('all');
			 $scope.$broadcast('getMyActivities',$scope.userDetails.userId);
			 $scope.commentText = null;
			 alert("The comment has been successfully submitted.");
         }
       );
       
       request.error(
       	function(data, status) {
       		console.log(status);
       		alert("The comment could not be submitted. Please try again.");
       		$scope.comments =  (data || "Request failed");
			$scope.getCommentList('all');
       	}
       );
  	};

	$scope.submitReply = function(cId, commentText) {
      var request = $http({
   		method: "POST",
   		url: "http://54.201.216.190/TeachReach/api/service/comment/post-comment",
   		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
   		data : {refCommentId:cId, classId:globalvars.getClassId(),commentText:commentText}
   	  });

       request.success(
         function(data) {
        	 //$scope.getCommentList('all');
			 //$scope.getCommentDetails(cId);
			 $scope.commentText = null;
			 $scope.showCommentDetails(cId);
        	 alert("The reply has been successfully submitted.");
         }
       );
       
       request.error(
       	function(data, status) {
       		console.log(status);
       		alert("The reply could not be submitted. Please try again.");
       		$scope.comments =  (data || "Request failed");
       	}
       );
  	};

	$scope.editComment = function(t,cId,commentText) {
      var request = $http({
   		method: "PUT",
   		url: "http://54.201.216.190/TeachReach/api/service/comment/edit-comment",
   		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
   		data : {imageChanged: false, type:t, commentId:cId, commentText:commentText, broadcast:$scope.isBroadcast, picture:""}
   	  });
		
       request.success(
         function(data) {
        	 $scope.commentText = null;
			 $scope.showCommentDetails(cId);
			 $("#editcommentpopup").modal('toggle');
        	 alert("The comment has been successfully updated.");
         }
       );
       
       request.error(
       	function(data, status) {
       		console.log(status);
       		alert("The comment could not be updated. Please try again.");
       		$scope.comments =  (data || "Request failed");
       	}
       );
  	};

	$scope.editReply = function(t,cId,rId,commentText) {
      var request = $http({
   		method: "PUT",
   		url: "http://54.201.216.190/TeachReach/api/service/comment/edit-comment",
   		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
   		data : {imageChanged: false, type:t, commentId:rId, commentText:commentText, broadcast:$scope.isBroadcast, picture:""}
   	  });
		
       request.success(
         function(data) {
        	 $scope.commentText = null;
			 $scope.showCommentDetails(cId);
			 $("#editreplypopup").modal('toggle');
        	 alert("The reply has been successfully updated.");
         }
       );
       
       request.error(
       	function(data, status) {
       		console.log(status);
       		alert("The reply could not be updated. Please try again.");
       		$scope.comments =  (data || "Request failed");
       	}
       );
  	};

  	$scope.showCommentDetails = function(cId){
  		$scope.commentDetails = {};
  		$scope.selectedComment = {};
  		$("#commentsWall").hide();
  		$scope.getCommentDetails(cId);
  	};
  	
  	$scope.switchToClassWall = function(){
  		$("#commentsWall").show();
  		$("#cD").hide();
  	};
  	
    $scope.getCommentDetails = function(cId) {
        var request = $http({
     		method: "GET",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/comment-details/" + cId,
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'}
     	  });

        	request.success(
                function(data) {
					$scope.totalDisplay = 5;
		   			$scope.loadMore = function (numberofitems) {
  		   			$scope.totalDisplay += 5;  
		   			};
             	   $scope.commentDetails =  data.object.commentReplies;
             	   $scope.selectedComment = data.object;
             	  $("#cD").show();
                }
              );
              
              request.error(
              	function(data, status) {
              		console.log(status);
              		$scope.commentDetails =  (data || "Request failed");
              	}
              );
    };
    
    $scope.likeUnlike= function(t,cId,status) {
        var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/like-comment",
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
     		data : {type:t,like:status,commentId:cId}
     	  });
        	request.success(
                function(data) {
                	$scope.getCommentDetails(cId);
                }
              );
              
              request.error(
              	function(data, status) {
              		console.log(status);
              	}
              );
    };
	
	$scope.likeUnlikeReply= function(t,cId,rId,status) {
        var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/like-comment",
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
     		data : {type:t,like:status,commentId:rId}
     	  });
        	request.success(
                function(data) {
                	$scope.getCommentDetails(cId);
                }
              );
              
              request.error(
              	function(data, status) {
              		console.log(status);
              	}
              );
    };
    
    $scope.reportUnreport= function(t,cId,status) {
        var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/report-comment",
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
     		data : {type:t,commentId:cId, reportComment:status}
     	  });

        	request.success(
                function(data) {
                	$scope.getCommentDetails(cId);
                }
              );
              
              request.error(
              	function(data, status) {
              		console.log(status);
              	}
              );
    };
	
	$scope.reportUnreportReply= function(t,cId,rId,status) {
        var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/report-comment",
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
     		data : {type:t,commentId:rId, reportComment:status}
     	  });

        	request.success(
                function(data) {
                	$scope.getCommentDetails(cId);
                }
              );
              
              request.error(
              	function(data, status) {
              		console.log(status);
              	}
              );
    };
	
	$scope.deleteComment= function(cId) {
        var request = $http({
     		method: "DELETE",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/delete-comment/" + cId + "/comment/",
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
     		data : {commentId:cId}
     	  });
		  
		  	request.success(
                function(data) {
					$("#deleteCommentPopup").modal('toggle');
                	$scope.getCommentList('all');								
					alert("The comment has been deleted successfully.");
                }
              );
              
              request.error(
              	function(data, status) {
              		console.log(status);
              	}
              );
    };
	
	$scope.deleteReply= function(cId,rId) {
        var request = $http({
     		method: "DELETE",
     		url: "http://54.201.216.190/TeachReach/api/service/comment/delete-comment/" + rId + "/reply/",
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
     		data : {}
     	  });
		  
		  	request.success(
                function(data) {
					$("#deleteReplyPopup").modal('toggle');
                	alert("The reply has been deleted successfully.");
					$scope.getCommentDetails(cId);
                }
              );
              
              request.error(
              	function(data, status) {
              		console.log(status);
              	}
              );
    };
    	
//	$scope.friendsFilterFunction = function(val) {
//		$scope.getFriendList(userId);
//		var items = $scope.friends.friendList;
//		for (var i = 0; i < items.length; i++) {
//		      var item = items[i];
//		      if ( val.user.userId == item.userId) {
//		        return true;
//		      }
//		    }   
//	};
	    
//	$scope.teacherFilterFunction = function(val) {
//		return (val.user.role == 'teacher' );
//	};
	
	$scope.$on('getComments', function(e,type) {
			$rootScope.myProfile.show = false;
			$scope.getCommentList(type);
		}
	);
	
	$scope.$on('showCommentDetails', function(e,cId) {
		$scope.showCommentDetails(cId);
	}
);
	
}