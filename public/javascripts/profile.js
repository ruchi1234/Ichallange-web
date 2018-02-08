var $image;
$('#cropper-example-2-modal').on('shown.bs.modal', function () {
    $image = $('#cropper-example-2 > img'),

        $image.cropper({
            movable: false,
            strict: false,
            zoomable: true,
            rotatable: false,
            scalable: false,
            aspectRatio: 50/40,
            imageSmoothingEnabled: true,
            imageSmoothingQuality: true,
            autoCropArea: 0.65,
            minAspectRatio: 0.5,
            maxAspectRatio: 1.5,
            cropBoxResizable: false,
            built: function () {
                // Strict mode: set crop box data first
                $image.cropper('setCropBoxData', cropBoxData);
                $image.cropper('setCanvasData', canvasData);
            },
            crop:function(data){
                console.log(data);
                var croped_image = $image.cropper('getCroppedCanvas',{width:130, height:125}).toDataURL('image/jpeg');
                $('.preview').attr('src', croped_image);
            },
        })
        
}).on('hidden.bs.modal', function () {
    getData = $image.cropper('getData');
    cropBoxData = $image.cropper('getCropBoxData');
    canvasData = $image.cropper('getCanvasData');
    $image.cropper('destroy');
});
$(document).on('click', "#crops", function () {
    var croped_image = $image.cropper('getCroppedCanvas').toDataURL('image/jpeg');
    $('.profile_pic').attr('src', croped_image);
    $('#button_image').trigger('click');   
})
$(document).ready(function(){
    
    $('.uploadImage').submit(function(e){
        e.preventDefault();
        
       
        
        $(this).ajaxSubmit({
          data: {user_id: 123},
          contentType: 'application/json',
          success: function(response){
            console.log('image uploaded and form submitted');  
            $('.close').trigger('click');   
          }
      });
        return false;
   });
})

$(document).on('focus', "#cropper-example", function(){
    var temp_cropped_image = $image.cropper('getCroppedCanvas',{width:130, height:125}).toDataURL('image/jpeg');
    $('#cropped-image').attr('src', temp_cropped_image);
});
//
$('.profile_pic_edit').click(function()
    {
        $('.fileImage').trigger('click')
    });


$(document).on('change','.fileImage',function()
    {
        read(this);
    });

function read(input)
{
    if (input.files && input.files[0]) 
    {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#cropper-example')
            .attr('src', e.target.result);
            $('.preview').attr('src', e.target.result);
            crop_image();
            
        };

        reader.readAsDataURL(input.files[0]);
    }
}
function crop_image(){
    $('#cropped_image').trigger('click');
}

