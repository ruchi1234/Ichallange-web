var flag=0;
var uflag=0;
var eflag=0;

$(document).ready(function () {
    $(document).on('click','#signup',function(){
   // $("#signup").click(function () 

        var check_email =$("#checkemail").val();
        var check_username =$("#checkname").val();
        var username = $("#username").val()
        var email = $("#email").val();
        if(typeof(check_username)  == "undefined")
        {
            check_username="123";
        }
        if(typeof(check_email)  == "undefined")
        {
            check_email="tt";
        }
        
        var password = $("#password").val();
        var country = $("#country").val();
        var state = $("#state").val();
        var month = $("#month").val();
        var date = $("#date").val();
        var year = $("#year").val();
        
        if (username == '' || email == '' || password == ''|| country==''|| state==''|| month==''|| date==''|| year=='') {
            $('#username').focus();
            $('#email').focus();
            $('#password').focus();
            $('#country').focus();
            $('#state').focus();
            $('#month').focus();
            $('#date').focus();
            $('#year').focus();
            return false;
        }
        else{
            if (username.length != 0) {
                validateName(username,check_username,1);
            }else{
                $('#username').css('border-color', 'red');
                $('#p1').text('**Required');
                return false;
            }
            if (email.length != 0) {
                validateEmail(email,check_email,1);
            }
            else {
                $('#email').css('border-color', 'red');
                $('#p2').text('**Required');
                return false;
            }
            if (password.length < 6) {
                $('#password').css('border-color', 'red');
                $('#p3').text('**Password should be minimum length of 6');
                return false;
            }
            else if (password.length >= 6) {
                $('#password').css('border-color', 'green');
                $('#p3').text('');
                return true;
            }
            else {
                $('#password').css('border-color', 'red');
                $('#p3').text('**Required');
                return false;
            }
            if (country !='') {
                $('#country').css('border-color', 'green');
                $('#p4').text('hey');
                return true;
            }
            else {
                $('#country').css('border-color', 'red');
                $('#p4').text('**Required');
                return false;
            }
        }
    });
    
    $(document).on('click','#update_profile',function(){
    //$("#update_profile").click(function () {
        if(uflag==1||eflag==1)
        {
            //event.preventDefault();
            return false;
        }
        else
        {
            return true;
        }
       

        var check_email =$("#edit_checkemail").val();
        var check_username =$("#edit_checkname").val();
        var username = $("#edit_username").val();
        var email = $("#edit_email").val();
        
        var country = $("#edit_country").val();
        var state = $("#edit_state").val();
        var month = $("#edit_month").val();
        var date = $("#edit_date").val();
        var year = $("#edit_year").val();
        
        if (username == '' || email == '' || country==''|| state==''|| month==''|| date==''|| year=='') {
            $('#edit_username').focus();
            $('#edit_email').focus();
            
            $('#edit_country').focus();
            $('#edit_state').focus();
            $('#edit_month').focus();
            $('#edit_date').focus();
            $('#edit_year').focus();
            return false;
        }
        else{
            if (username.length != 0) {
                validateName(username,check_username,0);
            }else{
                $('#edit_username').css('border-color', 'red');
                $('#edit_p1').text('**Required');
                return false;
            }
            if (email.length != 0) {
                validateEmail(email,check_email,0);
            }
            else {
                $('#edit_email').css('border-color', 'red');
                $('#edit_p2').text('**Required');
                return false;
            }
        }
    });


    //on click of change password next button
    $(document).on('click','#change_password',function(){
    //$("#change_password").click(function () {
     
        var check_username= $("#user_name_password").val();
        var oldpassword = $("#email_change_old_password").val();
        var newpassword = $("#email_change_new_password").val();
        var password = $("#email_change_password").val();
        if (oldpassword == ''||newpassword == ''||password == '' ) {

            $('#email_change_old_password').focus();
            $('#email_change_password').focus();
            $('#email_change_new_password').focus();
            $('#email_change_old_password').focus();

            return false;
        }
        else{

            // if (oldpassword.length != 0) {
            //     validatePassword(oldpassword,check_username);
            // }else{
            //     $('#email_change_old_password').css('border-color', 'red');
            //     $('#password1').text('**Enter the password');
                
            //     return false;
            // }
            if (newpassword.length < 6||(password != newpassword||password.length < 6)||flag==1) {
                if (newpassword.length < 6)
                {
                $('#email_change_new_password').css('border-color', 'red');
                $('#password2').text('**Password should be minimum length of 6');
                }
                if (password != newpassword||password.length < 6) {
                    $('#password').css('border-color', 'red');
                    $('#p3').text('**Password should be minimum length of 6');
                }    
                return false;
            }
            else if (newpassword.length >= 6 && password == newpassword &&flag==0) 
            {
                
                $('#email_change_new_password').css('border-color', 'green');
                $('#password2').text('');
                  
                    $('#email_change_password').css('border-color', 'green');
                    $('#password3').text('');

                return true;
            }
            
            // else {
            //     $('#email_change_new_password').css('border-color', 'red');
            //     $('#password2').text('**Enter the password');
            //     ;
            //     return false;
            // }            
            // if (password != newpassword||password.length < 6) {
            //     $('#password').css('border-color', 'red');
            //     $('#p3').text('**Password should be minimum length of 6');
                
            //     return false;
            // }
            // else  if (password == newpassword) {
            //     $('#email_change_password').css('border-color', 'green');
            //     $('#password3').text('');
                
            //     return true;
            // }
            // else {
            //     $('#email_change_password').css('border-color', 'red');
            //     $('#password3').text('**Password is not same');
                
            //     return false;
            // }
            
        }
        if(flag==1)
        {
            $('#email_change_old_password').focus();
            return false;
        }
        else
        {
            return true;
        }

    });
    $("#button_change_password").click(function () {
        $('#email_change_old_password').css('border-color', '');
        $('#email_change_new_password').css('border-color', '');
        $('#email_change_password').css('border-color', '');
        $('#email_change_old_password').val('');
        $('#email_change_new_password').val('');
        $('#email_change_password').val('');
        $('#password2').text('');
       
        $('#password3').text('');
        
        $('#password1').text('');
        return true;
     });
     
     
     $("#success-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#success-alert").slideUp(500);
    });
    $("#failure-alert").fadeTo(2000, 500).slideUp(500, function(){
        $("#failure-alert").slideUp(500);
    });

});
    //Name validation for signup form....
$("#username").on("focusout", function () {
    var $username = this.value;
    var $check_username =$("#checkname").val();
    if(typeof($check_username)  == "undefined")
        {
            $check_username="123";
        }
    if ($username.length != 0) {
        
        validateName($username,$check_username,1);
    }
    else {
        $('#username').css('border-color', 'red');
        $('#p1').text('**Enter the Name');
        return false;
    }
});


//Email validation for signup form....
$("#email").on("focusout", function () {
    var $email = this.value;
    var $check_email =$("#checkemail").val();
    if(typeof(check_email)  == "undefined")
        {
            check_email="tt";
        }
    if ($email.length != 0) {
        validateEmail($email,$check_email,1);
    }
    else {
        $('#email').css('border-color', 'red');
        $('#p2').text('**Enter the Email');
        return false;
    }
});

//Password validation for signup form and edit form....
$("#password").on("focusout", function () {
    var $password = this.value;
    if ($password.length < 6) {
        $('#password').css('border-color', 'red');
        $('#p3').text('**Enter the Password(minimum length-6)');
        return false;
    }
    else if ($password.length >= 6) {
        $('#password').css('border-color', 'green');
        $('#p3').text('');
        return true;
    }
    else {
        $('#password').css('border-color', 'red');
        $('#p3').text('**Enter the Password');
        return false;
    }
});

//country validation
$('#country').on('focusout',function(){
    var $country = this.value;
    if ($country.length != 0) {
        $('#country').css('border-color', 'green');
        $('#p4').text('');
        return true;
    }
    else {
        $('#country').css('border-color', 'red');
        $('#p4').text('**Enter the Country');
        return false;
    }
});

//state validation
$('#state').on('focusout',function(){
    var $state = this.value;
    if ($state.length != 0) {
        $('#state').css('border-color', 'green');
        $('#p5').text('');
        return true;
    }
    else {
        $('#state').css('border-color', 'red');
        $('#p5').text('**Enter the State');
        return false;
    }
});

//month validation
$('#month').on('focusout',function(){
    var $month = this.value;
    if ($month.length != 0) {
        $('#month').css('border-color', 'green');
        $('#p8').text('');
        return true;
    }
    else {
        $('#month').css('border-color', 'red');
        $('#p8').text('**Enter the Date Of Birth');
        return false;
    }
});

//date validation
$('#date').on('focusout',function(){
    var $date = this.value;
    if ($date.length != 0) {
        $('#date').css('border-color', 'green');
        $('#p8').text('');
        return true;
    }
    else {
        $('#date').css('border-color', 'red');
        $('#p8').text('**Enter the Date Of Birth');
        return false;
    }
});

//year validation
$('#year').on('focusout',function(){
    var $year = this.value;
    if ($year.length != 0) {
        $('#year').css('border-color', 'green');
        $('#p8').text('');
        return true;
    }
    else {
        $('#year').css('border-color', 'red');
        $('#p8').text('**Enter the Date Of Birth');
        return false;
    }
});


 //Name validation for update form....
$("#edit_username").on("focusout", function () {
    var $username = this.value;
    var $check_username =$("#edit_checkname").val();
    
    if ($username.length != 0) {
        
        validateName($username,$check_username,0);
    }
    else {
        $('#edit_username').css('border-color', 'red');
        $('#edit_p1').text('**Enter the Name');

        return false;
    }
});


//Email validation for signup form....
$("#edit_email").on("focusout", function () {
    var $email = this.value;
    var $check_email =$("#edit_checkemail").val();

    if ($email.length != 0) {
        validateEmail($email,$check_email,0);
    }
    else {
        $('#edit_email').css('border-color', 'red');
        $('#edit_p2').text('**Enter the Email');
        return false;
    }
});



//country validation
$('#edit_country').on('focusout',function(){
    var $country = this.value;
    if ($country.length != 0) {
        $('#edit_country').css('border-color', 'green');
        $('#edit_p4').text('');
        return true;
    }
    else {
        $('#edit_country').css('border-color', 'red');
        $('#edit_p4').text('**Enter the Country');
        return false;
    }
});

//state validation
$('#edit_state').on('focusout',function(){
    var $state = this.value;
    if ($state.length != 0) {
        $('#edit_state').css('border-color', 'green');
        $('#edit_p5').text('');
        return true;
    }
    else {
        $('#edit_state').css('border-color', 'red');
        $('#edit_p5').text('**Enter the State');
        return false;
    }
});

//month validation
$('#edit_month').on('focusout',function(){
    var $month = this.value;
    if ($month.length != 0) {
        $('#edit_month').css('border-color', 'green');
        $('#edit_p8').text('');
        return true;
    }
    else {
        $('#edit_month').css('border-color', 'red');
        $('#edit_p8').text('**Enter the Date Of Birth');
        return false;
    }
});

//date validation
$('#edit_date').on('focusout',function(){
    var $date = this.value;
    if ($date.length != 0) {
        $('#edit_date').css('border-color', 'green');
        $('#edit_p8').text('');
        return true;
    }
    else {
        $('#edit_date').css('border-color', 'red');
        $('#p8').text('**Enter the Date Of Birth');
        return false;
    }
});

//year validation
$('#edit_year').on('focusout',function(){
    var $year = this.value;
    if ($year.length != 0) {
        $('#edit_year').css('border-color', 'green');
        $('#edit_p8').text('');
        return true;
    }
    else {
        $('#edit_year').css('border-color', 'red');
        $('#edit_p8').text('**Enter the Date Of Birth');
        return false;
    }
});

//Password validation for old change password form....
$("#email_change_old_password").on("focusout", function () {
    var $password = this.value;
    var $check_username =$("#user_name_password").val();
    if ($password.length != 0) {
        
        validatePassword($password,$check_username);
    }
    else {
        $('#email_change_old_password').css('border-color', 'red');
        $('#password1').text('**Enter the password');
        return false;
    }
});

//Password validation for  new change password form....
$("#email_change_new_password").on("focusout", function () {

    var $newpassword = this.value;
    if ($newpassword.length < 6) {
        $('#email_change_new_password').css('border-color', 'red');
        $('#password2').text('**Password should be minimum length of 6');
        return false;
    }
    else if ($newpassword.length >= 6) {
        $('#email_change_new_password').css('border-color', 'green');
        $('#password2').text('');
        return true;
    }
    else {
        $('#email_change_new_password').css('border-color', 'red');
        $('#password2').text('**Enter the password');
        
        return false;
    }
});


//Password validation for change password form....
$("#email_change_password").on("focusout", function () {
    var $password = this.value;
    var $newpassword = $("#email_change_new_password").val();
    if ($password.length < 6) {
        $('#email_change_password').css('border-color', 'red');
        $('#password3').text('**Password should be minimum length of 6');
        return false;
    }
    else if ($password == $newpassword) {
        $('#email_change_password').css('border-color', 'green');
        $('#password3').text('');
        return true;
    }
    else {
        $('#email_change_password').css('border-color', 'red');
        $('#password3').text('**Password is not same');
        return false;
    }
});

//password validation function
function validatePassword(password,check_username) {
    
    if (password.length < 6) {
        $('#email_change_old_password').css('border-color', 'red');
        $('#password1').text('**Password should be minimum length of 6');
        return false;
    }
    else {
        $.ajax(
            {     
              url: "http://localhost:3000/check_user",   // url that will use
              type: "GET",            // type of submision
              dataType: "JSON",
              data:
              {
                username : check_username,
                check_password: password
              },     // what type of data we'll get back
              
              success: function (data) {
                // if check_email returns a number different than 0
                // means that there's already a user registered with that email
                  if (data.result > 0) {
                    $('#email_change_old_password').css('border-color', 'red');
                    $('#password1').text('**Password is incorrect');
                        flag=1;
                      return false;
                }
                else {
                      $('#email_change_old_password').css('border-color', 'green');
                      $('#password1').text('');
                      flag=0;
                      return true;
                }
              }
            });
    }
}


//Name validation function....
function validateName(username,check_username,check_for_signup) {
    var usernameRegex = /^[a-zA-Z]+$/;
    if (!usernameRegex.test(username)) {
        if(check_for_signup)
        {
            $('#username').css('border-color', 'red');
            $('#p1').text('**Entered name is invalid');
        }
        else
        {
            $('#edit_username').css('border-color', 'red');
            $('#edit_p1').text('**Entered name is invalid');
        }
        
        return false;
    }
    else {
        $.ajax(
            {     
              url: "http://localhost:3000/check_name",   // url that will use
              type: "GET",            // type of submision
              dataType: "JSON",
              data:
              {
                name : check_username,
                username: username
              },     // what type of data we'll get back
              
              success: function (data) {
                // if check_email returns a number different than 0
                // means that there's already a user registered with that email
                  if (data.result > 0) {
                    if(check_for_signup)
                    {
                        $('#username').css('border-color', 'red');
                        $('#p1').text('**Username Already Registered');
                    }
                    else
                    {
                        $('#edit_username').css('border-color', 'red');
                      $('#edit_p1').text('**Username Already Registered');  
                    }
                      uflag=1;
                      return false;
                }
                else {
                    if(check_for_signup)
                    {
                        $('#username').css('border-color', 'green');
                        $('#p1').text('');
                      
                    }
                    else
                    {
                        $('#edit_username').css('border-color', 'green');
                        $('#edit_p1').text(''); 
                    }
                      uflag=0;
                      return true;
                }
              }
            });
    }
}

//Email validation function....
function validateEmail(email,check_email,check_for_signup) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,4})?$/;
    if (!emailRegex.test(email)) {
        if(check_for_signup)
        {
            $('#email').css('border-color', 'red');
            $('#p2').text('**Entered Email is Invalid');
        }
        else
        {
            $('#edit_email').css('border-color', 'red');
            $('#edit_p2').text('**Entered Email is Invalid');
        }
        return false;
    } else{
        $.ajax(
            {
              url: "http://localhost:3000/check_email",   // url that will use
              type: "GET",            // type of submision
              dataType: "JSON",        // what type of data we'll get back
              data:
                { 
                    check_email : check_email,
                    email: email                 // data that will be sent
                  
                },
              success: function (data) {
                // if check_email returns a number different than 0
                // means that there's already a user registered with that email
                  if (data.result > 0) {
                    if(check_for_signup)
                    {
                      $('#email').css('border-color', 'red');
                      $('#p2').text('**Email Already Registered');
                    }
                    else
                    {
                        $('#edit_email').css('border-color', 'red');
                        $('#edit_p2').text('**Email Already Registered');  
                    }
                        eflag=1;
                      return false;
                }
                else {
                    if(check_for_signup)
                    {
                      $('#email').css('border-color', 'green');
                      $('#p2').text('');
                      
                    }
                    else
                    {
                        $('#edit_email').css('border-color', 'green');
                        $('#edit_p2').text(''); 
                    }
                    eflag=0;
                    return true;
                }
              }
            });

    }
}

$('.signin_form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');
        

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
            
        }
        else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

// $('.signin_form').find('input, textarea').on('keyup blur focus', function (e) {
// if ($('#p1').val() == '') {
//     $('#p1').css('border-color', 'red');
// }
// else {
//     $('#p1').css('border-color', 'green');
// }


$(document).ready(function () {
    $("#signin").click(function () {
        var email_login = $("#email_login").val();
        var password_login = $("#password_login").val();
        if(email_login == '' || password_login == ''){
            $('#email_login').css('border-color', 'red');
            $('#password_login').css('border-color', 'red');
            if (email_login == '')
            {
                $('#l1').text('**Enter the Email');
            }
            if (password_login == '') {
                $('#l2').text('**Enter the Password');
            }
            return false;
        }
        else{
            if(email_login.length != 0) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,4})?$/;
                if (!emailRegex.test(email_login)) {
                    $('#email_login').css('border-color', 'red');
                    $('#l1').text('**Entered Email is Invalid');
                    return false;
                }
                else {
                    $('#email_login').css('border-color', 'green');
                    $('#l1').text('');
                    return true;
                }
            }
            
            if (password_login.length < 6) {
                $('#password_login').css('border-color', 'red');
                $('#l2').text('**Password should be minimum length of 6');
                return false;
            }
            else if ($password_login.length >= 6) {
                $('#password_login').css('border-color', 'green');
                $('#l2').text('');
                return true;
            }
            else {
                $('#password_login').css('border-color', 'red');
                $('#l2').text('**Required');
                return false;
            }
        }
    });
    
});




