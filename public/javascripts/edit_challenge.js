

    var $ = jQuery.noConflict();

$(document).ready(function () {
    $(".add_crt_chall").click(function () {
        var challenge_name = $(".challenge_name").val();
        var template = $(".template").val();
        var date = $(".date_cc").val();
        var time = $(".time").val();
        var category = $(".category").val();
        var series = $(".series").val();
        var entry = $(".entry").val();
        var invites = $(".invites").val();
        var textarea = $(".textarea").val();
        var question = $(".question").val();
        var textarea0 = $(".textarea0").val();
        var textarea1 = $(".textarea1").val();
        var textarea2 = $(".textarea2").val();
        var textarea3 = $(".textarea3").val();
        var textarea4 = $(".textarea4").val();
        if (challenge_name == '' || template == '' || date == '' || time == '' || category == '' || series == '' || entry == '' || invites == '' || textarea == '' || question == '' || textarea0 == '' ){
            $('.challenge_name').focus();
            $('.template').focus();
            $('.date_cc').css('border-color', 'red');
            $('.p3').text('**Enter the Date');
            $('.time').css('border-color', 'red');
            $('.p4').text('**Enter the Time');
            $('.category').focus();
            $('.series').focus();
            $('.entry').focus();
            $('.invites').focus();
            $('.textarea').focus();
            $('.question').focus();
            $('.textarea0').focus();
            if(image == ''){
                $('.textarea1').focus();
                $('.textarea2').focus();
                $('.textarea3').focus();
                $('.textarea4').focus();
            } 

            return false;
            //|| textarea1 == '' || textarea2 == '' || textarea3 == '' || textarea4 == ''
        }
        else 
        {
            if (challenge_name.length != 0)
            {
                var challenge_nameRegex = /^[a-zA-Z ]+$/;
                if (!challenge_nameRegex.test(challenge_name)) {
                    $('.challenge_name').css('border-color', 'red');
                    $('.p1').text('**Enter the Challenge Name');
                    return false;
                }
                else {
                    $('.challenge_name').css('border-color', 'green');
                    $('.p1').text('');
                }
            }
            if (template.length != 0) {
                $('.template').css('border-color', 'green');
                $('.p2').text('');
                
                }
            else {
                $('.template').css('border-color', 'red');
                $('.p2').text('**Enter the Template');
                return false;
                
            }
            if (date.length != 0) {
                $('.date_cc').css('border-color', 'green');
                $('.p3').text('');
            }
            
            if (time.length != 0) {
                    $('.time').css('border-color', 'green');
                    $('.p4').text('');
                }
            else {
                $('.time').css('border-color', 'red');
                $('.p4').text('**Enter the Time');
                return false;

            if (category.length != 0) {
                $('.category').css('border-color', 'green');
                $('.p5').text('');
                
            }
            else {
                $('.category').css('border-color', 'red');
                $('.p5').text('**Enter the Category');
                return false;
            }

            if (series.length != 0) {
                $('.series').css('border-color', 'green');
                $('.p6').text('');
                
            }
            else {
                $('.series').css('border-color', 'red');
                $('.p6').text('**Enter the Series');
                return false;
            }

           if (entry.length != 0) {
                $('.entry').css('border-color', 'green');
                $('.p7').text('');
                
            }
            else {
                $('.entry').css('border-color', 'red');
                $('.p7').text('**Enter the Entry');
                return false;
            }

            if (invites.length != 0) {
                $('.invites').css('border-color', 'green');
                $('.c8').text('');
                
            }
            else {
                $('.invites').css('border-color', 'red');
                $('.c8').text('**Invites can not be empty');
                return false;
            }

            if (textarea.length != 0) {
                $('.textarea').css('border-color', 'green');
                $('.p9').text('');
                
            }
            else {
                $('.textarea').css('border-color', 'red');
                $('.p9').text('**Enter the Prizes');
                return false;
            }
            if (textarea0.length != 0) {
                $('.textarea0').css('border-color', 'green');
                $('.p11').text('');
            
            }
            else {
                $('.textarea0').css('border-color', 'red');
                $('.p11').text('**Enter the Question');
                return false;
            }
            if (textarea1.length != 0) {
                    $('.textarea1').css('border-color', 'green');
                    $('.p12').text('');
                
                }
            else {
                $('.textarea1').css('border-color', 'red');
                $('.p12').text('**Enter the Answer');
                return false;
            }

            if (textarea2.length != 0) {
                    $('.textarea2').css('border-color', 'green');

                    $('.p13').text('');
                
                }
            else {
                $('.textarea2').css('border-color', 'red');
                $('.p13').text().show();
                $('.p13').text('**Enter the Answer');
                return false;
            }

           if (textarea3.length != 0) {
                $('.textarea3').css('border-color', 'green');
                $('.p14').text('');
                
            }
            else {
                $('.textarea3').css('border-color', 'red');
               $('.p14').text('**Enter the Answer');
                return false;
            }
            if (textarea4.length != 0) {
                $('.textarea4').css('border-color', 'green');
                $('.p15').text('');
                
            }
            else {
                $('.textarea4').css('border-color', 'red');
                $('.p15').text('**Enter the Answer');
                return false;
            }

            
        }return true;
    }
    });
});

$(".challenge_name").on("focusout", function () {
    var $challenge_name = this.value;
    if ($challenge_name.length != 0) {
        validateName($challenge_name);
    }
    else {
        $('.challenge_name').css('border-color', 'red');
        $('.p1').text('**Enter the Challenge Name');
        return false;
    }
});

// $(".date_cc").on("focusout", function () {
//     var $date = this.value;
//     if ($date.length != 0) {
//         $('.date_cc').css('border-color', 'green');
//         $('.p3').text('');
//     }
//     else {
//         $('.date_cc').css('border-color', 'red');
//         $('.p3').text('**Enter the Date');
//         return false;
//     }
// });

// $(".time").on("focusout", function () {
//     var $time = this.value;
//     if ($time.length != 0) {
//         $('.time').css('border-color', 'green');
//         $('.p4').text('');
//         return true;
//         }
//     else {
//          $('.time').css('border-color', 'red');
//          $('.p4').text('**Enter the Time');
//          return false;
//     }
// });

$(".category").on("focusout", function () {
    var $category = this.value;
    if ($category.length != 0) {
        $('.category').css('border-color', 'green');
        $('.p5').text('');
    }
    else {
        $('.category').css('border-color', 'red');
        $('.p5').text('**Enter the Category');
        return false;
    }
});

$(".series").on("focusout", function () {
    var $series = this.value;
    if ($series.length != 0) {
        $('.series').css('border-color', 'green');
        $('.p6').text('');
    }
    else {
        $('.series').css('border-color', 'red');
        $('.p6').text('**Enter the Series');
        return false;
    }
});

$(".entry").on("focusout", function () {
    var $entry = this.value;
    if ($entry.length != 0) {
        $('.entry').css('border-color', 'green');
        $('.p7').text('');
    }
    else {
        $('.entry').css('border-color', 'red');
        $('.p7').text('**Enter the Entry');
        return false;
    }
});

$(".invites").on("focusout", function () {
    var $invites = this.value;
    if ($invites.length != 0) {
        $('.invites').css('border-color', 'green');
        $('.c8').text('');
    }
    else {
        $('.invites').css('border-color', 'red');
        $('.c8').text('**Invites can not be empty');
        return false;
    }
});

$(".textarea").on("focusout", function () {
    var $textarea = this.value;
    if ($textarea.length != 0) {
        $('.textarea').css('border-color', 'green');
        $('.p9').text('');
    }
    else {
        $('.textarea').css('border-color', 'red');
        $('.p9').text('**Enter the Prizes');
        return false;
    }
});


$(".textarea0").on("focusout", function () {
    var $textarea0 = this.value;
    if ($textarea0.length != 0) {
        $(this).css('border-color', 'green');
        $(this).siblings().text('');
    }
    else {
        $(this).css('border-color', 'red');
        $(this).siblings().text('**Enter the Question');
        return false;
    }
});

$(".textarea1").on("focusout", function () {
    var $textarea1 = this.value;
    if ($textarea1.length != 0) {
        $(this).css('border-color', 'green');
        $(this).siblings().text('');
    }
    else {
        $(this).css('border-color', 'red');
        $(this).siblings().text('**Enter the Answer');
        return false;
    }
});

$(".textarea2").on("focusout", function () {
    var $textarea2 = this.value;
    if ($textarea2.length != 0) {
        $(this).css('border-color', 'green');
        $(this).siblings().text('');
    }
    else {
        $(this).css('border-color', 'red');
        $(this).siblings().text('**Enter the Answer');
        return false;
    }
});

$(".textarea3").on("focusout", function () {
    var $textarea3 = this.value;
    if ($textarea3.length != 0) {
        $(this).css('border-color', 'green');
        $(this).siblings().text('');
    }
    else {
        $(this).css('border-color', 'red');
        $(this).siblings().text('**Enter the Answer');
        return false;
    }
});

$(".textarea4").on("focusout", function () {
    var $textarea4 = this.value;
    if ($textarea4.length != 0) {
        $(this).css('border-color', 'green');
        $(this).siblings().text('');
    }
    else {
        $(this).css('border-color', 'red');
        $(this).siblings().text('**Enter the Answer');
        return false;
    }
});

$(".template").on("focusout", function () {
    var $template = this.value;
    if ($template.length != 0) {
        $('.template').css('border-color', 'green');
        $('.p2').text('');
    }
    else {
        $('.template').css('border-color', 'red');
        $('.p2').text('**Enter the Template');
        return false;
    }
});

function validateName(challenge_name) {
    var challenge_nameRegex = /^[a-zA-Z ]+$/;
    if (!challenge_nameRegex.test(challenge_name)) {
        $('.challenge_name').css('border-color', 'red');
        $('.p1').text('**Invalid Challenge Name');
        return false;
    }
    else {
        $('.challenge_name').css('border-color', 'green');
        $('.p1').text('');
        return true;
    }
}



$(function () {
    $(".date_cc").datepicker();
});

$(function () {
    $('.time').timepicker({
        //timeFormat: 'mm:h p',
        dynamic: false,
        dropdown: true,
        scrollbar: true,
        scrollDefault: 'now'
    });
});


//Deleting the answers

$(".delete_img").hide();

$(".stop_delete").on('click',function(){
    $(this).eq(0).parent().parent().next().find('span').text('**A question must have atleast 2 answers.');   
});

$('.stop_delete').on('mouseout', function(){
    $(this).eq(0).parent().parent().next().find('span').text('');
})

$(document).ready(function () {
    for(i=0; i< $('.question_text').length; i++){
        $('.question_text').eq(i).children().last().prev().find('.delete_img').last().show()
    }
});

$(document).on('click','.delete_img',function(){
    var parent = $(this).parent().parent().parent().parent().parent();
    console.log(parent);
    var children = $(this).parent().parent().parent().parent().parent().children().length;
    if(children > 2)
    {
        var length = $(parent).children().last().prev().children().length;
        if(length %2 == 0){
            $(this).parent().parent().parent().parent().find('.first-6').find('.delete_img').show()
            $(this).parent().parent().parent().remove();
        }
        else{
            $(this).parent().parent().parent().parent().prev().last().find('.second-6').find('.delete_img').show();    
            $(this).parent().parent().parent().parent().remove();
        }
    }
    
    });

function genCharArray(charA, charZ) 
{
        var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) 
        {
            a.push(String.fromCharCode(i));
        }
        return a;
}

var img = 5;
$(document).on('click','.add-answer',function()
{
    
    var array = genCharArray('a', 'z'); 
    var parent_container = $(this).parent().parent().parent().attr('id');
    var parent_container_child_length = $('#'+parent_container+' .quiz_section .col-sm-6').length;
    var counter = $(this).parent().parent().children().length - 1;
    
    if (parent_container_child_length % 2 == 0) 
    {
         
        if ($('#'+parent_container+' .quiz_section .col-sm-6').last().length != 1) {
             $('#'+parent_container+' .quiz_section .col-sm-6').last().find('.delete_img').show()
         } else {
            $('#'+parent_container+' .quiz_section .col-sm-6').last().find('.delete_img').hide()
         }
         var cloneElement = $('.clone_section_0').eq(0).clone()
        .attr('id', 'cloning_element_'+$(".add-answer").index(this)+"_"+counter);
        $(cloneElement).removeClass('clone_section_0');
        for (var i = 0; i < array.length; i++) 
        {
           
            if (i == parent_container_child_length )
            {
                $(cloneElement).find('label').text(array[i] + '. Enter Answer');
                $(cloneElement).find('input[type="radio"]').val(array[i]);
                $(cloneElement).find(".second-6").remove().end().appendTo("#"+parent_container)
                .insertBefore("#"+parent_container+"_add_answer");
                $(cloneElement).find('input[type="textarea"]').val('');
                $(cloneElement).find('input[type="textarea"]').css('border','');
                $(cloneElement).find('.first-6').find('.delete_img').show()
                $(cloneElement).find('.first-6').find('.delete_img').css('display', 'block');
                $(cloneElement).find('.image_answer').attr('src','/images/imageplaceholder.png');
                $(cloneElement).find('input[type="radio"]').removeAttr("ckecked");
                var k = $('.add-answer').index(this)
                    for( j=0; j<=parent_container_child_length; j++){
                        if(j == parent_container_child_length){
                            $(cloneElement).parent().find('input[type="textarea"]').eq(j).first().attr('name','answer['+k+']['+j+']');
                            $(cloneElement).parent().find('input[type="radio"]').attr('name','right_answer['+k+']');
                            $(cloneElement).find('.fileInput').attr('name','answer_image['+k+']['+j+']');
                            $(cloneElement).find('.hidden').attr('name','hidden_image_name['+k+']['+j+']');
                        }
                    }  
                img++;
            break;
            }
        }    
    }

    else 
    {
        var counter = $(this).parent().parent().children().length - 1;
        var appendIndex = counter -1 ;
        var cloneElement = $('.clone_section_0').eq(0).clone();
        $(cloneElement).removeClass('clone_section_0');
        if ($('#'+parent_container+' .quiz_section .col-sm-6').last().length != 1) {
            $('#'+parent_container+' .quiz_section .col-sm-6').last().find('.delete_img').show()
        } else {
           $('#'+parent_container+' .quiz_section .col-sm-6').last().find('.delete_img').hide()
        }
        for (var i = 0; i < array.length; i++) 
        {
            
            if (i == parent_container_child_length)
            {
                 
                $(cloneElement).find('label').text(array[i] + '. Enter Answer');
                $(cloneElement).find('input[type="radio"]').val(array[i]);
                $(cloneElement).find('.second-6').find('.delete_img').show()
                $(cloneElement).find('.second-6').find('.delete_img').css('display', 'block');
                $(cloneElement).find('input[type="textarea"]').val('');
                $(cloneElement).find('input[type="textarea"]').css('border','');
                $(cloneElement).find('input[type="radio"]').removeAttr("ckecked");
                $(cloneElement).find('.image_answer').attr('src','/images/imageplaceholder.png');
                var k = $('.add-answer').index(this)
                    for( var j=0; j<=parent_container_child_length; j++){
                        if(j == parent_container_child_length){
                            $(cloneElement).find('input[type="textarea"]').attr('name','answer['+k+']['+j+']');
                            console.log(cloneElement);
                            $(cloneElement).parent().find('input[type="radio"]').attr('name','right_answer['+k+']'); 
                            $(cloneElement).find('.fileInput').attr('name','answer_image['+k+']['+j+']');  
                            $(cloneElement).find('.hidden').attr('name','hidden_image_name['+k+']['+j+']');
                        }
                    } 
                   
                    $(cloneElement).find(".second-6").appendTo("#cloning_element_"+$(".add-answer").index(this)+"_"+ appendIndex)
                break;
            }
        }
    }  
});


$(document).ready(function () {
   
    var clone_answer=$('.chalange_second_step').children().length ;
    var answer_counter = clone_answer ;
    var answer_counter_next = 0;
    var array = genCharArray('a', 'z'); 
    var question_parent_container =$('.add_question').parent().parent().prev().children().first().children().last().children().first().attr('id')
    var str = question_parent_container
    $(".add_question").click(function () {
        var cloneCount = $('.add-answer').length;
        var res = str.slice(0,16);  
        console.log(res);
        var addng_element = $(this).parent().parent().siblings().last().prev().prev().children().children().last().children().last().prev();
        console.log(addng_element);
        var cloneQuestion = $('.clone_section_question').eq(0).clone()
        .attr('id', 'clone_answer_' + clone_answer)
        .appendTo(".challenge");
        $(cloneQuestion).removeClass('clone_section_question');
        for(var i=0 ; i<20; i++)
        {
            if($(".chalange_second_step").children().length == i){
                $(cloneQuestion).find('.question_label').text(i+ '. Enter Question');
                $(cloneQuestion).find('input[type="radio"]').val(array[i]);
                $(cloneQuestion).find('input[type="textarea"]').val('');
                for( i=0; i<=$(cloneQuestion).find('.question_text').children().length; i++){
                    $(cloneQuestion).children().last().children().eq(i).first().attr('id',res+clone_answer+'_'+i);
                    $(cloneQuestion).find('.question_text').find('input[type="textarea"]').eq(i).first().attr('name','answer['+answer_counter +']['+i+']');
                    $(cloneQuestion).find('.question_text').find('input[type="radio"]').attr('name','right_answer['+answer_counter +']');
                    $(cloneQuestion).find('.question_text').find('.fileInput').attr('name','answer_image['+answer_counter+']['+i+']');
                    $(cloneQuestion).find('.question_text').find('.hidden').attr('name','hidden_image_name['+answer_counter+']['+i+']');
                }            
                $(cloneQuestion).find('.question_text').find('input[type="textarea"]').css('border-color', '');
                $(cloneQuestion).find('.question_text').find('.image_answer').attr('src','/images/imageplaceholder.png');
                $(cloneQuestion).find('.question_text').find('span').text('');
                
                break;
            }
        }
        $(cloneQuestion).find('.add_answer').attr('id','clone_answer_'+cloneCount+'_add_answer');
        clone_answer++;
        answer_counter++;
        answer_counter_next++;
    });
        
});


//  for answer image to display 
$(document).on('click','.browse',function()
    {
        $(this).siblings().children().trigger('click')
    });


    $(document).on('change','.fileInput',function()
    {
        readUrl(this);
    });

    function readUrl(input) 
    {
        var destination = event.target.parentNode.parentNode.nextSibling.firstChild;
        var hidden_destination = event.target.parentNode.lastChild;
        console.log(hidden_destination);
        //console.log(destination);
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    destination.setAttribute('src' , e.target.result);
                    //hidden_destination.value= e.target.result;  
                };

                reader.readAsDataURL(input.files[0]);
            }
    }

    $(document).ready(function() { 
        $("#invites").select2(); 
    });

   

    $(document).on('click','.remove', function(){
        $(this).parent().find('.image_answer').attr('src','/images/imageplaceholder.png')
    
    });