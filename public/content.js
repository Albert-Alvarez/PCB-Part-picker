var product = {
    "distributor": null,
    "sku": null,
    "manufacturerId": null,
    "description": null,
    "url": null,
    "stockAvailable": null, 
    "minimum": null,
    "multiple": null,
    "curreny": null,
    "price": []
};

var validDistributor = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.target === 'extension') {
        switch (request.type) {
            case 'openModal':
                var appIframe = document.getElementById("pcb-part-picker");
                if (appIframe === null) {
                    var iframe = document.createElement('iframe');
                    iframe.src = chrome.runtime.getURL('index.html');
                    iframe.setAttribute("id", "pcb-part-picker");
                    iframe.setAttribute("frameBorder", "0");
                    iframe.style.cssText = '-webkit-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75);' +
                        '-moz-box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75);' +
                        'box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.75);position:fixed;right:0;top:0;display:block;' +
                        'width:320px;height:100%;z-index:99999;';
                    document.body.appendChild(iframe);
                }
                break;
            case 'closeModal':
                document.body.removeChild(document.getElementById('pcb-part-picker'));
                break;
            case 'availableProduct':
                if (validDistributor) {
                    sendResponse({"productAvailable": validProductPage()});
                } else {
                    sendResponse({"productAvailable": false });
                }
                break;
        }
    }
});
