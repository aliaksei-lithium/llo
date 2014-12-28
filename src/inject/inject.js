var LLO = LLO || {};

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


/*INITIALIZE*/

(function (document) {
    var s = document.createElement('script'),
        utilJs = document.createElement("script"),
        scriptSrcBySite = detectScriptSrc();

    chrome.runtime.sendMessage({method: "getUSDRate"}, function(response) {
        debugger;
    });

    if (scriptSrcBySite && scriptSrcBySite.length > 0) {
        utilJs.src  = chrome.extension.getURL("src/util/lloUtil.js");
        s.src = chrome.extension.getURL(scriptSrcBySite);
        s.onload = function () {
            this.parentNode.removeChild(this);
        };
        var head = (document.head || document.documentElement);
        head.appendChild(utilJs);
        head.appendChild(s);
    }



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


