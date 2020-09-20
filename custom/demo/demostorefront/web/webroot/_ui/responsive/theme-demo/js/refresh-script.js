var queryString = window.location.search;
if (queryString != "" && queryString.includes("refresh=true")) {
    var queryStringSplit = queryString.substr(1).split("&");
    if (queryStringSplit.length>1) {
        window.stop();
        setTimeout(function(){
            window.location = window.location.href.replace("&refresh=true", "");
        }, 500)
    } else {
        window.stop();
        setTimeout(function(){
            window.location = window.location.href.replace("?refresh=true", "");
        }, 500);
    }
}