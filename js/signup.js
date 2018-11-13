function signUp(){
	// Get a database reference to our posts
	var db = firebase.database();

	var alias = document.getElementById("usernameINPT").value;
	var name = document.getElementById("nameINPT").value;
	var gender = document.querySelector('input[name="gender"]:checked').value;
	var email = document.getElementById("emailINPT").value;
	var id = document.getElementById("idINPT").value;
	var age = document.getElementById("ageInputId").value;
  var pass = document.getElementById("passINPT").value;

			//alert("Espere...");


	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
	  .then(function() {
	    // Existing and future Auth states are now persisted in the current
	    // session only. Closing the window would clear any existing state even
	    // if a user forgets to sign out.
	    // ...
	    // New sign-in will be persisted with session persistence.
	    return firebase.auth().createUserWithEmailAndPassword(email, pass).then(user => {
		    // Sign in success
				var user = {alias:alias,  cedula:id,  edad:age,  email:email,
								genero:gender,  id:id,  nombreCompleto:name};
				firebase.database().ref("usuarios").push(user);
		    location.href = "Home.html";
			}).catch(error => {
				    console.log(error.message);
				});
	  })
	  .catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	  });

	/*firebase.auth().createUserWithEmailAndPassword(email, pass).then(user => {
    // Sign in success
		var user = {alias:alias,  cedula:id,  edad:age,  email:email,
						genero:gender,  id:id,  nombreCompleto:name};
		firebase.database().ref("usuarios").push(user);
    location.href = "Home.html";
	}).catch(error => {
		    console.log(error.message);
		});*/

}


(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })
    })


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('#signupBTN').on('click',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

					return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        //return true;
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
								return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }

    });


})(jQuery);
