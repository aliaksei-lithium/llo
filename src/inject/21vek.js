var LS_KEY = "LLO_CurrencyExchange",
    CURR_RATE = 1;

var prices = document.querySelectorAll(".g-price"),
    itemNode,
    byrValueNode,
    byrValue = "";

if (prices !== null && prices.length > 0) {
    for (var i = 0; i < prices.length; ++i) {
        itemNode = prices[i];
        byrValueNode = itemNode.childNodes[0];
        byrValue = "";

        try {
            if (byrValueNode.nodeName === "SPAN") {
                byrValue = byrValueNode.innerText;
                itemNode.childNodes[0].innerText = getConvertedValue(byrValue);
            } else if (byrValueNode.nodeName === "#text") {
                byrValue = byrValueNode.nodeValue;
                itemNode.childNodes[0].nodeValue = getConvertedValue(byrValue);
            }
            itemNode.childNodes[1].innerText = "$";
        } catch (e) {
            console.error("[LLO] Error on converting, continue...");
        }

    }
}

function getUSDASK() {
    if (CURR_RATE === 1) {
        //debugger;
        CURR_RATE =  JSON.parse(localStorage.getItem(LS_KEY)).usd.ask;
    }
    return CURR_RATE;
}

function getConvertedValue(byrValue) {
    return Math.round(parseInt(byrValue.replace(/\s/g, '')) / getUSDASK());
}