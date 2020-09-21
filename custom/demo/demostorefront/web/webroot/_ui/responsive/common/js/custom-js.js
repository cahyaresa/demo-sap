if (!window.demo) {
    window.demo = {};
}
var deletearray = [];
var demo = window.demo;
//var h = $(".imgindex").val();
if (!window.ACC) {
    window.ACC = { config: { encodedContextPath: {} } };
}
var notFountUrl = ACC.config.encodedContextPath + "/content/demoNotFound_en.htm";
var windowWidth;


(function($) {
    var patterns = {
        "lettersOnly": {
            "message": "Letters only",
            "code": /^[a-zA-Z\s]+$/
        },
        "phoneNumber": {
            "message": "Phone number only",
            "code": /^(?=\d{8,13}$)(8)\d+/
        },
        "positiveInteger": {
            "message": "Enter only numbers without special characters",
            "code": /^\d+$/
        },
        "alphaNumeric": {
            "message": "Enter only letters and numbers",
            "code": /^[0-9a-zA-Z]+$/
        },
        "alphaNumericSpace": {
            "message": "Aplha numeric with Space only",
            "code": /^[0-9a-zA-Z\s]+$/
        },
        "licensePlateNumber": {
            "message": "Enter only letters and numbers",
            "code": /^[a-zA-Z]+\d+[a-zA-Z]+$/
        },
        "nameCharacters": {
            "message": "Enter only alphabet, ('), and (-)",
            "code": /^[A-Za-z\s'-]+$/
        }
    };

    var winWidth;
    demo.global = {
        home: function() {
            var _self = demo.global;
            var mainBanner = $(".main-banner");

            mainBanner.slick({
                dots: true,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                adaptiveHeight: true
            });

            $(".btn-collapsed").on("click", function(){
                $(".desc-collapse").toggleClass("show");
            })

            $(".forming-material").slick({
                dots: false,
                slidesToShow: 3,
                responsive: [
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 1,
                        dots:true
                      }
                    },
                    ]
            });

        },
        priceFormat: function(str) {
            var newString = "",
                formattedPrice = "";

            for (var i = str.length - 1; i >= 0; i--) {
                newString += str[i];
            }

            var a = [],
                start = 0;
            while (start < newString.length) {
                a.push(newString.slice(start, start + 3));
                start += 3;
            }
            var changeval = a.join(".");

            for (var j = changeval.length - 1; j >= 0; j--) {
                formattedPrice += changeval[j];
            }
            return formattedPrice;
        },

        pdp: function() {
            var four_columns = $(".four-colum");

            four_columns.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: true,
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1
                    }
                },
                    {
                        breakpoint: 794,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1,
                            arrows: false
                        }
                    }
                ]
            });
        },

        init: function() {
            var _self = demo.global;
            _self.home();
            _self.pdp();
        }
    };
    demo.global.init();

})(jQuery);