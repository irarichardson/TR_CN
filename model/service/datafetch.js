var app = angular.module('teachapp', []);

app.factory('teachReachService', function($rootScope, $http) {
    
    var teachReachService = {};
    teachReachService.myClasses = {};
    teachReachService.myActivites = {};
    
    teachReachService.getMyClasses = function() {
       var request = $http({
    		method: "GET",
    		url: "http://localhost:8080/TeachReachApplication/test3.html", 
    		//headers: {'Accept' :'application/json','Content-Type' :'application/json','authToken': '3bfba753a3424cc2a9be24bfe59781d8','Accept-Language': 'en'}
            //method: "get",
            //url: "http://54.201.216.190/TeachReach/api/service/class/view-classes",
        });

        request.success(
          function(data) {
        	  teachReachService.myClasses = [
                       {
							      "userClassId": {
							        "classId": 1321,
							        "userId": 190
							      },
							      "subjectClass": {
							        "classId": 1321,
							        "name": "Statistics",
							        "password": "qwerty",
							        "code": "MBA201",
							        "session": "Fall 2014",
							        "picture": "TeachReachHelper/Photos/Class/Statistics1406963025425.png",
							        "colorCode": "00ff00",
							        "createdTime": "2014-08-02 07:03:45"
							      },
							      "colorCode": "ff0000",
							      "addedTime": "2014-08-02 07:03:45",
							      "modifiedTime": "2014-08-02 09:49:32",
							      "requestStatus": "",
							      "updateCount": 0,
							      "deleted": true,
							      "pushNotification": false
						    },
						    {
							      "userClassId": {
							        "classId": 1322,
							        "userId": 190
							      },
							      "subjectClass": {
							        "classId": 1322,
							        "name": "Data Analysis",
							        "password": "qwerty",
							        "code": "MBA203",
							        "session": "Fall 2014",
							        "picture": "",
							        "colorCode": "4d8ada",
							        "createdTime": "2014-08-02 07:05:44"
							      },
							      "colorCode": "4d8ada",
							      "addedTime": "2014-08-02 07:05:44",
							      "modifiedTime": "2014-08-02 07:05:44",
							      "requestStatus": "",
							      "updateCount": 0,
							      "deleted": false,
							      "pushNotification": false
						    }
                  ];
          }
        );
        
        request.error(
        	function(data, status) {
        		console.log(status);
        		teachReachService.myClasses = data || "Request failed";
        	}
        );
    };
    
    teachReachService.getMyActivities = function() {
        var request = $http({
     		method: "GET",
     		url: "http://54.201.216.190/TeachReach/api/service/user/user-activities/190", 
     		headers: {'Accept' :'application/json','Content-Type' :'application/json','authToken': '3bfba753a3424cc2a9be24bfe59781d8','Accept-Language': 'en'}
             //method: "get",
             //url: "http://54.201.216.190/TeachReach/api/service/class/view-classes",
         });

         request.success(
           function(data) {
               teachReachService.myActivites = data.object;
           }
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		teachReachService.myActivites = data || "Request failed";
         	}
         );
     };

    return teachReachService;
});