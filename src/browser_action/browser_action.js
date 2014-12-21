var LS_KEY = "LLO_CurrencyExchange";
var API_URL_YAHOO = "https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDBYR%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage") {
        getExchangeRate(function(rate) {
            sendResponse({data: localStorage[request.key]});
        });
    }
    else
        sendResponse({}); // snub them.
});



(function () {
    console.log("[LLO] Starting currency update...");
    var nbrbValueNode = document.querySelector(".lloCurrencyHead__value");

    getExchangeRate(function(rate) {
        nbrbValueNode.innerText = rate;
        console.log("[LLO] ...End currency update.");
    });

})();

function getExchangeRate(onGetRate) {
    var lsLLO = JSON.parse(localStorage.getItem(LS_KEY)),
        oneDay = 1000*60*60*24;
    if(lsLLO === null || (lsLLO != null && (new Date().getTime() - lsLLO.lastUpdate >= oneDay))) {
        updatedExchangeRate(onGetRate);
    } else {
        onGetRate(lsLLO.usd.ask);
    }

}

function updatedExchangeRate() {

    var _httpReq = new XMLHttpRequest(),
        _lsLLO = {};

    _makeRequest(API_URL_YAHOO);

    function _makeRequest(url) {
        _httpReq.onreadystatechange = _onGetNewRates;
        _httpReq.open('GET', url);
        _httpReq.send();
    }

    function _onGetNewRates() {
        if (_httpReq.readyState === 4) {
            if (_httpReq.status === 200) {
                var resp = JSON.parse(_httpReq.responseText);
                if (resp) {
                    _lsLLO = {
                        "lastUpdate" : new Date().getTime(),
                        "usd" : {
                            "ask" : Math.round(resp.query.results.rate.Ask),
                            "bid" : Math.round(resp.query.results.rate.Bid)
                        }
                    };
                    localStorage.setItem(LS_KEY, JSON.stringify(_lsLLO));
                } else {
                    throw new Error("Can't update currency");
                }


            } else {
                console.log("Can't update currency");
            }
        }
    }
}
