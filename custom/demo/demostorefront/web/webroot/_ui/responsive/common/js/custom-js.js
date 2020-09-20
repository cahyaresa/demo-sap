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


        init: function() {
            var _self = demo.global;
            _self.home();
        }
    };
    demo.global.init();

})(jQuery);