//The URIs of the REST endpoint
IUPS = "https://prod-21.northeurope.logic.azure.com:443/workflows/9afa0dfeaa394728b5b77adb78bc2dbb/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=vzm4Ac-prNM5zDlsQFj_T-qh6ZDFa-o7dKhJ2ks3hLo";
RAI = "https://prod-39.northeurope.logic.azure.com:443/workflows/b4a45f785aa54423ae31eca6be5f90aa/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=x2dpKs4z1Q2kBDUJOgFFo_I-zUglhwm1jd2bQLEn6jo";

BLOB_ACCOUNT = "https://omgshreb0779624.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function() {

 
  $("#retImages").click(function(){

      //Run the get asset list function
      getImages();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  //Create a form data object
submitData = new FormData();
//Get form variables and append them to the form data object
submitData.append('FileName', $('#FileName').val()); 
submitData.append('userID', $('#userID').val());
submitData.append('userName', $('#userName').val());
submitData.append('File', $("#UpFile")[0].files[0]);
//Post the form data to the endpoint, note the need to set the content type header
$.ajax({
  url: IUPS,
  data: submitData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType:false,
  processData:false,
  type: 'POST',
  success:function(data){

  }
});

}
 



//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages(){
//Replace the current HTML in that div with a loading message
$('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');
$.getJSON(RAI, function( data ) {
//Create an array to hold all the retrieved assets
var items = [];

//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
$.each( data, function( key, val ) {
items.push( "<hr />");
items.push("<video width='520' height ='360' controls>")
items.push("<source src='"+BLOB_ACCOUNT + val["filePath"] +"' type='video/mp4'><br />")
items.push("</video> <br />")
items.push( "Title : " + val["fileName"] + "<br />");
items.push( "Published by: " + val["userName"] + " (Age restriction: "+val["userID"]+")<br />");
items.push( "<hr />");
});
//Clear the assetlist div
$('#ImageList').empty();
//Append the contents of the items array to the ImageList Div
$( "<ul/>", {
"class": "my-new-list", html: items.join( "" )
}).appendTo( "#ImageList" ); });


 
}

