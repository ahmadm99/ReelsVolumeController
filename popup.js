document.addEventListener('DOMContentLoaded', function() {
    const defaultVolumeInput = document.getElementById('defaultVolume');
    const saveButton = document.getElementById('saveButton');
  
    // Load default volume value from storage
    chrome.storage.sync.get(['defaultVolume'], function(result) {
      const defaultVolume = result.defaultVolume || 0.1; // Default to 0.1 if not set
      defaultVolumeInput.value = defaultVolume;
    });
  
    // Save default volume value to storage
    saveButton.addEventListener('click', function() {
      const defaultVolume = defaultVolumeInput.value;
      chrome.storage.sync.set({ defaultVolume: defaultVolume }, function() {
        console.log('Default volume set to ' + defaultVolume);
      });
    });
  });
  