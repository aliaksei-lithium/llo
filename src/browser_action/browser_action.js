

(function () {
    console.log("[LLO] Starting currency update...");

    var nbrbValueNode = document.querySelector(".lloCurrencyHead__value");

    getExchangeRate(function (rate) {
        nbrbValueNode.innerText = rate.usd.ask;
        console.log("[LLO] ...End currency update.");
    });

})();

function getExchangeRate(onGetRate) {
    var oneDay = 1000 * 60 * 60 * 24;
    LLO_UTIL.getUSDRate(onGetRate, function (rate) {
        if (rate != null || (rate != null && (new Date().getTime() - rate.lastUpdate >= oneDay))) {
            LLO_UTIL.updatedExchangeRate();
            LLO_UTIL.getUSDRate(onGetRate);
        } else {
            onGetRate(rate);
        }
    });


}