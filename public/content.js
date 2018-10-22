chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'openModal') {
        var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
        if (!location.ancestorOrigins.contains(extensionOrigin)) {
            var iframe = document.createElement('iframe');
            iframe.src = chrome.runtime.getURL('index.html');
            iframe.setAttribute("frameBorder","0");
            iframe.style.cssText = 'position:fixed;right:0;top:0;display:block;' +
                'width:320px;height:100%;z-index:1000;';
            document.body.appendChild(iframe);
        }
    }
});