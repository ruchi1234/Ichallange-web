

$(document).ready(function(){
    $(document).on('click','#button_add_contact',function(){
            $('#add_contact_name').val('');
            $('#add_contact_email').val('');
            $('#add_contact_mobile').val('');
    });
});

//validation on click of add contact button
$(document).on('click','#add_contacts',function(){
     
    var add_contact_name= $("#add_contact_name").val();
    var add_contact_email = $("#add_contact_email").val();
    var add_contact_mobile = $("#add_contact_mobile").val();
    if (add_contact_name == '' && add_contact_email == '' && add_contact_mobile == '' ) {

        $('#add_contact_name').css('border-color', 'red');
        $('#add_contact_email').css('border-color', 'red');
        $('#add_contact_mobile').css('border-color', 'red');
        $('.contact_name').text('**Required');
        $('.contact_email').text('**Required');
        $('.contact_mobile').text('**Required');
        return false;
    }
    else
    {
        if(add_contact_name.length != 0) 
        {
            $('#add_contact_name').css('border-color', 'green');
            $('.contact_name').text('');
            
        }
        else 
        {
            $('#add_contact_name').css('border-color', 'red');
            $('.contact_name').text('**Required');
            return false;
        }   
        
        
        if(add_contact_email.length != 0) 
        {
            $('#add_contact_email').css('border-color', 'green');
            $('.contact_email').text('');
            
        }
        else 
        {
            $('#add_contact_email').css('border-color', 'red');
            $('.contact_email').text('**Required');
            return false;
        }   


        if(add_contact_mobile.length != 0) 
        {            
            if(add_contact_mobile.length !=10){
                $('#add_contact_mobile').css('border-color', 'red');
                $('.contact_mobile').text('**Number is not correct');
                return false;
            }
            else{
                $('#add_contact_mobile').css('border-color', 'green');
                $('.contact_mobile').text('');
            }
        }
        else
        {
            $('#add_contact_mobile').css('border-color', 'red');
            $('.contact_mobile').text('**Required');
            return false;
        } 
    }    
});


//validation on tab of add contact's contact name
$('#add_contact_name').on('keyup',function(){
    var add_contact_name= $("#add_contact_name").val();
    if(add_contact_name.length != 0) 
        {
            validateEditContactName(add_contact_name);
        }
        else 
        {
            $('#add_contact_name').css('border-color', 'red');
            $('.contact_name').text('**Required');
            return false;
        }   
});

//validation on tab of add contact's contact name
$('#add_contact_email').on('focusout',function(){
    var add_contact_email= $("#add_contact_email").val();
    if(add_contact_email.length != 0) 
        {
            validateEditContactEmail(add_contact_email);
        }
        else 
        {
            $('#add_contact_email').css('border-color', 'red');
            $('.contact_email').text('**Required');
            return false;
        }   
});


//validation on tab of add contact's contact name
$('#add_contact_mobile').on('focusout',function(){
    var add_contact_mobile= $("#add_contact_mobile").val();
    if(add_contact_mobile.length != 0) 
        {
            validateEditContactMobile(add_contact_mobile);
        }
        else 
        {
            $('#add_contact_mobile').css('border-color', 'red');
            $('.contact_mobile').text('**Required');
            return false;
        }   
});


//Contact Name validation function....
function validateEditContactName(add_contact_name) {
    var add_contact_name_Regex = /^[a-zA-Z]+$/;
    if (!add_contact_name_Regex.test(add_contact_name))
    {
        $('#add_contact_name').css('border-color', 'red');
        $('.contact_name').text('**Entered name is invalid');
        return false;
    }
    else if(add_contact_name.length < 3){
        $('#add_contact_name').css('border-color', '');
        
        return false;
    }
    else 
    {   
        $('#add_contact_name').css('border-color', 'green');
        $('.contact_name').text('');
        return true;
    }
}


//Contact Email validation function....
function validateEditContactEmail(add_contact_email){
    var add_contact_email_Regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,4})?$/;
    if (!add_contact_email_Regex.test(add_contact_email))
    {
        $('#add_contact_email').css('border-color', 'red');
        $('.contact_email').text('**Entered email is invalid');
        return false;
    }
    else 
    {   
        $('#add_contact_email').css('border-color', 'green');
        $('.contact_email').text('');
        return true;
    }
}


//Contact Mobile validation function....
function validateEditContactMobile(add_contact_mobile){
    var add_contact_mobile_Regex = /^[0-9]{10}$/;;
    if (!add_contact_mobile_Regex.test(add_contact_mobile))
    {
        $('#add_contact_mobile').css('border-color', 'red');
        $('.contact_mobile').text('**Entered mobile is invalid');
        return false;
    }
    else 
    {   
        $('#add_contact_mobile  ').css('border-color', 'green');
        $('.contact_mobile').text('');
        return true;
    }
}

//Validation on click of update contact button
$(document).on('click','#edit_contacts',function(){
     
    var edit_contact_name= $("#edit_contact_name").val();
    var edit_contact_email = $("#edit_contact_email").val();
    var edit_contact_mobile = $("#add_contact_mobile").val();
    if (edit_contact_name == '' && edit_contact_email == '' && edit_contact_mobile == '' ) {

        $('#edit_contact_name').css('border-color', 'red');
        $('#edit_contact_email').css('border-color', 'red');
        $('#edit_contact_mobile').css('border-color', 'red');
        $('.contact_name').text('**Required');
        $('.contact_email').text('**Required');
        $('.contact_mobile').text('**Required');
        return false;
    }
    else
    {
        if(edit_contact_name.length != 0) 
        {
            $('#edit_contact_name').css('border-color', 'green');
            $('.contact_name').text('');
            
        }
        else 
        {
            $('#edit_contact_name').css('border-color', 'red');
            $('.contact_name').text('**Required');
            return false;
        }   
        
        
        if(edit_contact_email.length != 0) 
        {
            $('#edit_contact_email').css('border-color', 'green');
            $('.contact_email').text('');
            
        }
        else 
        {
            $('#edit_contact_email').css('border-color', 'red');
            $('.contact_email').text('**Required');
            return false;
        }   


        if(edit_contact_mobile.length != 0) 
        {            
            if(edit_contact_mobile.length !=10){
                $('#edit_contact_mobile').css('border-color', 'red');
                $('.contact_mobile').text('**Number is not correct');
                return false;
            }
            else{
                $('#edit_contact_mobile').css('border-color', 'green');
                $('.contact_mobile').text('');
            }
        }
        else
        {
            $('#edit_contact_mobile').css('border-color', 'red');
            $('.contact_mobile').text('**Required');
            return false;
        } 
    }    
});


//Validation on tab of edit contact's contact name
$("#edit_contact_name").focusout(function(){
    var edit_contact_name= $("#edit_contact_name").val();
    if(edit_contact_name.length != 0) 
    {
        if (edit_contact_name.length != 0) {
        
            validateContactName(edit_contact_name);
        }
        // $('#edit_contact_name').css('border-color', 'green');
        // $('.contact_name').text('');
        
    }
    else 
    {
        $('#edit_contact_name').css('border-color', 'red');
        $('.contact_name').text('**Required');
        return false;
    } 
});

//Validation on tab of edit contact's contact email
$("#edit_contact_email").focusout(function(){
    var edit_contact_email= $("#edit_contact_email").val();
    if(edit_contact_email.length != 0) 
    {
        validateContactEmail(edit_contact_email);
    }
    else 
    {
        $('#edit_contact_email').css('border-color', 'red');
        $('.contact_email').text('**Required');
        return false;
    } 
});

//Validation on tab of edit contact's contact mobile
$("#edit_contact_mobile").focusout(function(){
    var edit_contact_mobile= $("#edit_contact_mobile").val();
    if(edit_contact_mobile.length != 0) 
    {
        validateContactMobile(edit_contact_mobile);
    }
    else 
    {
        $('#edit_contact_mobile').css('border-color', 'red');
        $('.contact_mobile').text('**Required');
        return false;
    } 
});


//Contact Name validation function....
function validateContactName(edit_contact_name) {
    var edit_contact_name_Regex = /^[a-zA-Z]+$/;
    if (!edit_contact_name_Regex.test(edit_contact_name))
    {
        $('#edit_contact_name').css('border-color', 'red');
        $('.contact_name').text('**Entered name is invalid');
        return false;
    }
    else 
    {   
        $('#edit_contact_name').css('border-color', 'green');
        $('.contact_name').text('');
        return true;
    }
}


//Contact Email validation function....
function validateContactEmail(edit_contact_email){
    var edit_contact_email_Regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{3,4})?$/;
    if (!edit_contact_email_Regex.test(edit_contact_email))
    {
        $('#edit_contact_email').css('border-color', 'red');
        $('.contact_email').text('**Entered email is invalid');
        return false;
    }
    else 
    {   
        $('#edit_contact_email').css('border-color', 'green');
        $('.contact_email').text('');
        return true;
    }
}


//Contact Mobile validation function....
function validateContactMobile(edit_contact_mobile){
    var edit_contact_mobile_Regex = /^[0-9]{10}$/;;
    if (!edit_contact_mobile_Regex.test(edit_contact_mobile))
    {
        $('#edit_contact_mobile').css('border-color', 'red');
        $('.contact_mobile').text('**Entered mobile is invalid');
        return false;
    }
    else 
    {   
        $('#edit_contact_mobile').css('border-color', 'green');
        $('.contact_mobile').text('');
        return true;
    }
}