var currentUrl = window.location.href;
var timer;

var currentHost = window.location.hostname;
var header, footer;




if (currentHost == "prodlike1-environment.seva.id" || currentHost == "www.seva.id"){

	document.body.style.display = 'none';

    header = $(".astra-auto-header");
    if (header != undefined ){
        $(".__main").css("padding-top", "0px");
        header.remove();
    }

    footer = $(".footer");
    if (footer != undefined) {
        footer.remove();
    }


    if (!currentUrl.includes("/multi")) {
        if (currentUrl.includes) {
        (function(w,d) {
            var h,u,s;
            h=w.location.hostname;
            if('prodlike1-environment.seva.id|www.seva.id'.split('|').indexOf(h)==-1)return;
            u='//'+h+'/widget-snippet.js?'+new Date().getTime();
            s=d.createElement('script');
            s.src=u;
            s.async=!0;
            d.body.appendChild(s);

        })(window,document)
        }
    } else if (currentUrl.includes("/multi")) {
        if (currentUrl.includes) {
            (function(w,d) {
                var h,u,s;
                h=w.location.hostname;
                if('prodlike1-environment.seva.id|www.seva.id'.split('|').indexOf(h)==-1)return;
                u='//'+h+'/widget-snippet.js?'+new Date().getTime();
                s=d.createElement('script');
                s.src=u;
                s.async=!0;
                d.body.appendChild(s);

            })(window,document)
        }
        setTimeout(function(){
            $(".seva-global-header").css("display", "none");
            $(".seva-global-footer").css("display", "none");
            }, 1800);

    }

    document.body.style.display = 'block';
    //setTimeout(function(){ document.body.style.display = "block"; }, 1800);

} else {
    document.body.style.display = 'block';
    header = $(".astra-auto-header");
    header.css("display", "block");
    footer = $(".footer");
    footer.css("display", "block");
}

