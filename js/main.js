Scanner = function (canvas, video, button) {

    // Grab elements, create settings, etc.
    var context = canvas.getContext("2d"),
        video = video,
        videoObj = { "video": true },
        errBack = function(error) {
            alert("ack");
            console.log("Video capture error: ", error.code); 
        };

        // Put video listeners into place
        if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia(videoObj, function(stream) {
                video.src = stream;
                video.play();
            }, errBack);
        } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            console.log("webkit");
            navigator.webkitGetUserMedia(videoObj, function(stream){
                console.log('lalala');
                video.src = window.webkitURL.createObjectURL(stream);
                video.play();
            }, errBack);
        } else if(navigator.mozGetUserMedia) { // WebKit-prefixed
            navigator.mozGetUserMedia(videoObj, function(stream){
                video.src = window.URL.createObjectURL(stream);
                video.play();
            }, errBack);
        } else {
            console.log("blarg");
        }

        // Trigger photo take
        $(button).click(function() {
            context.drawImage(video, 0, 0, 640, 480);
        });

}

$(document).ready(function (event) {
    Scanner($('canvas').get(0), $('video').get(0), $('snap'));
});
