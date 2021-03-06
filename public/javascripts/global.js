// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

  // Populate the user table on initial page load
  populateTable();

  // Username link click
$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

// Delete User link click
  $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

 // Add User button click
 $('#btnAddUser').on('click', addUser);
});

  
  

// Functions =============================================================

// Fill table with data
function populateTable() {

  // Empty content string
  var tableContent = '';

  // jQuery AJAX call for JSON
  $.getJSON( '/users/tasklist', function( data ) {

    // Stick our user data array into a userlist variable in the global object
userListData = data;

    // For each item in our JSON, add a table row and cells to the content string
    $.each(data, function(){
      tableContent += '<tr>';
      tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.assignee_dbf + '">' + this.assignee_dbf + '</a></td>';
      tableContent += '<td>' + this.task_dbf + '</td>';
      tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
      tableContent += '</tr>';
    });

    // Inject the whole content string into our existing HTML table
    $('#userList table tbody').html(tableContent);
  });
};

// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();
  
    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');
  
    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.assignee_dbf; }).indexOf(thisUserName);

     // Get our User Object
  var thisUserObject = userListData[arrayPosition];

  //Populate Info Box
  $('#taskInfoTask').text(thisUserObject.task_dbf);
  $('#taskInfoPriority').text(thisUserObject.priority_dbf);
  $('#taskInfoDueDate').text(thisUserObject.due_date_dbf);
  $('#taskInfoDependencies').text(thisUserObject.dependencies_dbf);

};

// Add User
function addUser(event) {
    event.preventDefault();
  
    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addUser input').each(function(index, val) {
      if($(this).val() === '') { errorCount++; }
    });
  
    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {
  
      // If it is, compile all user info into one object
      var newUser = {
        'assignee_dbf': $('#addUser fieldset input#inputUserName').val(),
        'task_dbf': $('#addUser fieldset input#inputUserEmail').val(),
        'completed_dbf': $('#addUser fieldset input#inputUserFullname').val(),
        'priority_dbf': $('#addUser fieldset input#inputUserAge').val(),
        'dependencies_dbf': $('#addUser fieldset input#inputUserLocation').val(),
        'due_date_dbf': $('#addUser fieldset input#inputUserGender').val()
      }
  
      // Use AJAX to post the object to our adduser service
      $.ajax({
        type: 'POST',
        data: newUser,
        url: '/users/adduser',
        dataType: 'JSON'
      }).done(function( response ) {
  
        // Check for successful (blank) response
        if (response.msg === '') {
  
          // Clear the form inputs
          $('#addUser fieldset input').val('');
  
          // Update the table
          populateTable();
        
  
        }
        else {
  
          // If something goes wrong, alert the error message that our service returned
          alert('Error: ' + response.msg);
  
        }
      });
    }
    else {
      // If errorCount is more than 0, error out
      alert('Please fill in all fields');
      return false;
    }
  };


  // My Function

  function myFunction() {
    console.log("You are a winner!")
  }


  /*  Delete User
function deleteUser(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this user?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

}; */
// Delete User
function deleteUser(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this user?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      populateTable();

    });

  }
  else {

    // If they said no to the confirm, do nothing
    return false;

  }

};