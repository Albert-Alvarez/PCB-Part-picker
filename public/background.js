chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { target: 'extension', type: 'openModal' });
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
        case 'addNewPCB':
            chrome.storage.local.get({ available_pcbs: [] }, function(response) {
                let availablePCBs = response.available_pcbs;
                availablePCBs.push(request.data);
                chrome.storage.local.set({ available_pcbs: availablePCBs }, function () {
                    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
                        for (let i = 0; i < tabs.length; ++i) {
                            chrome.tabs.sendMessage(tabs[i].id, { target: 'app', type: 'availablePCBs', data: availablePCBs });
                        }
                    });
                });
            });
            break;
    }
});

