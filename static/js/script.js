const dropArea = document.getElementById("drop-area");
const imageUpload = document.getElementById("imageUpload");
const imageView = document.getElementById("img-view");

imageUpload.addEventListener("change", uploadImage);

function uploadImage(){
    let imgLink = URL.createObjectURL(imageUpload.files[0]);
    dropArea.style.backgroundImage = `url(${imgLink})`;
    dropArea.textContent = "";
    dropArea.style.border = 0;
}

dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});

dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    imageUpload.files = e.dataTransfer.files;
    uploadImage();
})

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('paste', function (evt) {
        const clipboardItems = evt.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter(function (item) {
            // Filter the image items only
            return item.type.indexOf('image') !== -1;
        });
        if (items.length === 0) {
            return;
        }

        const item = items[0];
        const blob = item.getAsFile();

        imgLink = URL.createObjectURL(blob);
        dropArea.style.backgroundImage = `url(${imgLink})`;
        dropArea.textContent = "";
        dropArea.style.border = 0;

    });
});

$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
   
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    $(document).on('paste', function(){
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    })

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);
        console.log(form_data);
        // Show loading animation
        $(this).hide();
        $('.loader').show();
        $('.lds-facebook').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('.lds-facebook').hide();
                $('#result').fadeIn(1000);
                $('#result').text(data);
                console.log('Success!');
            },
        });
    });

});