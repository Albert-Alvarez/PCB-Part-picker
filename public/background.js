chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { target: 'extension', type: 'openModal' });
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    chrome.storage.local.set({available_pcbs: request.data}, function() {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            for (let i=0; i<tabs.length; ++i) {
                chrome.tabs.sendMessage(tabs[i].id, { target: 'app', type: 'availablePCBs', data: request.data });
            }
        });
    });
});

