document.addEventListener('DOMContentLoaded', () => {
    let slider = document.getElementById('slider');
    let value = document.getElementById('value');


    chrome.storage.sync.get('speed', (speed) => {
        if (speed && speed['speed']) {
            slider.value = speed['speed'];
            value.innerHTML = speed['speed'];
        }
    });

    slider.addEventListener("input", (event) => {
        let newSpeed = slider.value;
        value.innerHTML = newSpeed;

        //Changes all tabs
        let src = 'document.querySelectorAll("video, audio").forEach(function (x) { x.playbackRate = ' + newSpeed + '})' + ';';

        chrome.tabs.query({}, (tabs) => {
            tabs.forEach((tab) => {
                chrome.tabs.executeScript(tab.id, { code: src });
            });
        });

        chrome.storage.sync.set({ 'speed': newSpeed });
    });
});

