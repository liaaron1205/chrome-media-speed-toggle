document.addEventListener('DOMContentLoaded', () => {
    let slider = document.getElementById('slider');
    let value = document.getElementById('value');


    chrome.storage.sync.get('speed', (speed) => {
        let savedSpeed = speed['speed'];
        slider.value = savedSpeed;
        value.innerHTML = savedSpeed;
        applyChanges(savedSpeed);
    });

    slider.addEventListener("input", (event) => {
        let newSpeed = slider.value;
        value.innerHTML = newSpeed;

        //Changes all tabs
        applyChanges(newSpeed);

        chrome.storage.sync.set({ 'speed': newSpeed });
    });

    function applyChanges(newSpeed) {
        let src = 'document.querySelectorAll("video, audio").forEach(function (x) { x.playbackRate = ' + newSpeed + '})' + ';';

        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.executeScript(tab.id, { code: src });
            });
        });
    }
});

