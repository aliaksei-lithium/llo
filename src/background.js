
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == "getUSDRate") {
        LLO_UTIL.getUSDRate(function (rate) {
            sendResponse({"data": rate});
        });
    }
    else
        sendResponse({});
});