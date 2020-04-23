const inputScrollFactor = document.getElementById('scrollFactor');

chrome.storage.sync.get(function (items) {
    if (items['scrollFactor'] !== undefined) {
        inputScrollFactor.value = items['scrollFactor'];
    }
})

function updateScrollFactor() {
    const factor = parseFloat(inputScrollFactor.value);

    if (factor < 0 || factor > 1000) {
        return;
    }

    chrome.storage.sync.set({'scrollFactor': factor});

    chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tabs) {
        console.log(tabs);
        chrome.tabs.sendMessage(tabs[0].id, {scrollFactor: factor, CSS: 'ChangeScrollSpeed'});
    });
}

inputScrollFactor.addEventListener('change', updateScrollFactor);
inputScrollFactor.addEventListener('keyup', updateScrollFactor);


