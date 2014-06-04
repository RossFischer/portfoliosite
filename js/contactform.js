//prevents clicking in error state
$('body').on('click', 'a.disabled', function(event) {
    event.preventDefault();
});

// Validate name
		  function validateName(x){
	var re = /[A-Za-z -']$/;

	if(re.test(document.getElementById(x).value)){
	  document.getElementById(x).style.background ='#282828';
	  document.getElementById(x + 'Error').style.display = "none";
	  $('#submitter').removeClass('disabled');
	  return true;
	}else{
	  document.getElementById(x).style.background ='#e05152';
	  document.getElementById(x + 'Error').style.display = "block";
	  $('#submitter').addClass('disabled');
	  return false; 
	}
} 
// Validate email
			function validateEmail(email){ 
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if(re.test(email)){
	  document.getElementById('email').style.background ='#282828';
	  document.getElementById('emailError').style.display = "none";
	  $('#submitter').removeClass('disabled');
	  return true;
	}else{
	  document.getElementById('email').style.background ='#e35152';
	  document.getElementById('emailError').style.display = "block";
	  $('#submitter').addClass('disabled');
	  return false;
	}
}

			function validateForm(){

//  document.getElementById('spin').style.display = "block";
$('#submitter').html("<img src='images/processing.gif' class='loading' />   Sending...")

 // Set error catcher
var error = 0;
// Check name
if(!validateName('name')){
 	document.getElementById('nameError').style.display = "block";
	$('#submitter').addClass('disabled');
  error++;
}
// Check email
if(!validateEmail(document.getElementById('email').value)){
 	document.getElementById('emailError').style.display = "block";
	$('#submitter').addClass('disabled');
  error++;
}
// Don't submit form if there are errors
if(error > 0){
$('#submitter').html("Send Message")
  return false;
}


var name = $("input#name").val();
var email = $("input#email").val();
var subject = $("input#subject").val();
var message = $("textarea#message").val();

var dataString = 'name='+ name + '&email=' + email + '&subject=' + subject + '&message=' + message;
//alert (dataString);return false;
$.ajax({
  type: "POST",
  url: "contact.php",
  data: dataString,
  success: function() {
  document.getElementById('cta').style.display = "none";
   $('#contact_form').html("<div id='message'></div>");
   $('#message').html("<h2>Your message has been sent!</h2>")
    .hide()
    .fadeIn(1500, function() {
      $('#message').append("<p>I will be in touch shortly.</p>");
    });
  }
});
return false;
}