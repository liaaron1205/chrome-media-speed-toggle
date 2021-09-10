chrome.storage.sync.get('speed', (speed) => {
    if (speed) {
        document.querySelectorAll("video, audio").forEach(function (x) { x.playbackRate = speed['speed'] });
    }
});