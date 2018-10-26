// chrome.storage.local.clear(function() {
//     var error = chrome.runtime.lastError;
//     if (error) {
//         console.error(error);
//     }
// });

// chrome.storage.sync.clear(function() {
//     var error = chrome.runtime.lastError;
//     if (error) {
//         console.error(error);
//     }
// });

chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { target: 'extension', type: 'openModal' });
    });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    switch (request.type) {
        case 'addNewPCB':
            chrome.storage.local.get({ pcbs: [] }, function(response) {
                let pcbs = response.pcbs;
                let newPcb = {
                                name: request.newPcb,
                                bom: []
                             };
                pcbs.push(newPcb);
                chrome.storage.local.set({ pcbs: pcbs });
            });
            break;
        case 'removePCB':
            chrome.storage.local.get({ pcbs: [] }, function(response) {
                let pcbs = response.pcbs;
                pcbs.splice(request.oldPcb, 1);
                chrome.storage.local.set({ pcbs: pcbs });
            });
            break;
    }
});

