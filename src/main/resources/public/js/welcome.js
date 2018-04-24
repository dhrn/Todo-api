document.write('welcome aboard');
var AUTH_ID = {
        'SIGNUP_EMAIL': 'signUpEmail',
        'SIGNUP_NAME': 'signUpName',
        'SIGNUP_PASS': 'signUpPass',
        'SIGNUP_RE_PASS': 'signUpRPass',
        'SIGNIN_NAME': 'signInName',
        'SIGNIN_PASS': 'signInPass',
        'REGISTER': 'register-me-button',
        'LOGIN': 'login-button'
    },
    REGX = {
        'EMAIL': /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
        'PASS': /[A-Za-z\d$@$!%*?&]{5,}/,
        'NAME': /^[a-zA-Z]+([_ -]?[a-zA-Z0-9])*$/  
    };  

var Authentication = (function() {

    var signIn = function(eventId) {

            var name = document.getElementById(AUTH_ID.SIGNIN_NAME),
                password = document.getElementById(AUTH_ID.SIGNIN_PASS),
                isValid = true,

                validateOnBlur = function(blurEventId) {

                    switch (blurEventId) {
                        case AUTH_ID.SIGNIN_NAME:
                            if (!name.value) {
                                console.log("V user name is empty -- sign in");
                                isValid = false;
                            } else if (REGX.NAME.test(name.value) || REGX.EMAIL.test(name.value)) {
                                isValid = true;
                            } else {
                                console.log("Enter valid username or email");
                                isValid = false;
                            }

                            break;

                        case AUTH_ID.SIGNIN_PASS:
                            if (!password.value) {
                                console.log("V password name is empty -- sign in");
                                isValid = false;
                            } else {
                                isValid = true;
                            }

                            break;
                    }
                },

                submit = function() {
                    if (!isValid) {
                        return;
                    }

                    if ( !name.value ) {
                        console.log("user name is empty -- sign in");
                        isValid = false;
                    } else if (REGX.NAME.test(name.value)) {
                        isValid = true;
                    } else if (REGX.EMAIL.test(name.value)) {
                        isValid = true;
                    } else {
                        console.log("Enter valid username or email");
                        isValid = false;
                    }

                    if (!password.value) {
                        console.log("password name is empty -- sign in");
                        isValid = false;
                    }

                    if (!isValid) {
                        return;
                    }

                    var userDetails = {
                        'user': name.value,
                        'password': password.value
                    };

                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        async: true,
                        url: "signin",
                        data: userDetails,
                        success: function(msg) {
                            if( msg.hasOwnProperty( "sucess" ) ){
                                $("#response-container")[0].style[ "background-color" ] = "#9e9e9e";
                                $("#response-container").text(JSON.stringify("Welcome ..! Logged in sucessfully ..!"));
                            } else {
                                $("#response-container")[0].style[ "background-color" ] = "#9e9e9e";
                                $("#response-container").text(JSON.stringify( "Oops ..! UserName or Pasword is Incorrect ..!" ))
                            }
                            
                            console.log(msg);
                            setTimeout(function(){
                                $("#response-container").text("");
                                $("#response-container")[0].style[ "background-color" ] = "transparent";
                            }, 3000);
                        },
                        error: function(jqHR, textStatus, errorThrown) {
                            console.log(" textStatus " + textStatus);
                            console.log(" jqHR ::: " + JSON.stringify(jqHR));
                            $("#error-cont").html(jqHR.responseText);
                            console.log(" errorThrown ::: " + errorThrown);

                        }
                    });

                };

            eventId == AUTH_ID.LOGIN ? submit() : validateOnBlur(eventId);

            return {
                submit: submit,
                validateOnBlur: validateOnBlur
            };
            /*$.ajax({
                type: "POST",//no i18n
                dataType: 'json', //No i18n
                contentType:"application/json;charset=utf-8",
                async: true,
                url: "/hello",//No I18N
                data:  {'username': name,'password': password },
                success : function(msg) {
                    console.log(" SUCCESS "+ msg);
                },
                error : function(jqHR, textStatus, errorThrown) {
                    console.log(" textStatus "+ textStatus);
                    console.log(" jqHR ::: "+ JSON.stringify(jqHR));
                    $("#error-cont").html(jqHR.responseText);
                    console.log(" errorThrown ::: "+ errorThrown);
                    
                }
            }); */
        },

        signUp = function(eventId) {
            var uName = document.getElementById(AUTH_ID.SIGNUP_NAME),
                uEmail = document.getElementById(AUTH_ID.SIGNUP_EMAIL),
                uPass = document.getElementById(AUTH_ID.SIGNUP_PASS),
                uRPass = document.getElementById(AUTH_ID.SIGNUP_RE_PASS),
                isValid = true,

                validateOnBlur = function(blurEventId) {

                    switch (blurEventId) {
                        case AUTH_ID.SIGNUP_NAME:
                            if (!uName.value) {
                                console.log("V user name is empty");
                                isValid = false;
                            } else if (!REGX.NAME.test(uName.value)) {
                                console.log("give proper user name");
                            } else {
                                isValid = true;
                            }

                            break;

                        case AUTH_ID.SIGNUP_EMAIL:
                            if (!uEmail.value) {
                                console.log("V user email id is empty");
                                isValid = false;
                            } else if (!REGX.EMAIL.test(uEmail.value)) {
                                console.log("check mail id");
                                isValid = false;
                            } else {
                                isValid = true;
                            }

                            break;

                        case AUTH_ID.SIGNUP_PASS:
                            if (!uPass.value) {
                                console.log("V user password is empty");
                                isValid = false;
                            } else {
                                if (uPass.value.search(REGX.PASS) < 0) {
                                    console.log("Your password must contain at least one caps, one small letter, one number and one special character.");
                                    isValid = false;
                                } else {
                                    isValid = true;
                                }
                            }

                            break;

                        case AUTH_ID.SIGNUP_RE_PASS:
                            if (!uRPass.value) {
                                console.log("V user Repeat password is empty");
                                isValid = false;
                            } else if (uPass.value != uRPass.value) {
                                console.log("V password does not match with repeat password");
                                isValid = false;
                            } else {
                                isValid = true;
                            }

                            break;
                    }
                },

                submit = function() {
                    if (!isValid) {
                        return;
                    }

                    if (!uName.value) {
                        // document.getElementById("name-invalid-msg-cont").write( 'user name is empty' );
                        console.log("user name is empty");
                        isValid = false;
                    } else if ( REGX.NAME.test(name.value) ) {
                        isValid = true;
                    }  else {
                        console.log("Enter valid username or email");
                        isValid = false;
                    }

                    if (!uEmail.value) {
                        // document.getElementById("email-invalid-msg-cont").write( '' );
                        console.log("user email id is empty");
                        isValid = false;
                    }

                    if (!uPass.value) {
                        // document.getElementById("password-invalid-msg-cont").write( '' );
                        console.log("user password is empty");
                        isValid = false;
                    }

                    if (!uRPass.value) {
                        // document.getElementById("password-invalid-msg-cont").write( '' );
                        console.log("user repeat password is empty");
                        isValid = false;
                    } else if (uPass.value != uRPass.value) {
                        // document.getElementById("rpassword-invalid-msg-cont").write( '' );
                        console.log("password does not match with repeat password");
                        isValid = false;
                    }

                    if (!isValid) {
                        return;
                    }

                    var userDetails = {
                        'name': uName.value,
                        'emailId': uEmail.value,
                        'password': uPass.value
                    };

                    $.ajax({
                        type: "POST",
                        dataType: 'json',
                        async: true,
                        url: "signup",
                        data: userDetails,
                        success: function(msg) {
                            if( msg.hasOwnProperty( "sucess" ) ){
                                $("#response-container")[0].style[ "background-color" ] = "#9e9e9e";
                                $("#response-container").text(JSON.stringify( "Welcome to Our Page ..! Your Signup is sucessfully completed ..!" ));
                            } else {
                                $("#response-container")[0].style[ "background-color" ] = "#9e9e9e";
                                $("#response-container").text(JSON.stringify( "Oops ..! Something went wrong ..!" ))
                            }
                            console.log(msg);
                            console.log(userDetails);
                            setTimeout(function(){ 
                                $("#response-container").text(""); 
                                $("#response-container")[0].style[ "background-color" ] = "transparent";
                            }, 3000);
                        },
                        error: function(jqHR, textStatus, errorThrown) {
                            console.log(" textStatus " + textStatus);
                            console.log(" jqHR ::: " + JSON.stringify(jqHR));
                            $("#error-cont").html(jqHR.responseText);
                            console.log(" errorThrown ::: " + errorThrown);

                        }
                    });
                };

            eventId == AUTH_ID.REGISTER ? submit() : validateOnBlur(eventId);

            return {
                submit: submit,
                validateOnBlur: validateOnBlur
            };
        },

        switchForms = function() {
            if ($("#login-cont").is(":visible")) {
                $("#login-cont").hide();
                $("#register-cont").show();
            } else {
                $("#register-cont").hide();
                $("#login-cont").show();
            }
        }

    return {
        signIn: signIn,
        signUp: signUp,
        switchForms: switchForms
    };
})();