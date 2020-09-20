if (!window.astra) {
    window.astra = {};
}
var deletearray = [];
var astra = window.astra;
//var h = $(".imgindex").val();
if (!window.ACC) {
    window.ACC = { config: { encodedContextPath: {} } };
}
var notFountUrl = ACC.config.encodedContextPath + "/content/astraNotFound_en.htm";
var windowWidth;

var maintenance_object = {
    speed: 300,
    slidesToShow: 4,
    prevArrow: '<i class="fa fa-arrow-left slick-prev-btn" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-arrow-right slick-next-btn" aria-hidden="true"></i>',
    responsive: [{
            breakpoint: 1025,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false
            }
        },
        {
            breakpoint: 900,
            settings: {
                centerMode: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: true,
                arrows: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
                variableWidth: true
            }
        }
    ]
};

var swipeSlickObject = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

var expertSlickObject = {
	    dots: $(".expert_choice_component").length > 0 ? true : false,
	    infinite: false,
	    speed: 300,
	    slidesToShow: 4,
	    slidesToScroll: 4,
	    responsive: [
	        {
	            breakpoint: 900,
	            settings: {
	                slidesToShow: 2,
	                slidesToScroll: 2
	            }
	        },
	        {
	            breakpoint: 480,
	            settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1
	            }
	        }
	    ]
	};

var supportBannerObject = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 3,
    arrow: true,
    centerMode: true,
    centerPadding: '0',
    responsive: [{
            breakpoint: 900,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                centerMode: true,
                slidesToShow: 2,
                slidesToScroll: 1,
                dots: false
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
    /*infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrow: true,
    centerMode: true,
    centerPadding: '0',
    responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                dots: false,
            }
        },
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
            }
        }
    ]*/
};

var stepsBannerObject = {
    dots: false,
    arrows: false,
    draggable: false,
    swipeToSlide: false,
    touchMove: false,
    infinite: false,
    responsive: [{
        breakpoint: 990,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            draggable: true,
            swipeToSlide: true,
            touchMove: true
        }
    }]
};

//Sticky Footer
function stickyFooter() {
    var window__ht = $(window).height();
    var pgContent__ht = $('main').height() + $('footer').height();
    if (pgContent__ht < window__ht) {
        $('footer').addClass('footer--sticky');
    } else {
        $('footer').removeClass('footer--sticky');
    }
}

// Default date picker for sell-my-car form
$('.astra-datepicker-sellmycar input').datepicker({
   format: 'dd-mm-yyyy',
   autoclose: true,
});

function startDate($input) {
    if ($input.is($('.astra-datepicker input')) || $input.is($('#dob-datepicker input')) || $input.is($('#test-drive-date input'))) {
        return $input.attr("minDate") == "today" ? new Date() : "+1d"
    } else if ($input.is($("input[id = 'payment.scheduled.date.time']"))) {
        return "+1d"
    }
}

function endDate($input) {
    if ($input.is($('.astra-datepicker input')) || $input.is($('#dob-datepicker input')) || $input.is($('#test-drive-date input'))) {
        return $input.attr("maxDate") == "today" ? new Date() : ""
    } else if ($input.is($("input[id = 'payment.scheduled.date.time']"))) {
        return $input.attr("maxDate") == "today" ? new Date() : ""
    }
}
function datePicker($input) {
	var workingDays = [] ;
	var today = new Date();
	today.setDate(today.getDate() + 1);
	var count = 0;
	var dayOfWeek = today.getDay();
	var ComparingDate = new Date();
	ComparingDate.setDate(ComparingDate.getDate() + 15);
	var get_no_of_days = getWorkingDatesCount(today,ComparingDate);
    $input.datepicker('destroy');
    if($input.is($('#dob-datepicker input'))){
        $input.datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true,
            startDate: startDate($input),
            endDate: endDate($input),
            daysOfWeekDisabled: [0,6],
            datesDisabled:workingDays,
        }).on("changeDate", function(e) {
            $(this).removeClass("error");
            $(this).parents(".form-group").find("label.error").remove();
      });
    }
    function getWorkingDatesCount(startDate, endDate) {
        var count = 0;
        var hol = 0;
        var curDate = new Date(startDate);
        while (curDate <= endDate) {
          var dayOfWeek = curDate.getDay();
          if (!((dayOfWeek == 6) || (dayOfWeek == 0))) {
            count++;
            if(count<3){
            	workingDays.push(formatDate(curDate));
            }
            else
            	{
            	 break;
            	}
          }
          else{
        	  hol++;
          }
          curDate.setDate(curDate.getDate() + 1);
        }
        return count;
     }
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year].join('-');
    }
//    Booking Calender without BranchCode Ends Here
    $input.datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
        startDate: startDate($input),
        endDate: endDate($input),
    }).on("changeDate", function() {
        $(this).removeClass("error");
        $(this).parents(".form-group").find("label.error").remove();
    });
}

function sendOTP(mobilenumber, isdCode) {
    //e.preventDefault();
    if ($.isNumeric(mobilenumber)) {
        $.ajax({
            url: ACC.config.contextPath + '/otp/send-otp',
            type: 'GET',
            data: {
                'mobileNumber': mobilenumber,
                'isdCode': isdCode.substring(1, 3)
            },
            success: function(data) {
                if (data === 'Invalid') {
                    $("#errorMessage").addClass("show-error");
                } else {
                    $('#otp-popup-Modal').modal('show');
                }

                //console.log("Success");
            },
            error: function(result) {
                $("#serverMessage").addClass("show-error");
            }
        });
    }
}

//timer JS
function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec;
    } // add zero in front of numbers < 10
    if (sec < 0) {
        sec = "59";
    }
    return sec;
};

function startTimer(event) {
    var presentTime = document.getElementById('timer').innerHTML;
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if (s == 59) {
        m = m - 1;
    }
    if (m < 0) {
        $("#otp_text").hide();
        $(".resend-otp").prop("disabled", false);
        $(".resend-otp").removeClass("disabled");
        return false;
    } else {
        $(".resend-otp").addClass("disabled");
        $(".resend-otp").prop("disabled", true);
    }

    document.getElementById('timer').innerHTML = ((m < 10) && (m.toString().length < 2) ? '0' + m : m) + ":" + ((s < 10) && (s.length < 2) ? '0' + s : s);
    setTimeout(startTimer, 1000);
}

/*if($(window).width() < 768){
    debugger;
    $("#readMoreLink").attr("data-target","#sell-popup-Modal");
    $("#readMoreLink").attr("data-toggle","modal");
}
else{
    $("#readMoreLink").attr("data-target","");
    $("#readMoreLink").attr("data-toggle","");
}*/


/*** Read more ***/

//Configure/customize these variables.
/*var showChar = 400;  
var ellipsestext = "...";
var moretext = $("#readMoreLink").text();
var lesstext = $("#readLessLink").text();

var contentDesc = $('#totalDescBlock1 p').html();

if ( $('#totalDescBlock1 p').length > 0 ) {
if(contentDesc.length > showChar) {
    var c = contentDesc.substr(0, showChar);
    var h = contentDesc.substr(showChar, contentDesc.length - showChar);
    var html = c + '<div class="moreellipses"></div><span class="morecontent"><div>' + h + '</div><a href="javascript:void(0)" class="morelink">' + moretext + '</a></span>';

    $("#totalDescBlock1 p").html(html);
}

$(".morelink").click(function(){
    if($(this).hasClass("less")) {
        $(this).removeClass("less");
        $(this).html(moretext);
    } else {
        $(this).addClass("less");
        $(this).html(lesstext);
    }
    $(this).parent().prev().toggle();
    $(this).prev().toggle();
    return false;
});

}*/

if($("#totalDescBlock1").height() > 240){
    $("#totalDescBlock1").css({"height":"240px","overflow":"hidden"});    
    $("#readMoreLink").css("display", "inline-block");
}else{
    $("#totalDescBlock1").css({"height":"auto"});
    $("#readMoreLink").css("display", "none");
}

$("#readMoreLink").on("click", function(){
   var totalDescription = $("#totalDescBlock1").text();
    $("body").removeClass("sell-terms");
    $("#totalDescBlock1").css({"height":"auto","overflow":"visible"});
    $("#readMoreLink").css("display", "none");
    $("#readLessLink").css({"display": "inline-block"});
})

$("#readLessLink").on("click", function(){
    $("#totalDescBlock1").css({"height":"240px","overflow":"hidden"});
    $("#readMoreLink").css("display", "inline-block");
    $("#readLessLink").css({"display": "none"});
});


/*$("#sell-popup-Modal .close-modal").on("click", function(){
    $('.sell-terms #sell-popup-Modal').modal("hide");
});*/

$(window).resize(function(){
	var sliderExpert = $(".expert_choice_component");
	var delay = (function() {
        var timer = 0;
        return function(callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    if($(window).width() < 768){
        $("#totalDescBlock1").css({"height":"140px","overflow":"hidden"});
        $("#readMoreLink").css("display", "inline-block");
        $("#readLessLink").css({"display": "none"});
    }
    $("#totalDescBlock1").removeAttr("style");
    if($("#totalDescBlock1").height() > 140){
        if( $('.product-desc-section #readLessLink').css('display') == 'inline-block' ) {
            $("#totalDescBlock1").css({"height":"auto","overflow":"visible"});
            $("#readMoreLink").css("display", "none");
            $("#readLessLink").css({"display": "inline-block"});
        }else{
            $("#totalDescBlock1").css({"height":"140px","overflow":"hidden"});
            $("#readMoreLink").css("display", "inline-block");
        }
    }else{
        $("#totalDescBlock1").css({"height":"auto"});
        $("#readMoreLink").css("display", "none");
    }


    if($(window).width() < 992){
    	delay(function() {
    		if (!sliderExpert.hasClass('slick-initialized')) {
    			sliderExpert.slick(expertSlickObject);
    			$(".expert_choice_component .wishlist-items").removeClass("col-sm-6 col-md-4 col-lg-4");
    		}
        }, 200);
    }
    else{
    	if (sliderExpert.hasClass('slick-initialized')) {
    		sliderExpert.slick('unslick');
        }
    }
});

/*function requestForOTP(mobilenumber, isdCode) {
    if ($.isNumeric(mobilenumber)) {
    	$('#mobileNumber').val(mobilenumber);
    	$('#isdCode').val(isdCode);
    	$('#otpForm').ajaxForm({
    		success: function(data) {
                if (data === 'Invalid') {
                    $("#errorMessage").addClass("show-error");
                } else {
                    $('#test-drive-otppopup').modal('show');
                }
            },
            error: function(result) {
                $("#serverMessage").addClass("show-error");
            }
    	}).submit();
    }
}*/

function requestForOTP(mobilenumber, isdCode,sucessCallback,errorCallBack) {
    if ($.isNumeric(mobilenumber)) {
    	$('#otp-mobileNumber').val(mobilenumber);
    	$('#otp-isdCode').val(isdCode.replace('+', ''));
    	$('#otpForm').ajaxForm({
    		success: function(data) {
    			sucessCallback.apply(this,[data]);
            },
            error: function(result) {
            	errorCallBack.apply(this,[result]);
            }
    	}).submit();
    }
}

function verifyOTP(mobilenumber, isdCode,otp,sucessCallback,errorCallBack) {
	$('#otpForm').attr("action", $('#verify-otp-url').val());
    if ($.isNumeric(mobilenumber)) {
    	$('#otp-mobileNumber').val(mobilenumber);
    	$('#otp-isdCode').val(isdCode.replace('+',''));
    	$('#otpCode').val(otp);
    	$('#otpForm').ajaxForm({
    		success: function(data) {
    			sucessCallback.apply(this,[data]);
            },
            error: function(result) {
            	errorCallBack.apply(this,[result]);
            }
    	}).submit();
    }
}


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
        "positiveInteger":{
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
    astra.global = {
        formValidationInt: function() {

            if ($(".validation-from").length > 0) {
                $(".validation-from").each(function() {
                    $(this).validate({
                        errorPlacement: function(error, element) {
                            if (element.is(':input, textarea')) {
                                error.appendTo(element.parents('.form-group').eq(0));
                                error.appendTo(element.parents('.form-group').eq(0).addClass("error-element"));
                            } else {
                                error.insertAfter(element);
                            }
                        },
                        onfocusout: function(element) {
                            if (!$('.datepicker').is(':visible')) {
                                this.element(element);
                            }
                        },
                        unhighlight: function(element) {
                            $(element).parents(".form-group").removeClass("error-element");
                            $(element).removeClass("error");
                            $(element).on("change input textInput",function() {
                                if ($(".errorDuplicate").hasClass("error")){
                                    $(".errorDuplicate").removeClass("error");
                                    $(".errorDuplicate").addClass("hide");
                                }
                            });
                        },
                        messages : {
                        	email : {
                        		email: "Mohon masukkan alamat email yang benar"
                        	}
                        }

                    });
                });


                $(".btn-validation").on('click', function() {
                    $(".validation-from").valid();
                });
            }
            // Allow Alphabets only
            $.validator.addMethod("alphaOnlyCheck", function(value, element) {
                var regex = patterns[$(element).data('rule-pattern')].code;
                return regex.test(element.value);
            }, function(params, element) {
                return $(element).data('msg-letter') != null ? $(element).data('msg-letter') : "Masukkan abjad saja";
            });

            // Allow phone number

            $.validator.addMethod("allowPhonenumber", function(value, element) {
                var regex = patterns[$(element).data('rule-pattern')].code,
                    isValid;
                if ($(element).data("rule-required") && element.value == null || element.value != "") {
                    isValid = regex.test(element.value);
                } else if (!$(element).data("rule-required")) {
                    isValid = true;
                }
                return isValid;
            }, function(params, element) {
                return $(element).data('msg-phone') != null ? $(element).data('msg-phone') : "Masukkan nomor telepon yang valid";
            });

            // Allow whole numbers only
            $.validator.addMethod("positiveInteger", function(value, element) {
                debugger;
                var regex = patterns[$(element).data('rule-pattern')].code;
                ACC.config.encodedContextPath
                return regex.test(element.value);
            }, function(params, element) {
                return $(element).data('msg-positiveInteger') != null ? patterns[$(element).data('rule-pattern')].message : "Enter only numbers without special characters";
            });

            //Allow alpha Numeric only

            $.validator.addMethod("alphaNumeric", function(value, element) {
                var regex = patterns[$(element).data('rule-pattern')].code;
                ACC.config.encodedContextPath
                return regex.test(element.value);
            }, function(params, element) {
                return $(element).data('msg-alphaNumeric') != null ? patterns[$(element).data('rule-pattern')].message : "Masukkan hanya huruf dan angka";
            });

            //Allow alpha Numeric with Space
            /*$.validator.addMethod("alphaNumericSpace", function(value, element) {
                var regex = patterns[$(element).data('rule-pattern')].code;
                return regex.test(element.value);
            }, function(params, element) {
                return $(element).data('msg-alphaNumericSpace') != null ? $(element).data('msg-alphaNumericSpace') : "Masukkan tidak ada karakter khusus";
            });*/

            $.validator.addMethod("alphaNumericSpace", function(value, element) {
                var regex = patterns[$(element).data('rule-pattern')].code,
                    isValid;
                if ($(element).data("rule-required") && element.value == null || element.value != "") {
                    isValid = regex.test(element.value);
                } else if (!$(element).data("rule-required")) {
                    isValid = true;
                }
                return isValid;
            }, function(params, element) {
                return $(element).data('msg-alphaNumericSpace') != null ? patterns[$(element).data('msg-alphaNumericSpace')].message : "Masukkan tidak ada karakter khusus";
            });

            $.validator.addMethod("licensePlateNumber", function(value, element) {
                var regex = patterns[$(element).data('rule-pattern')].code;
                ACC.config.encodedContextPath
                return regex.test(element.value);
            }, function(params, element) {
                return $(element).data('msg-licensePlateNumber') != null ? patterns[$(element).data('rule-pattern')].message : "Masukkan hanya huruf dan angka";
            });

            $.validator.addMethod("nameCharacters", function(value, element) {
                var regex = patterns[$(element).data('rule-pattern')].code;
                return regex.test(element.value);
            }, function(params, element) {
                return $(element).data('msg-nameCharacters') != null ? $(element).data('msg-nameCharacters') : "Hanya boleh diisi alfabet, ('), dan (-)";
            });

            //terms and conditions pop up
            $(".termsAndConditionsLink,.privacyPolicyLink").on("click", function(e) {
                e.preventDefault();
                $.colorbox({
                    maxWidth: "100%",
                    maxHeight: "80%",
                    width: "870px",
                    scrolling: true,
                    closeButton: true,
                    className: "terms--overlay",
                    //html: $("#termss").html(),
                    href: $(this).attr("href"),
                    title: $(this).hasClass("termsAndConditionsLink") ? 'Terms & Conditions of Use' : 'Privacy Policy',
                    onComplete: function() {
                        var scrollSpace = window.innerWidth < 650 ? "-20px" : "-40px";
                        $(".terms--overlay #cboxLoadedContent").css("margin-left", scrollSpace);
                    }
                });
            });



        },
        home: function() {

            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf('safari') != -1) {
                if (ua.indexOf('chrome') > -1) {
                    $('body').addClass('astra-chrome'); // Chrome
                } else {
                    $('body').addClass('astra-safari'); // Safari
                }
            }

            $('.login-content .googleNavigation').colorbox({
                className: 'astra-popup',
                closeButton: true,
                inline: true,
                width: '90%',
                maxWidth: '750px'
            });

            $(".__logo a").attr("target", "_blank");

            // Lang change
            //Adding hideScreen class to new div in the body
            $("body").append("<div class='hideScreen'></div>");

            $(".lang_dropdown").on("click", function() {
                $(this).toggleClass("active-dropdown");
                $("body").toggleClass("lang_overlay");
                $(this).parents(".astra-auto-header").find(".search_container").toggleClass("astra-navbar");
                $(".hideScreen").toggleClass("apply");
                $(".__dealer-locator .__dropdown").slideToggle();
            });

            $(".__dealer-locator .__dropdown li").on("click", function() {
                var lang = $(this).data("lang");
                $('#lang-selector-form').val(lang);
                $("#lang-form").submit();
            });

            // Top Navigation links
            $(".top-nav-links .top-seva-links").wrapAll("<li class='top-links'><ul class='top-seva'></ul></li>");
            $(".top-links").prepend("<span class='top-link-text dropdown_arrow'></span>");
            $(".top-link-text").html($(".top-seva li:first-child").text());
            $(".top-seva-links").css({ "opacity": "1", "display": "block" });
            /*$(".top-seva-links:first-child a").attr("target", "_self");*/

            $(".top-link-text").on("click", function() {
                $(this).toggleClass("active-dropdown");
                $(".top-seva").slideToggle();
                $("body").toggleClass("lang_overlay");
                $(".hideScreen").toggleClass("apply");
            });

            //Navigation icon toggle on mobile/tablet view
            $('#nav-icon3').click(function() {
                $(this).toggleClass('open');
                $(".astra-auto-header").toggleClass('change-pos');
                $('html, body').animate({
                    'scrollTop': 0
                });
                if ($(this).hasClass("open")) {
                    $(".hideScreen").addClass("apply");
                } else {
                    $(".hideScreen").removeClass("apply");
                }
                $(this).parents(".__nav-container").find(".__desktop-nav").slideToggle();
                $(this).parents(".__nav-container").find(".__action .account_items").slideToggle();
                $(".__desktop-nav li:nth-child(2) .dropdown_arrow a").addClass("active");
                if($(".search_container").css("display") == "block" || $(".user_account_menu.notifications_menu").css("display") == "block"){
                    $(".search_container, .user_account_menu.notifications_menu").hide();
                    $(".icon-search").removeClass("close");
                }
            });

            if ($(".__desktop-nav li.nav__links--primary").find(".__desktopview").length) {
                $(".__desktopview").parent("li.nav__links--primary").addClass("sub_menu_secondary");
            }

            $(".sub_menu_secondary > a").on("click", function() {
                winWidth = $(window).width();
                if (winWidth < 990) {
                    $(this).toggleClass("active");
                    $(this).parent().find(".__desktopview").slideToggle();
                }
            });
            var $sub_menu = $(".sub_menu_secondary, .user_account_item");
            //bluring out the body content when hovered over the navigation menu
            if ($(window).width() > 768) {
                $sub_menu.on("mouseover", function(event) {
                    $(".hideScreen").addClass("apply");
                });
                $sub_menu.on("mouseout", function() {
                    $(".hideScreen").removeClass("apply");
                });
            }

            $(".sub_menu_secondary li > span.dropdown_arrow").on("click", function(e) {
                winWidth = $(window).width();
                if (winWidth < 990) {
                    e.preventDefault();
                    var $this = $(this);
                    $(this).toggleClass("active-dropdown");
                    $('.sub_menu_secondary li > span').not(this).removeClass('active-dropdown');
                    if ($(this).parent().find('.submenu_second').is(":visible")) {
                        $(this)
                            .parent().find('.submenu_second')
                            .slideToggle();
                    } else {
                        $('.submenu_second')
                            .slideUp("slow");
                        $(this)
                            .parent().find('.submenu_second')
                            .slideDown("slow");
                    }
                }
            });


            //New and Used Cars nav - Mobile
            $('.__desktop-nav .glyphicon-chevron-right').on('click', function() {
                $(this).next('.__desktopview').slideToggle();
                $(this).prev('.dropdown_arrow').find('a').toggleClass('active');
            });

            //search container
            $(".__action .icon-search").on("click", function() {
                $("body").toggleClass("fixed-search");
                $(this).toggleClass("close");
                $(".search_container").slideToggle();
                $(".search_container .icon-search").toggleClass("close");
                astra.global.astraLazyLoad.update();
                setTimeout(function() {
                    $(".search_input #js-site-search-input").focus();
                }, 300);
                /*if($(".hideScreen.apply").length != 1){
                    $(".hideScreen").addClass("apply")
                }*/
                if ($(window).width() < 994) {
                    if($(".__desktop-nav").is(":visible") || $(".__nav-container .notifications_menu").is(":visible")){
                        $("#nav-icon3").removeClass("open");
                        $(".hideScreen").removeClass("apply");
                        $(".__desktop-nav, .__action .account_items, .__nav-container .notifications_menu").hide();
                    }
                }
            });

            $(".search_container .icon-search").on("click", function() {
                $(".search_container .icon-search").removeClass("close");
                $(".search_input #js-site-search-input").val("");
            });

            //Notifications menu
            var notifications_menu = $(".notifications_item");
            var notifications_menu_items = $(".notifications_item .notifications_menu li.unread");
            if ($(notifications_menu_items).length > 0) {
                $(notifications_menu).addClass("notified");
            }

            if ($(window).width() < 994) {
                $(".notifications_item").on("click", function() {
                    $(".__nav-container .notifications_menu").slideToggle();
                    $(".hideScreen").toggleClass("apply");
                    if($(".__desktop-nav").is(":visible") || $(".search_container").is(":visible")){
                        $("#nav-icon3").removeClass("open");
                        $(".icon-search").removeClass("close");
                        $(".hideScreen").addClass("apply");
                        $(".__desktop-nav, .__action .account_items, .search_container").hide();
                    }
                });
            }

            $(".main-banner").slick({
                dots: true,
                arrows: false
            });

            $(".steps-banner").slick(stepsBannerObject);

            $(".component .items").each(function() {
                var items_count = $(this).find(" > div").length;
                var items_width;
                if ($(this).find(" > div").width() == $(".new-to-content-inner").width()) {
                    items_width = $(this).find(" > div").width() + $(".space").width();
                } else {
                    items_width = $(this).find(" > div").width();
                }
                $(this).width(items_count * items_width);
            });



            $(".component .items_list, .component .items_list ~ .label-message").on("click", function() {
                var id_attr = $(this).parent().find(".items_list").attr("id");
                $('.new-to-content-outer').removeClass('active');
                $(this).parents('.new-to-content-outer').addClass('active');
                $(".steps-banner").slick("slickGoTo", id_attr);
            });
            $(".new-to-astra-steps .tab-lg__content .slick-dots li").on("click",function(){

                $(this).each(function() {
                    var li_id = $(this).find('button').attr('id'),
                        currDivelem = $(this).parents(".tab-lg__content").find('div[for="' + li_id + '"]'),
                        sliderindex = $(this).find('button').attr('aria-label'),
                        positionleft = 0,
                        leftValue = 0,
                        prevDivelem = $(this).parents(".tab-lg__content").find('div[for="' + li_id + '"]'),
                        $prevDivFirst = $(prevDivelem[0]),
                        curId = $(currDivelem[0]).attr('id'),
                        prevId = $prevDivFirst.attr('id');

                    if (prevId === undefined) {
                        leftValue = (-50);
                    } else if (curId > prevId && curId == 2) {
                        leftValue = (20);
                    } else if (curId > prevId && curId == 3) {
                        leftValue = (90);
                    } else if (curId > prevId) {
                        leftValue = (120);
                    } else if (curId < prevId) {
                        leftValue = (-120);
                    }
                    positionleft = (parseInt(sliderindex.charAt(0), 10) * ($(currDivelem[0]).width())) + leftValue;
                    $prevDivFirst.closest('.component').scrollLeft(positionleft);

                    $prevDivFirst.trigger('click');
                });
            });


            $('.maintenance-banner').slick(maintenance_object);

            $('.explore-cars-banner').slick({
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 3,
                arrow: true,
                centerMode: true,
                centerPadding: '0',
                responsive: [{
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            centerMode: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: false
                        }
                    }
                ]
            }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                $(".slick-active .content").css("opacity", 0);
                $(".slick-current .content").css("opacity", 1);
            }).on('afterChange', function(event, slick, currentSlide, nextSlide) {
                $(".slick-active .content").css("opacity", 0);
                $(".slick-current .content").css("opacity", 1);
            });


            $('.news__slider-main').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrow: true,
                centerMode: true,
                centerPadding: '0',
                responsive: [{
                        breakpoint: 900,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            centerMode: true,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true
                        }
                    }
                ]
            });

            $(".news__slider-thmb li").on("mouseover", function() {
                var id_attr = $(this).attr("id");
                //$('.new-to-content-outer').removeClass('active');
                //$(this).parents('.new-to-content-outer').addClass('active');
                $(".news__slider-main").slick("slickGoTo", id_attr);
            });

            /*var $slider = $('.news__slider-main').on('init', function(slick) {
                $('.news__slider-main').fadeIn(1000);
            }).not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                autoplay: false,
                lazyLoad: 'ondemand',
                centerMode: true,
                asNavFor: '.news__slider-thmb',
                responsive: [{
                    breakpoint: 1024,
                    settings: {
                        dots: true

                    }
                }]
            });

            var $slider2 = $('.news__slider-thmb').on('init', function(slick) {
                $('.news__slider-thmb').fadeIn(1000);
            }).not('.slick-initialized').slick({
                slidesToShow: 6,
                //slidesToScroll: 1,
                lazyLoad: 'ondemand',
                asNavFor: '.news__slider-main',
                dots: false,
                focusOnSelect: true
            });*/

            //remove active class from all thumbnail slides
            $('.news__slider-thmb .slick-slide').removeClass('slick-active');

            //set active class to first thumbnail slides
            $('.news__slider-thmb .slick-slide').eq(0).addClass('slick-active');

            // On before slide change match active thumbnail to current slide
            $('.news__slider-main').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
                var mySlideNumber = nextSlide;
                $('.news__slider-thmb .slick-slide').removeClass('slick-active');
                $('.news__slider-thmb .slick-slide').eq(mySlideNumber).addClass('slick-active');
            });

            $(".supported-banner").slick(supportBannerObject);

            if ($("#SEO_text_container")) {
                $("#SEO_text_container").tinyscrollbar({
                    thumbSize: 1
                });
            }

            var $swipeTabHeadScroll = $(".swipeTabs");
            $swipeTabHeadScroll.tinyscrollbar({
                thumbSize: 1,
                axis: 'x'
            });

            var $swipeTabsContainer = $('.swipe-tabs'),
                $swipeTabs = $('.swipe-tab'),
                $swipeTabsContentContainer = $('.swipe-tabs-container'),
                $swipetabcontent = $('.swipe-tab-content'),
                currentIndex = 0,
                activeTabClassName = 'active-tab';

            $swipeTabsContainer.on('init', function(event, slick) {
                //$swipeTabsContentContainer.removeClass('invisible');
                //$swipeTabsContainer.removeClass('invisible');

                currentIndex = slick.getCurrent();
                $(this).parents(".recommendations_section").find($swipeTabs).removeClass(activeTabClassName);
                $(this).parents(".recommendations_section").find($('.swipe-tab[data-swipe-index=' + currentIndex + ']')).addClass(activeTabClassName);
            });

            if ($swipeTabsContainer.find('.swipe-tab').length <= 4) {
                $swipeTabsContainer.siblings().css("display", "none");
                $swipeTabsContainer.find(".scrollbar").hide();
            } else {
                $swipeTabsContainer.siblings().css("display", "inline-block");
                $swipeTabsContainer.find(".scrollbar").show();
            }

            $swipeTabsContentContainer.slick({
                slidesToShow: 1,
                slidesToScroll: 4,
                arrows: false,
                infinite: false,
                swipeToSlide: true,
                touchThreshold: 10,
                swipe: false
            });
            $swipetabcontent.slick(swipeSlickObject);


            $swipeTabs.on('click', function(event) {
                //alert("123");
                // gets index of clicked tab
                currentIndex = $(this).data('swipe-index');
                $(this).parents(".recommendations_section").find($swipeTabs).removeClass(activeTabClassName);
                $(this).parents(".recommendations_section").find($('.swipe-tab[data-swipe-index=' + currentIndex + ']')).addClass(activeTabClassName);
                $(this).parents(".recommendations_section").find($swipeTabsContentContainer).slick('slickGoTo', currentIndex, true);
                currentIndex = parseInt(currentIndex, 10);
            });


            // $(".swipeTabs").tinyscrollbar({
            // axis: 'x'
            // });
            $swipeTabsContentContainer.find(".slick-track > .swipe-tab-content").each(function() {
                if ($(this).find(".slick-track").html() == "") {
                    $(".recommendations_section").find(".swipeTabs .swipe-tab[data-swipe-index =" + "'" + $(this).data("slick-index") + "']").remove();
                } else {
                	console.log($(this).find(".slick-track").html());
                    $(".recommendations_section").find(".swipeTabs .swipe-tab[data-swipe-index =" + "'" + $(this).data("slick-index") + "']").removeClass("hide");
                }
            });

            $(".recommendations_section .swipeTabs .swipe-tab").removeClass("active-tab");
            $(".recommendations_section .swipeTabs .swipe-tab:first-child").addClass("active-tab");

            $(".recommendations_section .swipeTabs .swipe-tab").each(function() {
                if ($(this).hasClass("active-tab")) {
                    // gets index of clicked tab
                    //var $this = $(".active-tab" + $swipeTabs);
                    currentIndex = $(this).data('swipe-index');
                    $(this).parents(".recommendations_section").find($swipeTabs).removeClass(activeTabClassName);
                    $(this).parents(".recommendations_section").find($('.swipe-tab[data-swipe-index=' + currentIndex + ']')).addClass(activeTabClassName);
                    $(this).parents(".recommendations_section").find($swipeTabsContentContainer).slick('slickGoTo', currentIndex, true);
                    currentIndex = parseInt(currentIndex, 10);
                }
            });

            if ($('#swipe-tab-recentlyviewed').hasClass("active-tab")) {
                $.ajax({
                    url: ACC.config.encodedContextPath + '/get-recentlyviewed-items',
                    async: true,
                    type: 'GET',
                    success: function(response) {
                        var productList = response;
                        var recentlyViewedHTML = "";
                        var recentlyViewedAppendedHTML = "";
                        if (productList.length > 0) {
                            productList.forEach(function(product) {
                                console.log(product);
                                console.log(ACC.astra.defaultProductUrl);
                                var productImageUrl = ACC.astra.defaultProductUrl;
                                var productPrice = "";
                                if (null != product.price && null != product.price.formattedValue) {
                                    productPrice = product.price.formattedValue;
                                }

                                if (null != product.images && product.images.length > 0 && null != product.images[0]) {
                                    productImageUrl = product.images[0].url;
                                }
                                recentlyViewedHTML = "<a href='" + ACC.config.encodedContextPath + product.url + "' class='images_section'> " +
                                    "<div class='img-wrapper-recoment'>" +
                                    "<img src='" + productImageUrl + "'>" +
                                    "</div>" +
                                    "<div class='content'>" +
                                    " <p class='car-title'>" + product.name + "</p> " +
                                    "<p class='car-price'>" + productPrice + "</p> " +
                                    "</div>" +
                                    " </a>";
                                recentlyViewedAppendedHTML = recentlyViewedHTML + recentlyViewedAppendedHTML;
                            });
                            $('#recently_viewed').slick('unslick');
                            $("#recently_viewed").html(recentlyViewedAppendedHTML);
                            $("#recently_viewed").slick({
                                dots: false,
                                infinite: false,
                                speed: 300,
                                slidesToShow: 4,
                                slidesToScroll: 4,
                                prevArrow: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
                                nextArrow: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
                                responsive: [{
                                        breakpoint: 1024,
                                        settings: {
                                            slidesToShow: 3,
                                            slidesToScroll: 3
                                        }
                                    },
                                    {
                                        breakpoint: 600,
                                        settings: {
                                            slidesToShow: 2,
                                            slidesToScroll: 2
                                        }
                                    },
                                    {
                                        breakpoint: 480,
                                        settings: {
                                            slidesToShow: 1,
                                            slidesToScroll: 1
                                        }
                                    }
                                ]
                            });

                            currentIndex = $('#swipe-tab-recentlyviewed').data('swipe-index');
                            $(this).parents(".recommendations_section").find($swipeTabs).removeClass(activeTabClassName);
                            $(this).parents(".recommendations_section").find($('.swipe-tab[data-swipe-index=' + currentIndex + ']')).addClass(activeTabClassName);
                            $(this).parents(".recommendations_section").find($swipeTabsContentContainer).slick('slickGoTo', currentIndex, true);
                            currentIndex = parseInt(currentIndex, 10);
                        } else {
                              console.log("Error in recently viewed product");
                              $("#serverMessage").addClass("show-error");
                        }
                    },
                    error: function(result) {
                        console.log("Error in recently viewed product");
                        $("#serverMessage").addClass("show-error");
                    }
                });


            }


            // You can use the update method to build a anchor.
            //
            //$swipeTabHeadScroll.tinyscrollbar();

            var initiateScroll = $swipeTabHeadScroll.data("plugin_tinyscrollbar");

            function ScrollLeftCalc(ele) {
                var totalWidth = 0;
                $(ele).prevAll().addClass('current');
                $(".swipeTabs .swipe-tab.current").each(function(index) {
                    totalWidth += parseInt($(this).width());
                });
                $(ele).parents(".swipeTabs").data("plugin_tinyscrollbar").update(totalWidth);
            }

            windowWidth = $(window).width();
            if (windowWidth < 500) {
                $(".swipeTabs .swipe-tab.active-tab").next().addClass("nextItem");
                $(".swipeTabs .swipe-tab.active-tab").prev().addClass("prevItem");
            }

            $('.swipeTabs .swipe-tab').on('click', function() {
                var getIndex = $(this).index();
                totalWidth = 0;
                $('.swipeTabs .swipe-tab').removeClass('current');
                if (windowWidth < 500) {
                    if (getIndex === 0) {
                        initiateScroll.update(0);
                    } else {
                        ScrollLeftCalc(this);
                    }
                    $(this).parents(".recommendations_section").find($('.swipeTabs .swipe-tab')).removeClass().addClass("swipe-tab");
                    $(this).removeClass().addClass("swipe-tab active-tab");
                    $(this).next().addClass("nextItem");
                    $(this).prev().addClass("prevItem");
                    return false;
                }
            });

            $(window).resize(function() {
                windowWidth = $(window).width();
                if (windowWidth > 500) {
                    $('.swipeTabs .swipe-tab').removeClass("prevItem nextItem");
                } else {
                    $(".swipeTabs .swipe-tab.active-tab").next().addClass("nextItem");
                    $(".swipeTabs .swipe-tab.active-tab").prev().addClass("prevItem");
                    //ScrollLeftCalc($('.swipeTabs .swipe-tab.active-tab'));
                }
            })
        },
        chat: function() {
            var cssObject = {
                ".meshim_widget_components_chatWindow_chatPanel_ChatPanelHeader .card .avatar_cell .profile_avatar": {
                    "width": "35px",
                    "height": "35px",
                    "border-radius": "50%"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatPanelHeader .card .avatar_cell": {
                    "width": "auto"
                },
                ".meshim_widget_components_chatWindow_ChatPanel .chat_panel_container .served_by_container": {
                    "padding-top": "24px",
                    "height": "70px"
                },
                ".meshim_widget_widgets_TitleBar.title_bar.desktop": {
                    "height": "40px",
                    "padding-top": "10px"
                },
                ".meshim_widget_widgets_TitleBar.ltr .title": { //live chat title
                    "padding-left": "40px",
                    "text-align": "left",
                    "padding-right": "60px",
                    "font-family": "'Rubik',sans-serif",
                    "font-size": "14px",
                    "color": "white",
                    "font-weight": "normal",
                    "letter-spacing": "0.5px"
                },
                ".meshim_widget_widgets_TitleBar.ltr .icons": {
                    "padding-top": "7px"
                },
                ".meshim_widget_components_ChatWindow": {
                    "font-family": "'Rubik', sans-serif"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatLogContainer.chat_log": {
                    "top": "20px"
                },
                ".meshim_widget_widgets_chatLogRenderer_ChatBubble": {
                    "padding": "12px 12px"
                },
                ".meshim_widget_widgets_chatLogRenderer_ChatBubble.ltr.right .arrow": { //right arrow of the chat box
                    "display": "none"
                },
                ".meshim_widget_widgets_chatLogRenderer_ChatBubble.ltr.left .arrow": { //left arrow of the chat box
                    "display": "none"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatPanelHeader .rating_cell": { //link & dislike icons
                    "display": "none"
                },
                ".meshim_widget_widgets_AgentProfileCard .profile_name": { //customer support name
                    "font-weight": "600",
                    "color": "black",
                    "padding-bottom": "5px"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatPanelHeader .card .content_cell": {
                    "width": "230px" //customer support name wrapper
                },
                ".meshim_widget_widgets_AgentProfileCard .profile_title": {
                    "color": "#cecece" //customer support text color
                },
                ".meshim_widget_widgets_chatLogRenderer_BubbleAvatarRenderer .log_avatar": {
                    "border-radius": "50%", //chat prof image
                    "width": "35px",
                    "height": "35px"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatLog .agent .chat_bubble": { //chat bubble background
                    "background-color": "#f2f2f2",
                    "border": "none"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatLog .visitor .chat_bubble": { //chat bubble background
                    "background-color": "#f2f2f2",
                    "border": "none"
                },
                ".meshim_widget_widgets_chatLogRenderer_BubbleAvatarRenderer .chat_bubble": {
                    "margin": "0 15px" //chat spacing
                },
                ".meshim_widget_widgets_chatLogRenderer_BubbleAvatarRenderer td": {
                    "vertical-align": "top"
                },
                ".meshim_widget_widgets_chatLogRenderer_BasicRenderer .chat_name": {
                    "padding-bottom": "4px"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatTextArea .textarea::-webkit-input-placeholder": {
                    "opacity": "0"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatLogContainer .group_head": {
                    "margin-top": "15px"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatTextArea .fake_input.focus": {
                    "box-shadow": "none"
                },
                ".meshim_widget_widgets_FakeInput.focus": {
                    "border-color": "#DDD"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatTextArea": {
                    "background-color": "#fff"
                },
                ".meshim_widget_components_chatWindow_chatPanel_ChatLogContainer .chat_log_wrapper": {
                    "padding-bottom": "30px"
                }
            };
            var cssChObj = {
                ".meshim_widget_components_chatButton_ButtonBar.button_bar": {
                    "background-color": "#ec2156"
                },
                ".meshim_widget_components_chatButton_ButtonBar .favicon": {
                    "background-color": "#ec2156"
                }
            };
            setTimeout(function() {

                var chatWindow = $(".zopim[data-test-id='ChatWidgetWindow'] iframe").contents().find("html");
                var chatUsWindow = $(".zopim[data-test-id='ChatWidgetButton'] iframe").contents().find("html");

                //importing the rubik api font for iframes
                chatWindow.find("head").append('<link href="https://fonts.googleapis.com/css?family=Rubik:400,500,700" rel="stylesheet">');
                chatUsWindow.find("head").append('<link href="https://fonts.googleapis.com/css?family=Rubik:400,500,700" rel="stylesheet">');

                //creating the style to inject in the chat window iframe
                var chatWinStyle = JSON.stringify(cssObject).replace(/\"/g, "").replace(/\,/g, ";").replace(/\:{/g, "{").replace(/\};/g, ";}");
                chatWinStyle = chatWinStyle.substr(0, chatWinStyle.length - 1).substr(1);

                var chatUsWinStyle = JSON.stringify(cssChObj).replace(/\"/g, "").replace(/\,/g, ";").replace(/\:{/g, "{").replace(/\};/g, ";}");
                chatUsWinStyle = chatUsWinStyle.substr(0, chatUsWinStyle.length - 1).substr(1);

                //inject the style in the iframe
                chatWindow.find("head").append("<style>" + chatWinStyle + "</style>");
                chatUsWindow.find("head").append("<style>" + chatUsWinStyle + "</style>");



                //showing the iframe only after applying css
                $(".zopim:first").addClass("blockiFrame");
                $(".zopim:first").next().addClass("blockiFrameChat");

            }, 5000);
        },
        pdpPage: function() {
            var productCodeElement = document.getElementById("productCodeForRecentItem");
            if (productCodeElement != null) {
                var productCode = productCodeElement.value;
                //console.log(productCode);
                $.ajax({
                    url: ACC.config.encodedContextPath + '/add-recentlyviewed-item?productCode=' + productCode,
                    async: false,
                    type: 'GET',
                    success: function(response) {
                        //console.log(response);
                    },
                    error: function(result) {
                        //console.log(result);
                        $("#serverMessage").addClass("show-error");
                    }
                });
            }

            $('.share-product').on('click', function(e) {
                e.preventDefault();
                $(this).toggleClass('active');
                $('.product-color').toggleClass('index-back');
            });

            if($(window).width() < 350 && $("h2").height() <= 32){
                $(".prdt-btn").css("align-self","start");
                $(".prdt-name-btn").css("height","72px");
                $("h2").css("height","30px");
            }

            $('.used_car_customer_contact .logged').on('click', function(e) {
                if($(window).width() > 990){
                    e.preventDefault();
                    $(this).toggleClass('active');
                }else{
                    $(".used_car_customer_contact a").attr("href","tel:"+$(".mobile-hide .used_car_customer_contact .share-list").text().trim());
                }
            });

            $('.used_car_customer_contact').on('click', function(e) {
                window.mediator.publish('trackButtonForPDP', {
                    'eventName'   : 'generalEvent',
                    'eventCategory' : 'Product Title Per Detail Product',
                    'eventAction' : 'Click on Button',
                    'eventLabel':  'Phone Icon'
                });
            });

            $('#addToCartButtonBuyNow').on('click', function(e) {
                var buttonName = $('#addToCartButtonBuyNow').text().trim(" ");
                window.mediator.publish('trackButtonForPDP', {
                    'eventName': 'generalEvent',
                    'eventCategory': 'Product Title Per Detail Product',
                    'eventAction': 'Click on Button',
                    'eventLabel': buttonName
                });
            });

            $(document).on('click', function(event) {
                if (!$(event.target).is('.hide-document')) {
                    $('.share-product').removeClass('active');
                    $('.used_car_customer_contact .logged').removeClass('active');
                    $('.product-color').removeClass('index-back');
                }
            });

            if ($(".page-productDetails")) {
                //removing empty dots and hiding the empty section from pdp
                var sections = $(".pdp-empty"),
                    $dots = $(".list-group-scroll");
                for (var i = 0; i < sections.length; i++) {
                    var $section = $(sections[i]);
                    if ($section.children().length === 0) {
                        $section.hide();
                        var sec_id = $section.hasClass("scroll-section") ? $section.attr("id") : $section.closest(".scroll-section").attr("id");
                        $dots.find("a[href='#" + sec_id + "']").parent().remove();
                    }
                }
            }


            var getLen = $('.take-journey-items');

            if (getLen.length > 0) {

                $('.take-journey-items').slick({
                    dots: false,
                    arrows: false,
                    slidesToShow: 5,
                    responsive: [{
                        breakpoint: 991,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: true,
                            arrows: false
                        }
                    }]

                });

            }

            $(".js-size-variant-product-navigation").on('click', function() {
                window.location.href = $(this).data('size-variant-product-url');
            });

            var $newLookSlider = $('.pdp_image_gallery_items-popup');

            $newLookSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
                $('body .img_loader').remove();
                $('body').removeClass("pdp_img_gallery");
                var i = (currentSlide ? currentSlide : 0) + 1;
                if (slick.slideCount > 0) {
                	$('.pagingInfo-slider').html( i + '&nbsp; of &nbsp;' + slick.slideCount);
                }
            });


            /*  $('#gallery-popup').on('show.bs.modal', function (e) {
                  console.log(e.target);
                   setTimeout(function() {
                      $newLookSlider.slick('setPosition', 0);
                      $newLookSlider.slick('slickGoTo', $(this).data('slick-index'));
                  }, 500);

              });*/


            var getContrastHighlightForHex = function(colorCode) {
                var red, green, blue, color, luminance, hexCode;
                hexCode = colorCode.replace(/\s+/g, "").replace("#", "");
                if (hexCode.length > 3) {
                    red = parseInt(hexCode.substring(0, 2), 16);
                    green = parseInt(hexCode.substring(2, 4), 16);
                    blue = parseInt(hexCode.substring(4, 6), 16);
                } else {
                    red = parseInt(Array(3).join(hexCode.substring(0, 1)), 16);
                    green = parseInt(Array(3).join(hexCode.substring(1, 2)), 16);
                    blue = parseInt(Array(3).join(hexCode.substring(2, 3)), 16);
                }
                color = [red / 255, green / 255, blue / 255];
                for (var i = 0; i < color.length; ++i) {
                    if (color[i] <= 0.03928) {
                        color[i] = color[i] / 12.92;
                    } else {
                        color[i] = Math.pow((color[i] + 0.055) / 1.055, 2.4);
                    }
                }
                luminance = 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
                if (luminance > 0.49) {
                    return "dark-pallet";
                } else {
                    return "light-pallet";
                }
            };

            if ($(".product-color").length > 0) {
                $(".product-color li").each(function() {
                    var hexcode = $(this).data("hexcode");
                    $(this).addClass(getContrastHighlightForHex(hexcode));
                });
            }



            var getLen1 = $('.like-slider');

            if (getLen1.length > 0) {

                getLen1.slick({
                    speed: 300,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    /*prevArrow: '<i class="fa fa-arrow-left slick-prev-btn" aria-hidden="true"></i>',
                    nextArrow: '<i class="fa fa-arrow-right slick-next-btn" aria-hidden="true"></i>',*/
                    responsive: [{
                            breakpoint: 1025,
                            settings: {
                                slidesToShow: 4,
                                slidesToScroll: 1,
                                dots: false
                            }
                        },
                        {
                            breakpoint: 900,
                            settings: {
                                centerMode: true,
                                slidesToShow: 2,
                                slidesToScroll: 1,
                                dots: true,
                                arrows: false
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                centerMode: true,
                                slidesToShow: 1,
                                slidesToScroll: 1,
                                arrows: false,
                                dots: true,
                                variableWidth: true
                            }
                        }
                        // You can unslick at a given breakpoint now by adding:
                        // settings: "unslick"
                        // instead of a settings object
                    ]
                });

            }



            $('.con-tooltip input[type="checkbox"]').on('change', function() {

                var checked = $(this).is(':checked'); // Checkbox state
                $('.hot-spot__wrapper').removeClass('tooltip-selected');
                $('.hot-spot__input').removeClass('tooltip-selected-inner');
                // Select all
                if (checked) {
                    //$('.con-tooltip input[type="checkbox"]').not(this).prop("checked", false);
                    $(this).parents('.hot-spot__wrapper').addClass('tooltip-selected');
                    $(this).closest('.hot-spot__input').addClass('tooltip-selected-inner');
                } else {
                    // Deselect All
                    $('.hot-spot__wrapper').removeClass('tooltip-selected');
                    $('.hot-spot__input').removeClass('tooltip-selected-inner');
                }

            });


            $('.hot-spot__wrapper--content .hot-spot__input').each(function() {
                var getLeftPos = $(this).find('.con-tooltip');
                var getInt = parseInt(getLeftPos.css('left'), 10);
                //console.log(getInt);
                if (getInt > 500) {
                    $(this).addClass('over-right-pos');
                }
            });
            var reloadTab = function() {
                winWidth = $(window).width();
                if (winWidth < 767) {
                    $("body").addClass("overflowXhidden");
                    $(".pdp_tabs").css('width', winWidth - 15);
                    $('.reloadtab').height("");
                    $('.reloadtab').each(function() {
                        var liItems = $(this);
                        var Sum = 0;
                        if (liItems.children('li').length >= 1) {
                            $(this).children('li').each(function(i, e) {
                                Sum += $(e).outerWidth(true);
                            });
                            $(this).width(Sum + 10);
                        }
                    });
                } else {
                    $(".pdp_tabs, .reloadtab").css('width', '100%');
                }
            };
            if ($(".pdp_bundle_types")) {
                $(window).on('resize load', function() {
                    setTimeout(function() { reloadTab(); }, 500);
                });
            }
            $('.scroll-text-container').tinyscrollbar({
                thumbSize: 1
            });

           /* $(".pdp_bundle_types .pdp_tabs_items").hide();
            $(".pdp_bundle_types .pdp_tabs_items:first-child").show();
            $(".pdp_bundle_types .pdp_tabs li:first-child").addClass("active_tab");
            $(".pdp_bundle_types .pdp_tabs li").on("click", function() {
                var $this = $(this);
                var data_show_attr = $this.attr("data-show");
                $(".pdp_bundle_types .pdp_tabs_items").each(function() {
                    if (data_show_attr == $(this).attr("id")) {
                        $(".pdp_bundle_types .pdp_tabs_items").hide();
                        $(".pdp_bundle_types .pdp_tabs li").removeClass("active_tab");
                        $this.addClass("active_tab");
                        $(".pdp_bundle_types .pdp_tabs_items#" + data_show_attr).show();
                    }
                });
            });*/
            $('#clearCreditCalculator').on('click', function(){
                    $('#precentageval1').val('DP');
                    $('#tenorval1').val('Tenor');
                    $('#downPayment1').val('');
                    $('#Installments1').val('');
                    $('#precentageval1').change();
                    $('#tenorval1').change();
            });

            $('#precentageval1,#tenorval1').on('change', function() {
                var valPercentage = $("#precentageval1").val();
                if (valPercentage!=null){
                     var valPercentage1 = valPercentage.toString();
                                    var percentage = $("input[name*='percent']").val(valPercentage1);
                                    var valTenor = $("#tenorval1").val();
                                    var tenor = $("input[name*='tenor']").val(valTenor);
                                    if(valPercentage != null && valTenor != null){
                                         creditCalculatorPDPUsed();
                                    }
                } else {
                    var percentage = $("input[name*='percent']").val(null);
                    var tenor = $("input[name*='tenor']").val(null);
                }

            });
            var creditCalculatorPDPUsed = function() {
                var options = {
                    'percentage': $("#precentageval1").val(),
                    'tenor': $("#tenorval1").val(),
                    'price': $("#price").val(),
                    'productCode': $("#base-productCode").val(),
                    'productCondition': $("#base-productType").val()
                };

                $.ajax({
                    url: ACC.config.encodedContextPath + '/sevaservice/calculatorval',
                    async: true,
                    data: options,
                    type: 'POST',
                    beforeSend: function(){
                        $('.ajax-loader').css("visibility", "visible");
                    },
                    success: function(response) {
                        if (response.systemErrorMessage != null) {
                            window.location.href = notFountUrl;
                        } else {
                            $.each(response.out_DATA, function(key, value) {
                                $('#downPayment1').val(value.tot_pay_first).change();
                                $('#Installments1').val(value.amt_installment).change();
                            })
                            if ( $("#base-productCode").val() == 'USEDCARREGULAR'){
                                var price = $("#product-price").val();
                            } else{
                                var price = $("#price").val();
                            }
                            window.mediator.publish('trackCreditForPDPAndCheckoutPage', {
                    			'eventName'   : 'generalEvent',
                    			'eventCategory' : 'Astra Credit Calculator',
                    			'eventAction' : 'PDP',
                    			'carBrand':  $("#product-brandname").val(),
                    			'carModel':  $("#product-modelname").val(),
                                'carPrice':  getFormatValue(price),
                    			'carVariant': $("#product-variantname").val(),
                    			'downPayment' : $("#precentageval1").val(),
                    			'tenureLength' : $("#tenorval1").val(),
                    	        'downPaymentRupiah' : getFormatValue($('#downPayment1').val()),
                    			'tenureRupiah' : getFormatValue($('#Installments1').val())
                    		});
                        }
                    },
                    complete: function(){
                        $('.ajax-loader').css("visibility", "hidden");
                    }
                });
            };

            var getFormatValue = function(price) {
                var range = price,
                    formatValue = range.split("."); //["Rp","100","949","00"]
                formatValue.shift(); //to remove first item
                return formatValue.join("").trim();
            };

            var $swipePDPContainer = $('.swipe-tabs'),
                $swipeTabsPDP = $('.swipe-tab'),
                $swipeTabsPDPContentContainer = $('.pdp_image_container'),
                $swipetabcontentPDP = $('.pdp_image_gallery_items'),
                currentIndex = 0,
                activeTabClassName = 'active-tab';

            $swipePDPContainer.on('init', function(event, slick) {
                currentIndex = slick.getCurrent();
                $(this).parents(".pdp_image_gallery").find($swipeTabs).removeClass(activeTabClassName);
                $(this).parents(".pdp_image_gallery").find($('.swipe-tab[data-swipe-index=' + currentIndex + ']')).addClass(activeTabClassName);
            });



            // /** end customization */



            //for first interior            
            var getFullHtml = $swipeTabsPDPContentContainer.html(),
                getData = $('<div>' + getFullHtml + '</div>').find("#exteriors").html();

            $('.pdp_image_gallery_items-popup').empty();
            $('.pdp_image_gallery_items-popup').append(getData);

            $('.pdp_img_gallery_spec').slick({
                infinite: false,
                speed: 300,
                draggable: false,
                swipe: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                adaptiveHeight: true,
                arrows: true
            });

            $swipeTabsPDP.on('click', function(event) {
                // gets index of clicked tab
                currentIndex = $(this).data('swipe-index');
                var getIndex = $(this).data('pdpgallery-index');
                $(this).parents(".pdp_image_gallery").find($swipeTabsPDP).removeClass(activeTabClassName);
                $(this).parents(".pdp_image_gallery").find($('.swipe-tab[data-swipe-index=' + currentIndex + ']')).addClass(activeTabClassName);
                $(this).parents(".pdp_image_gallery").find($swipeTabsPDPContentContainer).slick('slickGoTo', currentIndex, true);
                currentIndex = parseInt(currentIndex, 10);

                $('.pdp_image_gallery_items-popup').empty();

                var popupId = "#" + $(this).data("show");

                var getData = $('<div>' + getFullHtml + '</div>').find(popupId).html();

                $('.pdp_image_gallery_items-popup').append(getData);
                $newLookSlider.removeClass("slick-initialized slick-slider"); //removing the slick class

            });

            $('.pdp_image_gallery_new_items .img_block-customs').on('click', function(e) {
                $('body').append("<div class='img_loader'></div>");
                $('body').addClass("pdp_img_gallery");
                var index = $(this).data('slick-index');
                $('#gallery-popup').modal('show');
                if ($newLookSlider.hasClass("slick-initialized")) {
                    $newLookSlider.slick("unslick");
                }
                //$newLookSlider.removeClass("slick-initialized slick-slider"); //removing the slick class                
                $newLookSlider.css("visibility", "hidden");
                $('#gallery-popup').one('shown.bs.modal', function() {
                    astra.global.astraLazyLoad.update();
                    $newLookSlider.not('.slick-initialized').slick({
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        infinite: false
                    });

                    $newLookSlider.slick('setPosition');
                    $newLookSlider.slick('slickGoTo', index, true);
                    $newLookSlider.css("visibility", "visible");
                });

            });

            $('.prdt-specs .more_spec').on('click', function(e) {
            	$('.more_spec_content').toggle();
            });

            var $newLookSlider1 = $('.prdt-main-img__slider1');
            $('.prdt-main-img__used .prdt-main-img__slide').on('click', function(e) {
                $('body').append("<div class='img_loader'></div>");
                $('body').addClass("pdp_img_gallery");
                var index = $(this).data('slick-index');
                $('#gallery-popup1').modal('show');
                if ($newLookSlider1.hasClass("slick-initialized")) {
                    $newLookSlider1.slick("unslick");
                }
                //$newLookSlider.removeClass("slick-initialized slick-slider"); //removing the slick class
                $newLookSlider1.css("visibility", "hidden");
                $('#gallery-popup1').one('shown.bs.modal', function() {
                    astra.global.astraLazyLoad.update();
                    $newLookSlider1.not('.slick-initialized').slick({
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        infinite: false,
                    });

                    $newLookSlider1.slick('setPosition');
                    $newLookSlider1.slick('slickGoTo', index, true);
                    $newLookSlider1.css("visibility", "visible");
                    $('body .img_loader').remove();
                    $('body').removeClass("pdp_img_gallery");
                });

            });

            $('.pdp-usedcar-for').slick({
				slidesToShow: 1,
                variableWidth: true,
				slidesToScroll: 1,
				arrows: true,
				fade: false,
                centerMode: true,
                centerPadding: "0px",
				asNavFor: '.pdp-usedcar-nav'
			});
			$('.pdp-usedcar-nav').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				focusOnSelect: true,
                // variableWidth: true,
				arrows: false,
				asNavFor: '.pdp-usedcar-for'
			});
			$('.bundle_types-one .pdp_bundle_types').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: true,
				infinite: true,
				responsive: [{
				        breakpoint: 992,
                		settings: {
                		    slidesToShow: 2,
                			slidesToScroll: 1,
                			variableWidth: true
                			}
				    },
//				    {
//				         breakpoint: 375,
//                         settings: {
//                            slidesToShow: 2,
//                            slidesToScroll: 1
//                         }
//				    }


				    ]
			});
			$('.bundle_types-three .pdp_bundle_types').slick({
				slidesToShow: 3,
				slidesToScroll: 1,
				arrows: true,
				responsive: [{
				        breakpoint: 1024,
				        settings: {
				            slidesToShow: 2,
				            slidesToScroll: 1
				        }
				    },
				    {
				        breakpoint: 794,
				        settings: {
				            slidesToShow: 1,
				            slidesToScroll: 1,
				            arrows: false,
				        }
				    }
				]
			});
            $('.pdp-related-container .row').slick({
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
				            arrows: false,
				        }
				    }
				]
			});
            $('.used-pdp-like .center-mode').slick({
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
                            centerMode: true,
                            centerPadding: '30px',
                            arrows: false,
                        }
                    }
                ]
            });
            $('.used-pdp-like .variable-mode').slick({
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
                            variableWidth: true,
                            arrows: false,
                        }
                    }
                ]
            });
            $('.four-colum').slick({
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
                            arrows: false,
                        }
                    }
                ]
            });
            $('.pdp__new-car .center-mode').slick({
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
                            centerMode: true,
                            centerPadding: '30px',
                            arrows: false,
                        }
                    }
                ]
            });
            $('.pdp__new-car .variable-mode').slick({
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
                            variableWidth: true,
                            arrows: false,
                        }
                    }
                ]
            });
			$('.static_content_slider1').slick({
                slidesToScroll: 1,
                variableWidth: true,
                slidesToShow: 3,
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
                            arrows: false,
                        }
                    }
                ]
            });
			$('.video-section-usedcar, .video-section-usedcar-multi').slick({
                slidesToScroll: 1,
                slidesToShow: 1,
                variableWidth: true,
                arrows: true,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 794,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            arrows: false,
                        }
                    }
                ]
            });
            $swipeTabsPDPContentContainer.slick({
                slidesToShow: 1,
                slidesToScroll: 4,
                arrows: false,
                infinite: false,
                swipeToSlide: true,
                touchThreshold: 10,
                dots: false
            });

            $swipetabcontentPDP.slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 4,
                slidesToScroll: 4,
                responsive: [{
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });

            var count = 0;
            $(document).on("scroll", function(e) {
                $(document).on("scroll", onScroll);
            });


            //smoothscroll
            $('.list-group-scroll a[href^="#"]').on('click', function(e) {
                e.preventDefault();
                $(document).off("scroll");
                $('.list-group-scroll a').each(function() {
                    $(this).removeClass('active');
                });
                $(this).addClass('active').trigger('mouseenter');
                //$("a#trigger");
                var target = this.hash,
                    menu = target;
                $target = $(target);
                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top + 4
                }, 500, function() {
                    window.location.hash = $target;
                    $(document).on("scroll", onScroll);
                });
            });



            function onScroll(event, userScroll) {
                var scrollPos = $(document).scrollTop(),
                    $listScroll = $(".list-group-scroll"),
                    el__pos__bottom = $listScroll.outerHeight(true),
                    scrolled__up = $(window).scrollTop(),
                    footer__screen__pos;
                if ($('.maintenance-steps').length) {
                    footer__screen__pos = $('.maintenance-steps').offset().top - scrolled__up + 90;
                }

                if (footer__screen__pos <= el__pos__bottom) {
                    $listScroll.addClass('stick-scroll');
                } else {
                    $listScroll.removeClass('stick-scroll');
                }
                $('.list-group-scroll li').each(function() {
                    var currLink = $(this).find('a'),
                        refElement = $(currLink.attr("href"));
                    if ($(refElement).length > 0) {
                        if (refElement.position().top <= scrollPos + 100 && refElement.position().top + refElement.height() > scrollPos) {
                            $('.list-group-scroll li a').removeClass("active");
                            currLink.addClass("active");

                        } else {
                            currLink.removeClass("active");
                        }
                    }
                });
            }
            $('.pdp--copy_link').on('click', function(e) {
                var currentUrl = window.location.href;
                $('#currentURL').attr('value', currentUrl);
                var copyText = document.getElementById("currentURL");
                copyText.select();
                document.execCommand("copy");
                $(".copy_clip_text").addClass("show");
                setTimeout(function() {
                    $(".copy_clip_text").removeClass("show");
                }, 1000);
            });

            $('.prdt-main-img__slider').slick({
                infinite: false
            });

            var w = $(".pdp-usedcar-nav .slick-slide").width();
            $(".pdp-usedcar-nav .slick-slide").css("height", (w * 3/4));
            $(".pdp-usedcar-nav .slick-slide .__product-img-used-car").css("height", (w * 3/4));


            // PDP Testimony
                                $('.testimony_list_card').slick({
                                  slidesToShow: 3,
                                  slidesToScroll: 1,
                                  centerMode: false,
                                  responsive: [{
                                    breakpoint: 475,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        variableWidth: true,
                                        }
                                    }]
                                  });
        },
        comparePane: function() {

            var comparePane = $('#compare-pane .modal-custom-dialog');

            $(document).on("click", ".compare-close-hide", function() {
                var bd = $('<div class="modal-backdrop show"></div>');
                $('.compare-mobile-toggle').addClass('open');
                comparePane.slideToggle('slow', function() {
                    if ($('.modal-custom-dialog').is(':hidden')) {
                        $('.modal-backdrop').remove();
                        $('.compare-mobile-toggle').removeClass('open');
                    } else {
                        $('.compare-mobile-toggle').addClass('open');
                        //bd.appendTo(document.body);
                    }
                });
            });

            $(document).on("click", '.compare-close-hide', function() {
                if ($('#productCompareCount').val() > 0) {
                    $('.compare-strip-fixed').show();
                }
            });

            $(".add-to-compare").on("click", function() {
                $(".compare").css("display","block");
            });

            $(".add-to-compare, .strip-content-wrapper").on("click", function() {
                comparePane.show();
            });

            $(document).on("click", '.select-car-mobile', function() {
                $('#attribute-select-model').modal('show');
                $(".modal-backdrop").removeClass("show").addClass("hide");
            });

            $('#attribute-select-model').on('hidden.bs.modal', function() {
                $('.modal-custom').removeClass('below-backdrop');
            });
        },
        // code for My needs section starts
        myNeeds: function() {
            var _self = astra.global;
            _self.myNeedsObj = {
                indexVal: 0
            };
            $(".myNeedsPopup").on("click", function(e) {
                var carType;
                if ($(this).hasClass('USEDCAR')) {
                    carType = 'USEDCAR';
                    console.log("-----tttt---->" + carType);
                } else {
                    if ($(this).hasClass('NEWCAR')) {
                        carType = 'NEWCAR';
                    } else {
                        var carType = $('#car-type  .tab-lg__button--active').attr('data-ajax');
                    }
                }
                //console.log("--------->" + carType);
                e.preventDefault();
                $.ajax({
                    url: ACC.config.encodedContextPath + '/MyNeeds/fetch',
                    method: "get",
                    dataType: "html",
                    data: {
                        carType: carType
                    },
                    success: function(data) {
                        var previousData = data;
                        $.colorbox({
                            html: data,
                            width: '70%',
                            height: '95%',
                            overlayClose: true,
                            escKey: true,
                            closeButton: true,
                            className: "myNeedsWrapper",
                            onComplete: function() {
                                $(".myneedsImageWrapper").addClass("activeQues").attr("data-index", _self.myNeedsObj.indexVal);

                                $('.Order__List--progress li').eq(0).addClass('active');

                                var myNeedsSelect = function() {
                                    //selectedVal = $(this).find("input").val();
                                    var _self = astra.global,
                                        selectedans = $(this).find(".answerCode").val();
                                    _self.myNeedsSlctdImgs[selectedans.substr(0, 2)] = selectedans; //taking first 2 string as key, and the whole answer as value,eg: {"L1":"L1A2"}
                                    $(this).closest(".myneedsImageWrapper").find(".selectImages").removeClass('selected');
                                    $(this).addClass('selected');
                                    if ($(".tab-lg__button--active").attr("data-id") == "car__new-car") {
                                        $("#new_to_astra_type").val("NEWCAR");
                                    } else {
                                        $("#new_to_astra_type").val("USEDCAR");
                                    }
                                };
                                var myNeedsNext = function(e) {
                                    e.preventDefault();
                                    var _self = astra.global,
                                        $selectedImg = $(".myneedsImageWrapper.activeQues").find(".selectImages.selected");
                                    myNeedsAnsCode();
                                    if ($(this).closest(".myneedsImageWrapper").next().length <= 0) {
                                        if ($selectedImg.length > 0) {
                                            var thisurlVal = $(this).data('href');
                                            $.ajax({
                                                url: thisurlVal,
                                                data: {
                                                    carType: carType
                                                },
                                                method: "POST",
                                                success: function(data) {
                                                    $(".myneedsImageWrapper").removeClass("activeQues"); //remove the current index from all the image wrapper
                                                    var resData = $(data).find(".myneedsImageWrapper").addClass("activeQues").attr("data-index", ++_self.myNeedsObj.indexVal);
                                                    $("#cboxLoadedContent").find(".myneedsImageContainer").append(resData);

                                                    if ($(".myneedsImageWrapper").hasClass("activeQues")) {
                                                        $(".activeQues").prev().hide();
                                                    }
                                                    $('.Order__List--progress li').eq(_self.myNeedsObj.indexVal).addClass('active');
                                                    astra.global.astraLazyLoad.update();
                                                },
                                            });
                                        }
                                    } else { // to show the next questionaire when its already present(without making ajax call)
                                        $(this).closest(".myneedsImageWrapper").removeClass("activeQues").next().addClass("activeQues");
                                        $(".myneedsImageWrapper").hide();
                                        $(".activeQues").show();
                                        myNeedsProgress();
                                    }
                                    if ($(".tab-lg__button--active").attr("data-id") == "car__new-car") {
                                        $("#new_to_astra_type").val("NEWCAR");
                                    } else {
                                        $("#new_to_astra_type").val("USEDCAR");
                                    }

                                };
                                var myNeedsFinish = function(e) {

                                    e.preventDefault();
                                    var _self = astra.global,
                                        tempObj = _self.myNeedsSlctdImgs,
                                        answerCode = "",
                                        thisurlVal = $(this).data('href');

                                    myNeedsAnsCode();

                                    for (var key in tempObj) {
                                        answerCode += tempObj[key] + ",";
                                    }
                                    answerCode = answerCode.substr(0, answerCode.length - 1);
                                    $.ajax({
                                        url: thisurlVal,
                                        method: "POST",
                                        data: {
                                            answerCode: answerCode,
                                            carType: carType
                                        },
                                        success: function(data) {
                                            $("#cboxLoadedContent").html(data);
                                            astra.global.astraLazyLoad.update();
                                            $('.recommended--popup').slick({
                                                dots: false,
                                                infinite: false,
                                                speed: 300,
                                                slidesToShow: 3,
                                                slidesToScroll: 3,
                                                prevArrow: '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
                                                nextArrow: '<i class="fa fa-arrow-right" aria-hidden="true"></i>',
                                                responsive: [{
                                                        breakpoint: 1024,
                                                        settings: {
                                                            slidesToShow: 2,
                                                            slidesToScroll: 2
                                                        }
                                                    },
                                                    {
                                                        breakpoint: 480,
                                                        settings: {
                                                            slidesToShow: 1,
                                                            slidesToScroll: 1
                                                        }
                                                    }
                                                ]
                                            });
                                        }
                                    });

                                };
                                var myNeedsPrevious = function(e) {

                                    e.preventDefault();
                                    $(this).closest(".myneedsImageWrapper").removeClass("activeQues").prev().addClass("activeQues");
                                    $(".myneedsImageWrapper").hide();
                                    $(".activeQues").show();
                                    myNeedsProgress();
                                };
                                var myNeedsAnsCode = function() {
                                    var _self = astra.global,
                                        $selectedImg = $(".myneedsImageWrapper.activeQues").find(".selectImages.selected"),
                                        selectedAns = $selectedImg.find(".answerCode").val();

                                    _self.myNeedsSlctdImgs[selectedAns.substr(0, 2)] = selectedAns;
                                };
                                var myNeedsProgress = function() {
                                    var $orderList = $('.Order__List--progress li'),
                                        indexVal = $(".myneedsImageContainer .myneedsImageWrapper.activeQues").attr("data-index");
                                    $orderList.removeClass('active');
                                    for (var i = 0; i <= indexVal; i++) {
                                        $orderList.eq(i).addClass('active');
                                    }
                                };

                                $(".myNeedsWrapper").on("click", ".selectImages", myNeedsSelect);
                                $(".myNeedsWrapper").on("click", ".next-need-button", myNeedsNext);
                                $(".myNeedsWrapper").on("click", ".finishBtn", myNeedsFinish);
                                $(".myNeedsWrapper").on("click", ".prev-need-button", myNeedsPrevious);

                                if ($(".tab-lg__button--active").attr("data-id") == "car__new-car") {
                                    $("#new_to_astra_type").val("NEWCAR");
                                } else {
                                    $("#new_to_astra_type").val("USEDCAR");
                                }

                            },
                            onClosed: function() {
                                window.location.reload(); //to unbind all the events attached to myneeds poop up
                            }

                        });
                    }
                });

            });
        },
        cart: function() {
            $(".bundleProductsListLink").on("click", function(e) {
                e.preventDefault();
                var title = "<div class='heading heading-1'> AFFCO Services</div>",
                    obj = {
                        title: title,
                        thisObj: this
                    };

                astra.global.cartPopup(obj);
            });
            $(".bundleADPProductsListLink").on("click", function(e) {
                e.preventDefault();
                var title = "<div class='heading heading-1'> ADP Services </div>",
                    obj = {
                        title: title,
                        thisObj: this
                    };

                astra.global.cartPopup(obj);
            });

            //-----Cart Page - Sticky Order Summary-----//
            var $el = $('.float__this'),
                $el_wrap = $('.float__this-wrap');
            if ($el[0]) {
                $(window).on('load resize scroll', function() {

                    $el.width($el_wrap.width());
                    $el_wrap.height($el.height());

                    var el__wrap__pos = $el_wrap.offset().top,
                        el__sticky_pos__top, el__pos__bottom,
                        scrolled__up = $(window).scrollTop(),
                        footer__screen__pos = $('footer').offset().top - scrolled__up;

                    if ($('.astra-auto-header')[0]) {
                        var fixed__header__height = $('.fixed .astra-auto-header').outerHeight(true);
                        el__sticky_pos__top = el__wrap__pos - fixed__header__height - 20;
                        el__pos__bottom = fixed__header__height + $el.outerHeight(true) + 20;
                    } else {
                        el__sticky_pos__top = el__wrap__pos - 20;
                        el__pos__bottom = $el.outerHeight(true) + 20;
                    }

                    if (scrolled__up >= el__sticky_pos__top) {
                        $el.addClass('sticky');
                    } else {
                        $el.removeClass('sticky');
                    }

                    if (footer__screen__pos <= el__pos__bottom) {
                        $el.addClass('sticky--bottom');
                    } else {
                        $el.removeClass('sticky--bottom');
                    }
                });
            }

            // Add to Cart validation
            /** Base on SEVA - 4596 need to skip pop up modal, go trough checkout page */
            /**
            var isCartNotEmpty = $(".isCartNotEmpty").val();
            if (isCartNotEmpty == "true") {
                $("#addToCartButtonBuyNow").attr("type", "button");
                $("#addToCartButtonBuyNow").attr("data-target", "#confirm-popup-Modal");
                $("#addToCartButtonBuyNow").attr("data-toggle", "modal");
            } else {
                $("#addToCartButtonBuyNow").removeAttr("data-target");
                $("#addToCartButtonBuyNow").removeAttr("data-toggle");
                $("#addToCartButtonBuyNow").attr("type", "submit");
            }*/
            $("#addToCartButtonBuyNow").removeAttr("data-target");
            $("#addToCartButtonBuyNow").removeAttr("data-toggle");
            $("#addToCartButtonBuyNow").attr("type", "submit");

            $("#trade-in-link").on("click", function(e){
                var tradeIn = "tradeInPDP";
                $("input[name*='tradeInPDP']").val(tradeIn);
                $("#addToCartButtonBuyNow").trigger("click");
                e.preventDefault();
            });

            $('.confirm_popup_pdp').on('hidden.bs.modal', function () {
                var tradeIn = "false";
                $("input[name*='tradeInPDP']").val(tradeIn);
            });

        },
        cartPopup: function(obj) {

            $.colorbox({
                width: (window.innerWidth < 650 ? "90%" : "70%"),
                height: (window.innerWidth < 650 ? "500" : "630"),
                overlayClose: true,
                escKey: true,
                closeButton: true,
                href: $(obj.thisObj).attr("href"),
                className: "affco__colorbox",
                title: obj.title,
                onComplete: function() {
                    $(".affco__services--slider").slick({
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: false,
                        draggable: true,
                        touchThreshold: 10,
                        dots: true,
                        customPaging: function(slick, i) {
                            var num = i + 1;
                            return '<a>' + num + '</a>';
                        },
                        responsive: [{
                                breakpoint: 994,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                    prevArrow: '<i class="fa fa-arrow-left slick-prev-btn" aria-hidden="true"></i>',
                                    nextArrow: '<i class="fa fa-arrow-right slick-next-btn" aria-hidden="true"></i>',
                                    dots: false,
                                    centerMode: true,
                                    centerPadding: '15px'
                                }
                            },
                            {
                                breakpoint: 650,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                    prevArrow: '<i class="fa fa-arrow-left slick-prev-btn" aria-hidden="true"></i>',
                                    nextArrow: '<i class="fa fa-arrow-right slick-next-btn" aria-hidden="true"></i>',
                                    dots: false,
                                    centerMode: true,
                                    centerPadding: '15px'
                                }
                            }
                        ]
                    });
                    $.colorbox.resize();
                    var services_count = $(".affco__services--slider .configure_form").length;
                    //console.log(services_count);
                    $("#cboxTitle .heading-1").append('<span> (' + services_count + ')</span>');
                    var $affco_services,
                        $cartServices = $(".cart__service__wrap .cart__services--title"),
                        maxHeight = [],
                        maxDetailHeight = [];

                    $cartServices.each(function() {
                        maxHeight.push($(this).outerHeight());
                    });
                    var maxValue = Math.max.apply(Math, maxHeight);
                    $cartServices.css("min-height", maxValue);

                    var $cartserviceDetail = $(".cart__service__wrap .cart__services--detail");
                    $cartserviceDetail.each(function() {
                        maxDetailHeight.push($(this).outerHeight());
                    });
                    var maxDetailValue = Math.max.apply(Math, maxDetailHeight);
                    $cartserviceDetail.css("min-height", maxDetailValue);

                    $(window).on("resize load", function() {
                        var $cartServices = $(".cart__service__wrap .cart__services--title"),
                            maxHeight = [],
                            maxDetailHeight = [];

                        $cartServices.each(function() {
                            maxHeight.push($(this).outerHeight());
                        });
                        var maxValue = Math.max.apply(Math, maxHeight);
                        $cartServices.css("min-height", maxValue);

                        var $cartserviceDetail = $(".cart__service__wrap .cart__services--detail");
                        $cartserviceDetail.each(function() {
                            maxDetailHeight.push($(this).outerHeight());
                        });
                        var maxDetailValue = Math.max.apply(Math, maxDetailHeight);
                        $cartserviceDetail.css("min-height", maxDetailValue);
                    });
                    if ($(".slick-dots li").length <= 1) {
                        $('.slick-dots').css('display', 'none');
                    }
                }
            });
        },
        emptyCartPage: function() {
            if (($("#recommended-products").children().length > 4) || $(window).width() < 900) {
                //console.log("rrr");
                $("#recommended-products").slick({
                    dots: true,
                    arrows: false,
                    slidesToShow: 4,
                    responsive: [{
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2
                            }
                        },
                        {
                            breakpoint: 480,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            }
        },

        staticPages: function() {
            initSlider();

            function initSlider() {
                var slider = $('.static_content_slider');
                //console.log("working", $(slider));
                if ($(window).width() < 992) {
                    if (!slider.hasClass('slick-initialized')) {
                        //console.log('slick start init');
                        slider.slick({
                            lazyLoad: 'ondemand',
                            speed: 1200,
                            slidesToShow: 4,
                            centerMode: true,
                            centerPadding: '15px',
                            pauseOnHover: false,
                            autoplay: false,
                            dots: true,
                            responsive: [{
                                    breakpoint: 992,
                                    settings: {
                                        slidesToShow: 2,
                                        slidesToScroll: 1
                                    }
                                },
                                {
                                    breakpoint: 500,
                                    settings: {
                                        slidesToShow: 1,
                                        slidesToScroll: 1
                                    }
                                }
                            ]
                        });
                    }
                } else {
                    if (slider.hasClass('slick-initialized')) {
                        slider.slick('unslick');
                    }

                }
            }

            //delay for calling initSlider only when resize is finished
            var delay = (function() {
                var timer = 0;
                return function(callback, ms) {
                    clearTimeout(timer);
                    timer = setTimeout(callback, ms);
                };
            })();

            $(window).resize(function() {
                delay(function() {
                    initSlider();
                }, 200);

                $('.used_car_customer_contact .logged').removeClass("active");
            });

            if (window.innerWidth > 900) {
                var staticVideoHt = $(".static--videos .subordinate_articles").height(),
                    videoLen = $(".static--videos .subordinate_articles").length,
                    ttlHt = (staticVideoHt * videoLen) + 40;
                $(".static--videos .main_article figure").css("min-height", ttlHt);
            } else {
                var staticVideoImgHt = $(".static--videos .subordinate_articles img").height();
                $(".static--videos .main_article figure img").css("min-height", staticVideoImgHt);
            }

            var $static_slider = $(".articles_list.articles_list_container");
            if ($static_slider) {
                // var count = 1;
                $(window).on("resize load", function() {
                    $static_slider.each(function() {
                        var maxHeight = [],
                            $sub = $(this).find(".subordinate_articles .article_info");
                        $sub.each(function() {
                            maxHeight.push($(this).outerHeight());
                        });
                        var maxValue = Math.max.apply(Math, maxHeight);
                        $sub.css("height", maxValue);
                    });
                });
            }
        },
        common: function() {
            $("body").addClass('fixed');

            //Iframe Dynamic Height
            if ($('#static_iframe').length > 0) {

                //Setting Domain -- document.domain="seva.id";
                document.domain = isNaN(location.hostname.replace(/\./g, "")) ? location.hostname.split('.').slice(-2).join('.') : location.hostname;

                $(window).on('load resize', function() {
                    setTimeout(function() {
                        var el__iframe = $('#static_iframe');
                        var iframeHt = el__iframe.contents().height();
                        el__iframe.height(iframeHt);
                        $('.static-page__iframe-wrapper').removeClass('iframe-loading');
                    }, 2000);
                });
            }

            // image lazy load
            astra.global.astraLazyLoad = new LazyLoad();

            //TODO: All colorbox should be done through ACC.colorbox.open({})
            //colorbox on complete trigger
            $(document).on('cbox_complete', function() {
                astra.global.astraLazyLoad.update();
                $("#cboxClose").addClass("icon-search-close");
                $("body").addClass("overflowYHidden");
            });
            //colorbox on load trigger
            $(document).on('cbox_load', function() {
                $("#cboxClose").text("");
            });

            $(document).on('cbox_closed', function() {
                $("body").removeClass("overflowYHidden");
            });
            $('select').each(function() {
                $(this).select2({
                    dropdownParent: $(this).closest("div"),
                    minimumResultsForSearch: 6
                });
            });

            $('.no-search-input-box').each(function() {
                $(this).select2({
                    dropdownParent: $(this).closest("div"),
                    minimumResultsForSearch: -1
                });
            });

            $('.vehicles-list__header #status').each(function() {
                $(this).select2({
                    minimumResultsForSearch: -1
                });
            });

            // select results click
            $('select').on("select2:select", function() {
                $(this).parents(".form-group").removeClass("error-element");
                $(this).parents(".form-group").find("label.error").remove();
            });

            $("select").each(function(){
                if($(this).prop("disabled") == true){
                    $(this).parents(".__dropdown").addClass("disabled-dropdown");
                }
            })

            $('#general-appoinmtent-queryType').on("select2:select", function() {
                $(".general-appointment-form").find(".disabled-select").prop("disabled", false);
            });


            if ($('.astra-datepicker').length > 0) {
                var $input = $('.astra-datepicker input');
                datePicker($input);
            }

            //datePicker($input);
            if ($("input[id = 'payment.scheduled.date.time']").length > 0) {
                var $input = $("input[id = 'payment.scheduled.date.time']");
                datePicker($input);
            }

            $('.accordion').on("click", function(e) {
                //  e.stopPropagation();
                if (!$(this).hasClass('activePanel')) {
                    $('.accordionContent').slideUp();
                    $('.accordion').removeClass('activePanel');
                }
                $(this).addClass('activePanel');
                $(this).next().slideDown();
            });

            $('.footer-heading').on('click', function() {
                if ($(window).width() < 992) {
                    $(this).next('.sub-heading').slideToggle('slow');
                    $(this).slideDown().toggleClass('active');
                    var _this = $(this).not(this);
                    _this.next('.sub-heading').slideUp('slow');
                    _this.removeClass('active');
                    _this.next('.sub-heading').slideUp('slow');
                }
            });

            //tips and tricks, faq
            $('.accordion--details:first-child .accordion--heading').addClass("active");
            $('.accordion--details:first-child .accordion--content').show();
            $('.accordion--heading').on('click', function() {
                $(this).siblings('.accordion--content').slideToggle('slow');
                $(this).slideDown().toggleClass('active');
                var _this = $(this).not(this);
                _this.siblings(".accordion--content").slideUp('slow');
                _this.removeClass('active');
                _this.siblings('.accordion--content').slideUp('slow');
            });


            $('.close-modal').on('click', function() {
                $('#otp-popup-Modal').modal('hide');
            });
            //fixed header
            $(window).scroll(function() {
                var body = $('body'),
                    topHeader = $('.__top-header'),
                    header = $('.astra-auto-header'),
                    scroll = $(window).scrollTop();



                if (scroll > 10) {
                    body.addClass('fixed');
                    body.addClass("header-fixed");
                } else {
                    body.removeClass('fixed');
                    body.removeClass("header-fixed");
                }

                //$(document).on("scroll", onScroll);


            });

            $('.addressBookPopup').colorbox({
                className: 'addressBookPopupClass',
                closeButton: true,
                height: '70%',
                inline: true,
                maxWidth: '900px',
                width: '100%'

            });
            $('.newBillingAddressPopup').colorbox({
                className: 'newBillidngaddressBookClass',
                closeButton: true,
                height: '70%',
                inline: true,
                maxWidth: '880px',
                width: '100%'
            });
            //Login page - Social login popup
            if ($('#social-login')[0]) {
                setTimeout(function() {
                    $.colorbox({
                        className: 'astra-popup',
                        closeButton: true,
                        inline: true,
                        width: '90%',
                        maxWidth: '750px',
                        href: '#social-login',
                        onComplete: function() {
                            $('.astra-popup__close').click(function() {
                                $('#colorbox').colorbox.close();
                            });
                        }
                    });
                }, 1000);
            }


            $('div[data-toggle="collapse"]').on('click', function(event) {
                event.stopPropagation();
            });

            //Hotspot js
            $('.BornHS__Input').change(function() {
                if ($(this).is(":checked")) {
                    $('.BornHS__Wrapper').addClass("BornHS__Blur");
                } else {
                    $('.BornHS__Wrapper').removeClass("BornHS__Blur");
                }
            });

            if ($('.myaccount .__section-title').length > 0) {
                $('.myaccount .__section-title').addClass('opened');
                $('.myaccount .__section-title').on('click', function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $(this).toggleClass('opened');
                    $($(this).attr("data-target")).slideToggle();
                });
            }
            if ($('#myAccountNav').length > 0) {
                // Populate dropdown with menu items
                $("#myAccountNav a.link-item").each(function() {
                    var el = $(this);
                    if (el.hasClass("active")) {
                        $("#selected-nav-item").text(el.text());
                    }
                });
                var navitem = $('#myAccountNav').find('ul').clone();
                $("#account-nav-item").append(navitem);

                $('.js-edit-profile-address-fields').on('input change propertychange paste', function() {
                    $("#updateAddress").val("true");
                });
            }


            var $layoutGridImage = $(".vehicle-box__top").find("a");
            var maxHeight = [];

            $(window).on('load resize', function(){
                $layoutGridImage.each(function() {
                    maxHeight.push($(this).outerHeight());
                });

                var maxValue = Math.max.apply(Math, maxHeight);
                $layoutGridImage.css("height", maxValue);
            })

            $(".each_menu .tab_menu").each(function(){
                if (location.pathname.includes($(this).find("a").attr("href"))) {
                    $(this).addClass("active");
                }
            });

            $(".btn-show-form").on("click", function(){
                $(".list-vehicle").hide();
                $(".form-add-vehicle").show();
            })


            if (windowWidth < 758){
                if($(".each_menu .tab_menu:nth-child(n+3)").hasClass("active")){
                    var width = $(".each_menu .tab_menu:nth-child(n+3)").closest("div").outerWidth();
                    $(".each_menu").scrollLeft(width + 10);
                }
            }


            //Add bookmark
            $('.add-to-bookmark').each(function() {
                if ($(this).is(':checked')) {
                    $(this).next('label').addClass('checked');
                }
            });
            $('.bookmark label').click(function() {
                var thatfor = $(this).attr('for');
                $("label[for=" + thatfor + "]").each(function() {
                    $(this).toggleClass('checked');
                });
            });

            // Change phone number
            $("#change_phone_number").on("change keyup", function() {
                var changeNumber = $(this).val();
                var regex = /^(?=\d{8,13}$)(8)\d+/;
                if (changeNumber.length >= 10 && changeNumber.match(regex)) {
                    $("._change-mobile-button").prop("disabled", false);
                } else {
                    $("._change-mobile-button").prop("disabled", true);
                }
            });

            //Address book height
            var $static_address_book = $(".automation-address-item"),
                $address_book = $(".automation-address-item .address-details .address");
            if ($static_address_book) {
                // var count = 1;
                var maxHeight = [];
                $static_address_book.each(function() {
                    var $sub = $(this).find(".address-details .address");
                    maxHeight.push($sub.outerHeight());
                });
                var maxValue = Math.max.apply(Math, maxHeight);
                $address_book.css("height", maxValue);
            }
            //Register page select box
            if ($(".registerWrapper")) {
                var selector = "#register_title";
                if ($(selector).hasClass("select2-hidden-accessible")) {
                    $(selector).select2("destroy");
                }

                $(selector + " option:selected").removeAttr('selected');
                $(selector + " option[value='mr']").attr('selected', 'selected'); //selecting first value
                $(selector).select2();
            }

            // image upload minimum error   
            // order history popup start
            $('.textareaOther').hide();
            $('.od-history-cancel').on("select2:select", function() {
                if ($(this).val() == 'Other') {
                    $('.textareaOther').show();
                } else {
                    $('.textareaOther').hide();
                }

            });
            // order history popup end 

            $(window).on('load resize', function() {
				var prdtTop = $('.pdp-page-main .prdt-name-btn').height();
				$('.pdp-page-main .pdp-info').css('padding-top',prdtTop);
            });

            $(window).on('load', function() {
                setTimeout(function() {
                    stickyFooter();
                }, 1500);
            });
            $(window).resize(function() {
                stickyFooter();
            });
            if ($(".divTrue").length > 0) {

                $('html, body').animate({
                    scrollTop: $(".divTrue").offset().top
                }, 1000);
            }

            //Promo Page
            $("#promo-used-car").hide();
            $("#promo-new-car").hide();
            $('.promo__go-to-top .link--gray').click(function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 600);
                $("#promo-category-select").find("option:first-child").prop("selected", true);
                $("#promo-category-select").select2("destroy").select2();
                return false;
            });

            $('#promo-category-select').change(function() {
                var idVar = $(this).find(":selected").attr('data-target');
                var idVar1 = $('#' + idVar);
                $('html, body').animate({
                    scrollTop: idVar1.offset().top - 120
                }, 1000);
            });

            $(window).on('load', function(){
                var countPromo;
                var newValue;

                countPromo = $('.promo-tile-wrapper').length;
                var set = "Promo("+countPromo+")";
                newValue = $("#promo-title").text(set);
                $("#promo-new-car").show();
                $("#promo-used-car").show();
            });

            //Wishlist
            $('.tab-lg__button').click(function() {
                var dataID = $(this).attr('data-id');
                $('.tab-lg__button').removeClass('tab-lg__button--active');
                $(this).addClass('tab-lg__button--active');
                $('.tab-lg__content').hide();
                $('#' + dataID).show();

                var items_width = 0;
                var space_width = 0;
                setTimeout(function() {
                    $('#' + dataID).find(".new-to-content-outer").each(function() {
                        if ($(this).find('.space')[0]) {
                            space_width = $(this).find('.space').width();
                        } else {
                            space_width = 0;
                        }
                        items_width += $(this).find('.new-to-content-inner').width() + space_width;
                    });
                    items_width = items_width + 125;
                    $('#' + dataID).find('.items').width(items_width);
                }, 200);

                $(".steps-banner").slick('setPosition');

                sessionStorage.setItem("carType", $(".tab-lg__button--active").attr('data-ajax'));
            });

            //Referral Code
            $('.referral_code__create__click').click(function() {
                $(this).hide();
                $('.referral_code__create__enter').show();
            });

            /*$('.product__certified').on("mouseover",function(){
                $(this).find('.product__certified__msg').show(200)
            }).on("mouseleave", function(){
                $(this).find('.product__certified__msg').hide(200)
            });*/

            $(window).on('resize load', function() {
                $(".trade_in_container .row").each(function() {
                    if ($(window).width() <= 990) {
                        $(this).find("h2").prependTo($(this).find(".trade_in_image"));
                    } else {
                        $(this).find("h2").prependTo($(this).find(".trade_in_points"));
                    }
                });
            });

            //SEO Footer
            if ($(window).width() <= 769) {
                $(".new_viewport").slick({
                                    dots: true,
                                    slidesToShow : 1,
                                    slidesToScroll: 1,
                                    adaptiveHeight: true
                                })
            }



        },
        imageUploadFunc: function(formName, imageUploadEle, imgUploadError) {
            if ($("#paymentDetailsForm .TRADEIN_CASH-heading-wrapper").hasClass('activePanel') || $("#paymentDetailsForm .TRADEIN_CREDIT-heading-wrapper").hasClass('activePanel')) {
                if (formName.valid() && imageUploadEle.length > 0) {
                    formName.submit();
                } else if (imageUploadEle.length == 0) {
                    if (imgUploadError.find("li").length > 0) {
                        imgUploadError.find("li").remove();
                    }
                    imgUploadError.append("<li>" + $(".minimum-error").html() + "</li>");
                }

            } else {
                formName.submit();
            }
        },
        validatePhone: function(phoneText) {
            var filter = /^(?=\d{8,13}$)(8)\d+/;
            if (filter.test(phoneText)) {
                return true;
            } else {
                return false;
            }
        },
        creditCalc: function() {

            // Credit Calculator
            $('#getGiveBestOffer').hide();
            $('#getGiveBestOfferToCart').hide();
            $('#credit_simulation_table').hide();
            $('#testDrive\\.productVariant').on('change', function() {
                           var productCode = $("#testDrive\\.productVariant").val();
                           var productCodeVariant = $("input[name*='productCode']").val(productCode);
             });

            $("#precentageval").on('change', function(){
                var valPercentage = $("#precentageval").val();
                var valPercentage1 = valPercentage.toString();
                var percentage = $("input[name*='percent']").val(valPercentage1);
            });
            $("#tenorval").on('change', function(){
                var valTenor = $("#tenorval").val();
                var valTenor1 = valTenor.toString();
                var tenor = $("input[name*='tenor']").val(valTenor1);
            });

            $('#getCreditValue').on("click", function() {
                var valPercentage = $("#precentageval").val();
                                var valPercentage1 = valPercentage.toString();
                                var percentage = $("input[name*='percent']").val(valPercentage1);


                            var valTenor = $("#tenorval").val();
                                var tenor = $("input[name*='tenor']").val(valTenor);

                if ($('#creditCalculatorForm').valid() == true) {
                    var options = {
                        'percentage': $("#precentageval").val(),
                        'tenor': $("#tenorval").val(),
                        'price': $('#price').val(),
                        'productCode' : $("#testDrive\\.productVariant").val(),
                        'productCondition' : $("#testDrive\\.condition").val(),
                        'year' : $("#testDrive\\.year").val()

                    };
                    $.ajax({
                        url: ACC.config.encodedContextPath + '/sevaservice/calculatorval',
                        async: false,
                        data: options,
                        type: 'POST',
                        success: function(response) {
                            if (response.systemErrorMessage != null) {
                                window.location.href = notFountUrl;
                            } else {
                                $('#contentTableDiv').remove();
                                var contentDiv = '<div id="contentTableDiv">';
                                $.each(response.out_DATA, function(key, value) {
                                    contentDiv += '<div class="row table-row-item"> <div class="col-sm-12 col-md-12 col-lg-2"><span class="col-sm-6 for-mobile-view">' + ACC.credidCalculatorTenor + '</span><span class="col-sm-6 col-md-12 col-lg-12">' + value.tenor + ' ' + ACC.credidCalculatorYear + '</span></div> <div class="col-sm-12 col-md-12 col-lg-5"><span class="col-sm-6 for-mobile-view">' + ACC.credidCalculatorDownPayment + '</span><span class="col-sm-6 col-md-12 col-lg-12">' + value.tot_pay_first + '</span></div><div class="col-sm-12 col-md-12 col-lg-5"><span class="col-sm-6 for-mobile-view">' + ACC.credidCalculatorInstallment + '</span><span class="col-sm-6 col-md-12 col-lg-12">' + value.amt_installment + '</span></div></div>';
                                });
                                $('#credit_simulation_table').show();
                                $('#credit_simulation_table').append(contentDiv);
                                $('#getGiveBestOffer').show();
                                $('#getGiveBestOfferToCart').show();
                            }

                        }
                    });
                }
                loadGoogleTagForCreditCal('Click Hitung Button');
            });
            var loadGoogleTagForCreditCal = function(name) {
            	var buttonName = name;
            	window.mediator.publish('trackCreditCalculatorPage', {
        			'eventName'   : 'generalEvent',
        			'eventCategory' : 'Astra Credit Calculator',
        			'eventAction' : buttonName,
        			'carBrand':  $('option:selected', "#testDrive\\.productBrand").text().trim(),
        			'carModel': $('option:selected', "#testDrive\\.productModel").text().trim(),
        			'carPrice': getPriceFormatValue($('#price').val()),
        			'carVariant': $('option:selected', "#testDrive\\.productVariant").text().trim(),
        			'downPayment' : $("#precentageval").val(),
        			'tenureLength' : $("#tenorval").val()
        		});
            }

			var getPriceFormatValue = function(price) {
                var range = price,
                    formatValue = range.split("."); //["Rp","100","949","00"]
                formatValue.shift(); //to remove first item
                return formatValue.join("").trim();
            };

            $('#getGiveBestOffer').on("click", function() {
            	loadGoogleTagForCreditCal('Click Hitung Button - Lihat Produk');
                var pCode = $('#testDrive\\.productVariant').val();
                var baseUrl = $(this).attr('data-url');
                var productCodeUrl =baseUrl+'/p/'+pCode;
                location.href=productCodeUrl;
            });
            $('#getGiveBestOfferToCart').on("click", function() {
            	loadGoogleTagForCreditCal('Click Hitung Button - Minta Penawaran Terbaik');
            	            /** Base on SEVA - 4596 need to skip pop up modal, go trough checkout page */
            	            /**
                            var isCartNotEmpty = $(".isCartNotEmpty").val();

                            if (isCartNotEmpty == "true") {
                                $("#getGiveBestOfferToCart").attr("type", "button");
                                $("#getGiveBestOfferToCart").attr("data-target", "#confirm-popup-Modal");
                                $("#getGiveBestOfferToCart").attr("data-toggle", "modal");
                            } else {
                                $("#getGiveBestOfferToCart").removeAttr("data-target");
                                $("#getGiveBestOfferToCart").removeAttr("data-toggle");
                                $("#getGiveBestOfferToCart").attr("type", "submit");
                            }*/
                            $("#getGiveBestOfferToCart").removeAttr("data-target");
                            $("#getGiveBestOfferToCart").removeAttr("data-toggle");
                            $("#getGiveBestOfferToCart").attr("type", "submit");
                        });
            if ($.trim($('#price').val()) != '') {
                var options = {
                    'percentage': $("#precentageval").val(),
                    'tenor': $("#tenorval").val(),
                    'price': $('#price').val()
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/sevaservice/paymentcalculatorval',
                    async: false,
                    data: options,
                    type: 'GET',
                    success: function(response) {
                        if (response.systemErrorMessage != null) {
                            window.location.href = notFountUrl;
                        } else {
                            $('#contentTableDiv').remove();
                            var contentDiv = '<div id="contentTableDiv">';
                            $.each(response.out_DATA, function(key, value) {
                                contentDiv += '<div class="row table-row-item"> <div class="col-sm-12 col-md-12 col-lg-2"><span class="col-sm-6 for-mobile-view">' + ACC.credidCalculatorTenor + '</span><span class="col-sm-6 col-md-12 col-lg-12">' + value.tenor + ' ' + ACC.credidCalculatorYear + ' </span></div> <div class="col-sm-12 col-md-12 col-lg-5"><span class="col-sm-6 for-mobile-view">' + ACC.credidCalculatorDownPayment + '</span><span class="col-sm-6 col-md-12 col-lg-12">Rp. ' + astra.global.priceFormat(value.tot_pay_first) + '</span></div><div class="col-sm-12 col-md-12 col-lg-5"><span class="col-sm-6 for-mobile-view">' + ACC.credidCalculatorInstallment + '</span><span class="col-sm-6 col-md-12 col-lg-12">Rp. ' + astra.global.priceFormat(value.amt_installment) + '</span></div></div>';
                            });
                            $('#credit_simulation_table').show();
                            $('#credit_simulation_table').append(contentDiv);
                        }
                    }
                });
            }

        },
        checkout: function() {
            //payment
            $('input[type=radio][name=paymentOption]').change(function() {
                $("input[id*='paymentDetail_is'").val(false);
                var $inputPayment = $('input:radio[name=paymentOption]:checked').val();
                switch ($inputPayment) {
                    case 'collapse-CASH':
                        $('#paymentDetail_isCashPayment').val(true);
                        break;
                    case 'collapse-CREDIT':
                        $('#paymentDetail_isCreditPayment').val(true);
                        loadCreditPaymentInit();
                        break;
                    case 'collapse-TRADEIN_CASH':
                        $('#paymentDetail_isTradeInByCashPayment').val(true);
                        break;
                    case 'collapse-TRADEIN_CREDIT':
                        $('#paymentDetail_isTradeInByCreditPayment').val(true);
                        loadTradeCreditPaymentInit();
                        break;
                    default:
                        break;
                }
            });

            $('#creditprecentageval1,#credittenorval').on('change', function() {
                loadCreditPaymentInit();
            });

            var loadCreditPaymentInit = function() {
                var options = {
                    'percentage': $("#creditprecentageval1").val(),
                    'tenor': $("#credittenorval").val(),
                    'price': $("#creditprice").val(),
                    'productCode': $("#base-productCode").val(),
                    'productCondition': $("#base-productType").val()
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/sevaservice/paymentcalculatorval',
                    async: false,
                    data: options,
                    type: 'POST',
                    success: function(response) {
                        if (response.systemErrorMessage != null) {
                            window.location.href = notFountUrl;
                        } else {
                            $.each(response.out_DATA, function(key, value) {
                                $('#creditdownPayment1').val(value.tot_pay_first);
                                $('#creditInstallments1').val(value.amt_installment);
                                $('#creditdownPayment').val(reFormatValue(value.tot_pay_first));
                                $('#creditInstallments').val(reFormatValue(value.amt_installment));
                            });
                            window.mediator.publish('trackCreditForPDPAndCheckoutPage', {
                    			'eventName'   : 'generalEvent',
                    			'eventCategory' : 'Astra Credit Calculator',
                    			'eventAction' : 'Checkout',
                    			'carBrand':  $("#selected-brand-name").val(),
                    			'carPrice': reFormatValue($("#selected-product-price").val()),
                    			'carVariant': $("#selected-variant-name").val(),
                    			'downPayment' : $("#creditprecentageval1").val(),
                    			'tenureLength' : $("#credittenorval").val(),
                    	        'downPaymentRupiah' : $('#creditdownPayment').val(),
                    			'tenureRupiah' : $('#creditInstallments').val()
                    		});
                        }


                    }
                });
            };
            $('#tradeprecentageval1,#tradetenorval').on('change', function() {
                loadTradeCreditPaymentInit();
            });

            var loadTradeCreditPaymentInit = function() {
                var options = {
                    'percentage': $("#tradeprecentageval1").val(),
                    'tenor': $("#tradetenorval").val(),
                    'price': $("#tradeprice").val(),
                    'productCode': $("#base-productCode").val(),
                    'productCondition': $("#base-productType").val()
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/sevaservice/paymentcalculatorval',
                    async: false,
                    data: options,
                    type: 'POST',
                    success: function(response) {
                        if (response.systemErrorMessage != null) {
                            window.location.href = notFountUrl;
                        } else {
                            $.each(response.out_DATA, function(key, value) {
                                $('#tradedownPayment1').val(value.tot_pay_first);
                                $('#tradeInstallments1').val(value.amt_installment);
                                $('#tradedownPayment').val(reFormatValue(value.tot_pay_first));
                                $('#tradeInstallments').val(reFormatValue(value.amt_installment));
                            });
                            window.mediator.publish('trackCreditForPDPAndCheckoutPage', {
                    			'eventName'   : 'generalEvent',
                    			'eventCategory' : 'Astra Credit Calculator',
                    			'eventAction' : 'Checkout',
                    			'carBrand':  $("#selected-brand-name").val(),
                    			'carPrice': reFormatValue($("#selected-product-price").val()),
                    			'carVariant': $("#selected-variant-name").val(),
                    			'downPayment' : $("#tradeprecentageval1").val(),
                    			'tenureLength' : $("#tradetenorval").val(),
                    	        'downPaymentRupiah' :  $('#tradedownPayment').val(),
                    			'tenureRupiah' : $('#tradeInstallments').val()
                    		});
                        }


                    }
                });

            };
            var reFormatValue = function(price) {
                var range = price,
                    formatValue = range.split("."); //["Rp","100","949","00"]
                formatValue.shift(); //to remove first item
                return formatValue.join("").trim();
            };

            $('#paymentSubmit').on("click", function() {
                if ($('#paymentDetail_isCashPayment').val() == 'true' || $('#paymentDetail_isCreditPayment').val() == 'true') {
                    $('#paymentDetailsForm').submit();
                } else {
                    var paymentForm = $("#paymentDetailsForm"),
                        imageUpload = $(".activePanel").next().find(".dropBlockWrapper .image-uploaded .success-img"),
                        imageUploadError = $(".activePanel").next().find(".help-block ol");
                    astra.global.imageUploadFunc(paymentForm, imageUpload, imageUploadError)
                }
            });

            /* mobile nav-for checout */
            $(".personalinfo").on("click", function() {
                $(".checkout-personalinfo").fadeIn("300");
                $(".checkout-paymentmethod").hide();
                $(".personal-info").addClass("active");
                $(".payment-method").removeClass("active");
                $(".separator").removeClass("separator-left");
                $(".separator").addClass("separator-right");
            });


            /*$("#placeOrder").on("click", function(e) {
                e.preventDefault();
                if ($('#placeOrderOTPRequired').val() == 'no') {
                    $('#placeOrderForm').submit();
                } else {
                    placeOrderOTP($('#customer-mobileNumber').val(), $("#isdCode").val());
                }
            });*/

            $('.close-orderotp-modal').click(function() {
                $('#order-otppopup').modal('hide');
            });

            /*var placeOrderOTP = function(mobilenumber, isdCode) {
                if ($.isNumeric(mobilenumber)) {
                    $.ajax({
                        url: ACC.config.contextPath + '/otp/send-otp',
                        type: 'GET',
                        data: {
                            'mobileNumber': mobilenumber,
                            'isdCode': isdCode,
                        },
                        success: function(data) {
                            if (data === 'Invalid') {
                                $("#errorMessage").addClass("show-error");
                            } else {
                                $('#order-otppopup').modal('show');
                            }

                            //console.log("Success");
                        },
                        error: function(result) {
                            $("#serverMessage").addClass("show-error");
                        }
                    });
                }
            };*/

            //Checkout Login - Popup
            if ($('#return-user')[0]) {
                setTimeout(function() {
                    $.colorbox({
                        className: 'astra-popup',
                        closeButton: true,
                        height: '340px',
                        inline: true,
                        maxWidth: '555px',
                        width: '100%',
                        href: '#return-user',
                        onComplete: function() {
                            $('.astra-popup__close').click(function() {
                                $("#guestForm").submit();
                            });
                        }
                    });
                }, 1000);
            }
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
        // Upload image functionality
        imageUpload: function() {
            var _self = astra.global;
            _self.countImg = 0;

            function resetOrientation(srcBase64, srcOrientation, callback) {
                var img = new Image();                
                img.onload = function () {
                    var width = img.width,
                        height = img.height,
                        canvas = document.createElement('canvas'),
                        ctx = canvas.getContext("2d");

                    // set proper canvas dimensions before transform & export
                    if ([5, 6, 7, 8].indexOf(srcOrientation) > -1) {
                        canvas.width = height;
                        canvas.height = width;
                    } else {
                        canvas.width = width;
                        canvas.height = height;
                    }

                    // transform context before drawing image
                    switch (srcOrientation) {
                        case 2:
                            ctx.transform(-1, 0, 0, 1, width, 0);
                            break;
                        case 3:
                            ctx.transform(-1, 0, 0, -1, width, height);
                            break;
                        case 4:
                            ctx.transform(1, 0, 0, -1, 0, height);
                            break;
                        case 5:
                            ctx.transform(0, 1, 1, 0, 0, 0);
                            break;
                        case 6:
                            ctx.transform(0, 1, -1, 0, height, 0);
                            break;
                        case 7:
                            ctx.transform(0, -1, -1, 0, height, width);
                            break;
                        case 8:
                            ctx.transform(0, -1, 1, 0, 0, width);
                            break;
                        default:
                            ctx.transform(1, 0, 0, 1, 0, 0);
                    }

                    // draw image
                    ctx.drawImage(img, 0, 0);

                    // export base64
                    callback(canvas.toDataURL());
                };
                img.src = srcBase64;
            }

            $('.image-uploaded').on('listImgAdded', function() {
                $('.dropBlock-plus-left').hide();
                $('.dropBlock-plus-right').hide();
            });

            $('body').on('click', 'i.remove-upload-image' ,function(e) {
                e.preventDefault();
                if ($('.success-img').length != 1){
                    //do nothing
                }else{
                    $('.dropBlock-plus-left').show();
                    $('.dropBlock-plus-right').show();
                }
            });

            if ($("#image-drop-zone").length > 0) {
                var dropZone = document.getElementById('image-drop-zone'),
                    fileField = $('.vehicle-upload-files');
                var maxUpload = 0;
                if ($("body").find("#vehicleForm").length || $("#assetSellingForm").length > 0 || $("#placeOrderForm").length > 0) {
                    maxUpload = ACC.astra.c2cimgUploadlimit;
                }
                var startUpload = function(files, target) {                	
                    var files_upload = target;
                    $(".dropBlockWrapper .help-block ol").empty();
                    var previewChild = $(files_upload).parents(".dropBlockWrapper").find('.image-uploaded').find(".success-img"),
                        availSpace = maxUpload - previewChild.length;
                    if (fileValidation(files, availSpace) && availSpace > 0) {
                        $("#car-loader").css("display", "flex");

                        // START JS FUNCTION FOR MULTIPLE-SINGLE IMAGE UPLOAD SEPARATION. multiple.upload.enabled
                        if($('#isMultipleImage').val() === 'false') {
                            var imageSelect = $(files_upload).parents(".dropBlockWrapper").find(".dropBlock .vehicle-upload-files").hide(),
                                filesUpload = files[0],
                                reader = new FileReader();
                            reader.onload = function(e) {
                                var listitem = $(files_upload).parents(".dropBlockWrapper").find('.cloned-li-element').clone();

                                listitem.addClass("success-img");
                                $(listitem).find("img").attr("src", e.target.result);
                                $(files_upload).parents(".dropBlockWrapper").find('.image-uploaded').append(listitem);
                                listitem.removeClass("hide cloned-li-element");
                                listitem.append(imageSelect).trigger('listImgAdded');
                                $('.image-uploaded .add-more-img').remove();
                                if($('.image-uploaded .success-img').length < maxUpload) {
                                    $('.image-uploaded').append($('.add-more-img').last().clone());
                                    $('.image-uploaded .add-more-img').show();
                                }
                                if (previewChild.length > 0) {
                                    _self.countImg = previewChild.length;
                                }
                                $(listitem).find("input[type='file']").attr("id", "vehicle-upload" + _self.countImg++);
                                $(".dropBlockWrapper .help-block ol").empty(); //removing the error msg
                            };
                            reader.readAsDataURL(filesUpload);

                            if ($(files_upload).parents(".accordionContent").hasClass("collapse-TRADEIN_CASH")) {
                                $(files_upload).parents(".dropBlockWrapper").find(".dropBlock .fileContainer").append("<input type='file' name='tradeInCashVehicle.files' class='vehicle-upload-files'/>");
                            } else if ($(files_upload).parents(".accordionContent").hasClass("collapse-TRADEIN_CREDIT")) {
                                $(files_upload).parents(".dropBlockWrapper").find(".dropBlock .fileContainer").append("<input type='file' name='tradeInCreditVehicle.files' class='vehicle-upload-files'/>");
                            } else {
                                $(files_upload).parents(".dropBlockWrapper").find(".dropBlock .fileContainer").append("<input type='file' name='files' class='vehicle-upload-files'/>");
                            }
                        }
                        else {
                            var i;
                            for(i=0;i<files.length;i++){
                                setupReader(files[i]);
                            }
                            function setupReader(file){
                                var imageSelect = $(files_upload).parents(".dropBlockWrapper").find(".dropBlock .vehicle-upload-files").hide(),
                                    filesUpload = file,
                                    reader = new FileReader();
                                reader.readAsDataURL(filesUpload);
                                reader.onload = function() {
                                    EXIF.getData(filesUpload, function () {
                                        var orientation = EXIF.getTag(this, "Orientation");
                                        resetOrientation(reader.result, orientation, function (image) {
                                            var listitem = $(files_upload).parents(".dropBlockWrapper").find('.cloned-li-element').clone();
                                            listitem.addClass("success-img");
                                            $(listitem).find(".deleted-name").val(file.name);
                                            $(listitem).find("img").attr("src", image);
                                            $(files_upload).parents(".dropBlockWrapper").find('.image-uploaded').append(listitem);
                                            listitem.removeClass("hide cloned-li-element");
                                            if (($(files_upload).parents(".accordionContent").hasClass("collapse-TRADEIN_CASH"))||($(files_upload).parents(".accordionContent").hasClass("collapse-TRADEIN_CREDIT"))) {
                                                listitem.append(imageSelect);
                                            }
                                            else{
                                                $('.list-storage').append(imageSelect);
                                            }
                                            //$(files_upload).parents(".dropBlockWrapper").find(".dropBlock .fileContainer").append("<input type='file' name='files' multiple='multiple' class='vehicle-upload-files'/>");
                                            $('.image-uploaded .add-more-img').remove();
                                            if($('.image-uploaded .success-img').length < maxUpload) {
                                                $('.image-uploaded').append($('.add-more-img').last().clone());
                                                $('.image-uploaded .add-more-img').show();
                                            }
                                            if (previewChild.length > 0) {
                                                _self.countImg = previewChild.length;
                                            }
                                            $(listitem).find("input[type='file']").attr("id", "vehicle-upload" + _self.countImg++);
                                            //$(".dropBlockWrapper .help-block ol").empty(); //removing the error msg
                                        });
                                    });
                                };
                                if ($(files_upload).parents(".accordionContent").hasClass("collapse-TRADEIN_CASH")) {
                                    $(files_upload).parents(".dropBlockWrapper").find(".dropBlock .fileContainer").append("<input type='file' name='tradeInCashVehicle.files' class='vehicle-upload-files'/>");
                                } else if ($(files_upload).parents(".accordionContent").hasClass("collapse-TRADEIN_CREDIT")) {
                                    $(files_upload).parents(".dropBlockWrapper").find(".dropBlock .fileContainer").append("<input type='file' name='tradeInCreditVehicle.files' class='vehicle-upload-files'/>");
                                }
                                else {
                                    $(files_upload).parents(".dropBlockWrapper").find(".dropBlock .fileContainer").append("<input type='file' name='files' multiple='multiple' class='vehicle-upload-files'/>");
                                }
                            }
                        }
                        //END OF SECTION SEPARATING MULTIPLE-SINGLE UPLOAD. multiple.upload,enabled
                    }
                };

                var fileValidation = function(files, availSpace) {
                    var isValid = true,
                        errorMsg = '',
                        allowedExtensions = /(\jpg|\jpeg|\png)$/i;
                        for(i=0;i<files.length;i++){
                        filesUpload = files[i];
                        
                    var filename = filesUpload.name.split('.').slice(0, -1).join('.').length;
                    //console.log("filename", filename);
  //                  for(i=0;i<files.length;i++){ 
                    if ((files && files[i])) {
                        var type = files[i].type,
                            size = files[i].size,
                            allowedFileSize = 20971520; //20MB
                        //check for image type
                        if (!allowedExtensions.exec(type)) {
                            errorMsg += "<li>Upload image of type png, jpg or jpeg</li>";
                            isValid = false;   
                            break;
                        }
                        //check for file size
                        if (size > allowedFileSize) {
                            errorMsg += "<li>Maksimum ukuran file 20MB</li>";
                            isValid = false;
                        }
                        //check for files length
                        if (files.length > maxUpload || availSpace == 0 || files.length > availSpace) {
                        	if ($('html').is(':lang(en)')) {
                        		errorMsg += "<li>maximum " + maxUpload + " images can be upload.</li>";
                        	}else{
                        		errorMsg += "<li>Maksimum " + maxUpload + " gambar dapat diunggah.</li>";                        		 
                        	}                            
                            isValid = false;     
                            break;
                        }

                        //check for filename length
                        if (filename > ACC.astra.c2cimgfilename) {
                            errorMsg += "<li>" + $(".filename-length-error").html() + "</li>";
                            isValid = false;
                            break;
                           //$('.image-uploaded .add-more-img').hide();                            
                        }                        

                    	}
                   // }
                  }
                    if (errorMsg != '') {
                        $(".dropBlockWrapper .help-block .hints").html(errorMsg);
                        $(".dropBlockWrapper .dropBlock input").val(""); //reseting the file object on error case                        
                    }
                    return isValid;
                };

                $(document).on('change', '.vehicle-upload-files', function(e) {
                    var uploadFiles = e.target.files;
                    e.preventDefault();
                    startUpload(uploadFiles, e.target);
                });

                $(document).on('click', '.add-more-img', function(e) {
                    $('.vehicle-upload-files').first().click();
                });
                
                dropZone.ondrop = function(e) {
                    //e.preventDefault();
                    //this.className = 'dropBlock';
                    //startUpload(e.dataTransfer.files,e.target);
                	this.className = 'dropBlock';
                    var data = e.dataTransfer.files;
                    startUpload(data,$(e.target).find('.vehicle-upload-files')[0]);
                };
                dropZone.ondragover = function() {
                    this.className = 'dropBlock drop';                    
                    return false;
                };

                dropZone.ondragleave = function() {
                    this.className = 'dropBlock';                   
                    return false;
                };
                $('body').on('click', 'i.remove-upload-image', function(e) {
                    e.preventDefault();
                   
                    var $img = $(this).closest('li');                                        
                    $img.find("img").remove();
                    $img.removeAttr('class');
                    var vOpValue = $img.find(".operation-value").val();
                    if (vOpValue === "1") {
                    	var name = $img.find('.deleted-name').val();                                             
                        deletearray.push(name);
                        $img.remove();
                        if($('.image-uploaded .add-more-img').length == 0 && $('.image-uploaded .success-img').length > 0)  {
                            $('.image-uploaded').append($('.add-more-img').last().clone());
                        	$('.image-uploaded .add-more-img').show();
                        }
                        else if($('.image-uploaded .success-img').length ==0)
                    	{
                        	$('.image-uploaded .add-more-img').hide();
                    	}
                    } else {
                        $img.find(".operation-value").val("0");
                        $img.hide();
                        $(this).remove();
                        $("#image-drop-zone").show();
                        if($('.image-uploaded .add-more-img').length == 0 && $('.image-uploaded .success-img').length > 0)  {
                            $('.image-uploaded').append($('.add-more-img').last().clone());
                        	$('.image-uploaded .add-more-img').show();
                        }
                        else if($('.image-uploaded .success-img').length ==0)
                    	{
                        	$('.image-uploaded .add-more-img').hide();
                    	}
                    }

                });                

            }
        },
        // Fetch Holiday dates for Branch
        fetchHolidayDatesForBranch: function() {
            var fetchHolidayDates = function(branchCode) {
                if (branchCode) {
                    $.ajax({
                        url: ACC.config.contextPath + '/sevaservice/fetch-holidays',
                        type: 'GET',
                        data: {
                            'branchCode': branchCode,
                        },
                        success: function(data) {
                            console.log(data);

                            function formatDate(dates) {
                                var a = dates;
                                var b = [];
                                var d = new Date();
                                for (var i = 0; i < dates.length; i++) {
                                    d = new Date(a[i]);
                                    var month = (d.getMonth() + 1),
                                        day = '' + d.getDate(),
                                        year = d.getFullYear();
                                    if (month.length < 2) month = '0' + month;
                                    if (day.length < 2) day = '0' + day;
                                    var result = [day, month, year].join('-');
                                    b.push(result);
                                }
                                console.log(b);
                                return b;
                            }

                            if ($('#test-drive-date').length > 0 || $("#dob-datepicker input").length > 0) {
                                var $input = $('#test-drive-date input, #dob-datepicker input');
                                var date = new Date();
                                var currentMonth = date.getMonth();
                                var currentDate = date.getDate();
                                var currentYear = date.getFullYear();
                                var monthCount = $("#holidateCalendarMonthCount").val();
                                $input.datepicker('destroy');
                                $input.datepicker({
                                    format: 'dd-mm-yyyy',
                                    autoclose: true,
                                    startDate: $input.attr("minDate") == "today" ? new Date() : "+1d" ,
                                    endDate: "+" + monthCount + "m",
                                    datesDisabled: data.length > 0 ? formatDate(data) : '',
                                }).on("changeDate", function() {
                                    $(this).removeClass("error");
                                    $(this).parents(".form-group").find("label.error").remove();
                                });
                            }

                            $("#bookServiceForm #dob-datepicker input, #bookServiceForm .timeWrapper select").prop("disabled", false);
                            $("#testDriveForm #test-drive-date input, #testDriveForm .timeWrapper select").prop("disabled", false);
                        },
                        error: function(result) {
                            //Need to add code
                        }
                    });
                }
            };

            $('.service-branchlocation #branch, .testdrive-branchlocation [name=branch]').on("select2:select", function() {
                fetchHolidayDates($(this).val());
            });

            $('#bookingType').on("select2:select", function() {
                if ($(this).val().indexOf("Branch") != -1) {
                    $("#bookServiceForm #dob-datepicker input, #bookServiceForm .timeWrapper select").prop("disabled", true);
                } else {
                    $("#bookServiceForm #dob-datepicker input, #bookServiceForm .timeWrapper select").prop("disabled", false);
                }

                if ($(this).val().toLowerCase().indexOf("home") != -1) {
                    var $inputDate = $('#dob-datepicker input');
                    $inputDate.datepicker('destroy');
                    datePicker($inputDate);
                }
            });

            if ($('#dob-datepicker').length > 0) {
                var $input = $('#dob-datepicker input');
                datePicker($input);
            }

            $('#testDriveForm [name="testDriveAt"]').on("select2:select", function() {
                //console.log($(this).val());
                if ($(this).val().indexOf("BRANCH") != -1) {
                    $("#testDriveForm #test-drive-date input, #testDriveForm .timeWrapper select").prop("disabled", true);
                } else {
                    $("#testDriveForm #test-drive-date input, #testDriveForm .timeWrapper select").prop("disabled", false);
                }

                if ($(this).val().toLowerCase().indexOf("home") != -1) {
                    var $inputDate = $('#test-drive-date input');
                    $inputDate.datepicker('destroy');
                    datePicker($inputDate);
                }
            });

            if ($('#test-drive-date').length > 0) {
                var $input = $('#test-drive-date input');
                datePicker($input);
            }

            /*$("#myVehicleModal .close-vehicle-popup").on("click", function(){
                $("#bookServiceForm").submit();
                $('#bookServiceForm #bookingType').val('').trigger('change');
                $('#bookServiceForm #callTime').val('').trigger('change');
            });*/

            $('a.order_status_link').on("click", function() {
                $('html, body').animate({
                    scrollTop: $($(this).attr('href')).offset().top
                }, 500);
                return false;
            });
        },
        myVehicle: function(e) {
            if ($("#myVehicleModal .modal-body").find(".vehicle-section").length) {
                if ($("#myVehicleModal .modal-body").find(".vehicle-section").html().trim() == "") {
                    $("#myVehicleModal .modal-body").find("#emptyVehicleList").removeClass("hide");
                    $("#myVehicleModal .modal-footer").find(".__button-holder button[type='submit']").addClass("hide");
                    $("#myVehicleModal .modal-footer").find(".__button-holder button[type='button']").removeClass("hide");
                } else {
                    $("#myVehicleModal .modal-footer").find(".__button-holder button[type='submit']").removeClass("hide");
                    $("#myVehicleModal .modal-footer").find(".__button-holder button[type='button']").addClass("hide");
                }
            }

            function test(thisID) {


                var slider = $('.vehicle-section');

                if (slider.hasClass('slick-initialized')) {
                    slider.slick('unslick');
                }

                /* if ($(window).width() >= '769') { */
                var divs = thisID.find('.vehicle-section > .automation-myvehicle-item');
                var __length = thisID.find('.automation-myvehicle-item').length;
                // $(".automation-myvehicle-item:nth-child(3n+1)").addClass("active");

                for (var i = 0; i < __length; i += 4) {
                    divs.slice(i, i + 4).wrapAll("<div class='vehicle-section__list__group'><div class='d-flex'></div></div>");
                }

                slider.slick({
                    dots: true,
                    infinite: false,
                    loop: false,
                    slidesToShow: 1,
                    draggable: true,
                    slidesToScroll: 1
                });


                /* }  else {
                 
                     if($('.vehicle-section__list__group').length>0 ){          
                         $('.vehicle-section__list__group > .d-flex').unwrap(); 
                         $('.automation-myvehicle-item').unwrap();
                         
                    }
                    slider.slick('unslick');
                    /*  slider.slick({
                         dots: true,
                         infinite: true,
                         slidesToShow: 1,
                         slidesToScroll: 1
                     }); 

                 } */
            }

            $('#myVehicleModal').on('shown.bs.modal', function() {
                test($(this));
                if ($(".slick-dots li").length <= 1) {
                    $('.slick-dots').css('display', 'none');
                }
            });



            function searchQuery() {
                var brandValue = $("#brandSearch").val();
                var vehicleValue = $("#vehicleSearch").val();
                var vehicleType = $("#vehicleType").val();
                var searchQuery = ':relevance';
                if (vehicleType.toLowerCase() == "used" || vehicleType.toLowerCase() == "bekas") {
                    searchQuery = searchQuery + ':isUsedCar:true';
                }
                if (vehicleValue.trim() != "All Types" && vehicleValue.trim() != "Semua Tipe") {
                    searchQuery = searchQuery + ':category:' + vehicleValue;
                }
                if (brandValue.trim() != "Brand" && brandValue.trim() != "Merek") {
                    searchQuery = searchQuery + ':brand:' + brandValue;
                }
                return searchQuery;
            }

            var getBrand_vehicle = function() {
                searchQuery();
                $("#brandSearch").find('option').not(':first').remove();
                $.ajax({
                    url: ACC.config.contextPath + '/view/AstraAutoFacetVehicleSearchComponentController/getDependentFacet',
                    type: 'GET',
                    data: {
                        'q': searchQuery,
                        'lang': ACC.config.lang
                    },
                    success: function(data) {

                        for (var i = 0; i < data.brand.length; i++) {
                            if (data.brand[i].name != "USEDCARBRAND" && data.brand[i].name != "BRAND") {
                                $("<option />", {
                                    "value": data.brand[i].code,
                                    "text": data.brand[i].name
                                }).appendTo("#brandSearch");
                            }
                        }
                        for (var i = 0; i < data.model.length; i++) {
                            if (data.model[i].name != "MODEL") {
                                $("<option />", {
                                    "value": data.model[i].code,
                                    "text": data.model[i].name
                                }).appendTo("#modelSearch");
                            }
                        }
                    },
                    error: function(result) {
                        $("#server_error").show();
                    }
                });
            };

            var getModel_vehicleBrand = function() {
                searchQuery();
                $("#modelSearch").find('option').not(':first').remove();
                $.ajax({
                    url: ACC.config.contextPath + '/view/AstraAutoFacetVehicleSearchComponentController/getDependentFacet',
                    type: 'GET',
                    data: {
                        'q': searchQuery,
                        'lang': ACC.config.lang
                    },
                    success: function(data) {
                        for (var i = 0; i < data.model.length; i++) {
                            $("<option />", {
                                "value": data.model[i].code,
                                "text": data.model[i].name
                            }).appendTo("#modelSearch");
                        }
                    },
                    error: function(result) {
                        $("#server_error").show();
                    }
                });
            };

            var getModel_usedVehicleCategory = function() {
                searchQuery();
                $("#vehicleSearch").find('option').not(':first').remove();
                $.ajax({
                    url: ACC.config.contextPath + '/view/AstraAutoFacetVehicleSearchComponentController/getDependentFacet',
                    type: 'GET',
                    data: {
                        'q': searchQuery,
                        'lang': ACC.config.lang
                    },
                    success: function(data) {
                        $(".price .container").addClass("loader");
                        for (var i = 0; i < data.price.length; i++) {
                            $("<option />", {
                                "value": data.price[i].code,
                                "text": data.price[i].name
                            }).appendTo("#priceSearch");
                        }
                        for (var i = 0; i < data.category.length; i++) {
                            if (data.category[i].name != "USEDCARTYPE") {
                                $("<option />", {
                                    "value": data.category[i].code,
                                    "text": data.category[i].name
                                }).appendTo("#vehicleSearch");
                            }
                        }
                        for (var i = 0; i < data.brand.length; i++) {
                            if (data.brand[i].name != "USEDCARBRAND" && data.brand[i].name != "BRAND") {
                                $("<option />", {
                                    "value": data.brand[i].code,
                                    "text": data.brand[i].name
                                }).appendTo("#brandSearch");
                            }
                        }
                        for (var i = 0; i < data.model.length; i++) {
                            $("<option />", {
                                "value": data.model[i].code,
                                "text": data.model[i].name
                            }).appendTo("#modelSearch");
                        }
                        $(".price .container").removeClass("loader");
                    },
                    error: function(result) {
                        $("#server_error").show();
                    }
                });
            };


            $('#vehicleType').on('change', function() {
                $("#brandSearch").find('option').not(':first').remove();
                $("#vehicleSearch").find('option').not(':first').remove();
                $("#modelSearch").find('option').not(':first').remove();
                $("#priceSearch").find('option').not(':first').remove();
                getModel_usedVehicleCategory();
            });

            if ($('#vehicleSearch').length > 0) {
                $('#vehicleSearch').on('change', function() {
                    $("#brandSearch").find('option').not(':first').remove();
                    $("#modelSearch").find('option').not(':first').remove();
                    getBrand_vehicle($(this).val());
                });
            }

            if ($('#brandSearch').length > 0) {
                $('#brandSearch').on('change', function() {
                    $("#modelSearch").find('option').not(':first').remove();
                    getModel_vehicleBrand();
                });
            }

            if ($('#searchVehicleComponent').length > 0) {
                $('#searchVehicleComponent').on('click', function() {

                    var vehicleType = $("#vehicleType").val(),
                        priceValue = $("#priceSearch").val(),
                        brandValue = $("#brandSearch").val(),
                        vehicleValue = $("#vehicleSearch").val(),
                        modelValue = $("#modelSearch").val(),
                        queryString = "q=%3Arelevance",
                        urlPath = "";

                    if (priceValue != "" && priceValue.toLowerCase() != 'price' && priceValue.toLowerCase() != 'harga') {
                        queryString += "%3Aprice%3A" + priceValue;
                    }
                    if (brandValue != "" && brandValue.toLowerCase() != 'brand' && brandValue.toLowerCase() != 'merek') {
                        queryString += "%3Abrand%3A" + brandValue;
                    }
                    if (modelValue != "" && modelValue.toLowerCase() != 'model') {
                        queryString += "%3Amodel%3A" + modelValue;
                    }
                    if (vehicleValue != "" && vehicleValue.toLowerCase() != 'all types' && vehicleValue.trim() != 'Semua Tipe') {
                        queryString += "%3Acategory%3A" + vehicleValue;
                    }
                    if (vehicleType != "" && vehicleType.toLowerCase() != 'used' && vehicleType.toLowerCase() != "bekas") {
                        urlpath = ACC.config.encodedContextPath + "/c/TYPE?" + queryString;
                    } else {
                        urlpath = ACC.config.encodedContextPath + "/c/USEDCARTYPE?" + queryString;
                    }
                    //  var redirectURL = document.URL;
                    // redirectURL = redirectURL.split('?');
                    //redirectURL = redirectURL[0];
                    //var url2 = "c/TYPE?" + queryString;
                    //var url = redirectURL + url2;

                    // window.location.href = url;
                    window.location.href = urlpath;
                });

            }

            $("#change_phone_number").on("blur", function() {
                var phoneText = $(this).val();
                if ($.trim(phoneText).length == 0) {
                    $("#submit_mobile").attr('disabled', 'disabled');
                    $(this).addClass("show-error");
                    $("#errorMessage").addClass("show-error");
                    return false;
                }
                if (astra.global.validatePhone(phoneText)) {
                    $("#submit_mobile").removeAttr('disabled');
                    $(this).removeClass("show-error");
                    $("#errorMessage").removeClass("show-error");
                    return true;
                } else {
                    $("#submit_mobile").attr('disabled', 'disabled');
                    $(this).addClass("show-error");
                    $("#errorMessage").addClass("show-error");
                    return false;
                }
            });

            $('#submit_mobile').click(function() {
                $("#server_error").hide();
                $("#invalid_otp").hide();
                $(".otp-popup-input-value").val("");

                sendOTP($('#change_phone_number').val(), $("#isdCode").attr('placeholder'));
            });

            $('#verify_otp').click(function() {


                verifyOTP($('#change_phone_number').val(),$("#isdCode").attr('placeholder'),$('#otp').val(),function(data){
                    if (data.toLowerCase().indexOf("invalid") !== -1 || data.toLowerCase().indexOf("not valid") !== -1 || data.toLowerCase().indexOf("expired") !== -1) {
                        $("#server_error").hide();
                        $("#invalid_otp").show();

                    } else {
                        $("#server_error").hide();
                        $("#invalid_otp").hide();
                        $('#otp-popup-Modal').modal('hide');
                        $('#success-message').addClass('show-error');
                    }

                },function(error){
                            		$("#server_error").show();
                            	});
            });

            $(".vehicle-info").on('click', function() {
                $(".vehicle-info").removeClass('selected');
                $(this).addClass('selected');
            });

            $('.js-address-select-province').on("change", function() {
                var options = {
                    'regionIsoCode': $(this).val()
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/ajax/address/json/get-cities',
                    async: false,
                    data: options,
                    type: 'GET',
                    success: function(response) {
                        var villageList = $('.js-address-select-village');
                        villageList.empty();
                        var districtList = $('.js-address-select-district');
                        districtList.empty();
                        var cityList = $('.js-address-select-city');
                        cityList.empty();
                        cityList.append($("<option value=''></option>").text(""));
                        $.each(response, function(key, value) {
                            cityList.append($("<option></option>").attr("value", value.isocode)
                                .attr("id", value.isocode).text(value.name));
                        });
                        //  $(".js-address-select-city").select2("destroy");
                        $('.js-address-select-city').select2({
                            dropdownParent: $('.js-address-select-city').parent()
                        });
                    }
                });
            });


            $('.js-address-select-city').on("change", function() {
                var options = {
                    'cityCode': $(this).val()
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/ajax/address/json/get-districts',
                    async: false,
                    data: options,
                    type: 'GET',
                    success: function(response) {
                        var villageList = $('.js-address-select-village');
                        villageList.empty();
                        var districtList = $('.js-address-select-district');
                        districtList.empty();
                        districtList.append($("<option value=''></option>").text(""));
                        $.each(response, function(key, value) {
                            districtList.append($("<option></option>").attr("value", value.isocode)
                                .attr("id", value.isocode).text(value.name));
                        });
                        //$(".js-address-select-district").select2("destroy");
                        $('.js-address-select-district').select2({
                            dropdownParent: $('.js-address-select-district').parent()
                        });
                    }
                });
            });

            $('.js-address-select-district').on("change", function() {
                var options = {
                    'districtCode': $(this).val()
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/ajax/address/json/get-villages',
                    async: false,
                    data: options,
                    type: 'GET',
                    success: function(response) {

                        var villageList = $('.js-address-select-village');
                        villageList.empty();
                        villageList.append($("<option value=''></option>").text(""));
                        $.each(response, function(key, value) {
                            villageList.append($("<option></option>").attr("value", value.isocode)
                                .attr("id", value.isocode).text(value.name));
                        });
                        //$(".js-address-select-village").select2("destroy");
                        $('.js-select2-title-village').select2({
                            dropdownParent: $('.js-select2-title-village').parent()
                        });

                    }
                });
            });

            //-----Service History Select Box-----//

            $('.vehicle-selectbox').click(function() {
                $(this).toggleClass('open');
            });
            $('.vehicle-dropdown__list').click(function() {
                var selText = $(this).find('.vehicle-dropdown__name').text();
                $('.vehicle-selectbox').html(selText).removeClass('open');
            });

            //My Vehicles Page - Remove Vehicle Popup
            $('.vehicle__remove').colorbox({
                className: 'vehicle__remove-popup',
                closeButton: true,
                height: '340px',
                inline: true,
                width: $(window).width() < 480 ? $(window).width() - 30 : '420px',
                onComplete: function() {
                    $('#colorbox .btn-outline-dark').click(function() {
                        $('#colorbox').colorbox.close();
                    });
                    $(window).resize(function() {
                        var Cwidth = '420px';
                        if ($(window).width() < 480) {
                            Cwidth = $(window).width() - 40;
                        }
                        $('.vehicle__remove').colorbox.resize({
                            width: Cwidth,
                            height: '340px',
                        });
                    });
                }
            });

            // Branch Service History
            var recrdsPerPage = 8;

            if ($('.vehicle__full-details').length) {
                $(".pagination-next").addClass('disabled');
                var options = {
                	'equipmentNo': $('#vChasisNumber').val(),
                     'brand': $('#vBrandName').val(),
                    'currentPageNo': '1',
                    'recordsPerPage': recrdsPerPage
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/my-account/getdmsResponse',
                    async: true,
                    data: options,
                    type: 'GET',
                    success: function(response) {
                        if (response.serviceHistory != null) {
                            var contentDiv = '<div id="contentTableDiv">';
                            $.each(response.serviceHistory, function(key, value) {
                                contentDiv += '<div class="vehicle-table--row"> <div data-label="Type" class="vehicle-table--col vehicle-table--type">' + value.branchDescription + '</div><div data-label="Scheduled Date" class="vehicle-table--col vehicle-table--date">' + dateFormatFunction(value.pkbDate) + '</div><div data-label="Maintenance Type" class="vehicle-table--col vehicle-table--maintenance">' + value.operationDetail + '</div><div data-label="Status" class="vehicle-table--col vehicle-table--status">Complete</div><div data-label="Parts" class="vehicle-table--col vehicle-table--feedback">' + value.materialDetail + '</div></div>';
                            });
                            $('#vehicle-table--rows').html(contentDiv).removeClass("content-loader");
                            $('#pageValue').val(1);
                            if (response.serviceHistory.length < recrdsPerPage) {
                                $(".pagination-next").addClass('disabled');
                            } else {
                                $(".pagination-next").removeClass('disabled');
                            }
                            if (response.serviceHistory.length === 0) {
                                $('#vehicle-table--rows').html("No Record Found");
                            }
                        } else {
                            $('#vehicle-table--rows').html("No Record Found").removeClass("content-loader");
                            $(".pagination-next").addClass('disabled');
                        }

                        if (response.isSuccess === false) {
                            $('#vehicle-table--rows').html("Service Down");
                        }

                    }
                });
            }


            $(".pagination-next").on("click", function(e) {

                var getCurrentPage = $('#pageValue').val();
                var nextPageVal = +getCurrentPage + +1;

                var options = {
                	'equipmentNo': $('#vChasisNumber').val(),
                     'brand': $('#vBrandName').val(),
                    'currentPageNo': nextPageVal,
                    'recordsPerPage': recrdsPerPage
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/my-account/getdmsResponse',
                    async: true,
                    data: options,
                    type: 'GET',
                    success: function(response) {
                        if (response.serviceHistory != null) {
                            var contentDiv = '<div id="contentTableDiv">';
                            $.each(response.serviceHistory, function(key, value) {
                                contentDiv += '<div class="vehicle-table--row"> <div data-label="Type" class="vehicle-table--col vehicle-table--type">' + value.branchDescription + '</div><div data-label="Scheduled Date" class="vehicle-table--col vehicle-table--date">' + dateFormatFunction(value.pkbDate) + '</div><div data-label="Maintenance Type" class="vehicle-table--col vehicle-table--maintenance">' + value.operationDetail + '</div><div data-label="Status" class="vehicle-table--col vehicle-table--status">Complete</div><div data-label="Parts" class="vehicle-table--col vehicle-table--feedback">' + value.materialDetail + '</div></div>';
                            });
                            $('#vehicle-table--rows').html(contentDiv);
                            $('#pageValue').val(nextPageVal);
                            $(".pagination-prev").removeClass('disabled');
                            if (response.serviceHistory.length < recrdsPerPage) {
                                $(".pagination-next").addClass('disabled');
                            }
                            if (response.serviceHistory.length === 0) {
                                $('#vehicle-table--rows').html("No Record Found");
                            }
                        } else {
                            $('#vehicle-table--rows').html("Service Down");
                            $(".pagination-next").addClass('disabled');
                        }

                    }
                });
            });

            $(".pagination-prev").on("click", function(e) {

                var getCurrentPage = $('#pageValue').val();
                var nextPageVal = +getCurrentPage - +1;

                var options = {
                	'equipmentNo': $('#vChasisNumber').val(),
                    'brand': $('#vBrandName').val(),
                    'currentPageNo': nextPageVal,
                    'recordsPerPage': recrdsPerPage
                };
                $.ajax({
                    url: ACC.config.encodedContextPath + '/my-account/getdmsResponse',
                    async: true,
                    data: options,
                    type: 'GET',
                    success: function(response) {
                        if (response.serviceHistory != null) {
                            var contentDiv = '<div id="contentTableDiv">';
                            $.each(response.serviceHistory, function(key, value) {
                                contentDiv += '<div class="vehicle-table--row"> <div data-label="Type" class="vehicle-table--col vehicle-table--type">' + value.branchDescription + '</div><div data-label="Scheduled Date" class="vehicle-table--col vehicle-table--date">' + dateFormatFunction(value.pkbDate) + '</div><div data-label="Maintenance Type" class="vehicle-table--col vehicle-table--maintenance">' + value.operationDetail + '</div><div data-label="Status" class="vehicle-table--col vehicle-table--status">Complete</div><div data-label="Parts" class="vehicle-table--col vehicle-table--feedback">' + value.materialDetail + '</div></div>';
                            });
                            $('#vehicle-table--rows').html(contentDiv);
                            $('#pageValue').val(nextPageVal);
                            $(".pagination-next").removeClass('disabled');
                            if (nextPageVal === 1) {
                                $(".pagination-prev").addClass('disabled');
                            }
                            if (response.serviceHistory.length === 0) {
                                $('#vehicle-table--rows').html("No Record Found");
                            }
                        } else {
                            $('#vehicle-table--rows').html("Service Down");
                        }

                    }
                });
            });

            $("body").on("click", function(e) {
                if ($(".vehicle-table--parts_more").length && e.target.className != "link--gray") {
                    $(".vehicle-table--parts_more").addClass("hide");
                }
            });
            $(".vehicle-table--parts .link--gray").on("click", function() {
                $(this).next().toggleClass("hide");
            })

            var $selectedVehicle = $("#astra-selected-vehicle").val();

            $(".automation-myvehicle-item").each(function() {
                var $tobeSelect = $(this).find(".select-my-vehicle").val();
                if ($selectedVehicle == $tobeSelect) {
                    $(this).find(".vehicle-info").addClass("selected");
                }
            });

        },
        plp: function() {
            var facetValArray = [];
            var queryArray = [];
            var sortKey = "";
            var redirectURL = document.URL;
            var qPrice = "";
            var qDistance = "";
            var dataTab;
            var selectArray = [];
            var minYear = "";
            var maxYear = "";
            var width;

            // slider range for desktop
            if (windowWidth > 1023){
                // var for slider range
                var $sliderPrice = $("#sliderPrice"),
                    $sliderDistance = $("#sliderDistance"),
                    priceMin = $('#minPrice').val(),
                    priceMax = $('#maxPrice').val(),
                    distanceMin = $('#minDistance').val(),
                    distanceMax = $('#maxDistance').val(),
                    priceMaxExtend =  parseInt($('.maxPriceData').val()) + 10000000,
                    distanceMaxExtend =  parseInt($('.maxDistanceData').val()) + 1000,
                    stepPrice = parseInt($("#stepPrice").val()), stepKilometer = parseInt($("#stepKilometer").val()),
                    priceMaxFinal, distanceMaxFinal, numberPrice, numberDistance, stringPrice, stringDistance;
                //end var for slider range

                if(priceMax==""){
                    priceMaxFinal = priceMaxExtend;
                }else{
                    priceMaxFinal = priceMax;
                }

                if(distanceMax==""){
                    distanceMaxFinal = distanceMaxExtend;
                }else{
                    distanceMaxFinal = distanceMax;
                }

                $sliderPrice.slider({
                    range: true,
                    min: 0,
                    max: priceMaxExtend,
                    step: stepPrice,
                    values: [priceMin, priceMaxFinal],
                    slide: function(event, ui) {
                        $("#minPrice").val(ui.values[0]);
                        $("#maxPrice").val(ui.values[1]);
                        $("#minPriceFormat").val(formatNumber(ui.values[0]));
                        $("#maxPriceFormat").val(formatNumber(ui.values[1]));
                        $('#statusPriceExt').val(false);
                    },
                    change: function(event, ui) {
                        if ($('#minPrice').val() != "" && $('#maxPrice').val() != ""){
                            var max_price = parseInt($("#maxPrice").val());
                            var min_price = parseInt($("#minPrice").val());
                            var status = $("#statusPriceExt").val();
                            if(max_price==0){
                                $("#maxPrice").val(1);
                            }

                            if($('#year-filter-max').val() == null){
                                $('#form-price').find('input[name=minYear]').remove();
                                $('#form-price').find('input[name=maxYear]').remove();
                            }
                            if($('#maxDistance').val() === ""){
                                $('#form-price').find('input[name=minDistance]').remove();
                                $('#form-price').find('input[name=maxDistance]').remove();
                            }
                            $('input[name="qMobile"]').remove();

                            if (status !== true){
                                if(min_price < max_price){
                                    $('#validation-price').text("");
                                    $("#statusValidation").val("false");
                                    $('#form-price').submit();
                                }
                            }
                        }
                    }
                });

                $("#minPriceFormat").on({
                    keyup: function() {
                        if(formatCurrency($(this)) === ""){
                            $(this).val("");
                            numberPrice = "";
                            if($("#maxPriceFormat").val() === ""){
                                $("#minPrice").val("");
                                $sliderPrice.slider("values", 0, 0);
                            }
                        }else{
                            numberPrice = parseInt($(this).val().replace(/[^0-9]/g, ''));
                            var maxP = parseInt($("#maxPrice").val());
                            stringPrice = $(this).val().replace(/[^0-9]/g, '');
                            if($("#maxPriceFormat").val() !== ""){
                                if(isNaN(parseInt($("#minPrice").val()))){
                                    if(numberPrice < maxP){
                                        $sliderPrice.slider("values", 0, numberPrice);
                                        $sliderPrice.slider("values", 1, maxP);
                                    }else{
                                        $sliderPrice.slider("values", 0, maxP);
                                        $sliderPrice.slider("values", 1, maxP);
                                    }
                                }
                            }else{
                                $sliderPrice.slider("values", 0, numberPrice);
                                $sliderPrice.slider("values", 1, priceMaxFinal);
                            }
                            if(!textLength(stringPrice,"price")) {
                                $(".currencyMin").css("display","none");
                            }else{
                                $(".currencyMin").css("display","");
                            }
                        }
                    }
                });

                $("#minPriceFormat").change(function(){
                    if(numberPrice > priceMaxExtend){
                        numberPrice = priceMaxExtend-10000000;
                    }
                    $(this).val(formatNumber(numberPrice));
                    if(!textLength(stringPrice,"price")) {
                        $(".currencyMin").css("display","");
                    }
                    $("#minPrice").val(numberPrice);
                    $("#statusPriceExt").val(false);
                    if($("#maxPrice").val() != "") {
                        var max_price = parseInt($("#maxPrice").val());
                        var min_price = parseInt($("#minPrice").val());
                        if(min_price > max_price){
                            if($("#statusValidation").val() === "false") {
                                $sliderPrice.slider("values", 0, min_price);
                                $sliderPrice.slider("values", 1, min_price);
                                $('#validation-price').append("Harga maksimal tidak boleh lebih kecil dari harga minimal.");
                                $("#statusValidation").val("true");
                            }
                        }else{
                            $sliderPrice.slider("values", 0, min_price);
                            $sliderPrice.slider("values", 1, max_price);
                            $('#validation-price').text("");
                            $("#statusValidation").val("false");
                            $('#form-price').submit();
                        }
                    }
                });

                $("#maxPriceFormat").on({
                    keyup: function() {
                        if(formatCurrency($(this)) === ""){
                            $(this).val("");
                            numberPrice = "";
                            if($("#minPriceFormat").val() === ""){
                                $("#maxPrice").val("");
                                $sliderPrice.slider("values", 1, priceMaxFinal);
                            }
                        }else {
                            numberPrice = parseInt($(this).val().replace(/[^0-9]/g, ''));
                            var minP = parseInt($("#minPrice").val());
                            stringPrice = $(this).val().replace(/[^0-9]/g, '');
                            if($("#minPriceFormat").val() !== ""){
                                if(isNaN(parseInt($("#maxPrice").val()))) {
                                    if (numberPrice > minP) {
                                        $sliderPrice.slider("values", 0, minP);
                                        $sliderPrice.slider("values", 1, numberPrice);
                                    } else {
                                        $sliderPrice.slider("values", 0, minP);
                                        $sliderPrice.slider("values", 1, minP);
                                    }
                                }
                            }else{
                                $sliderPrice.slider("values", 0, priceMin);
                                $sliderPrice.slider("values", 1, numberPrice);
                            }
                            if (!textLength(stringPrice, "price")) {
                                $(".currencyMax").css("display", "none");
                            } else {
                                $(".currencyMax").css("display", "");
                            }
                        }
                    }
                });

                $("#maxPriceFormat").change(function(){
                    if(numberPrice > priceMaxExtend){
                        numberPrice = priceMaxExtend-10000000;
                    }
                    $(this).val(formatNumber(numberPrice));
                    if (!textLength(stringPrice, "price")) {
                        $(".currencyMax").css("display", "");
                    }
                    $("#maxPrice").val(numberPrice);
                    $("#statusPriceExt").val(false);
                    if($("#minPrice").val() != "") {
                        var max_price = parseInt($("#maxPrice").val());
                        var min_price = parseInt($("#minPrice").val());
                        if(min_price > max_price){
                            if($("#statusValidation").val() === "false") {
                                $sliderPrice.slider("values", 0, min_price);
                                $sliderPrice.slider("values", 1, min_price);
                                $('#validation-price').append("Harga maksimal tidak boleh lebih kecil dari harga minimal.");
                                $("#statusValidation").val("true");
                            }
                        }else{
                            $sliderPrice.slider("values", 0, min_price);
                            $sliderPrice.slider("values", 1, max_price);
                            $('#validation-price').text("");
                            $("#statusValidation").val("false");
                            $('#form-price').submit();
                        }
                    }
                });

                $sliderDistance.slider({
                    range: true,
                    min: 0,
                    max: distanceMaxExtend,
                    step: stepKilometer,
                    values: [distanceMin, distanceMaxFinal],
                    slide: function(event, ui) {
                        $("#minDistance").val(ui.values[0]);
                        $("#maxDistance").val(ui.values[1]);
                        $("#minDistanceFormat").val(formatNumber(ui.values[0]));
                        $("#maxDistanceFormat").val(formatNumber(ui.values[1]));
                        $('#statusDistanceExt').val(false);
                    },
                    change: function(event, ui) {
                        if ($('#minDistance').val() != "" && $('#maxDistance').val() != ""){
                            var max_distance = $("#maxDistance").val();
                            var min_distance = parseInt($("#minDistance").val());
                            var status = $("#statusDistanceExt").val();
                            if(max_distance==0){
                                $("#maxDistance").val(1);
                            }

                            if($('#year-filter-max').val() == null){
                                $('#form-distance').find('input[name=minYear]').remove();
                                $('#form-distance').find('input[name=maxYear]').remove();
                            }
                            if($('#maxPrice').val() === ""){
                                $('#form-distance').find('input[name=minPrices]').remove();
                                $('#form-distance').find('input[name=maxPrices]').remove();
                            }
                            $('input[name="qMobile"]').remove();

                            if (status !== true){
                                if(min_distance < max_distance){
                                    $('#validation-distance').text("");
                                    $("#statusValidation").val("false");
                                    $('#form-distance').submit();
                                }
                            }
                        }
                    }
                });

                $("#minDistanceFormat").on({
                    keyup: function() {
                        if(formatCurrency($(this)) === ""){
                            $(this).val("");
                            numberDistance = "";
                            if($("#maxDistanceFormat").val() === ""){
                                $("#minDistance").val("");
                                $sliderDistance.slider("values", 0, 0);
                            }
                        }else {
                            numberDistance = parseInt($(this).val().replace(/[^0-9]/g, ''));
                            var maxD = parseInt($("#maxDistance").val());
                            stringDistance = $(this).val().replace(/[^0-9]/g, '');
                            if($("#maxDistanceFormat").val() !== ""){
                                if(isNaN(parseInt($("#minDistance").val()))) {
                                    if (numberDistance < maxD) {
                                        $sliderDistance.slider("values", 0, numberDistance);
                                        $sliderDistance.slider("values", 1, maxD);
                                    } else {
                                        $sliderDistance.slider("values", 0, maxD);
                                        $sliderDistance.slider("values", 1, maxD);
                                    }
                                }
                            }else{
                                $sliderDistance.slider("values", 0, numberDistance);
                                $sliderDistance.slider("values", 1, distanceMaxFinal);
                            }
                            if (!textLength(stringDistance, "distance")) {
                                $(".minDistanceInput").css("display", "none");
                            } else {
                                $(".minDistanceInput").css("display", "");
                            }
                        }
                    }
                });

                $("#minDistanceFormat").change(function(){
                    if(numberDistance > distanceMaxExtend){
                        numberDistance = distanceMaxExtend-1000;
                    }
                    $(this).val(formatNumber(numberDistance));
                    if (!textLength(stringDistance, "distance")) {
                        $(".minDistanceInput").css("display", "");
                    }
                    $("#minDistance").val(numberDistance);
                    $('#statusDistanceExt').val(false);
                    if($("#maxDistance").val() != "") {
                        var max_distance = parseInt($("#maxDistance").val());
                        var min_distance = parseInt($("#minDistance").val());
                        if(min_distance > max_distance){
                            if($("#statusValidation").val() === "false"){
                                $sliderDistance.slider("values", 0, min_distance);
                                $sliderDistance.slider("values", 1, min_distance);
                                $('#validation-distance').append("Kilometer maksimal tidak boleh lebih kecil dari Kilometer minimal.");
                                $("#statusValidation").val("true");
                            }
                        }else {
                            $sliderDistance.slider("values", 0, min_distance);
                            $sliderDistance.slider("values", 1, max_distance);
                            $('#validation-distance').text("");
                            $("#statusValidation").val("false");
                            $('#form-distance').submit();
                        }
                    }
                });

                $("#maxDistanceFormat").on({
                    keyup: function() {
                        if(formatCurrency($(this)) === ""){
                            $(this).val("");
                            numberDistance = "";
                            if($("#minDistanceFormat").val() === ""){
                                $("#maxDistance").val("");
                                $sliderDistance.slider("values", 1, distanceMaxFinal);
                            }
                        }else {
                            numberDistance = parseInt($(this).val().replace(/[^0-9]/g, ''));
                            var minD = parseInt($("#minDistance").val());
                            stringDistance = $(this).val().replace(/[^0-9]/g, '');
                            if($("#minDistanceFormat").val() !== ""){
                                if(isNaN(parseInt($("#maxDistance").val()))) {
                                    if (numberDistance > minD) {
                                        $sliderDistance.slider("values", 0, minD);
                                        $sliderDistance.slider("values", 1, numberDistance);
                                    } else {
                                        $sliderDistance.slider("values", 0, minD);
                                        $sliderDistance.slider("values", 1, minD);
                                    }
                                }
                            }else{
                                $sliderDistance.slider("values", 0, distanceMin);
                                $sliderDistance.slider("values", 1, numberDistance);
                            }
                            if (!textLength(stringDistance, "distance")) {
                                $(".maxDistanceInput").css("display", "none");
                            } else {
                                $(".maxDistanceInput").css("display", "");
                            }
                        }
                    }
                });

                $("#maxDistanceFormat").change(function(){
                    if(numberDistance > distanceMaxExtend){
                        numberDistance = distanceMaxExtend-1000;
                    }
                    $(this).val(formatNumber(numberDistance));
                    if (!textLength(stringDistance, "distance")) {
                        $(".maxDistanceInput").css("display", "");
                    }
                    $("#maxDistance").val(numberDistance);
                    $('#statusDistanceExt').val(false);
                    if($("#minDistance").val() != "") {
                        var max_distance = parseInt($("#maxDistance").val());
                        var min_distance = parseInt($("#minDistance").val());
                        if(min_distance > max_distance){
                            if($("#statusValidation").val() === "false"){
                                $sliderDistance.slider("values", 0, min_distance);
                                $sliderDistance.slider("values", 1, min_distance);
                                $('#validation-distance').append("Kilometer maksimal tidak boleh lebih kecil dari Kilometer minimal.");
                                $("#statusValidation").val("true");
                            }
                        }else {
                            $sliderDistance.slider("values", 0, min_distance);
                            $sliderDistance.slider("values", 1, max_distance);
                            $('#validation-distance').text("");
                            $("#statusValidation").val("false");
                            $('#form-distance').submit();
                        }
                    }
                });
            }
            // end slider range for desktop

            // slider range for mobile
            function priceSliderMobile(){
                // var for slider range
                var $sliderPrice = $("#sliderPrice"),
                    priceMin = $('#minPrice').val(),
                    priceMax = $('#maxPrice').val(),
                    priceMaxExtend =  parseInt($('.maxPriceData').val()) + 10000000,
                    stepPrice = parseInt($("#stepPrice").val()),
                    selectArrayPrice = [], priceMaxFinal, numberPrice, stringPrice;
                //end var for slider range

                if(priceMax==""){
                    priceMaxFinal = priceMaxExtend;
                }else{
                    priceMaxFinal = priceMax;
                }

                $sliderPrice.slider({
                    range:true,
                    min: 0,
                    max: priceMaxExtend,
                    step: stepPrice,
                    values: [priceMin, priceMaxFinal],
                    slide: function(event, ui) {
                        $("#minPrice").val(ui.values[0]);
                        $("#maxPrice").val(ui.values[1]);
                        $("#minPriceFormat").val(formatNumber(ui.values[0]));
                        $("#maxPriceFormat").val(formatNumber(ui.values[1]));
                        $('#statusPriceExt').val(false);
                        qPriceCheck(ui.values[0],ui.values[1]);
                    },
                    change: function(){
                        var minPrice="";
                        var maxPrice="";

                        selectArrayPrice = [];
                        if ($("#minPriceFormat").val().trim() != ""){
                            minPrice = "Rp."+formatNumber(parseInt($("#minPriceFormat").val().replace(/[^0-9]/g, '')));
                            selectArrayPrice.push(minPrice);
                        }
                        if ($("#maxPriceFormat").val().trim() != ""){
                            maxPrice = "Rp."+formatNumber(parseInt($("#maxPriceFormat").val().replace(/[^0-9]/g, '')));
                            selectArrayPrice.push(maxPrice);
                        }

                        var newArr = selectArrayPrice.join(',').replace(/,/g, ' - ').split();

                        $("#checked-text-Harga").text(newArr);

                        if(selectArrayPrice.length < 1){
                            $("#checked-text-Harga").hide();
                        }else{
                            $("#checked-text-Harga").show();
                        }

                        if ($("#statusValidation").val() === "true") {
                            $('#validation-price').text("");
                            if($('#validation-distance').text() === "") {
                                $(".apply-filter").prop('disabled', false);
                                $("#statusValidation").val("false");
                            }
                        }
                    }
                });

                $("#minPriceFormat").on("input", function(){
                    if(formatCurrency($(this)) === ""){
                        $(this).val("");
                        numberPrice = "";
                        if($("#maxPriceFormat").val() === ""){
                            $("#minPrice").val("");
                            $sliderPrice.slider("values", 0, 0);
                        }
                    }else {
                        numberPrice = parseInt($(this).val().replace(/[^0-9]/g, ''));
                        var maxP = parseInt($("#maxPrice").val());
                        stringPrice = $(this).val().replace(/[^0-9]/g, '');
                        if($("#maxPriceFormat").val() !== ""){
                            if(numberPrice < maxP){
                                $sliderPrice.slider("values", 0, numberPrice);
                                $sliderPrice.slider("values", 1, maxP);
                            }else{
                                $sliderPrice.slider("values", 0, maxP);
                                $sliderPrice.slider("values", 1, maxP);
                            }
                        }else{
                            $sliderPrice.slider("values", 0, numberPrice);
                            $sliderPrice.slider("values", 1, priceMaxFinal);
                        }

                        if (!textLength(stringPrice, "price")) {
                            $(".currencyMin").css("display", "none");
                        } else {
                            $(".currencyMin").css("display", "");
                        }

                        if ($("#statusValidation").val() === "true") {
                            if($('#validation-distance').text() === "") {
                                if (priceMaxFinal > numberPrice) {
                                    $('#validation-price').text("");
                                    $(".apply-filter").prop('disabled', false);
                                    $("#statusValidation").val("false");
                                }
                            }
                        }
                    }
                });

                $("#minPriceFormat").on('change', function(){
                    if(numberPrice > priceMaxExtend){
                        numberPrice = priceMaxExtend-10000000;
                        selectArrayPrice = [];
                        if($("#maxPrice").val().length == 0){
                            selectArrayPrice.push("Rp."+formatNumber(numberPrice));
                        }else {
                            selectArrayPrice.push("Rp." + formatNumber(numberPrice),"Rp." + formatNumber($("#maxPrice").val()));
                        }
                        var newArr = selectArrayPrice.join(',').replace(/,/g, ' - ').split();
                        $("#checked-text-Harga").text(newArr);
                    }
                    if(numberPrice > 0) {
                        $(this).val(formatNumber(numberPrice));
                        if (!textLength(stringPrice, "price")) {
                            $(".currencyMin").css("display", "");
                        }
                    }
                    $("#minPrice").val(numberPrice);
                    $("#statusPriceExt").val(false);

                    if($("#maxPrice").val() != "") {
                        var max_price = parseInt($("#maxPrice").val());
                        var min_price = parseInt($("#minPrice").val());
                        if(min_price > max_price){
                            if($("#statusValidation").val() === "true"){
                                $("#statusValidation").val("false");
                            }
                            if($("#statusValidation").val() === "false") {
                                $('#validation-price').append("Harga maksimal tidak boleh lebih kecil dari harga minimal.");
                                $(".apply-filter").prop('disabled', true);
                                $("#statusValidation").val("true");
                            }
                        }else{
                            qPriceCheck();
                            if($("#statusValidation").val() === "false") {
                                $(".apply-filter").prop('disabled', false);
                                $('#validation-price').text("");
                            }
                        }
                    }
                });

                $("#maxPriceFormat").on("input", function(){
                    if(formatCurrency($(this)) === ""){
                        $(this).val("");
                        numberPrice = "";
                        if($("#minPriceFormat").val() === ""){
                            $("#maxPrice").val("");
                            $sliderPrice.slider("values", 1, priceMaxFinal);
                        }
                    }else {
                        numberPrice = parseInt($(this).val().replace(/[^0-9]/g, ''));
                        var minP = parseInt($("#minPrice").val());
                        stringPrice = $(this).val().replace(/[^0-9]/g, '');
                        if($("#minPriceFormat").val() !== ""){
                            if(numberPrice > minP){
                                $sliderPrice.slider("values", 0, minP);
                                $sliderPrice.slider("values", 1, numberPrice);
                            }else{
                                $sliderPrice.slider("values", 0, minP);
                                $sliderPrice.slider("values", 1, minP);
                            }
                        }else{
                            $sliderPrice.slider("values", 0, priceMin);
                            $sliderPrice.slider("values", 1, numberPrice);
                        }

                        if (!textLength(stringPrice, "price")) {
                            $(".currencyMax").css("display", "none");
                        } else {
                            $(".currencyMax").css("display", "");
                        }

                        if ($("#statusValidation").val() === "true") {
                            if($('#validation-distance').text() === "") {
                                if (numberPrice > priceMin) {
                                    $('#validation-price').text("");
                                    $(".apply-filter").prop('disabled', false);
                                    $("#statusValidation").val("false");
                                }
                            }
                        }
                    }
                });

                $("#maxPriceFormat").on('change', function(){
                    if(numberPrice > priceMaxExtend){
                        numberPrice = priceMaxExtend-10000000;
                        selectArrayPrice = [];
                        if($("#minPrice").val().length == 0){
                            selectArrayPrice.push("Rp."+formatNumber(numberPrice));
                        }else {
                            selectArrayPrice.push("Rp." + formatNumber($("#minPrice").val()),"Rp." + formatNumber(numberPrice));
                        }
                        var newArr = selectArrayPrice.join(',').replace(/,/g, ' - ').split();
                        $("#checked-text-Harga").text(newArr);
                    }
                    if(numberPrice > 0){
                        $(this).val(formatNumber(numberPrice));
                        if (!textLength(stringPrice, "price")) {
                            $(".currencyMax").css("display", "");
                        }
                    }

                    $("#maxPrice").val(numberPrice);
                    $("#statusPriceExt").val(false);

                    if($("#minPrice").val() != "") {
                        var max_price = parseInt($("#maxPrice").val());
                        var min_price = parseInt($("#minPrice").val());
                        if(min_price > max_price){
                            if($("#statusValidation").val() === "true"){
                                $("#statusValidation").val("false");
                            }
                            if($("#statusValidation").val() === "false") {
                                $('#validation-price').append("Harga maksimal tidak boleh lebih kecil dari harga minimal.");
                                $(".apply-filter").prop('disabled', true);
                                $("#statusValidation").val("true");
                            }
                        }else{
                            qPriceCheck();
                            if($("#statusValidation").val() === "false") {
                                $(".apply-filter").prop('disabled', false);
                                $('#validation-price').text("");
                            }
                        }
                    }
                });
            }

            function SliderDistanceMobile(){
                var $sliderDistance = $("#sliderDistance"),
                    distanceMin = $('#minDistance').val(),
                    distanceMax = $('#maxDistance').val(),
                    distanceMaxExtend =  parseInt($('.maxDistanceData').val()) + 1000,
                    stepKilometer = parseInt($("#stepKilometer").val()),
                    selectArrayDistance = [], distanceMaxFinal, numberDistance, stringDistance;

                if(distanceMax==""){
                    distanceMaxFinal = distanceMaxExtend;
                }else{
                    distanceMaxFinal = distanceMax;
                }

                $sliderDistance.slider({
                    range: true,
                    min: 0,
                    max: distanceMaxExtend,
                    step: stepKilometer,
                    values: [distanceMin, distanceMaxFinal],
                    slide: function(event, ui) {
                        $("#minDistance").val(ui.values[0]);
                        $("#maxDistance").val(ui.values[1]);
                        $("#minDistanceFormat").val(formatNumber(ui.values[0]));
                        $("#maxDistanceFormat").val(formatNumber(ui.values[1]));
                        $('#statusDistanceExt').val(false);
                        qDistanceCheck(ui.values[0],ui.values[1]);
                    },
                    change: function(){
                        var minDistance="";
                        var maxDistance="";

                        selectArrayDistance = [];
                        if ($("#minDistanceFormat").val().trim() != ""){
                            minDistance = formatNumber(parseInt($("#minDistanceFormat").val().replace(/[^0-9]/g, '')))+" km";
                            selectArrayDistance.push(minDistance);
                        }
                        if ($("#maxDistanceFormat").val().trim() != ""){
                            maxDistance = formatNumber(parseInt($("#maxDistanceFormat").val().replace(/[^0-9]/g, '')))+" km";
                            selectArrayDistance.push(maxDistance);
                        }

                        var newArr = selectArrayDistance.join(',').replace(/,/g, ' - ').split();
                        $("#checked-text-Kilometer").text(newArr);

                        if(selectArrayDistance.length < 1){
                            $("#checked-text-Kilometer").hide();
                        }else{
                            $("#checked-text-Kilometer").show();
                        }

                        if ($("#statusValidation").val() === "true") {
                            $('#validation-distance').text("");
                            if($('#validation-price').text() === "") {
                                $(".apply-filter").prop('disabled', false);
                                $("#statusValidation").val("false");
                            }
                        }
                    }
                });

                $("#minDistanceFormat").on("input", function(){
                    if(formatCurrency($(this)) === ""){
                        $(this).val("");
                        numberDistance = "";
                        if($("#maxDistanceFormat").val() === ""){
                            $("#minDistance").val("");
                            $sliderDistance.slider("values", 0, 0);
                        }
                    }else {
                        numberDistance = parseInt($(this).val().replace(/[^0-9]/g, ''));
                        var maxD = parseInt($("#maxDistance").val());
                        stringDistance = $(this).val().replace(/[^0-9]/g, '');
                        if($("#maxDistanceFormat").val() !== ""){
                            if(numberDistance < maxD){
                                $sliderDistance.slider("values", 0, numberDistance);
                                $sliderDistance.slider("values", 1, maxD);
                            }else{
                                $sliderDistance.slider("values", 0, maxD);
                                $sliderDistance.slider("values", 1, maxD);
                            }
                        }else{
                            $sliderDistance.slider("values", 0, numberDistance);
                            $sliderDistance.slider("values", 1, distanceMaxFinal);
                        }

                        if (!textLength(stringDistance, "distance")) {
                            $(".minDistanceInput").css("display", "none");
                        } else {
                            $(".minDistanceInput").css("display", "");
                        }

                        if ($("#statusValidation").val() === "true") {
                            if($('#validation-price').text() === "") {
                                if (distanceMaxFinal > numberDistance) {
                                    $('#validation-distance').text("");
                                    $(".apply-filter").prop('disabled', false);
                                    $("#statusValidation").val("false");
                                }
                            }
                        }
                    }
                });

                $("#minDistanceFormat").on('change', function(){
                    if(numberDistance > distanceMaxExtend){
                        numberDistance = distanceMaxExtend-1000;
                        selectArrayDistance = [];
                        if($("#maxDistance").val().length == 0){
                            selectArrayDistance.push(formatNumber(numberDistance)+" km");
                        }else {
                            selectArrayDistance.push(formatNumber(numberDistance)+" km",formatNumber($("#maxDistance").val()+" km"));
                        }
                        var newArr = selectArrayDistance.join(',').replace(/,/g, ' - ').split();
                        $("#checked-text-Kilometer").text(newArr);
                    }
                    if(numberDistance > 0){
                        $(this).val(formatNumber(numberDistance));
                        if (!textLength(stringDistance, "distance")) {
                            $(".minDistanceInput").css("display", "");
                        }
                    }

                    $("#minDistance").val(numberDistance);
                    $('#statusDistanceExt').val(false);

                    if($("#maxDistance").val() != "") {
                        var max_distance = parseInt($("#maxDistance").val());
                        var min_distance = parseInt($("#minDistance").val());
                        if(min_distance > max_distance){
                            if($("#statusValidation").val() === "true"){
                                $("#statusValidation").val("false");
                            }
                            if($("#statusValidation").val() === "false"){
                                $('#validation-distance').append("Kilometer maksimal tidak boleh lebih kecil dari Kilometer minimal.");
                                $(".apply-filter").prop('disabled',true);
                                $("#statusValidation").val("true");
                            }
                        }else {
                            qDistanceCheck();
                            if($("#statusValidation").val() === "false") {
                                $(".apply-filter").prop('disabled', false);
                                $('#validation-distance').text("");
                            }
                        }
                    }
                });

                $("#maxDistanceFormat").on("input", function(){
                    if(formatCurrency($(this)) === ""){
                        $(this).val("");
                        numberDistance = "";
                        if($("#minDistanceFormat").val() === ""){
                            $("#maxDistance").val("");
                            $sliderDistance.slider("values", 1, distanceMaxFinal);
                        }
                    }else {
                        numberDistance = parseInt($(this).val().replace(/[^0-9]/g, ''));
                        var minD = parseInt($("#minDistance").val());
                        stringDistance = $(this).val().replace(/[^0-9]/g, '');
                        if($("#minDistanceFormat").val() !== ""){
                            if(numberDistance > minD){
                                $sliderDistance.slider("values", 0, minD);
                                $sliderDistance.slider("values", 1, numberDistance);
                            }else{
                                $sliderDistance.slider("values", 0, minD);
                                $sliderDistance.slider("values", 1, minD);
                            }
                        }else{
                            $sliderDistance.slider("values", 0, distanceMin);
                            $sliderDistance.slider("values", 1, numberDistance);
                        }

                        if (!textLength(stringDistance, "distance")) {
                            $(".maxDistanceInput").css("display", "none");
                        } else {
                            $(".maxDistanceInput").css("display", "");
                        }

                        if ($("#statusValidation").val() === "true") {
                            if($('#validation-price').text() === ""){
                                if(numberDistance > distanceMin){
                                    $('#validation-distance').text("");
                                    $(".apply-filter").prop('disabled', false);
                                    $("#statusValidation").val("false");
                                }
                            }
                        }
                    }
                });

                $("#maxDistanceFormat").on('change', function(){
                    if(numberDistance > distanceMaxExtend){
                        numberDistance = distanceMaxExtend-1000;
                        selectArrayDistance = [];
                        if($("#minDistance").val().length == 0){
                            selectArrayDistance.push(formatNumber(numberDistance)+" km");
                        }else{
                            selectArrayDistance.push(formatNumber($("#minDistance").val())+" km",formatNumber(numberDistance)+" km");
                        }
                        var newArr = selectArrayDistance.join(',').replace(/,/g, ' - ').split();
                        $("#checked-text-Kilometer").text(newArr);
                    }

                    if(numberDistance > 0){
                        $(this).val(formatNumber(numberDistance));
                        if (!textLength(stringDistance, "distance")) {
                            $(".maxDistanceInput").css("display", "");
                        }
                    }

                    $("#maxDistance").val(numberDistance);
                    $('#statusDistanceExt').val(false);

                    if($("#minDistance").val() != "") {
                        var max_distance = parseInt($("#maxDistance").val());
                        var min_distance = parseInt($("#minDistance").val());
                        if(min_distance > max_distance){
                            if($("#statusValidation").val() === "true"){
                                $("#statusValidation").val("false");
                            }
                            if($("#statusValidation").val() === "false"){
                                $('#validation-distance').append("Kilometer maksimal tidak boleh lebih kecil dari Kilometer minimal.");
                                $(".apply-filter").prop('disabled',true);
                                $("#statusValidation").val("true");
                            }
                        }else {
                            qDistanceCheck();
                            if($("#statusValidation").val() === "false") {
                                $(".apply-filter").prop('disabled', false);
                                $('#validation-distance').text("");
                            }
                        }
                    }
                });
            }

            function qPriceCheck(){
                qPrice = $("#sliderPrice").prev().prev().prev().prev().val();
                var check = (facetValArray.indexOf(qPrice) > -1);
                if(!check){
                    facetValArray.push(qPrice);
                }
            }

            function qDistanceCheck(){
                qDistance = $("#sliderDistance").prev().prev().prev().prev().val();
                var check = (facetValArray.indexOf(qDistance) > -1);
                if(!check){
                    facetValArray.push(qDistance);
                }
            }
            // end slider range for mobile

            function textLength(value,status){
                var maxLength;
                if(status === "price"){
                    if($(window).width() < 1024){
                        maxLength = 14;
                    }else{
                        maxLength = 11;
                    }
                }else if(status === "distance"){
                    if($(window).width() < 1024){
                        maxLength = 11;
                    }else{
                        maxLength = 8;
                    }
                }

                if(value.length > maxLength) return false;
                return true;
            }

            function formatNumber(value) {
                var reverse = value.toString().split('').reverse().join('');
                var result = reverse.match(/\d{1,3}/g);
                result = result.join('.').split('').reverse().join('');

                return result;
            }
            function formatNumberExt(n) {
                return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            }

            function parsePrice(price) {
                var sizes = ['', ' Ribu', ' Juta', ' Milyar', ' Trilyun'];
                if (price == 0) return '0';
                var i = parseInt(Math.floor(Math.log(price) / Math.log(1000)));
                return Math.round(price / Math.pow(1000, i), 2) + sizes[i];
            }

            function computePriceRangeValue(min, max) {
                var minVal = 'Rp ' + parsePrice(min);
                var maxVal = 'Rp ' + parsePrice(max);
                var productFilter = minVal + ' - ' + maxVal;
                $('#fillerPrice').append(productFilter);
            }

            function formatCurrency(input) {
                var input_val = input.val().trim();
                if (input_val === "0" || input_val === "") {
                    return "";
                }else{
                    input.mask('000.000.000.000.000.000', {reverse: true});
                }
            }

            $(document).ready(function(){
                computePriceRangeValue($("#minPrice").val(), $("#maxPrice").val());

                if ($('#minDistance').val() != "" && $('#maxDistance').val() != ""){
                    $("#minDistanceFormat").val(formatNumber($("#minDistance").val()));
                    $("#maxDistanceFormat").val(formatNumber($("#maxDistance").val()));
                    if(parseInt($("#statusDistance").val()) > 0){
                        $(".distance_filter").prev("._title").addClass("opened");
                        $(".distance_filter").css("display","block");
                        $("#fillerKilometer").append(formatNumber($("#minDistance").val())+" km - "+ formatNumber($("#maxDistance").val())+" km");
                    }else{
                        $("#fillerKilometer").append(formatNumber($("#minDistance").val())+" km - "+ formatNumber($("#maxDistance").val())+" km");
                    }
                    if (!textLength($("#minDistance").val(), "distance")) {
                        $(".minDistanceInput").css("display", "none");
                    } else {
                        $(".minDistanceInput").css("display", "");
                    }
                    if (!textLength($("#maxDistance").val(), "distance")) {
                        $(".maxDistanceInput").css("display", "none");
                    } else {
                        $(".maxDistanceInput").css("display", "");
                    }
                    $("#checked-text-Harga").show();
                    $("#checked-text-Kilometer").text(formatNumberExt($("#minDistance").val())+" km - "+formatNumberExt($("#maxDistance").val())+" km");
                }else{
                    $("#checked-text-Kilometer").hide();
                }

                if ($('#minPrice').val() != "" && $('#maxPrice').val() != ""){
                    $("#minPriceFormat").val(formatNumberExt($("#minPrice").val()));
                    $("#maxPriceFormat").val(formatNumberExt($("#maxPrice").val()));
                    $('#statusPriceExt').val(true);
                    if (!textLength($('#minPrice').val(), "price")) {
                        $(".currencyMin").css("display", "none");
                    } else {
                        $(".currencyMin").css("display", "");
                    }
                    if (!textLength($('#maxPrice').val(), "price")) {
                        $(".currencyMax").css("display", "none");
                    } else {
                        $(".currencyMax").css("display", "");
                    }
                    $("#checked-text-Harga").show();
                    $("#checked-text-Harga").text("Rp."+formatNumberExt($("#minPrice").val())+" - "+"Rp."+formatNumberExt($("#maxPrice").val()));
                }else{
                    $("#checked-text-Harga").hide();
                }

                $('#year-filter-min,#year-filter-max').select2({
                    minimumResultsForSearch: -1
                });

                if(parseInt($(".max-year").val()) > 0){
                    $(".year_filter").prev("._title").addClass("opened");
                    $(".year_filter").css("display","block");
                    $("#checked-text-Tahun").show();
                    $("#checked-text-Tahun").text($(".min-year").val()+" - "+$(".max-year").val());
                }else {
                    $("#checked-text-Tahun").hide();
                }
            });

            $('.facet-filter-common:checkbox:checked').each(function () {
                var facetValue = (this.checked ? getFacetValueFromCheckbox($(this)) : "");
                if ($.inArray(facetValue, facetValArray) < 0) {
                    facetValArray.push(facetValue);
                }
            });

            $(document).on("change", ".facet-filter-common", function() {
                var search_term = getFacetValueFromCheckbox($(this));
                if ($(this).prop('checked')) {
                    facetValArray.push(search_term);
                    $(".tag-a").css("color", "#ff0064");
                    $("#clear-facet").css("pointer-events", "visible");
                } else {
                    for (var i = facetValArray.length - 1; i >= 0; i--) {
                        if (facetValArray[i] === search_term) {
                            facetValArray.splice(i, 1);
                        }
                    }
                }
                if (facetValArray.length === 0){
                    $(".tag-a").css("color", "#d0d2d3");
                    $("#clear-facet").css("pointer-events", "none");
                }
            });

            $("#year-filter-min, #year-filter-max").on("select2:open", function () {
                if(isNaN(width)){
                    width = parseInt($(".select2-selection--single").width())+2;
                }
                $("body").find(".select2-dropdown").css("max-width",width+"px");
            });

            $(document).on("change", "#year-filter-min", function () {
                minYear = $('option:selected', this).text();
                $(".min-year").val(minYear);
                if($(window).width() >= 1024){
                    if ($(".max-year").val() != ""){
                        if(parseInt(minYear) > parseInt($(".max-year").val())){
                            if($('#year-validation-status').val()==="false"){
                                $('#year-validation').append("Tahun maksimal tidak boleh lebih kecil dari tahun minimal.");
                                $('#year-validation-status').val("true");
                            }
                        }else{

                            if($('#maxDistance').val() === ""){
                                $('.form-year').find('input[name=minDistance]').remove();
                                $('.form-year').find('input[name=maxDistance]').remove();
                            }
                            if($('#maxPrice').val() === ""){
                                $('.form-year').find('input[name=minPrices]').remove();
                                $('.form-year').find('input[name=maxPrices]').remove();
                            }
                            $('input[name="qMobile"]').remove();
                            $('#year-validation').text("");
                            $('#year-validation-status').val("false");
                            $('.form-year').submit();
                        }
                    }
                }else{
                    selectArray = [];
                    if($(".max-year").val() != ""){
                        selectArray.push(minYear,$(".max-year").val());
                    }else{
                        selectArray.push(minYear);
                    }
                    var newArr = selectArray.join(',').replace(/,/g, ' - ').split();

                    $("#checked-text-Tahun").show();
                    $("#checked-text-Tahun").text(newArr);

                    if(parseInt(minYear) > parseInt($(".max-year").val())){
                        if($('#year-validation-status').val()==="false"){
                            $('#year-validation').append("Tahun maksimal tidak boleh lebih kecil dari tahun minimal.");
                            $('#year-validation-status').val("true");
                            $(".apply-filter").prop('disabled',true);
                        }
                    }else{
                        $('#year-validation').text("");
                        $('#year-validation-status').val("false");
                        $(".apply-filter").prop('disabled',false);
                        if ($(".max-year").val() != ""){
                            qYear = $(".filterTahun").prev().prev().prev().val();
                            var check = (facetValArray.indexOf(qYear) > -1);
                            if(!check){
                                facetValArray.push(qYear);
                            }
                        }
                    }
                }
            });

            $(document).on("change", "#year-filter-max", function (){
                maxYear = $('option:selected', this).text();
                $(".max-year").val(maxYear);
                if($(window).width() >= 1024){
                    if ($(".min-year").val() != "") {
                        if (parseInt(maxYear) < parseInt($(".min-year").val())) {
                            if ($('#year-validation-status').val() === "false") {
                                $('#year-validation').append("Tahun maksimal tidak boleh lebih kecil dari tahun minimal.");
                                $('#year-validation-status').val("true");
                            }
                        } else {

                            if($('#maxDistance').val() === ""){
                                $('.form-year').find('input[name=minDistance]').remove();
                                $('.form-year').find('input[name=maxDistance]').remove();
                            }
                            if($('#maxPrice').val() === ""){
                                $('.form-year').find('input[name=minPrices]').remove();
                                $('.form-year').find('input[name=maxPrices]').remove();
                            }
                            $('input[name="qMobile"]').remove();
                            $('#year-validation').text("");
                            $('#year-validation-status').val("false");
                            $('.form-year').submit();
                        }
                    }
                }else{
                    selectArray = [];
                    if($(".min-year").val() != ""){
                        selectArray.push($(".min-year").val(),maxYear);
                    }else{
                        selectArray.push(maxYear);
                    }

                    var newArr = selectArray.join(',').replace(/,/g, ' - ').split();

                    $("#checked-text-Tahun").show();
                    $("#checked-text-Tahun").text(newArr);
                    if(parseInt(maxYear) < parseInt($(".min-year").val())){
                        if($('#year-validation-status').val()==="false"){
                            $('#year-validation').append("Tahun maksimal tidak boleh lebih kecil dari tahun minimal.");
                            $('#year-validation-status').val("true");
                            $(".apply-filter").prop('disabled',true);
                        }
                    }else{
                        $('#year-validation').text("");
                        $('#year-validation-status').val("false");
                        $(".apply-filter").prop('disabled',false);
                        if ($(".min-year").val() != ""){
                            var qYear = $(".filterTahun").prev().prev().prev().val();
                            var check = (facetValArray.indexOf(qYear) > -1);
                            if(!check){
                                facetValArray.push(qYear);
                            }
                        }
                    }
                }
            });

            function getFacetValueFromCheckbox(e) {
                if (e.hasClass("js-facet-expand")) {
                    return e.closest('label').prev().prev().val();
                } else {
                    return e.closest('label').prev().prev().prev().val();
                }
            }

            $(".apply-filter").on('click', function() {
                if($("#minPrice").val() === "" && $("#maxPrice").val() !== ""){
                    $("#minPrice").val(0);
                    $("#minPriceFormat").val(0);
                    $("#checked-text-Harga").text("Rp.0 - "+"Rp."+formatNumberExt($("#maxPrice").val()));
                }else if($("#maxPrice").val() === "" && $("#minPrice").val() !== ""){
                    $("#maxPrice").val($(".maxPriceData").val());
                    $("#maxPriceFormat").val(formatNumberExt($(".maxPriceData").val()));
                    $("#checked-text-Harga").text("Rp."+formatNumberExt($("#minPrice").val())+" - "+"Rp."+formatNumberExt($(".maxPriceData").val()));
                }

                if($("#minDistance").val() === "" && $("#maxDistance").val() !== ""){
                    $("#minDistance").val(0);
                    $("#minDistanceFormat").val(0);
                    $("#checked-text-Kilometer").text("0 km - "+formatNumberExt($("#maxDistance").val())+" km");
                }else if($("#maxDistance").val() === "" && $("#minDistance").val() !== ""){
                    $("#maxDistance").val($(".maxDistanceData").val());
                    $("#maxDistanceFormat").val(formatNumberExt($(".maxDistanceData").val()));
                    $("#checked-text-Kilometer").text(formatNumberExt($("#minDistance").val())+" km - "+formatNumberExt($(".maxDistanceData").val())+" km");
                }

                if($(".min-year").val() === "" && $(".max-year").val() !== ""){
                    $(".min-year").val($(".minYearData").val());
                    $("#year-filter-min").val($(".minYearData").val());
                    $("#checked-text-Tahun").text($(".minYearData").val()+" - "+$(".max-year").val());
                }else if($(".max-year").val() === "" && $(".min-year").val() !== ""){
                    var d = new Date();
                    var currentYear = d.getFullYear();
                    $(".max-year").val(currentYear);
                    $("#year-filter-max").val(currentYear);
                    $("#checked-text-Tahun").text($(".min-year").val()+" - "+currentYear);
                }

                applyFilter();
            });

            if ($(window).width() < 1024) {
                if($(".product--filter").children("span").length > 0){
                    $("#clear-facet").css("pointer-events", "visible");
                } else {
                    $("#clear-facet").css("pointer-events", "none");
                }
                $("#clear-facet").on('click', function(e) {
                    e.preventDefault();
                    sessionStorage.clear();
                    if ($("input[name='q']").next().val() != ""){
                        if( window.location.href.includes('isUsedCar%3Atrue')){
                            redirectURL = redirectURL.split('?');
                            redirectURL = redirectURL[0] + "?text="+ $("input[name='q']").next().val() + "%3Arelevance%3AisUsedCar%3Atrue";
                        }else{
                            redirectURL = redirectURL.split('?');
                            redirectURL = redirectURL[0] + "?text="+ $("input[name='q']").next().val();
                        }
                    }else{
                        redirectURL = redirectURL.split('?');
                        redirectURL = redirectURL[0];
                    }
                    window.location.href = redirectURL;
                });
                $("#close-facet").on('click', function(e) {
                    e.preventDefault();
                    redirectURL = redirectURL.split('?');
                    redirectURL = redirectURL[0];
                    window.location.href = redirectURL;
                });
                $(".lihat-semua-span li").unwrap();
                $('.lihat-semua-button').remove();
                $('.lihat-semua-button-pop-up').remove();
            }

            if ($(window).width() >= 1024){
                $(".filter-reset").on('click', function(e) {
                    e.preventDefault();
                    sessionStorage.clear();
                    redirectURL = redirectURL.split('?');
                    redirectURL = redirectURL[0];
                    $(".js-facet-expand").prop('checked', false);
                    facetValArray = [];
                });
            }

            function applyFilter () {
                var searchText = "";
                for (var i = 0; i < facetValArray.length; i++) {
                    var tempArray = facetValArray[i].split(":");
                    sortKey = tempArray[1];
                    searchText = tempArray[0];
                    for (var j = 2; j < tempArray.length; j += 2) {
                        if (tempArray[j] != "") {
                            var obj = {};
                            obj[tempArray[j]] = tempArray[j + 1];
                            queryArray.push(obj);
                        }
                    }
                }

                var appendUrlRange ="";
                if ($("input[name='q']").next().val() != ""){
                    if( window.location.href.includes('isUsedCar%3Atrue')){
                        appendUrlRange += "%3AisUsedCar%3Atrue&text=" + $("input[name='q']").next().val();
                    }else{
                        appendUrlRange += "&text=" + $("input[name='q']").next().val();
                    }
                }
                if(qDistance != null){
                    appendUrlRange += "&minYear=" + $(".min-year").val() + "&maxYear=" + $(".max-year").val() + "&minYearData="+ $(".minYearData").val();
                }
                if(qPrice != null){
                    appendUrlRange += "&minPrices=" + $("#minPrice").val() + "&maxPrices=" + $("#maxPrice").val() + "&maxPriceData="+ $(".maxPriceData").val();
                }
                if(qDistance != null){
                    appendUrlRange += "&minDistance=" + $("#minDistance").val() + "&maxDistance=" + $("#maxDistance").val()+ "&maxDistanceData="+ $(".maxDistanceData").val();
                }

                var sortObj = {};
                sortObj.sort = sortKey;
                queryArray.unshift(sortObj);
                var values = Object.keys(queryArray).map(function(e) {
                    return queryArray[e]
                });
                var arr = [];
                $.each(values, function(key, value) {
                    $.each(value, function(key, value) {
                        //return arr.push(value);
                        return arr.push(value.replace(/\+/g, '%2B'));
                    });
                });
                var appendURL="";
                if(searchText!="")
                {
                    appendURL = "?q="+searchText+"%3A" + arr[0];
                }else
                {
                    appendURL = "?q=%3A" + arr[0];
                }
                for (var k = 1; k < queryArray.length; k++) {
                    for (var property in queryArray[k]) {
                        if (arr[k].indexOf('%') === -1){
                            arr[k] = encodeURIComponent(arr[k]);
                        }
                        appendURL += "%3A" + property + "%3A" + arr[k];
                    }
                }
                redirectURL = redirectURL.split('?');
                redirectURL = redirectURL[0] + appendURL + appendUrlRange;
                window.location.href = redirectURL;
            }

            if ($(window).width() <= 992) {
                var pathname = window.location.pathname;
                $(document).ready(function() {
                    if (sessionStorage.getItem("moveURL") !== pathname && sessionStorage.getItem("moveURL") !== null) {
                        sessionStorage.clear();
                    }
                });
                if ($("#mobile-filter").length > 0) {
                    var listElement = "<ul>";
                    var contentDiv = "<div class='tab-content'>";
                    $("._filter-options").each(function(index) {
                        var keyword = $(this).find("span:first-child").text().toLowerCase();
                        var titleFilter = $(this).children("span").text();
                        listElement += "<li class='tab' data-tab='"+$(this).children("span").text()+"'><a href='#tab-" + index + "'>" + $(this).children("span").text() +
                            "</a><a id='checked-text-"+ $(this).children("span").text().split(" ").join("_") + "' class='text-checkbox-checked-mobile visible-none' data-subtab='"+$(this).children("span").text()+"'></a></li>";
                        if (keyword.includes("lokasi") || keyword.includes("penjual") || keyword.includes("model")){
                            contentDiv += "<div id='tab-" + index + "'><input type='text' class='search-filter-mobile' id='search-popup-mobile-" + titleFilter + "' placeholder='Cari " + titleFilter + "'/><ul class='ul-mobile'>" + $(this).children("ul").html() + "</ul></div>";
                        } else {
                            contentDiv += "<div id='tab-" + index + "'><ul>" + $(this).children("ul").html() + "</ul></div>";
                        }
                    });
                    listElement += "</ul>";
                    contentDiv += "</div>";
                    $("#mobile-filter").append(listElement);
                    $("#mobile-filter").append(contentDiv);
                    $('.tab-content div:first-child').addClass('active');
                    $(".tab:first-child").addClass('active');

                    $(document).ready(function() {
                        $('.tab').each(function(){
                            $(this).trigger('click');
                        });
                        $('.tab-content div:first-child').addClass('active');
                        $(".tab:first-child").addClass('active');
                        $(".tab:last-child").removeClass('active');
                        $("#tab:last-child").removeClass('active');
                        if(sessionStorage.getItem("text" + dataTab) != null || $("#mobile-filter").length > 0){
                            $('.tab').each(function() {
                                var joinDataTab = $(this).attr('data-tab').split(" ").join("_");
                                var joinSubDataTab = $(this).find(".text-checkbox-checked-mobile").attr('data-subtab').split(" ").join("_");
                                if(joinDataTab !== "Harga" && joinDataTab !== "Kilometer" && joinDataTab !== "Tahun"){
                                    initSubtabText(joinDataTab, joinSubDataTab, $(this).index());
                                }
                            });
                            $("#checked-text-" + dataTab).text(sessionStorage.getItem("text" + dataTab));
                        } else {
                            $("#checked-text-"+ dataTab).css('display','none');
                        }
                    });

                    $(".tab").on('click', function(event) {
                        if (sessionStorage.getItem("moveURL") !== pathname && sessionStorage.getItem("moveURL") !== null ){
                            sessionStorage.clear();
                        }
                        event.preventDefault();
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        var joinDataTab = $(this).attr('data-tab').split(" ").join("_");
                        var joinSubDataTab = $(this).find(".text-checkbox-checked-mobile").attr('data-subtab').split(" ").join("_");
                        if(joinDataTab !== "Harga" && joinDataTab !== "Kilometer" && joinDataTab !== "Tahun"){
                            subtabText(joinDataTab, joinSubDataTab, $(this).index());
                        }
                        var divID = $(this).children('a').attr('href');
                        $(divID).siblings().removeClass('active');
                        $(divID).addClass('active');
                    });

                    $(".apply-filter").on('click', function() {
                        $( ".tab" ).each(function( index ) {
                            sessionStorage.clear;
                            var joinDataTab = $(this).attr('data-tab').split(" ").join("_");
                            if ($("#checked-text-"+ joinDataTab).text().trim().length != 0) {
                                sessionStorage.setItem("text" + joinDataTab, $("#checked-text-" + joinDataTab).text());
                            } else {
                                sessionStorage.removeItem("text" + joinDataTab);
                            }
                        });
                    });

                    $("._filter-options").each(function (index) {
                        var filterName = $(this).children("span").text();
                        $('#tab-'+index).find('#search-popup-mobile-'+ filterName).keyup(function () {
                            var value = $(this).val().toUpperCase();
                            $('.li-mobile-' + (filterName)).filter(function () {
                                $(this).toggle($(this).text().toUpperCase().indexOf(value) > -1)
                            });
                        });
                    });
                }

                function subtabText(dataTab, dataSubtab, indeks){
                    if (dataTab == dataSubtab){
                        if(sessionStorage.getItem("text" + dataTab) != null){
                            $("#checked-text-" + dataTab).text(sessionStorage.getItem("text" + dataTab));
                            if (sessionStorage.getItem("text" + dataTab) === ""){
                                $("#checked-text-"+ dataTab).hide();
                            }
                        } else if ($("#checked-text-" + dataTab).text() == "" ){
                            $("#checked-text-"+ dataTab).hide();
                        }
                        var arrayTextCheckbox = []
                        $(document).ready(function() {
                            $("input").on("change", function(){
                                arrayTextCheckbox[dataTab] = [];
                                $.each($("#tab-"+ indeks + " input[name='input-checked']:checked"), function(){
                                    arrayTextCheckbox[dataTab].push($(this).next('span').text());
                                });
                                $("#checked-text-"+ dataTab).text(arrayTextCheckbox[dataTab].join(", "));

                                sessionStorage.setItem("moveURL", window.location.pathname);

                                if ($("#checked-text-"+ dataTab).text().trim().length != 0) {
                                    $("#checked-text-"+ dataTab).show();
                                } else {
                                    $("#checked-text-"+ dataTab).hide();
                                }
                            });
                        });
                    }
                }

                //This function is used for filter marker in mobile view when action click are not given but it has checked value
                function initSubtabText(dataTab, dataSubtab, indeks){
                    if (dataTab == dataSubtab){
                        if(sessionStorage.getItem("text" + dataTab) != null){
                            $("#checked-text-" + dataTab).text(sessionStorage.getItem("text" + dataTab));
                            if (sessionStorage.getItem("text" + dataTab) === ""){
                                $("#checked-text-"+ dataTab).hide();
                            }
                        } else if ($("#checked-text-" + dataTab).text() == "" ){
                            $("#checked-text-"+ dataTab).hide();
                        }
                        var arrayTextCheckbox = []
                        $(document).ready(function() {
                            $( ".tab" ).each(function(){
                                arrayTextCheckbox[dataTab] = [];
                                $.each($("#tab-"+ indeks + " input[name='input-checked']:checked"), function(){
                                    arrayTextCheckbox[dataTab].push($(this).next('span').text());
                                });
                                $("#checked-text-"+ dataTab).text(arrayTextCheckbox[dataTab].join(", "));

                                sessionStorage.setItem("moveURL", window.location.pathname);

                                if ($("#checked-text-"+ dataTab).text().trim().length != 0) {
                                    $("#checked-text-"+ dataTab).show();
                                } else {
                                    $("#checked-text-"+ dataTab).hide();
                                }
                            });
                        });
                    }
                }

                $("#openFilterpopup").on('click', function() {
                  if (window.location.search === null || window.location.search === ""){
                        sessionStorage.clear;
                        $(".visible-none").hide();
                    }

                    $(".hideScreen").addClass("apply");
                    $("#filter-popup").show();
                    $(".filter-button-holder").show();
                    $('.tab').each(function(){
                        $('.tab-content div:last-child').removeClass('active');
                    });
                    priceSliderMobile();
                    SliderDistanceMobile();

                    $('#year-filter-min').select2({
                        dropdownParent:$('#mobile-filter .tab-content'),
                        minimumResultsForSearch: -1
                    });
                    $('#year-filter-max').select2({
                        dropdownParent:$('#mobile-filter .tab-content'),
                        minimumResultsForSearch: -1
                    });

                    $('#year-filter-min').next().next().remove();
                    $('#year-filter-max').next().next().remove();

                    var width;
                    $("#year-filter-min, #year-filter-max").on("select2:open", function () {
                        if(isNaN(width)){
                            width = parseInt($(".tab-content").find(".select2-dropdown").width())+14;
                        }
                        $(".tab-content").find(".select2-dropdown").css("max-width",width+"px");
                    });
                });

                $(".cancel-filter").on('click', function() {
                    window.location.href = document.URL;
                });
                $(".close-filter").on('click', function() {
                    window.location.href = document.URL;
                });
            }

            $( document ).ready(function() {
                $('.lihat-semua-span').hide();
                $('.lihat-semua-button').show();
                $('.lihat-semua-button-pop-up').show();
            });

            // Filter section
            $("._filter-options span").on('click', function() {
                $(this).toggleClass("opened");
                $(this).siblings("ul").slideToggle();
                $(this).parents("._filter-options").find(".color_filter").css('display', 'flex');
                $(this).parents("._filter-options").find(".color_filter").css('flex-wrap', 'wrap');
                $(this).parents("._filter-options").find(".color_filter").css('text-align', 'center');
            });

            $(".lihat-semua-button").on('click', function() {
                $(this).toggleClass("opened");
                $(this).siblings("div.lihat-semua-span").slideToggle();
                if($(this).hasClass("opened")) {
                    $(this).text("Sembunyikan \u25B4");
                }
                else {
                    $(this).text("Lihat Semua \u25BE");
                }
            });

            $('.facet__list__checkbox').each(function() {
                if ($(this).prop('checked')) {
                    $(this).parents("._filter-options").find("._title").addClass("opened");
                    $(this).closest('ul').css('display', 'block');
                    $(this).closest('ul').siblings('span').find('.closed').addClass('opened');
                    $(this).parents("._filter-options").find(".color_filter").css('display', 'flex');
                    $(this).parents("._filter-options").find(".color_filter").css('flex-wrap', 'wrap');
                    $(this).parents("._filter-options").find(".color_filter").css('text-align', 'center');
                }
            });

            $('.facet-filter-common').each(function () {
                var inputVal;
                $.each( $(this).parents('form').find('input'), function(){
                    inputVal = $(this).val();
                    inputVal = encodeURIComponent(inputVal).replace(/%3A/g,':').replace(/%20/g,' ').replace(/%25/g,'%').replace(/%2B/g,'+');
                    $(this).val(inputVal);
                });
            });

            if($(window).width() < 1025){
                if($("#compare-pane").is(":visible")){
                    $(".footer").addClass("compare-footer");
                }
            }

            $(".expandClose").on('click', function() {
                $(this).closest('.modal-expand').hide();
                $(this).closest('.modal-expand').removeClass('active');
                $(this).parents('.facet__list').css('height', '');
            });

            $(".js-facet").each(function() {
               var target = $(this).data('id');
               $(target).find('.lihat-semua-button-pop-up').on('click', function () {
                   $('.js-facet').find('.modal-expand.active').removeClass("active");
                   $(this).next('.modal-expand').addClass("active");
                   $(this).parents('.facet__list').css('height', '140px');
               });
               var count = target.split("#")[1];
                $('#search-popup-'+ count).focus(function() {
                    $(this).css("border", "solid 1px blue");
                });
                $(target).find('#search-popup-'+ count).keyup(function () {
                   var value = $(this).val().toUpperCase();
                       $('.li-name-' + count).filter(function () {
                           $(this).toggle($(this).text().toUpperCase().indexOf(value) > -1)
                       });
               });
            });
        },
        bookAppoinment: function() {
            //book an appointment left nav
            if ($('#service-nav').length > 0) {
                // Populate dropdown with menu items
                $("#service-nav a.link-item").each(function() {
                    var el = $(this);
                    if (el.hasClass("active")) {
                        $("#selected-nav-item").text(el.text());
                    }
                });
                var navitem = $('#service-nav').find('ul').clone();
                $("#account-nav-item").append(navitem);
                $("#selected-nav-item").on("click", function(e) {
                    e.stopPropagation();
                    $("#account-nav-item").slideToggle();
                });
                $("body").on('click', function() {
                    $("#account-nav-item").slideUp();
                });

            }
        },
        dealerLocator: function() {
            //Mobile page
            $(window).on('load resize', function() {
                if ($(window).width() <= 992) {
                    setTimeout(function() {
                        $('.branch__details-header a').click(function() {
                            $('.branch__details-wrapper').hide();
                            $('.branch__filter-wrapper').show();
                        });
                        $('.js-store-finder-navigation-list > li, .icon-Current_Location').click(function() {
                            $('.branch__details-wrapper').show();
                            $('.branch__filter-wrapper').hide();
                        });
                        $('.js-store-finder-search-input, #cartype--dropDown, #brand--dropDown').on('change', function() {
                            $('.branch__details-wrapper').hide();
                            $('.branch__filter-wrapper').show();
                        });
                    }, 1000);
                }
            });
        },
        feedbackrating: function() {

            // validation
            $('.orderfeedback__rating').each(function() {
                if ($(this).find(".ratinglevel__item.active").length) {
                    $(this).find(".ratinglevel__item input").data("rule-required", false).removeClass("error");
                    $(this).find(".form-group").removeClass("error-element");
                    $(this).find(".orderfeedback__ratinglevel label.error").remove();
                }
            });

            $("#orderFeedbackForm .btn-validation").on("click", function() {
                if ($("#orderFeedbackForm").valid()) {
                    $("#orderFeedbackForm").submit();
                } else {
                    $('.orderfeedback__rating').each(function() {
                        if ($(this).find(".ratinglevel__item.active").length) {
                            $(this).find(".ratinglevel__item input").data("rule-required", false).removeClass("error");
                            $(this).find(".form-group").removeClass("error-element");
                            $(this).find(".orderfeedback__ratinglevel label.error").remove();
                        }
                    });
                }
            });

            var starRadio = $('.ratinglevel input[type="radio"]');

            starRadio.on('click', function() {
                var starRatingValue = $(this).val();
                var get_parent = $(this).parents('.orderfeedback__rating');
                get_parent.find('.ratinglevel__item ').removeClass('active');
                $(this).parents(".ratinglevel").find("input").prop("checked", false);
                get_parent.find('.ratingcontent li').hide().removeClass("active_feedback");
                $(this).parent().prevAll().addClass('active');
                var rating_val;
                if (starRatingValue == "ONE") {
                    rating_val = 1;
                } else if (starRatingValue == "TWO") {
                    rating_val = 2;
                } else if (starRatingValue == "THREE") {
                    rating_val = 3;
                } else if (starRatingValue == "FOUR") {
                    rating_val = 4;
                } else if (starRatingValue == "FIVE") {
                    rating_val = 5;
                } else {
                    rating_val = starRatingValue;
                }
                var ratinglevel = rating_val - 1;

                $(this).prop("checked", true);
                get_parent.find(".ratingcontent li:eq(" + ratinglevel + ")").show().addClass("active_feedback");

                if (get_parent.find(".ratinglevel__item.active").length) {
                    get_parent.find(".ratinglevel__item input").data("rule-required", false).removeClass("error");
                    get_parent.find(".form-group").removeClass("error-element");
                    get_parent.find(".orderfeedback__ratinglevel label.error").remove();
                }

                if (get_parent.find(".feedback-comments").not("hide")) {
                    get_parent.find(".feedback-comments").addClass("hide");
                }

            });

            $('.orderfeedback__ratingitem input[type="radio"]').on('click', function() {
                $(this).parents(".orderfeedback__ratingitems").find('input[type="radio"]').removeClass('error');
                $(this).parents('.orderfeedback__ratingitems').find('.orderfeedback__ratingitem').removeClass('active');
                $(this).parent('.orderfeedback__ratingitem').addClass('active');
            });

            var otherValue = "other",
                BahasaOtherValue = "lain";
            $('.orderfeedback__ratingitem input[type="radio"]').each(function() {
                $(this).on("click", function() {
                    if ($(this).val().toLowerCase() == otherValue || $(this).val().toLowerCase() == BahasaOtherValue) {
                        $(this).parents(".orderfeedback__rating").find(".feedback-comments").removeClass("hide");
                    } else {
                        $(this).parents(".orderfeedback__rating").find(".feedback-comments").addClass("hide");
                    }
                });
            });

            $(".ratinglevel__item").each(function() {
                $(this).on("click", function() {
                    $(this).parents(".orderfeedback__rating").find(".orderfeedback__ratingitems.active_feedback .orderfeedback__ratingitem").each(function() {
                        $(this).find("input[type='radio']").prop("checked", false);
                        $(this).removeClass("active");
                    });
                });
            });
        },

        getCartCount: function() {

            $('.addBundleToCartButton').on("click", function() {
            	$(".add_to_cart_form").removeClass('bundleForm-active');
            	$(this).closest(".add_to_cart_form").addClass('bundleForm-active');
            	var currentCode = $(".bundleForm-active").find("input[name='serviceProductCode']").val();
                $.ajax({
                    url: ACC.config.contextPath + '/sevaservice/cart-count',
                    type: 'GET',
                    data: {},
                    success: function(data) {

                        /**
                        if (data) {
                            $('#confirm-add-bunddle-popup-Modal').modal('show');
                        } else {
                            $('#addBundleToCartForm' + '_' + currentCode).submit();
                        } */
                        $('#addBundleToCartForm' + '_' + currentCode).submit();
                        $("input[name='isCartNotEmpty']").val(data);
                    }
                });
            });

        },

        getOrderStatus: function() {

            if ($("body").find("#order_status").length) {
                var orderCode = $("#order_code").html().trim();
                var orderType = $("#order_type").val();
                var orderTypeTestDrive = $("#order_type_test_drive").text();
                var brand = $("#brand").html().trim();
                var bookingType = $("#booking_type").val();
                $.ajax({
                    url: ACC.config.contextPath + "/" + ACC.config.lang + '/my-account/orderStatus/',
                    type: 'GET',
                    data: {
                        'orderCode': orderCode,
                        'orderType': orderType,
                        'orderTypeTestDrive': orderType,
                        'brand': brand,
                        'bookingType': bookingType
                    },
                    success: function(data) {
                        $("#order-status-form").html(data).removeClass('content-loader');
                        $("#SEO_text_container").tinyscrollbar({
                            thumbSize: 1
                        });
                        $(".status-details ul").hide();
                        $(".status-details").find("ul" + $(".status-chart ul li.active").data("status")).show();
                        if ($(window).width() > 990) {
                            $(".status-chart ul li.order-complete").on("mouseover", function() {
                                $(".status-details ul").hide();
                                $(".status-chart ul li").removeClass("active");
                                $(this).addClass("active");
                                $(".status-details").find("ul" + $(this).data("status")).show();
                            });
                        } else {
                            $(".status-chart ul li.order-complete").on("click", function() {
                                $(".status-details ul").hide();
                                $(".status-chart ul li").removeClass("active");
                                $(this).addClass("active");
                                $(".status-details").find("ul" + $(this).data("status")).show();
                            });
                        }
                        var overflow_tab_li_count = $("#status .overflow_tab").find("li").length;
                        var overflow_tab_li_width = $("#status .overflow_tab").find("li").outerWidth();
                        var currentStatus = $("[id^=car_order_status]:last").val();




                        if ($(window).width() < 990) {
                            $("#status .overflow_tab").width(overflow_tab_li_count * overflow_tab_li_width);
                        }
                        $('#order_newcar_creation_status').text(defaultValueProviderByText('#order_creation'));
                        $('#order_newcar_dealer_location').text(defaultValueProviderByVal('#newcar_SalesSource_status'));
                        $('#order_newcar_agent_name').text(defaultValueProviderByText('#newcar_salesManName_status'));
                        $('#order_newcar_actual_brand').text(defaultValueProviderByVal('#newcar_brand_status'));
                        $('#order_newcar_actual_model').text(defaultValueProviderByVal('#newcar_model_status'));
                        $('#order_carURL').attr('src', $("#newcar_carURL").val());
                        $('#testdriveorder_carURL').attr('src', $("#testdrivecar_carURL").val());

                        $('#order_newcar_actual_year').text(defaultValueProviderByVal('#newcar_year_status'));
                        $('#order_newcar_actual_color').text(defaultValueProviderByVal('#newcar_color_status'));

                        var actualDeliveryDate = $('#newcar_actualDeliveryDate_status').text();
                        if (actualDeliveryDate == "" || actualDeliveryDate == "-") {
                            $('#order_newcar_schedule_date').text($('#newcar_planDeliveryDate_status').text() == "" ? "-" : $('#newcar_planDeliveryDate_status').text());
                        } else if (actualDeliveryDate != "" || actualDeliveryDate != "-") {
                            $('#order_newcar_schedule_date').text($('#newcar_actualDeliveryDate_status').text() == "" ? "-" : $('#newcar_actualDeliveryDate_status').text())
                        }
                        $('#order_newcar_dPAmount').text(defaultValueProviderByText('#newcar_DPAmount_status'));
                        $('#car_model_status').text(defaultValueProviderByText('#car_model'));
                        $('#car_job_type_status').text(defaultValueProviderByText('#car_job_type'));
                        $('#car_engine_number_status').text(defaultValueProviderByText('#car_engine_number'));
                        $('#car_police_number_status').text(defaultValueProviderByText('#car_police_number'));
                        $('#order_creation_status').text(defaultValueProviderByText('#order_creation'));
                        $('#order_creation_booking_Date').text(defaultValueProviderByText('#order_creation'));
                        $('#order_newcar_creation_credit_tenure').text(defaultValueProviderByVal('#status_order_newcar_creation_credit_tenure'));
                        $('#order_newcar_creation_credit_installment').text(defaultValueProviderByVal('#status_order_newcar_creation_credit_installment'));
                        $('#order_newcar_tradein_price').text(defaultValueProviderByVal('#status_tradein_price'));
                        $('#order_newcar_price_tradein').text(defaultValueProviderByVal('#status_tradein_price'));

                        $('#requested_model_status').text(defaultValueProviderByText('#requested_model'));
                        $('#order_status_order_year_tenure_year_lable').text($('#status_order_year_tenure_year_lable').val());
                        $("#order_carURLPresent").val($("#carURLPresent").val());
                        var carURL = $("#newcar_carURL").val();
                        if(carURL==""){
                        	var notFountUrl = ACC.config.themeResourcePath + "/images/product_image/astra-no-image.png";
                        	 $('#order_carURL').attr('src', notFountUrl);
                        } else if (carURL!=""){
                        	 $('#order_carURL').attr('src', carURL);
                        }

                        $("#testdriveorder_carURLPresent").val($("#carURLPresent").val());
                        var carURL = $("#testdrivecar_carURL").val();
                        if(carURL==""){
                          var notFountUrl = ACC.config.themeResourcePath + "/images/product_image/astra-no-image.png";
                             $('#testdriveorder_carURL').attr('src', notFountUrl);
                        } else if (carURL!=""){
                              $('#testdriveorder_carURL').attr('src', carURL);
                        }


                        // default value if the value is empty or undefined
                        function defaultValueProviderByVal(elementId) {
                            return $(elementId).val() == "" ? "-" : $(elementId).val() == undefined ? "-" : $(elementId).val()

                        }
                        // default value if the value is empty or undefined
                        function defaultValueProviderByText(elementId) {
                            return $(elementId).text() == "" ? "-" : $(elementId).text() == undefined ? "-" : $(elementId).text()

                        }

                        var newcarrequestedModel = $('#requested_model').text().trim().toLowerCase();
                        var newcarrequestedBrand = $('#brand').text().trim().toLowerCase();
                        var newcarrequestedColor = $('#requested_color').text().trim().toLowerCase();
                        var newcaractualModel = $('#order_newcar_actual_model').text().trim().toLowerCase();
                        var newcaractualBrand = $('#order_newcar_actual_brand').text().trim().toLowerCase();
                        var newcaractualColor = $('#order_newcar_actual_color').text().trim().toLowerCase();


                        if (newcarrequestedModel === newcaractualModel && newcarrequestedBrand === newcaractualBrand && newcarrequestedColor === newcaractualColor) {
                            $('.actualNewCarDetails').addClass('disable');
                        }

                        var totalPrice = $("#ordertotalPrice").text();
                        if (totalPrice != '') {
                            totalPrice = totalPrice.replace(/[.]/g, "");
                        }
                        var newtotalPrice = totalPrice.replace('Rp ', '');
                        var tradeInPrice = $("#order_newcar_tradein_price").text();
                        if (tradeInPrice != '-' && tradeInPrice != '') {
                            tradeInPrice = tradeInPrice.replace(/[.]/g, "");
                            var newtradeInPrice = tradeInPrice.replace('Rp ', '');
                            var amountPaid = parseInt(newtotalPrice) - parseInt(newtradeInPrice);
                            $('#tradein_amountpaid').text('Rp. ' + amountPaid.toLocaleString('id'));
                        } else {
                            $('#tradein_amountpaid').text($('#ordertotalPrice').text());
                        }






                        $(document).on("click", '#order-feedback-status', function() {
                            $(this).prop('href', ACC.config.encodedContextPath + '/order-feedback?orderCode=' + orderCode);
                        });

                        $('#order-feedback-status').prop('href', ACC.config.encodedContextPath + '/order-feedback?orderCode=' + orderCode);


                        $('#car_orderstatus').text(currentStatus);

                        if ('Service In Branch' === bookingType) {
                            $('#car_service_advisor_name').text(defaultValueProviderByText('#car_service_advisor_name_status'));
                            $('#car_service_branch_name').text(defaultValueProviderByText('#car_service_branch_name_status'));
                            $('#car_service_invoice_amount').text(defaultValueProviderByText('#car_service_invoice_amount_status'));
                            $('#car_service_spare_parts').text(defaultValueProviderByText('#car_service_spare_parts_status'));
                            $('#car_service_type_status').text(defaultValueProviderByText('#car_service_type'));
                            $('#car_service_notes_status').text(defaultValueProviderByText('#car_service_notes'));
                            $('#car_service_branch_name_status').text(defaultValueProviderByText('#car_service_branch_name'));
                            $('#car_service_chasis_number_status').text(defaultValueProviderByVal('#car_service_chasis_number'));
                            //If current status is Request Sent than only remove hide class from cancel button 
                            if ('Request Sent' === currentStatus || 'Permintaan terkirim' === currentStatus) {
                                $('#order_cancel_button').removeClass('hide');
                            }
                        }

                        if ('Home Service' === bookingType) {
                            $('#car_service_invoice_amount').text(defaultValueProviderByText('#car_service_invoice_amount_status'));
                            $('#car_service_spare_parts').text(defaultValueProviderByText('#car_service_spare_parts_status'));
                            $('#car_service_advisor_name').text(defaultValueProviderByText('#car_service_mechanic_name_status'));
                            $('#request_sent_status').text(defaultValueProviderByText('#order_creation'));
                            $('#car_service_type_status').text(defaultValueProviderByText('#car_service_type'));
                            if ('Request Sent' === currentStatus || 'Permintaan terkirim' === currentStatus) {
                                 $('#order_cancel_button').removeClass('hide');
                            }
                        }

                        if ('Test Drive' === orderTypeTestDrive) {
                            $('#order_agentName').text(defaultValueProviderByText('#order_testdrive_agentName_status'));
                            $('#order_actualModel').text(defaultValueProviderByText('#order_testdrive_actualModel_status'));
                            $('#order_actualBrand').text(defaultValueProviderByText('#order_testdrive_actualBrand_status'));
                            $('#order_dealeraddress').text(defaultValueProviderByText('#order_testdrive_dealeraddress_status'));
                            $('#requestedcar_testdrive_model').text(defaultValueProviderByText('#car_testdrive_model'));

                            var requestedModel = $('#car_testdrive_model').text().trim().toLowerCase();
                            var actualModel = $('#order_testdrive_actualModel_status').text().trim().toLowerCase();
                            var actualBrand = $('#order_testdrive_actualBrand_status').text().trim().toLowerCase();
                            var requestedBrand = $('#brand').text().trim().toLowerCase();

                            if (requestedModel === actualModel && requestedBrand === actualBrand) {
                                $('.actualCarDetails').addClass('disable');
                            }
                        }

                        var dateFormatList = ['.confirmstatus1', '.confirmstatus2', '.completestatus1', '.completestatus2', '.requestsentdate', '.paymentDateTime1', '.paymentDateTime2', '.paymentDateTime3', '.paymentDateTime4', '.requestCompleteDateTime1', '.requestCompleteDateTime2', '.finishDateTime1', '.finishDateTime2', '.finalCheckDateTime1', '.finalCheckDateTime2', '.finalCheckDateTime3', '.finalCheckDateTime4', '.serviceDateTime1', '.serviceDateTime2', '.serviceDateTime3', '.serviceDateTime4', '.waitingServiceDateTime1', '.waitingServiceDateTime2', '.waitingServiceDateTime3', '.waitingServiceDateTime4', '.receptionDateTime1', '.receptionDateTime2', '.inGateDateTime1', '.inGateDateTime2', '.orderCancelledDate1', '.orderCancelledDate2', '.orderCancelledDate3', '.orderCancelledDate4', '.serviceScheduleDateTime1', '.serviceScheduleDateTime2'];
                        for (var i = 0; i < dateFormatList.length; i++) {
                            dateFormatExpected($(dateFormatList[i]));
                        }
                    },
                    error: function(result) {
                        $("#order-status-form").removeClass('content-loader');
                        $("#server_error").show();
                    }
                });
            }
        },
        menuTypeSplit: function() {
            var menuParent = $('.submenu_first');
            for (var i = 0; i < menuParent.length; i++) {
                var menuDivs = $(menuParent[i]).find('.submenu_first_types > .submenu_second > li ');
                for (var j = 0; j < menuDivs.length; j += 4) {
                    menuDivs.slice(j, j + 4).wrapAll("<ul class='menu_wrap'></ul>");
                }
            }
        },
        menuBrandSplit: function() {
            var menuParent = $('.submenu_first');
            for (var i = 0; i < menuParent.length; i++) {
                var menuDivs = $(menuParent[i]).find('.submenu_first_brands > .submenu_second > li ');
                for (var j = 0; j < menuDivs.length; j += 4) {
                    menuDivs.slice(j, j + 4).wrapAll("<ul class='menu_wrap'></ul>");
                }
            }

        },
        addBunddle: function() {

            var isCartNotEmpty = $(".isCartNotEmpty").val();
            if (isCartNotEmpty == "true") {
                $(".addBundleToCartButton").attr("type", "button");
                $(".addBundleToCartButton").attr("data-target", "#confirm-add-bunddle-popup-Modal");
                $(".addBundleToCartButton").attr("data-toggle", "modal");
            } else {
                $(".addBundleToCartButton").removeAttr("data-target");
                $(".addBundleToCartButton").removeAttr("data-toggle");
                $(".addBundleToCartButton").attr("type", "submit");
            }
        },

        howToSell: function(){
        },

        validateVoucher: function() {

            function displayError() {
                $("#voucherStatusFailure").show();
                $("#voucherStatusSuccess").hide();

                $('.voucher_code').addClass('voucher_code--error');
                $('.voucher_code').removeClass('voucher_code--verified');
            }

            $("#js-validate-voucher-btn").on("click", function(e) {
                $.ajax({
                    url: ACC.config.contextPath + '/sevaservice/validate-coupon',
                    data: {
                        'cartType': $.trim($("#cartType").val()),
                        'couponCode': $.trim($("#couponCode").val()),
                    },
                    type: 'GET',
                    success: function(data) {
                        if (data == true) {
                            $("#voucherStatusSuccess").show();
                            $("#voucherStatusFailure").hide();

                            $('.voucher_code').addClass('voucher_code--verified');
                            $('.voucher_code').removeClass('voucher_code--error');
                        } else {
                            displayError();
                        }
                    },
                    error: function() {
                        displayError();
                    }

                });
            });
        },
        loginRedirectTo : function() {
            if($("#id_login_wp") != null) {
                var loginUrl = $("#id_login_wp").attr("href");
                var currentUrl = window.location.href;
                var queryString = window.location.search;
                var finalUrl;
                if (queryString == "") {
                    finalUrl = loginUrl + "?redirectTo=" + currentUrl+"?refresh=true";
                } else {
                    finalUrl = loginUrl + "?redirectTo=" + currentUrl+"&refresh=true";
                }
                $("#id_login_wp").attr("href", finalUrl);
            }
        },

        init: function() {
            var _self = astra.global;
            _self.myNeedsSlctdImgs = {};
            _self.home();
            _self.common();
            _self.pdpPage();
            _self.comparePane();
            _self.myNeeds();
            _self.emptyCartPage();
            _self.formValidationInt();
            _self.cart();
            //_self.orderPages();
            _self.staticPages();
            _self.chat();
            _self.myVehicle();
            _self.fetchHolidayDatesForBranch();
            _self.plp();
            _self.bookAppoinment();
            _self.imageUpload();
            _self.creditCalc();
            _self.checkout();
            _self.dealerLocator();
            _self.feedbackrating();
            _self.getOrderStatus();
            _self.getCartCount();
            _self.menuTypeSplit();
            _self.menuBrandSplit();
            _self.loginRedirectTo();
            astra.global.astraLazyLoad.update();
            // _self.addBunddle();
            _self.validateVoucher();
            // _self.personalInfo();
            _self.howToSell();
            $('body').scrollspy({ target: '#list-example' });
            $('body').scrollspy({ target: '#navbar-example2' });

            if ($(".slick-dots li").length <= 1) {
                $('.slick-dots').css('display', 'none');
            }
            if ($(".tab-lg__button--active").attr("data-id") == "car__used-car") {
                $("#new_to_astra_type").val("USEDCAR");
            } else {
                $("#new_to_astra_type").val("NEWCAR");
            }


            if (sessionStorage.getItem("carType") == "USEDCAR") {
                $('[data-id="car__used-car"]').trigger("click");
            }

            sessionStorage.setItem("carType", "NEWCAR");
            if($(window).width() < 992){
            	$(".expert_choice_component").slick(expertSlickObject);
            	$(".expert_choice_component .wishlist-items").removeClass("col-sm-6 col-md-4 col-lg-4");
            }
            //onetwothree();            
            /*$("body").find(".current").addClass("active");
           
             $(".status-chart ul li.order-complete").each(function(){
                $(".status-details").find("ul").hide();
                $(".status-details").find("ul" + $(".status-chart ul li.current").data("status")).show();
                $(this).on("mouseover", function() {
                    $(".status-details ul").hide();
                    $(".status-chart ul li").removeClass("active");
                    $(this).addClass("active");
                    $(".status-details").find($(".status-chart ul")).hide();
                    $(".status-details").find("ul" + $(this).data("status")).show();
                }).on("mouseleave", function() {
                    $(".status-chart ul li").removeClass("active");
                    if ($(".status-chart ul li").hasClass("current")) {
                        $(".status-chart ul li").removeClass("active");
                        $(".status-chart ul li.current").addClass("active");
                       }
                       $(".status-details ul").hide();
                       $(".status-details").find("ul" + $(".status-chart ul li.current").data("status")).show();
                });
            })*/

            //$(".status-chart ul li")


            /* c
                $(".status-chart ul li").removeClass("active");
                $(this).addClass("active");
                $(".status-details").find("ul" + $(this).data("status")).show();
            } */

        }
    };
    astra.global.init();
    /*  JIRA-2619
    $(".__text").on('change', function() {
        if ($(".__text").val() =="") {
          $("#newslettersubscription").css("display", "inline-block");
        } else {
          $("#newslettersubscription").css("display", "none");
        }
      });*/

    /*if ($('#preferredDate').length > 0) {
        $('#preferredDate').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true,
        });
    }

    // Register new vehicle
    $('#expiredDate input').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
    });

    // Default date picker
    $('.astra-datepicker input').datepicker({
        format: 'dd-mm-yyyy',
        autoclose: true,
    });*/

    /* $(".icon-locate-dealer").on('click', function(event) {
       event.preventDefault();
       window.location.href = ACC.config.contextPath + "/store-finder?brand=" + document.getElementById("dealerLocatorBrand").value;
     });*/
})(jQuery);

function htmldecode(s) {
    window.HTML_ESC_MAP = {
        "nbsp": " ",
        "\"": "quot",
        "amp": "&",
        "lt": "<",
        "gt": ">",
        "circ": "ˆ",
        "tilde": "˜",
        "ndash": "–",
        "mdash": "—"
    };
    if (!window.HTML_ESC_MAP_EXP)
        window.HTML_ESC_MAP_EXP = new RegExp("&(" + Object.keys(HTML_ESC_MAP).join("|") + ");", "g");
    return s ? s.replace(window.HTML_ESC_MAP_EXP, function(x) {
        return HTML_ESC_MAP[x.substring(1, x.length - 1)] || x;
    }) : s;
    //console.log("what's happening");
}

function dateFormatFunction(responsedate) {
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    var d = new Date(responsedate);
    var n = d.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    var formateddate = d.getDate() + " " + monthNames[d.getMonth()] + " " + d.getFullYear() + ", " + n;
    return formateddate;
}

function dateFormatExpected(elem) {
    /*
     * Accepts a date, a mask, or a date and a mask.
     * Returns a formatted version of the given date.
     * The date defaults to the current date/time.
     * The mask defaults to dateFormat.masks.default.
     */
    var dateFormat = function() {
        var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
            timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
            timezoneClip = /[^-+\dA-Z]/g,
            pad = function(val, len) {
                val = String(val);
                len = len || 2;
                while (val.length < len) val = "0" + val;
                return val;
            };

        // Regexes and supporting functions are cached through closure
        return function(date, mask, utc) {
            var dF = dateFormat;

            // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
            if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                mask = date;
                date = undefined;
            }

            // Passing date through Date applies Date.parse, if necessary
            date = date ? new Date(date) : new Date;
            if (isNaN(date)) throw SyntaxError("invalid date");

            mask = String(dF.masks[mask] || mask || dF.masks["default"]);

            // Allow setting the utc argument via the mask
            if (mask.slice(0, 4) == "UTC:") {
                mask = mask.slice(4);
                utc = true;
            }

            var _ = utc ? "getUTC" : "get",
                d = date[_ + "Date"](),
                D = date[_ + "Day"](),
                m = date[_ + "Month"](),
                y = date[_ + "FullYear"](),
                H = date[_ + "Hours"](),
                M = date[_ + "Minutes"](),
                s = date[_ + "Seconds"](),
                L = date[_ + "Milliseconds"](),
                 o = utc ? 0 : date.getTimezoneOffset(),
                flags = {
                    d: d,
                    dd: pad(d),
                    ddd: dF.i18n.dayNames[D],
                    dddd: dF.i18n.dayNames[D + 7],
                    m: m + 1,
                    mm: pad(m + 1),
                    mmm: dF.i18n.monthNames[m],
                    mmmm: dF.i18n.monthNames[m + 12],
                    yy: String(y).slice(2),
                    yyyy: y,
                    h: H % 12 || 12,
                    hh: pad(H % 12 || 12),
                    H: H,
                    HH: pad(H),
                    M: M,
                    MM: pad(M),
                    s: s,
                    ss: pad(s),
                    l: pad(L, 3),
                    L: pad(L > 99 ? Math.round(L / 10) : L),
                    t: H < 12 ? "a" : "p",
                    tt: H < 12 ? "am" : "pm",
                    T: H < 12 ? "A" : "P",
                    TT: H < 12 ? "AM" : "PM",
                    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                };

            return mask.replace(token, function($0) {
                return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
            });
        };
    }();

    // Some common format strings
    dateFormat.masks = {
        "default": "ddd mmm dd yyyy HH:MM:ss",
        shortDate: "m/d/yy",
        mediumDate: "mmm d, yyyy",
        longDate: "mmmm d, yyyy",
        fullDate: "dddd, mmmm d, yyyy",
        shortTime: "h:MM TT",
        mediumTime: "h:MM:ss TT",
        longTime: "h:MM:ss TT Z",
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
    };

    // Internationalization strings
    dateFormat.i18n = {
        dayNames: [
            "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ],
        monthNames: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ]
    };

    // For convenience...
    Date.prototype.format = function(mask, utc) {
        return dateFormat(this, mask, utc);
    };

    var $this = $(this);
    $this = elem;
    if ($this.text()) {
        expectedDate = new Date($this.text());
        var dateString = expectedDate.format("dd mmm yyyy, HH:MM:ss tt");
        $this.text(dateString);
    }
};
$(document).ready(function() {
    $("#status").change(function () {
        var urlPath = $(this).parents(".__dropdown-content").find(".url-path-vehicles-page").val();
        var el = $(this);
        if(el.val() === 'All' ) {
            window.open(ACC.config.encodedContextPath + urlPath +encodeURIComponent($(this).val()),"_self");
        }else{
            window.open(ACC.config.encodedContextPath + urlPath +encodeURIComponent($(this).val()),"_self");
        }
    });
    if(sessionStorage.getItem("isFacet")=="true"){
    	$('html, body').animate({
            scrollTop: $('.producting-listing').offset().top -151
        }, 500);
    	sessionStorage.setItem("isFacet",false);
    }
    $(".expert_choice_container button").click(function () {
    	sessionStorage.setItem("isFacet",true);
    });
    $(".product--filter a").click(function () {
    	sessionStorage.setItem("isFacet",true);
    });

    function removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }

    $(".__filerName").click(function(){
            var formatDataFilter = $(this).attr('data-filter').replace(" ", "_");
            var strTest = sessionStorage.getItem("text"+formatDataFilter);
            var arrayTest = strTest.split(', ');
            var deleteTest = $(this).attr('id').toString();
            var resultA = removeA(arrayTest, deleteTest);
            sessionStorage.setItem("text"+formatDataFilter, resultA.join(", "));
    });

    //video gallery
    if($(".page-astraNewCarDetailsPage").length > 0 || $(".page-astraUsedCarDetailsPage").length > 0) {

    		//$('#iframevideo')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    		$(".thumbanil--link").click(function () {
		            var videoURL = $(this).attr('data-video');
		            var oldVideo = $("#iframevideo")[0].src;

		            var VID_REGEX1 = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
		            	/*$(this).find("img").attr("src","https://img.youtube.com/vi/" + oldVideo.match(VID_REGEX1)[1] +"/default.jpg")
		                $(this).attr("data-video", oldVideo);*/
		                $("#iframevideo")[0].src = videoURL;
		    });

		        $('.thumbanil--link').each(function (index, value) {
		          var url=$(this).data("video");
		          var VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
		          $(this).find("img").attr("src","https://img.youtube.com/vi/" + url.match(VID_REGEX)[1] +"/default.jpg")

		        });

    }

});

$(document).ready(function(){
var preUrl=document.referrer;
var hrefVal = $("#removeCartProduct").attr("href");
$("#removeCartProduct").attr("href",hrefVal+"?preUrl="+urlEncode(preUrl))
});

function urlEncode(str) {
    return escape(str).replace(/\+/g, "%2B").replace(/"/g, "%22").replace(/'/g, "%27").replace(/\//g, "%2F").replace(/=/g, "%3D");
}

var getFormatValue = function(price) {
    var range = price,
        formatValue = range.split("."); //["Rp","100","949","00"]
    formatValue.shift(); //to remove first item
    return formatValue.join("").trim();
};




$( document ).ready(function() {
//show service category disclaimer when 'others' selected
    var selectedCtg = $("#serviceCategory").val();
    if (selectedCtg == 'OTHERS') {
        $("#categoryDisclaimer").show();
        $("#notesNotMandatory").hide();
        $("#notesMandatory").show();
    } else {
        $("#categoryDisclaimer").hide();
        $("#notesMandatory").hide();
        $("#notesNotMandatory").show();
    }

    $("#serviceCategory").change(function () {
        var selectedCategory = $("#serviceCategory").val();
        //alert(selectedCategory);
        if (selectedCategory == 'OTHERS') {
            $("#notesNotMandatory #notes").val(""); //emptying non-mandatory notes when others category selected
            $("#categoryDisclaimer").show();
            $("#notesNotMandatory").hide();
            $("#notesMandatory").show();
        } else {
            $("#notesMandatory #notes").val(""); //emptying mandatory notes when non-others category selected
            $("#categoryDisclaimer").hide();
            $("#notesMandatory").hide();
            $("#notesNotMandatory").show();
        }
    });
	$('.powerful-engines-wpr .engine-item:eq(0)').addClass('showDiv');

	// $('#engine-types').on('change', function() {
	// 	$('.engine-item').removeClass('showDiv');
	// 	$('#engine-item-' + $(this).val()).addClass('showDiv');
    //
	// 	$(".showDiv .totalDescBlock1").removeAttr("style");
	// 	if($(".showDiv .totalDescBlock1").height() > 150){
	// 		$(".showDiv .totalDescBlock1").css({"height":"150px","overflow":"hidden"});
	// 		$(".showDiv #readMoreLink").css("display", "inline-block");
	// 	}else{
	// 		$(".showDiv .totalDescBlock1").css({"height":"auto"});
	// 		$(".showDiv #readMoreLink").css("display", "none");
	// 	}
    //
	// 	$(".showDiv #readMoreLink").on("click", function(){
	// 	   var totalDescription = $(".showDiv .totalDescBlock1").text();
	// 		$(".showDiv .totalDescBlock1").css({"height":"auto","overflow":"visible"});
	// 		$(".showDiv #readMoreLink").css("display", "none");
	// 		$(".showDiv #readLessLink").css({"display": "inline-block"});
	// 	})
    //
	// 	$(".showDiv #readLessLink").on("click", function(){
	// 		$(".showDiv .totalDescBlock1").css({"height":"150px","overflow":"hidden"});
	// 		$(".showDiv #readMoreLink").css("display", "inline-block");
	// 		$(".showDiv #readLessLink").css({"display": "none"});
	// 	});
    //
	// });


	if($(".showDiv .totalDescBlock1").height() > 150){
		$(".showDiv .totalDescBlock1").css({"height":"150px","overflow":"hidden"});
		$(".showDiv #readMoreLink").css("display", "inline-block");
	}else{
		$(".showDiv .totalDescBlock1").css({"height":"auto"});
		$(".showDiv #readMoreLink").css("display", "none");
	}

	$(".showDiv #readMoreLink").on("click", function(){
	   var totalDescription = $(".showDiv .totalDescBlock1").text();
		$(".showDiv .totalDescBlock1").css({"height":"auto","overflow":"visible"});
		$(".showDiv #readMoreLink").css("display", "none");
		$(".showDiv #readLessLink").css({"display": "inline-block"});
	})

	$(".showDiv #readLessLink").on("click", function(){
		$(".showDiv .totalDescBlock1").css({"height":"150px","overflow":"hidden"});
		$(".showDiv #readMoreLink").css("display", "inline-block");
		$(".showDiv #readLessLink").css({"display": "none"});
	});



    if($(window).width() < 768){
        $(".showDiv .totalDescBlock1").css({"height":"150px","overflow":"hidden"});
        $(".showDiv #readMoreLink").css("display", "inline-block");
        $(".showDiv #readLessLink").css({"display": "none"});
    }
    $(".showDiv .totalDescBlock1").removeAttr("style");
    if($(".showDiv .totalDescBlock1").height() > 150){
        if( $('.showDiv #readLessLink').css('display') == 'inline-block' ) {
            $(".showDiv .totalDescBlock1").css({"height":"auto","overflow":"visible"});
            $(".showDiv #readMoreLink").css("display", "none");
            $(".showDiv #readLessLink").css({"display": "inline-block"});
        }else{
            $(".showDiv .totalDescBlock1").css({"height":"150px","overflow":"hidden"});
            $(".showDiv #readMoreLink").css("display", "inline-block");
        }
    }else{
        $(".showDiv .totalDescBlock1").css({"height":"auto"});
        $(".showDiv #readMoreLink").css("display", "none");
    }
	


    //PDP More than 6 Colors
    $('.product-color').slick({
    	infinite:false,
		slidesToShow: 6,
		slidesToScroll: 1,
		vertical:true,
		arrows: true,
		responsive: [{
		        breakpoint: 1024,
		        settings: {
		            slidesToShow: 6,
		            slidesToScroll: 1,
		            arrows: true,
		        }
		    },
		    {
		        breakpoint: 794,
		        settings: {
		            slidesToShow: 6,
		            slidesToScroll: 1,
		            arrows: true,
		        }
		    }
		]
	});

    // Changes for PDP specification   
       var size_li = $(".showDiv .specification-li li").length;
       var limit = 5;
       if(size_li < 6){
       	$('.showDiv .specification-li li:lt('+size_li+')').show();
       	$('.showDiv #readMoreLinkSpec').hide();
       	$('.showDiv #readLessLinkSpec').hide();
       }
       else
       	{

       	$('.showDiv .specification-li li:lt('+limit+')').show();

       	$('.showDiv #readMoreLinkSpec').show();
   	      $('.showDiv #readMoreLinkSpec').click(function () {
   	    	  limit = size_li;
   	    	  limit= (limit <= size_li) ? limit : size_li;
   	      $('.showDiv .specification-li li:lt('+limit+')').show();
   	     	$('.showDiv #readMoreLinkSpec').hide();
   	    	$('.showDiv #readLessLinkSpec').show();
   	  });
           $('#readLessLinkSpec').click(function () {
           var limit = 5;
           $('.showDiv .specification-li li:lt('+size_li+')').hide();
           $('.showDiv .specification-li li:lt('+limit+')').show();
        	$('.showDiv #readMoreLinkSpec').show();
       	$('.showDiv #readLessLinkSpec').hide();
           });
       }
       $('#engine-types').on('change', function() {
           var size_li = $(".showDiv .specification-li li").length;
           var limit = 5;
           if(size_li < 6){
           	$('.showDiv .specification-li li:lt('+size_li+')').show();
           	$('.showDiv #readMoreLinkSpec').hide();
           	$('.showDiv #readLessLinkSpec').hide();
           }
           else
           {
           	$('.showDiv .specification-li li:lt('+size_li+')').hide();
           	$('.showDiv #readMoreLinkSpec').hide();
           	$('.showDiv #readLessLinkSpec').hide();
           	$('.showDiv .specification-li li:lt('+limit+')').show();
           	$('.showDiv #readMoreLinkSpec').show();
           	$('.showDiv #readMoreLinkSpec').click(function () {
           		limit = size_li;
           		limit= (limit <= size_li) ? limit : size_li;
       	      $('.showDiv .specification-li li:lt('+limit+')').show();
       	      $('.showDiv #readMoreLinkSpec').hide();
       	      $('.showDiv #readLessLinkSpec').show();
       	  });
               $('.showDiv #readLessLinkSpec').click(function () {
               var limit = 5;
              $('.showDiv .specification-li li:lt('+size_li+')').hide();
              $('.showDiv .specification-li li:lt('+limit+')').show();
            	$('.showDiv #readMoreLinkSpec').show();
          	$('.showDiv #readLessLinkSpec').hide();
              });
          }
      });

       	// Kilometer, Price Formatter 
       $(".number-formatter #kilometer,.number-formatter #cylinderCapacity,.number-formatter #price,.number-formatter #odometer").keyup(function (e) {
   	    formatNumberDot($(this));
   		});
   		function formatNumber(n) {
   		  // format number 1000000 to 1,234,567
   		  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
   		}
   		function formatNumberDot(input) {
   		  var input_val = input.val();    		 
   		  if (input_val === "") { return; }    		 
   		  var original_len = input_val.length;
   		  var caret_pos = input.prop("selectionStart");
   		    input_val = formatNumber(input_val);
   		    input_val = input_val;
   		  input.val(input_val);
   		  var updated_len = input_val.length;
   		  caret_pos = updated_len - original_len + caret_pos;
   		  input[0].setSelectionRange(caret_pos, caret_pos);   		  
   		}
   		var kilometer = $('.number-formatter #kilometer').val();
   		if($('.number-formatter #kilometer').val() != null && $('.number-formatter #kilometer').val() != ''){
		kilometer = formatNumber(kilometer);
		$('.number-formatter #kilometer').val(kilometer);
   		}   		
		var cylinder = $('.number-formatter #cylinderCapacity').val();
		if($('.number-formatter #cylinderCapacity').val() != null && $('.number-formatter #cylinderCapacity').val()	 != ''){
		cylinder = formatNumber(cylinder);
		$('.number-formatter #cylinderCapacity').val(cylinder);
		}
		var price = $('#price').val();
		if($('.number-formatter #price').val() != null && $('.number-formatter #price').val() != ''){
		price = formatNumber(price);
		$('.number-formatter #price').val(price); 
		}
		var odometer = $('#odometer').val();
		if($('.number-formatter #odometer').val() != null && $('.number-formatter #odometer').val() != ''){
		odometer = formatNumber(odometer);
		$('.number-formatter #odometer').val(odometer); 
		}

});