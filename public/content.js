chrome.runtime.onMessage.addListener(request => {
    if (request.type === 'openModal') {
        var appIframe = document.getElementById("pcb-part-picker");
        if (appIframe === null) {
            var iframe = document.createElement('iframe');
            iframe.src = chrome.runtime.getURL('index.html');
            iframe.setAttribute("id","pcb-part-picker");
            iframe.setAttribute("frameBorder","0");
            iframe.style.cssText = 'position:fixed;right:0;top:0;display:block;' +
                'width:320px;height:100%;z-index:1000;';
            document.body.appendChild(iframe);
        }
    }
});