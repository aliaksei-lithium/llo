var LLO = LLO || {};
var LS_KEY = "LLO_CurrencyExchange";

LLO.LLO_SITES = [
    {
        "id": "21vek.by",
        "srcScript": "src/inject/21vek.js",
        "isMatch": function () {
            var loc = document.location,
                re = /www\.21vek\.by/;
            return re.test(loc.hostname);
        }
    },
    {
        "id": "onliner",
        "srcScript": "src/inject/logger.js",
        "isMatch": function () {
            return false;
        }
    }];


/*INITIALIZE LOGIC*/

(function (document) {
    var s = document.createElement('script'),
        scriptSrcBySite = detectScriptSrc();
    chrome.runtime.sendMessage({method: "getLocalStorage", key: LS_KEY}, function(response) {
        localStorage.setItem(LS_KEY, response.data);
        if (scriptSrcBySite && scriptSrcBySite.length > 0) {
            s.src = chrome.extension.getURL(scriptSrcBySite);
            s.onload = function () {
                this.parentNode.removeChild(this);
            };
            (document.head || document.documentElement).appendChild(s);
        }
    });


})(window.document);


function detectScriptSrc() {
    var _s = LLO.LLO_SITES,
        i = 0,
        lloSite;
    for (i; i < _s.length; i++) {
        if (_s[i].isMatch()) {
            lloSite = _s[i];
            break;
        }
    }
    return !!lloSite ? lloSite.srcScript : null;
}


