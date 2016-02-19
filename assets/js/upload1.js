$(function(){
	 $("#edit").click(function(){
		  $("#box").show();
	 });
   $("#_testButton").click(loadPreviews_click);
})

function loadPreviews_click(e) {
       $("#upload").each(function() {
           var $input = $(this);
           var inputFiles = this.files;
	       if(inputFiles == undefined || inputFiles.length == 0) return;
	       var inputFile = inputFiles[0];
	       var reader = new FileReader();
	       reader.onload = function(event) {
	           alert(event.target.result);
	       };
	       reader.onerror = function(event) {
	           alert("I AM ERROR: " + event.target.error.code);
	       };
	       reader.readAsDataURL(inputFile);
       });
}