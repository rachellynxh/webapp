//The URIs of the REST endpoint
RAAURI = "https://prod-33.northeurope.logic.azure.com/workflows/b13ddba436a9439583d58f53f6870b0f/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yoUPbAheoLH2ANxMR1LWdFdyuO8dK5udlGoEVoeqq5Y";
CIAURI = "https://prod-42.northeurope.logic.azure.com/workflows/7650d876eeb847a19ed7de54bcceaff6/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=I_tkLmZzpaZGXm794FYyVULo4ei_voQIB7fd0SW_jm4";

DIAURI0 = "https://prod-16.northeurope.logic.azure.com/workflows/50a29c72d85b416bb81a24eabef64ccf/triggers/manual/paths/invoke/rest/v1/assets/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=44-WHN8KqqSyaKl70x13NjW2hNgmFsIZDhGYe4SuXIc";


//Handlers for button clicks
$(document).ready(function() {

 
  $("#retAssets").click(function(){

      //Run the get asset list function
      getAssetList();

  }); 

   //Handler for the new asset submission button
  $("#subNewForm").click(function(){

    //Execute the submit new asset function
    submitNewAsset();
    
  }); 
});

//A function to submit a new asset to the REST endpoint 
function submitNewAsset(){
  
 //Construct JSON Object for new item
 var subObj = {
  Title: $('#Title').val(),
  Rating: $('#Rating').val(),
  UserName: $('#UserName').val(),
  EmailAddress: $('#EmailAddress').val(),
  FirstName: $('#FirstName').val(),
  LastName: $('#LastName').val(),
  Comment: $('#Comment').val()
}
//Convert to a JSON String
subObj = JSON.stringify(subObj);
//Post the JSON string to the endpoint, note the need to set the content type header
$.post({
  url: CIAURI,
  data: subObj,
  contentType: 'application/json; charset=utf-8'
}).done(function (response) {
      getAssetList();
}); }

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getAssetList(){

  //Replace the current HTML in that div with a loading message
  $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  //Get the JSON from the RAA API 
  $.getJSON(RAAURI, function( data ) {

//Create an array to hold all the retrieved assets
var items = [];
//Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( data, function( key, val ) {
      items.push( "Title: " + val["Title"] + "<br />" + " Rating: " + val["Rating"] + "<br/>");
      items.push( "UserName: " + val["UserName"] + "<br />" + " Email: " + val["EmailAddress"]+ "<br/>");
      items.push( "First Name: " + val["FirstName"] + "<br/>");
      items.push( "Last Name: " + val["LastName"] + "<br/>");
      items.push( "Comment: " + val["Comment"] + "<br/>");
      items.push('<button type="button" id="subNewForm" class="btn btn-danger"  onclick="deleteAsset('+val["CommentID"] +')">Delete</button> <br/><br/>');
  });
      //Clear the assetlist div 
      $('#AssetList').empty();

      //Append the contents of the items array to the AssetList Div
      $( "<ul/>", {
        "class": "my-new-list",
        html: items.join( "" )
      }).appendTo( "#AssetList" );
    });
}

//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id){
  $.ajax({
    type: "DELETE",
    //Note the need to concatenate the
url: DIAURI0 + id + DIAURI1,
  }).done(function( msg ) {
    //On success, update the assetlist.
    getAssetList();
}); 

}
