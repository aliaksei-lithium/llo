console.log("[LLO] Starting currency changing...!");

var prices = document.querySelectorAll(".g-price");

if (prices !== null && prices.length > 0) {
    for (var i = 0; i < prices.length; ++i) {
        var item = prices[i];
        var value = item.childNodes[0].nodeValue;
        var curr = item.childNodes[1].nodeValue;
        console.log("BR: " + value);
        //debugger;
        item.childNodes[0].nodeValue = Math.round(parseInt(value.replace(/\s/g,'')) / 11150);
        //debugger;

        item.childNodes[1].innerHTML = "$";
    }
}
