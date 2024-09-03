document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById("promoVideo");
    const learnMoreButton = document.getElementById("learnMoreButton");
    const videoSection = document.getElementById("videoSection");
    const customControls = document.getElementById("customControls");
    const playPauseButton = document.getElementById("playPauseButton");

    // Show custom controls when Learn More button is clicked
    learnMoreButton.addEventListener("click", function() {
        videoSection.scrollIntoView({ behavior: 'smooth' });
        video.play();
        customControls.style.display = 'block';
        playPauseButton.textContent = 'Pause';
    });

    // Play/Pause button functionality
    playPauseButton.addEventListener("click", function() {
        if (video.paused) {
            video.play();
            playPauseButton.textContent = 'Pause';
        } else {
            video.pause();
            playPauseButton.textContent = 'Play';
        }
    });

    // Play video when it comes into view
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play();
                customControls.style.display = 'block';
                playPauseButton.textContent = 'Pause';
                observer.disconnect();
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(video);
});

