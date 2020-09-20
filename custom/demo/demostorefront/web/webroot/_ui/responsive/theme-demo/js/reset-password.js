$(document).ready(function() {
  var $password = $('#password');
  var $confirmPassword = $('#confirm_password');

  // Hide hints by default on load
  $(".form-group p").hide();

  // Check if entered password meets requirements (True or False)
  function isPasswordValid() {
     return $password.val().match(/^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9]{8,})$/);
  }

  // Check if password fields match (True or False)
  function arePasswordsMatching() {
    return $password.val() === $confirmPassword.val();
  }

  // Check if passwords are both valid and matching (True or False)
  function canSubmit() {
   return isPasswordValid() && arePasswordsMatching();
  }


  // Hide hint if password valid, show if not valid
  function passwordEvent() {
        if ( isPasswordValid() ) {
         $password.next().hide();
      } else {
         $password.next().show();
      }
  // Password Strength
      if ( isPasswordValid() ) {
       $(".inner-pwd-strength").css({"background-color": "#008FFF", "width": "100%"});
    }else{
      $(".inner-pwd-strength").css({"background-color": "#e2400c", "width": "40%"});
    }
  }

  // Hide hint if both password fields match, show if fields do not match
  function passwordConfirmation() {
        if ( arePasswordsMatching() ) {
         $confirmPassword.next().hide();
      } else {
        $confirmPassword.next().show();
      }
  }

  // Enable submit button when passwords are both valid and matching
  function enableSubmit() {
   $(".send").prop("disabled", !canSubmit() );
  }

  $password.focus(passwordEvent).keyup(passwordEvent).keyup(passwordConfirmation).keyup(enableSubmit);

  $confirmPassword.focus(passwordConfirmation).keyup(passwordConfirmation).keyup(enableSubmit);

  enableSubmit();
});
