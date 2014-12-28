(function () {
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

                    (function (node, value) {
                        getConvertedValue(value, function (usdValue) {
                            node.childNodes[0].innerText = usdValue;
                        });
                    })(itemNode, byrValue);

                    itemNode.childNodes[0].innerText = getConvertedValue(byrValue);
                } else if (byrValueNode.nodeName === "#text") {
                    byrValue = byrValueNode.nodeValue;

                    (function (node, value) {
                        getConvertedValue(value, function (usdValue) {
                            node.childNodes[0].nodeValue = usdValue;
                        });
                    })(itemNode, byrValue);

                }
                itemNode.childNodes[1].innerText = "$";
            } catch (e) {
                console.error("[LLO] Error on converting, continue...");
            }

        }
    }


    function getConvertedValue(byrValue, cb) {
        var byrIntValue = parseInt(byrValue.replace(/\s/g, ''));

        LLO_UTIL.convertMoney(byrIntValue, cb());
    }
})();
