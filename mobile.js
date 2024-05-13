if (window.innerWidth < 1000){
    // Constants for acceleration thresholds
    const SHAKE_THRESHOLD = 15; // You may need to adjust this threshold based on testing
    const TIMEOUT = 1000; // Timeout for shaking detection

    let lastUpdate = 0;
    let x, y, z, lastX = 0, lastY = 0, lastZ = 0;

    // Listen for device motion events
    window.addEventListener('devicemotion', function(event) {
        let currentTime = new Date().getTime();
        let timeDifference = currentTime - lastUpdate;

        if (timeDifference > TIMEOUT) {
            // Get acceleration values
            let acceleration = event.accelerationIncludingGravity;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;

            // Calculate delta values
            let deltaX = Math.abs(x - lastX);
            let deltaY = Math.abs(y - lastY);
            let deltaZ = Math.abs(z - lastZ);

            // Check for shaking motion
            if (deltaX > SHAKE_THRESHOLD || deltaY > SHAKE_THRESHOLD || deltaZ > SHAKE_THRESHOLD) {
                // Shake detected, play video
                let thumbnailVideo = document.getElementById("thumbnail-video");
                let iframeVideo = document.getElementById("iframe-video");
                thumbnailVideo.style.display = "none";
                iframeVideo.style.display = "block";
                
                thumbnailVideo.src += '&autoplay=1';                
            }

            // Update last values
            lastX = x;
            lastY = y;
            lastZ = z;
            lastUpdate = currentTime;
        }
    });
}