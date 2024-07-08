$(document).ready(function () {
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    var dropArea = document.getElementById('dropArea');
    dropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', function () {
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        var files = e.dataTransfer.files;
        if (files.length > 0) {
            $('#imageUpload')[0].files = files;
            $('.image-section').show();
            $('#btn-predict').show();
            $('#result').text('');
            $('#result').hide();
            readURL($('#imageUpload')[0]);
        }
    });

    $(document).on('paste', function (e) {
        var items = (e.clipboardData || e.originalEvent.clipboardData).items;
        for (var index in items) {
            var item = items[index];
            if (item.kind === 'file' && item.type.indexOf('image') !== -1) {
                var blob = item.getAsFile();
                $('#imageUpload')[0].files = [blob];
                $('.image-section').show();
                $('#btn-predict').show();
                $('#result').text('');
                $('#result').hide();
                readURL($('#imageUpload')[0]);
                break;
            }
        }
    });

    $('#desktopFileUpload').change(function () {
        var input = this;
        if (input.files && input.files[0]) {
            $('.image-section').show();
            $('#btn-predict').show();
            $('#result').text('');
            $('#result').hide();
            readURL(this);
        }
    });

    $('#btn-predict').click(function () {
        var form_data = new FormData();
        form_data.append('file', $('#imageUpload')[0].files[0]);

        // Simulated prediction - Replace this with your actual prediction logic
        var predictionResult = "This is a placeholder for the prediction result.";

        // Show loading animation
        $(this).hide();
        $('.loader').show();
        $('.lds-facebook').show();

        // Simulated AJAX call
        setTimeout(function () {
            // Get and display the result
            $('.loader').hide();
            $('.lds-facebook').hide();
            $('#result').fadeIn(1000);
            $('#result').text(predictionResult);
            console.log('Success!');
        }, 5000); // Simulating a 2-second prediction process
    });
});