// Function to create and attach volume slider
function attachVolumeSlider(reel, defaultVolume) {
  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = '1';
  slider.step = '0.01';
  slider.value = defaultVolume.toString(); // Convert to string
  slider.classList.add('volume-slider');

  // Set styles based on hostname
  const hostname = window.location.hostname;
  
  // Adjust position and size of the volume slider
  slider.style.position = 'absolute';
  slider.style.width = '80px'; // Make it smaller
  slider.style.zIndex = '9999'; // Ensure it is on top of other elements
  if (hostname.includes('instagram.com')) {
    slider.style.bottom = '10px';
    slider.style.left = '50%';
    slider.style.transform = 'translateX(-50%)';
  } else if (hostname.includes('facebook.com')) {
    slider.style.bottom = '100px'; // Adjust this value for Facebook
    slider.style.left = '50%';    // Position to the right bottom area
    slider.style.transform = 'translateX(-50%)';
  }
  // slider.style.bottom = '10px'; // Position it towards the bottom
  // slider.style.left = '50%'; // Align it horizontally with the center
  // slider.style.transform = 'translateX(-50%)';

  // Event listener to adjust volume
  slider.addEventListener('input', (event) => {
    reel.volume = event.target.value;
  });

  // Set the volume of the video element to the default value
  reel.volume = defaultVolume;

  reel.parentElement.appendChild(slider);
}

// Function to periodically check for new video elements and attach volume sliders
function checkForNewVideos(defaultVolume) {
  document.querySelectorAll('video:not(.volume-slider-attached)').forEach((reel) => {
    attachVolumeSlider(reel, defaultVolume);
    reel.classList.add('volume-slider-attached');
  });
}

// Load default volume value from storage
chrome.storage.sync.get(['defaultVolume'], function(result) {
  const defaultVolume = result.defaultVolume || 0.1; // Default to 0.1 if not set

  // Initial check for video elements and attaching volume sliders
  checkForNewVideos(defaultVolume);

  // Periodically check for new video elements and attach volume sliders
  setInterval(() => checkForNewVideos(defaultVolume), 1000); // Adjust the interval as needed
});
