var LLO_UTIL = (function () {

    var _usdRate = null;

    var convertMoney = function (inVal, cb) {
        //debugger;
        if (_usdRate == null) {
            getUSDRate(function (result) {
                _usdRate = result.usd.ask;
                cb(Math.round(inVal / _usdRate));
            })
        } else {
            inVal ? cb(Math.round(inVal / _usdRate)) : console.log("Can't convert value");
        }
    };

    var updatedExchangeRate = function updatedExchangeRate(cb) {
        var API_URL_NBRB = "http://www.nbrb.by/Services/XmlExRates.aspx";
        var USD_CODE = "840";
        var _x2js = new X2JS();

        var _httpReq = new XMLHttpRequest(),
            _lsLLO = {};

        _makeRequest(API_URL_NBRB);

        function _makeRequest(url) {
            _httpReq.onreadystatechange = _onGetNewRates;
            _httpReq.open('GET', url);
            _httpReq.send();
        }

        function _onGetNewRates() {
            if (_httpReq.readyState === 4) {
                if (_httpReq.status === 200) {
                    var resp = _x2js.xml_str2json(_httpReq.responseText);
                    if (resp) {
                        _lsLLO = {
                            "lastUpdate": new Date(resp.DailyExRates._Date).getTime(),
                            "usd": {
                                "ask": parseInt(_.find(resp.DailyExRates.Currency, {"NumCode": USD_CODE}).Rate)
                            }
                        };
                        chrome.storage.local.set({"LLO_CurrencyExchange": _lsLLO}, function () {
                            _usdRate = _lsLLO.usd.ask;
                        });
                    } else {
                        throw new Error("Can't update currency");
                    }
                } else {
                    console.log("Can't update currency");
                }
            }
        }
    };

    var getUSDRate = function (cb) {
        if (chrome.storage) { //extension scope
            chrome.storage.local.get("LLO_CurrencyExchange", function (result) {
                cb(result["LLO_CurrencyExchange"]);
            });
        } else { //inject scope
            chrome.runtime.sendMessage({method: "getUSDRate"}, function(response) {
                cb(response["data"]);
            });
        }

    };


    return {
        convertMoney: convertMoney,
        updatedExchangeRate: updatedExchangeRate,
        getUSDRate: getUSDRate
    };

})();