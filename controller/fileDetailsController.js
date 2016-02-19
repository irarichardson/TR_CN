function fileDetailsController($scope, $http,$filter, globalvars) {
	
	$scope.weekList = {};
	
	$scope.dayList = {};
	
	$scope.fileList = {};
	
	$scope.asgList = {};
	
	$scope.eventList = {};
	
	$scope.assignmentName = 'Assignment Title';
	
	$scope.assignmentUpload = false;
	
	$scope.gradesUpload = false;
	
	$scope.loading = true;
	
	$scope.toggleLang = function ($scope) {
        $translate.uses() === 'en'? $translate.uses('zh_CN') : $translate.uses('en');
    };
	
	$scope.showUploadButton = function(id,popupid) {
		$("#"+id).show();
		$("#"+popupid).modal('toggle');
	};
	
	$scope.showeditUploadASGButton = function(t,id) {
		$("#"+ "editASG"+ t + id).show();
		//$("#"+ "editASGassignmentpopup" + t + id).modal('toggle');
	};
	
	$scope.editASGupload = function(t,fileId,id) {
	       $("#"+"editUploadASG" + t + id).each(function() {
	           var $input = $(this);
	           var inputFiles = this.files;
		       if(inputFiles == undefined || inputFiles.length == 0) return;
		       var inputFile = inputFiles[0];
		       var reader = new FileReader();
		       reader.onload = function(event) {
		           var dataString = event.target.result;
		           
		           var firstPart =  dataString.split(',')[0];
		           var secondPart = dataString.split(',')[1];
		           
		           dataString = secondPart;
		           
		           var fileName = inputFile.name;
		           
		           var fileExtension = firstPart.split('/')[1].split(';')[0];
		           $scope.edituploadASG(t,"","",fileId,fileName,fileExtension,dataString);
		           $("#"+ "editASG"+ t + id).hide();
		       };
		       reader.onerror = function(event) {
		           alert("Try Again - ERROR: " + event.target.error.code);
		       };
		       reader.readAsDataURL(inputFile);
	       });
	};
	
	$scope.edituploadASG = function(type,week,day,fileId,fileName,fileExtension,dataString) {
		var paramtype = (type == 'as')?'Assignments':((type == 'sub')?'Submissions':'Grades');
	
		var fileUploadUrl = "http://54.201.216.190/TeachReach/api/service/document/update-file";
		
        var request = $http({
     		method: "PUT",
     		url: fileUploadUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'},
     		data: { classId: globalvars.getClassId(),documentChanged:true, name : fileName,documentString:dataString, type: paramtype, extension: fileExtension, weekName: week, day: day,documentId:fileId}
         });

         request.success(
           function(data) {
        	   $scope.uploadStatus = data.status;
        	   $scope.getASGList(type);
        	   alert('The file has been uploaded successfully.');
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.uploadStatus = data.status || "Request failed";
         		alert('The file could not be uploaded. Please try again.');
         });
	};
	
	$scope.upload = function(t,id,pid) {
	       $("#"+id).each(function() {
	           var $input = $(this);
	           var inputFiles = this.files;
		       if(inputFiles == undefined || inputFiles.length == 0) return;
		       var inputFile = inputFiles[0];
		       var reader = new FileReader();
		       reader.onload = function(event) {
		           var dataString = event.target.result;
		           
		           var firstPart =  dataString.split(',')[0];
		           var secondPart = dataString.split(',')[1];
		           
		           dataString = secondPart;
		           
		           var fileName = inputFile.name;
		           
		           var fileExtension = firstPart.split('/')[1].split(';')[0];
				   alert("Your file will be updated in the background and you will be notified on successful upload.");
		           $scope.uploadASG(t,"","",fileName,fileExtension,dataString);
		           $("#"+pid).hide();
		       };
		       reader.onerror = function(event) {
		           alert("Try Again - ERROR: " + event.target.error.code);
		       };
		       reader.readAsDataURL(inputFile);
	       });
	};
	
	$scope.uploadASG = function(type,week,day,fileName,fileExtension,dataString) {
		var paramtype = (type == 'as')?'Assignments':((type == 'sub')?'Submissions':'Grades');
		
		var asName = $scope.assignmentName;
		if(type == 'gr'){
			asName = "";
		}
		var fileUploadUrl = "http://54.201.216.190/TeachReach/api/service/document/upload-file";
		var request = $http({
     		method: "POST",
     		url: fileUploadUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'},
     		data: { classId: globalvars.getClassId(), name : fileName,documentString:dataString, type: paramtype, extension: fileExtension, weekName: week, day: day,assignmentName:asName}
         });

         request.success(
           function(data) {
        	   $scope.uploadStatus = data.status;
        	   $scope.getASGList(type);
        	   alert('The file has been uploaded successfully.');
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.uploadStatus = data.status || "Request failed";
         		alert('The file could not be uploaded. Please try again.');
         });
	};
	
	
	$scope.editWeek = function(index,type,oldValue,newValue) {
		//http://54.201.216.190/TeachReach/api/service/document/edit-weekName
		//PUT - Body - {"oldWeekName":"week1","weekName":"new Week 1","classId":"1321","type":"LectureNotes"}
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var editweekUrl = "http://54.201.216.190/TeachReach/api/service/document/edit-weekName";
		
        var request = $http({
     		method: "PUT",
     		url: editweekUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'},
			data: {oldWeekName:oldValue,weekName:newValue,classId:globalvars.getClassId(),type:paramtype}
         });

         request.success(
           function(data) {
        	   $scope.getWeekList(type);
			   $("#"+ type + "editweekmodalpopup" + index).modal('toggle');
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         	});
	};
		
	$scope.updateFile = function(fileObject,documentString) {
		//http://54.201.216.190/TeachReach/api/service/document/upload-file
		//PUT - {"documentId":"487","name":"myPdf","documentString":"jscakj","type":"LectureNotes","extension":"png","weekName":"Week 1","day":"Monday","documentChanged":true, ”assignmentName”:””}
		//POST - {"classId":"1321","name":"Scan_barcode","documentString":"sbajdbhchjsa","type":"Docs","extension":"png","weekName":"Week 1","day":"Monday"}
		var fileDeleteUrl = "http://54.201.216.190/TeachReach/api/service/document/delete-document/" + fileId;
		
        var request = $http({
     		method: "DELETE",
     		url: fileDeleteUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.deleteStatus = data.status;
        	   alert('Successfully deleted file with fileId-' + fileId);
        	   $scope.getWeekList(type);
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.deleteStatus = data.status || "Request failed";
         		alert('Delete failed for file with fileId-' + fileId);
         });
	};
	
	$scope.uploadFile = function(type,week,day,fileName,fileExtension,dataString) {
		//http://54.201.216.190/TeachReach/api/service/document/upload-file
		//PUT - {"documentId":"487","name":"myPdf","documentString":"jscakj","type":"LectureNotes","extension":"png","weekName":"Week 1","day":"Monday","documentChanged":true, ”assignmentName”:””}
		//POST - {"classId":"1321","name":"Scan_barcode","documentString":"sbajdbhchjsa","type":"Docs","extension":"png","weekName":"Week 1","day":"Monday"}
		$scope.loading = true;
		$scope.uploadBar = true;
		
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var fileUploadUrl = "http://54.201.216.190/TeachReach/api/service/document/upload-file";
		
        var request = $http({
     		method: "POST",
     		url: fileUploadUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'},
     		data: { classId: globalvars.getClassId(), name : fileName,documentString:dataString, type: paramtype, extension: fileExtension, weekName: week, day: day}
         });
		
         request.success(
           function(data) {
        	   $scope.uploadStatus = data.status;
        	   $scope.getWeekList(type);
			   $scope.uploadBar = false;
        	   alert('The file has been successfully uploaded.');
         });
         $scope.loading = false;
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.uploadStatus = data.status || "Request failed";
         		alert('The file could not be uploaded. Please try again.');
         });
	};
	
	
	$scope.uploadProgress = function (evt) {
        scope.$apply(function(){
            if (evt.lengthComputable) {
                $scope.progress = Math.round(evt.loaded * 100 / evt.total)
            } else {
                $scope.progress = 'unable to compute'
            }
        });
    };
	
	
	$scope.edituploadFile = function(fileId,type,week,day,fileName,fileExtension,dataString) {
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var fileUploadUrl = "http://54.201.216.190/TeachReach/api/service/document/update-file";
		
        var request = $http({
     		method: "PUT",
     		url: fileUploadUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'},
     		data: { classId: globalvars.getClassId(), name : fileName,documentString:dataString, type: paramtype, extension: fileExtension, weekName: week, day: day,documentChanged:true,documentId:fileId}
         });

         request.success(
           function(data) {
        	   $scope.uploadStatus = data.status;
        	   $scope.getWeekList(type);
        	   alert('The file has been successfully uploaded.');
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.uploadStatus = data.status || "Request failed";
         		alert('The file could not be uploaded. Please try again.');
         });
	};
	
	$scope.deleteFile = function(fileId,type,week,day) {
		//http://54.201.216.190/TeachReach/api/service/document/delete-document/487
		//DELETE 
		var fileDeleteUrl = "http://54.201.216.190/TeachReach/api/service/document/delete-document/" + fileId;
		
        var request = $http({
     		method: "DELETE",
     		url: fileDeleteUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.deleteStatus = data.status;
        	   alert('Successfully deleted file with fileId-' + fileId);
        	   $scope.getWeekList(type);
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.deleteStatus = data.status || "Request failed";
         		alert('Delete failed for file with fileId-' + fileId);
         });
		
	};
	
	$scope.deleteASGFile = function(fileId,type) {
		//http://54.201.216.190/TeachReach/api/service/document/delete-document/487
		//DELETE 
		var fileDeleteUrl = "http://54.201.216.190/TeachReach/api/service/document/delete-document/" + fileId;
		
        var request = $http({
     		method: "DELETE",
     		url: fileDeleteUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.deleteStatus = data.status;
        	   $scope.getASGList(type);
        	   alert('Successfully deleted file with fileId-' + fileId);
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.deleteStatus = data.status || "Request failed";
         		alert('Delete failed for file with fileId-' + fileId);
         });
		
	};
	
	$scope.deleteDay = function(type,week,day) {
		//http://localhost:8080/TeachReach/api/service/document/delete-day/1002/Audios/week2/Friday/true
		//DELETE 
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var dayDeleteUrl = "http://54.201.216.190/TeachReach/api/service/document/delete-day/" + globalvars.getClassId() + "/" + paramtype + "/" + week + "/" + day + "/true";
		
        var request = $http({
     		method: "DELETE",
     		url: dayDeleteUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.daydeleteStatus = data.status;
        	   alert('Successfully deleted day -' + day);
        	   $scope.getWeekList(type);
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.daydeleteStatus = data.status || "Request failed";
         		alert('Delete failed for file -' + day);
         });
	};
	
	$scope.deleteWeek = function(type,week) {
		//http://localhost:8080/TeachReach/api/service/document/delete-weekName/1002/LectureNotes/week1
		//DELETE 
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var weekDeleteUrl = "http://54.201.216.190/TeachReach/api/service/document/delete-weekName/" + globalvars.getClassId() + "/" + paramtype + "/" + week ;
		
        var request = $http({
     		method: "DELETE",
     		url: weekDeleteUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.weekdeleteStatus = data.status;
        	   alert('Successfully deleted week -' + week);
        	   $scope.getWeekList(type);
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.weekdeleteStatus = data.status || "Request failed";
         		alert('Delete failed for week -' + week);
         });
	};
	
	$scope.downloadFile = function(fileId) {
		//http://54.201.216.190/TeachReach/api/service/document/download-file/487
		//GET 
		var fileDownloadAPIUrl = "http://54.201.216.190/TeachReach/api/service/document/download-file/" + fileId;
		
        var request = $http({
     		method: "GET",
     		url: fileDownloadAPIUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   var url = "http://54.201.216.190" +  (data.object.filePath).split("webapps")[1];
        	   window.open(url,'_blank');
			   //window.open(url, '_self');
			   //window.location.href = url;
			   //window.location.assign(url, '_blank');
			   //return url;
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		//$scope.fStatus = data.status || "Request failed";
         		alert('Failed to download');
         });
	};
	
	$scope.showUploadFeature = function(type,pid,id){
			  $("#box"+type+pid+id).show();
	};
	
	$scope.showeditUploadFeature = function(type,ppid,pid,id){
			  $("#editbox"+type+ppid+pid+id).show();
	};

	$scope.editFile = function(fileId,t,ppid,pid,id,week,day) {
	       $("#editupload"+t+ppid+pid+id).each(function() {
	           var $input = $(this);
	           var inputFiles = this.files;
		       if(inputFiles == undefined || inputFiles.length == 0) return;
		       var inputFile = inputFiles[0];
		       var reader = new FileReader();
		       reader.onload = function(event) {
		           var dataString = event.target.result;
		           
		           var firstPart =  dataString.split(',')[0];
		           var secondPart = dataString.split(',')[1];
		           
		           dataString = secondPart;
		           
		           var fileName = inputFile.name;
		           
		           var fileExtension = firstPart.split('/')[1].split(';')[0];
		           //alert(type + ' ' +  week + ' ' + day + ' ' + fileExtension + ' ' + dataString);
		           if(t == 'al')
			       {
			        	   if(fileExtension != 'mp3' && fileExtension != 'aif' && fileExtension != 'aiff' && fileExtension != 'wma' && fileExtension != 'mpa' && fileExtension != 'mid' && fileExtension != 'm4a' && fileExtension != 'm3u' && fileExtension != 'wav'  && fileExtension != 'x-ms-wma'  && fileExtension != 'x-m4a'  && fileExtension != 'aac' )
                        //mp3==mp3
                        //aif==aiff
                        //aiff==aiff
                        //wma==x-ms-wma
                        //mpa==
                        //mid==mid
                        //m4a==x-m4a
                        //m3u==
                        //wav==
                        //aac==aac
			        	   {
			        		   alert("You can upload the files with the .mp3,.aif,.aiff,.wma,.mpa,.mid,.m4a,.m3u and .wav extensions only.");
			        		   $("#box"+t+pid+id).hide();
			        		   return;
			        	   }
			       }
		           else if(t == 'vl'){
			        	   if(fileExtension != 'mp4' && fileExtension != 'mpg' && fileExtension != 'wmv' && fileExtension != 'mov' && fileExtension != 'h264' && fileExtension != 'flv' && fileExtension != 'avi' && fileExtension != 'mpeg' && fileExtension != 'm4v' && fileExtension != '3gp'  && fileExtension != 'x-ms-wmv'  && fileExtension != 'quicktime'  && fileExtension != '3gpp' )
                        //mp4==mp4
                        //mpg==mpeg
                        //wmv==x-ms-wmv
                        //mov==quicktime
                        //h264==
                        //flv==
                        //avi==avi
                        //mpeg==mpeg
                        //m4v==mp4
                        //3gp==3gpp
			        	   {
			        		   alert("You can upload the files with the .mp4,.mpg,.wmv,.mov,.h264,.flv,.avi,.mpeg,.m4v and .3gp extensions only.");
			        		   $("#box"+t+pid+id).hide();
			        		   return;
			        	   }
		           }
		           else if(t == 'ln'){
			        	   if(fileExtension != 'pdf'  && fileExtension != 'doc'  && fileExtension != 'docx' && fileExtension != 'txt' && fileExtension != 'odt' && fileExtension != 'xls' && fileExtension != 'xlsx' && fileExtension != 'ppt' && fileExtension != 'pptx' && fileExtension != 'ods'&&fileExtension != 'ots'&& fileExtension != 'rtf'&& fileExtension != 'csv'&& fileExtension != 'pps'&& fileExtension != 'jpg'&& fileExtension != 'jpeg'&& fileExtension != 'png'&& fileExtension != 'bmp' && fileExtension != 'msword'  && fileExtension != 'vnd.openxmlformats-officedocument.wordprocessingml.document'  && fileExtension != 'plain'  && fileExtension != 'vnd.oasis.opendocument.text'  && fileExtension != 'vnd.ms-excel'  && fileExtension != 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'  && fileExtension != 'vnd.ms-powerpoint'  && fileExtension != 'vnd.openxmlformats-officedocument.presentationml.presentation'  && fileExtension != 'vnd.oasis.opendocument.spreadsheet'  && fileExtension != 'vnd.openxmlformats-officedocument.presentationml.slideshow')
                        //pdf==pdf
                        //doc==msword
                        //docx==vnd.openxmlformats-officedocument.wordprocessingml.document
                        //txt==plain
                        //odt==vnd.oasis.opendocument.text
                        //xls==vnd.ms-excel
                        //xlsx==vnd.openxmlformats-officedocument.spreadsheetml.sheet
                        //ppt==vnd.ms-powerpoint
                        //pptx==vnd.openxmlformats-officedocument.presentationml.presentation
                        //ods==vnd.oasis.opendocument.spreadsheet
                        //ots==
                        //rtf==msword
                        //csv==vnd.ms-excel
                        //pps==vnd.ms-powerpoint
                        //ppsx==vnd.openxmlformats-officedocument.presentationml.slideshow
                        //jpg==jpeg
                        //jpeg==jpeg
                        //png==png
                        //bmp==bmp
                        
			        	   {
			        		   alert("You can upload the files with the .pdf, .doc, .docx, .txt, .odt, .xls, .xlsx, .ppt, .pptx, .ods, .ots, .rtf, .csv, .pps, .jpg, .jpeg, .png and .bmp extensions only.");
			        		   $("#box"+t+pid+id).hide();
			        		   return;
			        	   }
		           }
		           else if(t == 'dc'){
		        	   if(fileExtension != 'pdf'  && fileExtension != 'doc'  && fileExtension != 'docx' && fileExtension != 'txt' && fileExtension != 'odt' && fileExtension != 'xls' && fileExtension != 'xlsx' && fileExtension != 'ppt' && fileExtension != 'pptx' && fileExtension != 'ods'&&fileExtension != 'ots'&& fileExtension != 'rtf'&& fileExtension != 'csv'&& fileExtension != 'pps'&& fileExtension != 'jpg'&& fileExtension != 'jpeg'&& fileExtension != 'png'&& fileExtension != 'bmp' && fileExtension != 'msword'  && fileExtension != 'vnd.openxmlformats-officedocument.wordprocessingml.document'  && fileExtension != 'plain'  && fileExtension != 'vnd.oasis.opendocument.text'  && fileExtension != 'vnd.ms-excel'  && fileExtension != 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'  && fileExtension != 'vnd.ms-powerpoint'  && fileExtension != 'vnd.openxmlformats-officedocument.presentationml.presentation'  && fileExtension != 'vnd.oasis.opendocument.spreadsheet'  && fileExtension != 'vnd.openxmlformats-officedocument.presentationml.slideshow')
                        //pdf==pdf
                        //doc==msword
                        //docx==vnd.openxmlformats-officedocument.wordprocessingml.document
                        //txt==plain
                        //odt==vnd.oasis.opendocument.text
                        //xls==vnd.ms-excel
                        //xlsx==vnd.openxmlformats-officedocument.spreadsheetml.sheet
                        //ppt==vnd.ms-powerpoint
                        //pptx==vnd.openxmlformats-officedocument.presentationml.presentation
                        //ods==vnd.oasis.opendocument.spreadsheet
                        //ots==
                        //rtf==msword
                        //csv==vnd.ms-excel
                        //pps==vnd.ms-powerpoint
                        //ppsx==vnd.openxmlformats-officedocument.presentationml.slideshow
                        //jpg==jpeg
                        //jpeg==jpeg
                        //png==png
                        //bmp==bmp
                    
                    
		        	   {
		        		   alert("You can upload the files with the .pdf, .doc, .docx, .txt, .odt, .xls, .xlsx, .ppt, .pptx, .ods, .ots, .rtf, .csv, .pps, .jpg, .jpeg, .png and .bmp extensions only.");
		        		   $("#box"+t+pid+id).hide();
		        		   return;
		        	   }
	           }
				   alert("Your file will be updated in the background and you will be notified on successful update/upload.");
		           $scope.edituploadFile(fileId,t,week,day,fileName,fileExtension,dataString);
		           $("#editbox"+t+ppid+ pid+id).hide();
		       };
		       reader.onerror = function(event) {
		           alert("Try Again - ERROR: " + event.target.error.code);
		       };
		       reader.readAsDataURL(inputFile);
	       });
	};
	
	$scope.addFile = function(t,pid,id,week,day) {
		
//$("#upload"+t+pid+id).bind('change', function() {
  //          alert('This file size is: ' + this.files[0].size/1024/1024 + "MB");
    //    });
		
	       $("#upload"+t+pid+id).each(function() {
	           var $input = $(this);
	           var inputFiles = this.files;
		       if(inputFiles == undefined || inputFiles.length == 0) return;
		       var inputFile = inputFiles[0];
			   var inputFileSize = inputFile.size;
			   alert('The file size is: ' + (inputFileSize/1024/1024).toFixed(2) + " MB. You can upload a file of maximum 30 MB in size.");
			   $scope.fileType = t;
			   $scope.uploadDay = day;
			   			   
		//	   if(inputFileSize/1024/1024 > '30')
		//	       {
		//	        	alert("You are not allowed to upload a file greater than 30 MB in size.");
		//	        	$("#box"+t+pid+id).hide();
		//	        	return;
		//	       }
			   
			   var reader = new FileReader();
		       reader.onload = function(event) {
		           var dataString = event.target.result;
		           
		           var firstPart =  dataString.split(',')[0];
		           var secondPart = dataString.split(',')[1];
		           
		           dataString = secondPart;
		           
		           var fileName = inputFile.name;
		           
		           var fileExtension = firstPart.split('/')[1].split(';')[0];
		           //alert(type + ' ' +  week + ' ' + day + ' ' + fileExtension + ' ' + dataString);
		           if(t == 'al')
			       {
			        	   if(fileExtension != 'mp3' && fileExtension != 'aif' && fileExtension != 'aiff' && fileExtension != 'wma' && fileExtension != 'mpa' && fileExtension != 'mid' && fileExtension != 'm4a' && fileExtension != 'm3u' && fileExtension != 'wav'  && fileExtension != 'x-ms-wma'  && fileExtension != 'x-m4a'  && fileExtension != 'aac' )
                        //mp3==mp3
                        //aif==aiff
                        //aiff==aiff
                        //wma==x-ms-wma
                        //mpa==
                        //mid==mid
                        //m4a==x-m4a
                        //m3u==
                        //wav==
                        //aac==aac
			        	   {
			        		   alert("You can upload the files with the .mp3,.aif,.aiff,.wma,.mpa,.mid,.m4a,.m3u and .wav extensions only.");
			        		   $("#box"+t+pid+id).hide();
			        		   return;
			        	   }
			       }
		           else if(t == 'vl'){
			        	   if(fileExtension != 'mp4' && fileExtension != 'mpg' && fileExtension != 'wmv' && fileExtension != 'mov' && fileExtension != 'h264' && fileExtension != 'flv' && fileExtension != 'avi' && fileExtension != 'mpeg' && fileExtension != 'm4v' && fileExtension != '3gp'  && fileExtension != 'x-ms-wmv'  && fileExtension != 'quicktime'  && fileExtension != '3gpp' )
                        //mp4==mp4
                        //mpg==mpeg
                        //wmv==x-ms-wmv
                        //mov==quicktime
                        //h264==
                        //flv==
                        //avi==avi
                        //mpeg==mpeg
                        //m4v==mp4
                        //3gp==3gpp
			        	   {
			        		   alert("You can upload the files with the .mp4,.mpg,.wmv,.mov,.h264,.flv,.avi,.mpeg,.m4v and .3gp extensions only.");
			        		   $("#box"+t+pid+id).hide();
			        		   return;
			        	   }
		           }
		           else if(t == 'ln'){
			        	   if(fileExtension != 'pdf'  && fileExtension != 'doc'  && fileExtension != 'docx' && fileExtension != 'txt' && fileExtension != 'odt' && fileExtension != 'xls' && fileExtension != 'xlsx' && fileExtension != 'ppt' && fileExtension != 'pptx' && fileExtension != 'ods'&&fileExtension != 'ots'&& fileExtension != 'rtf'&& fileExtension != 'csv'&& fileExtension != 'pps'&& fileExtension != 'jpg'&& fileExtension != 'jpeg'&& fileExtension != 'png'&& fileExtension != 'bmp' && fileExtension != 'msword'  && fileExtension != 'vnd.openxmlformats-officedocument.wordprocessingml.document'  && fileExtension != 'plain'  && fileExtension != 'vnd.oasis.opendocument.text'  && fileExtension != 'vnd.ms-excel'  && fileExtension != 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'  && fileExtension != 'vnd.ms-powerpoint'  && fileExtension != 'vnd.openxmlformats-officedocument.presentationml.presentation'  && fileExtension != 'vnd.oasis.opendocument.spreadsheet'  && fileExtension != 'vnd.openxmlformats-officedocument.presentationml.slideshow')
                        //pdf==pdf
                        //doc==msword
                        //docx==vnd.openxmlformats-officedocument.wordprocessingml.document
                        //txt==plain
                        //odt==vnd.oasis.opendocument.text
                        //xls==vnd.ms-excel
                        //xlsx==vnd.openxmlformats-officedocument.spreadsheetml.sheet
                        //ppt==vnd.ms-powerpoint
                        //pptx==vnd.openxmlformats-officedocument.presentationml.presentation
                        //ods==vnd.oasis.opendocument.spreadsheet
                        //ots==
                        //rtf==msword
                        //csv==vnd.ms-excel
                        //pps==vnd.ms-powerpoint
                        //ppsx==vnd.openxmlformats-officedocument.presentationml.slideshow
                        //jpg==jpeg
                        //jpeg==jpeg
                        //png==png
                        //bmp==bmp
                        
			        	   {
			        		   alert("You can upload the files with the .pdf, .doc, .docx, .txt, .odt, .xls, .xlsx, .ppt, .pptx, .ods, .ots, .rtf, .csv, .pps, .jpg, .jpeg, .png and .bmp extensions only.");
			        		   $("#box"+t+pid+id).hide();
			        		   return;
			        	   }
		           }
		           else if(t == 'dc'){
		        	   if(fileExtension != 'pdf'  && fileExtension != 'doc'  && fileExtension != 'docx' && fileExtension != 'txt' && fileExtension != 'odt' && fileExtension != 'xls' && fileExtension != 'xlsx' && fileExtension != 'ppt' && fileExtension != 'pptx' && fileExtension != 'ods'&&fileExtension != 'ots'&& fileExtension != 'rtf'&& fileExtension != 'csv'&& fileExtension != 'pps'&& fileExtension != 'jpg'&& fileExtension != 'jpeg'&& fileExtension != 'png'&& fileExtension != 'bmp' && fileExtension != 'msword'  && fileExtension != 'vnd.openxmlformats-officedocument.wordprocessingml.document'  && fileExtension != 'plain'  && fileExtension != 'vnd.oasis.opendocument.text'  && fileExtension != 'vnd.ms-excel'  && fileExtension != 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'  && fileExtension != 'vnd.ms-powerpoint'  && fileExtension != 'vnd.openxmlformats-officedocument.presentationml.presentation'  && fileExtension != 'vnd.oasis.opendocument.spreadsheet'  && fileExtension != 'vnd.openxmlformats-officedocument.presentationml.slideshow')
                        //pdf==pdf
                        //doc==msword
                        //docx==vnd.openxmlformats-officedocument.wordprocessingml.document
                        //txt==plain
                        //odt==vnd.oasis.opendocument.text
                        //xls==vnd.ms-excel
                        //xlsx==vnd.openxmlformats-officedocument.spreadsheetml.sheet
                        //ppt==vnd.ms-powerpoint
                        //pptx==vnd.openxmlformats-officedocument.presentationml.presentation
                        //ods==vnd.oasis.opendocument.spreadsheet
                        //ots==
                        //rtf==msword
                        //csv==vnd.ms-excel
                        //pps==vnd.ms-powerpoint
                        //ppsx==vnd.openxmlformats-officedocument.presentationml.slideshow
                        //jpg==jpeg
                        //jpeg==jpeg
                        //png==png
                        //bmp==bmp
                    
                    
		        	   {
		        		   alert("You can upload the files with the .pdf, .doc, .docx, .txt, .odt, .xls, .xlsx, .ppt, .pptx, .ods, .ots, .rtf, .csv, .pps, .jpg, .jpeg, .png and .bmp extensions only.");
		        		   $("#box"+t+pid+id).hide();
		        		   return;
		        	   }
	           }
				   alert("Your file will be uploaded in the background and you will be notified on successful upload.");
		           $scope.uploadFile(t,week,day,fileName,fileExtension,dataString);
		           $("#box"+t+pid+id).hide();
		       };
		       reader.onerror = function(event) {
		           alert("Try Again - ERROR: " + event.target.error.code);
		       };
		       reader.readAsDataURL(inputFile);
	       });
	};
	
	$scope.updateFile = function(type,week,day,docId) {
	       $("#editupload").each(function() {
	           var $input = $(this);
	           var inputFiles = this.files;
		       if(inputFiles == undefined || inputFiles.length == 0) return;
		       var inputFile = inputFiles[0];
		       var reader = new FileReader();
		       reader.onload = function(event) {
		           var dataString = event.target.result;
		           
		           var firstPart =  dataString.split(',')[0];
		           var secondPart = dataString.split(',')[1];
		           
		           dataString = secondPart;
		           
		           var fileExtension = firstPart.split('/')[1].split(';')[0];
		           alert(type + ' ' +  week + ' ' + day + ' ' + fileExtension + ' ' + docId + ' ' + dataString);
		           //addFile(fileObject,dataString)
		           $("#editbox").hide();
		       };
		       reader.onerror = function(event) {
		           alert("I AM ERROR: " + event.target.error.code);
		       };
		       reader.readAsDataURL(inputFile);
	       });
	};
	
	$scope.getWeekList = function(type) {
		$scope.loading = true;
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var weekListUrl = "http://54.201.216.190/TeachReach/api/service/document/weekName-list/" + globalvars.getClassId() + "/" + paramtype;
		
        var request = $http({
     		method: "GET",
     		url: weekListUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.weekList = data.object;
			   $scope.loading = false;
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.weekList = data || "Request failed";
				$scope.loading = false;
         });
	};
	  
	$scope.addWeek = function(type, newWeekName, index) {
  		var weekExists = $scope.weekList.some(function(week) {
    		return week.weekName === newWeekName;
  		});
  		if (weekExists) {
    		alert('The week already exists. Please add either new week or create a day under the week to add a file.');
  		}
  		else {
    		$scope.weekList.unshift({
      		weekName: newWeekName, 
      		modifiedTime: $filter('date')(new Date(), "h:mm a MMM d, yyyy")
    		});
  		}
  		$("#" + type + "weekmodalpopup").modal('toggle');
	};
	
	$scope.editDay = function(type,weekName,oldDayValue,newDayValue,customNewDayValue,parentindex,index) {
		//http://54.201.216.190/TeachReach/api/service/document/edit-day/1321/LectureNotes/new Week 1/Monday 1/Monday
		//PUT - Body - {"oldWeekName":"week1","weekName":"new Week 1","classId":"1321","type":"LectureNotes"}
		if(newDayValue == "Custom"){
			newDayValue = customNewDayValue;
		}
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var editDayUrl = "http://54.201.216.190/TeachReach/api/service/document/edit-day" + "/" + globalvars.getClassId() + "/" + paramtype + "/" + weekName + "/" +  newDayValue + "/" + oldDayValue;
		
        var request = $http({
     		method: "PUT",
     		url: editDayUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'},
		 });

         request.success(
           function(data) {
        	   $scope.getDayListForWeek(type,weekName);
			   $("#"+ type + "editdaymodalpopup" + parentindex + index).modal('toggle');
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
				alert("Updation failed");
				$("#"+ type + "editdaymodalpopup" + parentindex + index).modal('toggle');
         	});
	};
	
	
	$scope.addDay =  function(type,week,newDay,customnewday,index){
		if(newDay == "Custom"){
			newDay = customnewday;
		}
		var  dayobject =  {"day": newDay ,"modifiedTime": $filter('date')(new Date(), "h:mm a MMM d, yyyy")};
		var dayList = $scope.dayList[type + week];
		if(angular.isUndefined(dayList)){
			$scope.dayList[type + week] = {"object" : [{"day": newDay ,"modifiedTime": $filter('date')(new Date(), "h:mm a MMM d, yyyy")}]};
		}
		else{
		    $scope.dayList[type + week].object.splice(0, 0, dayobject);
		}
		if(!$("#collapse"+ type +index).hasClass("in")){
		    $("#collapse"+  type + index).addClass("in");
		 }
		//$("#collapseln"+index).addClass("in");
		$("#"+ type + "daymodalpopup" + index).modal('toggle');
		
		 $scope.status = {
    	isFirstOpen: true,
    	isFirstDisabled: false
  		};
	};
	
	$scope.getDayListForWeek = function(type,week) {
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var dayListUrl = "http://54.201.216.190/TeachReach/api/service/document/days-list/" + globalvars.getClassId() + "/" + paramtype + "/" + week;
		
        var request = $http({
     		method: "GET",
     		url: dayListUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.dayList[type + week] = data;
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.dayList[type + week] = data || "Request failed";
         });
	};
	
	$scope.getFileListForDay = function(type,week,day) {
		var paramtype = (type == 'ln')?'LectureNotes':((type == 'al')?'Audios':((type == 'vl')?'Videos':'Docs'));
		var fUrl = "http://54.201.216.190/TeachReach/api/service/document/document-list/"+globalvars.getClassId() + "/" + paramtype + "/" + week + "/" + day;
		
		 var request = $http({
	     		method: "GET",
	     		url: fUrl, 
	     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
	         });

         request.success(
           function(data) {
        	   $scope.fileList[type + day + week] = data;
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.fileList[type + day + week] = data || "Request failed";
         });	
	};	
	
	$scope.getASGList = function(type) {
		$scope.loading = true;
		var paramtype = (type == 'as')?'Assignments':((type == 'sub')?'Submissions':'Grades');
		var asgListUrl = "http://54.201.216.190/TeachReach/api/service/document/submissions-or-grades/" + globalvars.getClassId() + "/" + paramtype;
		
        var request = $http({
     		method: "GET",
     		url: asgListUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.asgList = data.object;
			   $scope.loading = false;
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.asgList = data || "Request failed";
				$scope.loading = false;
         });
	};
	
	$scope.getEvents = function(type) {
		$scope.loading = true;
		var eventsListUrl = "http://54.201.216.190/TeachReach/api/service/class/get-events/" + globalvars.getClassId();
		
        var request = $http({
     		method: "GET",
     		url: eventsListUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.eventList = data.object;
			   $scope.loading = false;
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.eventList = data || "Request failed";
				$scope.loading = false;
         });
	};
	
	$scope.handleCreateEvent = function(event) {
		//alert(newclass.name + "  " + newclass.code + "  " + newclass.password + "  " + newclass.session + "  " + newclass.color );
		//$scope.newClassMaster = angular.copy(newclass);
		var defaultForm = {
              name : "",
              date : "",
			  time : "",
              description: ""
		};
		
		var request = $http({
     		method: "POST",
     		url: "http://54.201.216.190/TeachReach/api/service/class/create-event", 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken , 'Accept-Language': 'en'},
     		data: {classId: globalvars.getClassId(),eventTitle:event.name,scheduleTime: event.date + " " + event.time ,eventDescription: event.description}
         });

         request.success(
           function(data) {
        	   $("#addEventPopup").modal('toggle');
			   alert("The event has been successfully created.");
        	   $scope.getEvents();
			   $scope.event = angular.copy(defaultForm);
			   
           	}
         );
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$("#addEventPopup").modal('toggle');
         		alert("The event could not be created. Please try again.");
				$scope.event = angular.copy(defaultForm);
         		//$scope.classes  =  data || "Request failed";
         	}
         );
     };
	
	$scope.deleteEvent = function(eventId) {
		
		var eventDeleteUrl = "http://54.201.216.190/TeachReach/api/service/class/delete-event/" + eventId;
		var request = $http({
     		method: "DELETE",
     		url: eventDeleteUrl, 
     		headers: { 'Accept' :'application/json','Content-Type' :'application/json', authToken:globalvars.getUserDetails().authToken, 'Accept-Language': 'en'}
         });

         request.success(
           function(data) {
        	   $scope.deleteStatus = data.status;
        	   $scope.getEvents();
        	   alert('Successfully deleted event with eventId-' + eventId);
         });
         
         request.error(
         	function(data, status) {
         		console.log(status);
         		$scope.deleteStatus = data.status || "Request failed";
         		alert('Delete failed for event with eventId-' + eventId);
         });
		
	};
	
	
	$scope.teacherFilterFunction = function(val) {
		return (val.user.role == 'teacher' );
	};
	
	$scope.$on('getFileDetails', function(event,type) {
			$scope.getWeekList(type);
		}
	);
	
	$scope.$on('getASGDetails', function(event,type) {
			$scope.getASGList(type);
		}
	);
	
	$scope.$on('getEventsDetails', function(event,type) {
		$scope.getEvents();
		}
	);
	
	$scope.$on('openFileTree', function(event,type,week,day,fileId) {
		$scope.getDayListForWeek(type,week);
		$scope.getFileListForDay(type,week,day);
		
		var index = 0;
		var indexDay = 0;
		
		window.setTimeout(function(){
			var weekList=  $scope.weekList;
			for(j=0;j<weekList.length;j++){
				if(weekList[j].weekName == week){
					index = j;
				}
			}
			
			if(!$("#collapse"+ type +index).hasClass("in")){
			    $("#collapse"+  type + index).addClass("in");
			}
		}, 2000);
		
		window.setTimeout(function(){
			var dayList=  $scope.dayList[type + week].object;
			for(k=0;k<dayList.length;k++){
				if(dayList[k].day == day){
					indexDay = k;
				}
			}
			
			 var paramtype = (type == 'al')?'Al':((type == 'vl')?'Vl':(type == 'dc')?'Dc':type);
			 
			if(!$("#collapseday"+ paramtype + index + indexDay ).hasClass("in")){
			    $("#collapseday"+  paramtype + index + indexDay ).addClass("in");
			}
		}, 3000);
		
		window.setTimeout(function(){
			var fileList=  $scope.fileList[type + day + week].object;
			var indexFile = 0;
			for(i=0;i<fileList.length;i++){
				if(fileList[i].documentId == fileId){
					indexFile = i;
				}
			}
			
			 var paramtype = (type == 'al')?'Al':((type == 'vl')?'Vl':(type == 'dc')?'Dc':type);
			 
			if(!$("#accordianfile"+ paramtype + index + indexDay + indexFile ).hasClass("highlight")){
			    $("#accordianfile"+  paramtype + index + indexDay + indexFile ).addClass("highlight");
			    $("html, body").animate({scrollTop: $("#accordianfile"+  paramtype + index + indexDay + indexFile).offset().top - 100}, "slow");
			}
		}, 5000);
		
	});
	
	$scope.$on('openASGTree', function(event,type,fileId) {
		
		window.setTimeout(function(){
			if(!$("#"+ type + fileId ).hasClass("highlight")){
			    $("#"+ type + fileId ).addClass("highlight");
			    $("html, body").animate({scrollTop: $("#"+ type + fileId).offset().top -100}, "slow");
			}
		}, 2000);
		
		}
	);
	
//	$scope.$on('navigateToClassHome', function(event,boardEntry) {
//		alert('hi ' + boardEntry.displaytype);
//		}
//	);
	
//	$scope.$on('getClassSettings', function(event,type) {
//			//$scope.getClassSettings(type);
//		}
//	);
	
}