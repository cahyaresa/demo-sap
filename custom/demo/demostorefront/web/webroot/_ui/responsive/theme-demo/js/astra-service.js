$(document).ready(function() {

    if($(".creditcal-condition").val()== "USEDCAR"){
		$("#year_block").show();
	}else{
		$("#year_block").hide();
	}

    $(".js-service-bookingtype-select").children().each(function(){
        if ($(this).val() === "Home Service" || $(this).val() === "Mobile Service"){
            $(this).text("Mobile Service");
        }
    })

    var afterClick = $(".js-service-bookingtype-select").next().find(".select2-selection");
    afterClick.on("click", function(){
        var cari = $(".js-service-bookingtype-select").parent().find("#select2-bookingType-results");
        cari.find("li").each(function(){
            if($(this)[0].id.indexOf("Home") > -1){
                $(this).text("Mobile Service");
            }
        })
    });

    var afterRefresh = $(".js-service-bookingtype-select").next().find("#select2-bookingType-container");
    afterRefresh.ready(function(){
        if(afterRefresh.attr("title") == "Home Service"){
            afterRefresh.text("Mobile Service");
        }
    })

    $(".js-service-bookingtype-select").on("select2:select", function(e){
        var afterRefresh = $(".js-service-bookingtype-select").next().find("#select2-bookingType-container");
        afterRefresh.ready(function(){
            if(afterRefresh.attr("title") == "Home Service"){
                afterRefresh.text("Mobile Service");
            }
        })
    })


    // Fetch Holidays for Booking service
function fetchHolidayDetails(branchCode){
  	if(branchCode){
  	$.ajax({
          url: ACC.config.contextPath + '/sevaservice/fetch-holidays',
          type: 'GET',
          data: {
              'branchCode': branchCode,
          },
          success: function(data) {
          	var holidays = data ;
          	for(var i = 0;i < holidays.length;i++){
          		holidays[i] = formatDate(holidays[i]);
          	}
          	var today = new Date();
        	today.setDate(today.getDate()+1);
          	var count = 0;
          	var hol = 0;
          	var dayOfWeek = today.getDay();
          	var limitDate = new Date();
          	limitDate.setDate(limitDate.getDate() + 15);
          	var get_no_of_days = getWorkingDatesCount(today,limitDate);
              var $input = $('#dob-datepicker input');
              $input.datepicker('destroy');
                  $input.datepicker({
                      format: 'dd-mm-yyyy',
                      autoclose: true,
                      startDate: startDate($input),
                      endDate: endDate($input),
                      daysOfWeekDisabled: [0,6],
                      datesDisabled:holidays,
                  }).on("changeDate", function(e) {
                      $(this).removeClass("error");
                      $(this).parents(".form-group").find("label.error").remove();
                  });
              function getWorkingDatesCount(startDate, endDate) {
                  var count = 0;
                  var hol = 0;
                  var curDate = new Date(startDate);
                  while (curDate <= endDate) {
                    var dayOfWeek = curDate.getDay();
                    if (!((dayOfWeek == 6) || (dayOfWeek == 0)) && (holidays.indexOf(formatDate(curDate)) == -1)) {
                      count++;
                      if(count<3){
                      	holidays.push(formatDate(curDate));
                      }
                      else{
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
          }
      });
  	}
   }
     	// Fetch Holidays for Booking service Ends Here
      $('.service-branchlocation #branch').on("select2:select", function() {
      	fetchHolidayDetails($(this).val());
      });

    var checkTestDriveLocation = function() {
        var branchCode = {
            'branchCode': $('.testdrive-brand').val()
        };
        var isHomeAvailalbe = $(".testdrive-brand").select2({
            minimumResultsForSearch: 6
        }).find(":selected").data("testdrive");
        var testDriveLocation = $('.testdrive-location');
        testDriveLocation.empty();
        testDriveLocation.append($("<option></option>").attr("value", "")
            .text(""));
            branchCode='';
        if (isHomeAvailalbe) {
            if($('#home').val() == "true"){
                testDriveLocation.append($("<option selected='selected'></option>").attr("value", "HOME").text("HOME"));
                testDriveLocation.append($("<option></option>").attr("value", "BRANCH").text("BRANCH"));
                $('.testDrive-address').show();
                $('.testdrive-branchlocation').hide();
            }else if($('#branch').val() == "true"){
                testDriveLocation.append($("<option></option>").attr("value", "HOME").text("HOME"));
                testDriveLocation.append($("<option  selected='selected'></option>").attr("value", "BRANCH").text("BRANCH"));
                branchCode = { 'branchCode':$('.testdrive-brand').val(),'orderTypeFlag': $('.orderTypeFlag').val()};
                getBranchCodeByBrandName(branchCode);
            }else{
                testDriveLocation.append($("<option></option>").attr("value", "HOME").text("HOME"));
                testDriveLocation.append($("<option></option>").attr("value", "BRANCH").text("BRANCH"));
            }
        } else {
            testDriveLocation.append($("<option></option>").attr("value", "BRANCH").text("BRANCH"));
        }
    };
    if ($('.testdrive-brand').val() != '') {
        checkTestDriveLocation();
    }
    if ($('#test-drive-date').length > 0) {
        $('#test-drive-date input').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true,
            startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        });
    }

    if ($('#dob-datepicker').length > 0) {
        $('#dob-datepicker input').datepicker({
            format: 'dd-mm-yyyy',
            autoclose: true,
            startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        });
    }

    $('.js-type1-select').on("change", function() {
        var brand = $(".js-servicetype-select").val();
        if (brand != null) {
            loadModel();
        }

    });

    var loadModel = function() {
        var options = {
            'brandCode': $(".js-servicetype-select").val(),
            'typeCode': $(".js-type1-select").val()
        };
        //console.log(JSON.stringify(options));
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/getModelList',
            async: false,
            data: options,
            type: 'GET',
            success: function(response) {

                var modelList = $('.js-servicemodel-select');
                modelList.empty();
                modelList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    modelList.append($("<option></option>").attr("value", value.code)
                        .attr("code", value.code).text(value.name));
                });
            }
        });
    };

    $('.js-servicetype-select').on("change", function() {

        $('.engineNoMandatory').find("span").remove();
        $("#engineNo").data('rule-required', false);

        if ($(this).val().toUpperCase() == 'DAIHATSU') {
            $('.engineNoMandatory').append('<span>*</span>');
            $("#engineNo").data('rule-required', true);
        }
    });

    // Model Variant for Book a service
    $(document).on("change", ".js-servicetype-select", function() {
        // var _self = $(this);
        var options = {
            'brandCode': $(".js-servicetype-select").val()

        };
        var branchCode = {
            'branchCode': $('.js-servicetype-select').val()
        };
        // Loading model
        loadModel();

        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/getBookingTypeList',
            async: true,
            data: options,
            type: 'GET',
            success: function(response) {

                var bookingyTypeList = $('.js-service-bookingtype-select');
                bookingyTypeList.empty();
                bookingyTypeList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    //console.log("value-->" + value.name);
                    if (value.code === "Home Service"){
                        bookingyTypeList.append($("<option></option>").attr("value", value.name)
                            .attr("code", value.code).text("Mobile Service"));
                    } else {
                        bookingyTypeList.append($("<option></option>").attr("value", value.name)
                            .attr("code", value.code).text(value.name));
                    }
                });
                $('.service-branchlocation, .service-address').hide();
            }
        });

        //loading branch
        //loadBranch();
    });

    var loadBranch = function() {
        var branchCode = {
            'branchCode': $('.js-servicetype-select').val(),
            'orderTypeFlag': $('.orderTypeFlag').val()
        };
        //console.log("---->TypeName"+$('.js-servicetype-select').val());
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-branches',
            async: true,
            data: branchCode,
            type: 'GET',
            success: function(response) {
                var branchList = $('.js-service-branch-select');
                branchList.empty();
                branchList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    branchList.append($("<option></option>").attr("value", value.name)
                        .attr("code", value.name).text(value.displayName));
                });

            },
            error: function(response) {
            	//
            }
        
        });
    };

    var loadBranchBookService = function() {
        var branchCode = {
            'branchCode': $('.js-servicetype-select').val(),
            'orderTypeFlag': $('.orderTypeFlag').val()
        };
        //console.log("---->TypeName"+$('.js-servicetype-select').val());
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-branches',
            async: true,
            data: branchCode,
            type: 'GET',
            success: function(response) {
                var branchList = $('.js-service-branch-select');
                branchList.empty();
                branchList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    branchList.append($("<option></option>").attr("value", value.name)
                        .attr("code", value.name).text(value.displayName));
                });
                $('.service-address').hide();
                $('.service-branchlocation').show();
                $("#bookServiceForm #dob-datepicker input, #bookServiceForm .timeWrapper select").prop("disabled", true);
                $("#testDriveForm #test-drive-date input, #testDriveForm .timeWrapper select").prop("disabled", true);
            },
            error: function(response) {
                var $input = $('#dob-datepicker input');
                datePicker($input);
                $('.service-address').hide();
                $('.service-branchlocation').hide();
                $("#bookServiceForm #dob-datepicker input, #bookServiceForm .timeWrapper select").prop("disabled", false);
                $("#testDriveForm #test-drive-date input, #testDriveForm .timeWrapper select").prop("disabled", false);
            }
        
        });
    };

    var loadVariants = function() {
        var options = {
            'brandCode': $(".js-servicetype-select").val(),
            'typeCode': $(".js-type1-select").val(),
            'modelCode': $(".js-servicemodel-select").val()
        };

        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/getVariantList',
            async: false,
            data: options,
            type: 'GET',
            success: function(response) {

                var variantList = $('.js-servicevariant-select');
                variantList.empty();
                variantList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    variantList.append($("<option></option>").attr("value", value.code)
                        .attr("code", value.code).text(value.name));
                });
                //$(".js-servicevariant-select").select2("destroy");
                // $('.js-serviceModel-title-filter').select2();
            }
        });
    };

    $(document).on("change", ".js-servicemodel-select", function() {
        loadVariants();
    });

    // Model Variant for Book a service

    // ASTRA-1689 OTP for Book a service
    $('#verify_bookservice_otp').click(function() {
        verifyOTP($('#service-mobileNumber').val(),$("#isdCode").attr('placeholder'),$('#otp').val(),function(data){

            //$('#bookServiceForm').submit();
            if (data.toLowerCase().indexOf("invalid") !== -1 || data.toLowerCase().indexOf("not valid") !== -1 || data.toLowerCase().indexOf("expired") !== -1) {
                $("#server_error").hide();
                $("#invalid_otp").show();

            } else {
                $("#server_error").hide();
                $("#invalid_otp").hide();
                $('#otp-popup-Modal').modal('hide');
                $('#success-message').addClass('show-error');
                $('#autoServiceForm').submit();
            }
        
        },function(error){
           	$("#server_error").show();
           });
    });

    $('#submit_book').click(function(e) {
        e.preventDefault();
        $("#server_error").hide();
        $("#invalid_otp").hide();
        $(".otp-popup-input-value").val("");
        $("#invalid_engineNo").hide();
        //    if ($(".js-servicetype-select").val() == 'DAIHATSU' && $('#engineNo').val() == '') {
        //      $("#invalid_engineNo").show();
        //      return false;
        //    }

        if ($('#bookServiceForm').valid() == true) {
            //console.log("-->" + JSON.stringify(serviceBookingOTPRequired));

            if ($('#serviceBookingOTPRequired').val() == 'true') {
               var mobileNumber=$('#service-mobileNumber').val()
            	var isdCode=$("#isdCode").attr('placeholder')
            	
            	requestForOTP(mobileNumber,isdCode,function(data){
            		 if (data === 'Invalid') {
                         $("#errorMessage").addClass("show-error");
                     } else {
                         $('#otp-popup-Modal').modal('show');
                     }
            	},function(error){
            		$("#serverMessage").addClass("show-error");
            	});

            } else {
                $('#bookServiceForm').submit();
            }

        } else {
            $('html, body').animate({
                'scrollTop': $(".form-group .error").parent().offset().top - 100,
            }, 'slow');
        }
    });

    $('#addressCartSubmit').on("click", function() {
        $('#bargainPrice').val($('#bargainprice').val());
        var validation = $("#autoServiceForm").valid();
        var emailPhoneValidationresult = false;
        if($('#service-email').valid() && $('#service-mobileNumber').valid()){
            emailPhoneValidationresult = validateCustomerEmailAndPhone($('#service-email').val(), $('#service-mobileNumber').val());
        }
        $('#gaClientId').val(ga.getAll()[0].get('clientId'));
        if (emailPhoneValidationresult) {
            $('#service-mobileNumber').val('');
            $('#loginModal').modal('show');
        } else if(validation) {
            if ($('#serviceBookingOTPRequired').val() != 'true') {
                $('#autoServiceForm').submit();
            } else {
                requestForOTP($('#service-mobileNumber').val(),$("#isdCode").attr('placeholder'),function(data){
                    if (data === 'Invalid') {
                        $("#errorMessage").addClass("show-error");
                    } else {
                        $('#otp-popup-Modal').modal('show');
                    }
                },function(error){
                    $("#serverMessage").addClass("show-error");
                });
            }
        }
    });

    var count = 1;
    $('#change-pwd-resend-otp').on("click", function(e) {
        var maxcount = parseInt($("#noOfAllowedAttemptsToSendOtp").val());
        var timeoutduration = parseInt($("#disableResendOtpLinkTimer").val());
        var cnt = count++;
        //console.log(cnt);
        if (cnt < maxcount) {
        	   requestForOTP($('#change_phone_number').val(),$("#isdCode").attr('placeholder'),function(data){
             		 if (data === 'Invalid') {
                          $("#errorMessage").addClass("show-error");
                      } else {
                          $('#otp-popup-Modal').modal('show');
                      }
             	},function(error){
             		$("#serverMessage").addClass("show-error");
             	});
        } else {

            /*count = 1;
            setTimeout(function() {

            }, timeoutduration);*/
            var sec = timeoutduration;

            if (sec > 100) {
                var seconds = sec / 1000;
            }

            if (seconds > 60) {
                var min = Math.floor(seconds / 60); //Get remaining minutes
                seconds -= min * 60;
            } else {
                min = 00;
            }
            $("#otp_text").show();
            document.getElementById('timer').innerHTML = ((min < 10) && (min.length < 2) ? '0' + min : min) + ":" + ((seconds < 10) && (seconds.length < 2) ? '0' + seconds : seconds);
            startTimer();
            count = 1;
        }
    });

    var countBook = 1;
    $('#book_a_service_otp').on("click", function(e) {
        var maxcount = parseInt($("#noOfAllowedAttemptsToSendOtp").val());
        var timeoutduration = parseInt($("#disableResendOtpLinkTimer").val());
        var cnt = countBook++;
        //console.log(cnt);
        if (cnt < maxcount) {
            sendOTP($('#service-mobileNumber').val(), $("#isdCode").attr('placeholder'));
        } else {

            /*count = 1;
            setTimeout(function() {

            }, timeoutduration);*/
            var sec = timeoutduration;

            if (sec > 100) {
                seconds = sec / 1000;
            }

            if (seconds > 60) {
                var min = Math.floor(seconds / 60); //Get remaining minutes
                seconds -= min * 60;
            } else {
                min = 00;
            }
            $("#otp_text").show();
            document.getElementById('timer').innerHTML = ((min < 10) && (min.length < 2) ? '0' + min : min) + ":" + ((seconds < 10) && (seconds.length < 2) ? '0' + seconds : seconds);
            startTimer();
            countBook = 1;
        }
    });

    $(document).on("change", ".testdrive-type", function(e) {
        var brand = $('.testdrive-brand').val();
        if (brand != null) {
            var options = {
                'selectedBrand': brand,
                'selectedType': $('.testdrive-type').val(),
                'testDrive':true
            };
            $.ajax({
                url: ACC.config.encodedContextPath + '/sevaservice/get-products',
                async: true,
                data: options,
                type: 'GET',
                success: function(response) {
                    var productList = $('.testdrive-model');
                    productList.empty();
                    var modelList = $('.testdrive-variant');
                    modelList.empty();
                    productList.append($("<option></option>").attr("value", "")
                        .text(""));
                    modelList.append($("<option></option>").attr("value", "")
                        .text(""));
                    $.each(response, function(key, value) {
                        productList.append($("<option></option>").attr("value", value.code)
                            .attr("id", value.code).text(value.name));
                    });

                }
            });
        }
    });

    $(document).on("change", ".testdrive-location", function(e) {
        $(".testdrive-branch").val('').trigger('change');
        $("input[name='callDate']").val("").datepicker("destroy").datepicker();
        var location = $(this).val();
        if (location == 'BRANCH') {            
            var branchCode = { 'branchCode':$('.testdrive-brand').val(),'orderTypeFlag': $('.orderTypeFlag').val()};
            getBranchCodeByBrandName(branchCode);
        } else if (location == 'HOME') {
            $('.testDrive-address').show();
            $('.testdrive-branchlocation').hide();
        }
    });



     $(document).on("change", ".js-service-bookingtype-select", function() {
        //alert("working");        
        $(".js-service-branch-select").val('').trigger('change');
        $("input[name='callDate']").val("").datepicker("destroy").datepicker();
        $('#callTime').val('').trigger('change');
        var location = $(this).val();
        //console.log("------>" + location.indexOf("Branch"));
        if (location!=null){
            if (location.indexOf("Branch") != -1 || location.indexOf("Body") != -1) {
               // loadBranchBookService();
               $('.js-service-province-wrapper').show();
			   $('.js-service-city-wrapper').show();
			   $('.service-branchlocation').show();
			   $('.js-service-province-select').val('').trigger('change');
                var cityList = $('.js-servicecity-select');
                cityList.empty();
            } else if (location.indexOf("Home") != -1) {
                if ($("#isLoggedIn").val()=="true"){
                    //$('.service-address').show();
                    $('.service-branchlocation').hide();
                    var province = $('#astra-province').val();
                    var city = $('#astra-city').val();
                    loadCityByProvince(province);
                    $('.js-service-province-select').val(province).trigger('change');
                    selector2('.js-servicecity-select',city);
                    $('.js-service-province-wrapper').show();
			        $('.js-service-city-wrapper').show();
                } else {
                   // $('.js-service-bookingtype-select').val(null);
                    // $('.js-service-bookingtype-select').change();
                	$('.js-service-province-select').val('').trigger('change');
                	$('.js-servicecity-select').val('').trigger('change');
                    $('.js-service-province-wrapper').show();
			        $('.js-service-city-wrapper').show();
                    $('.service-branchlocation').hide();
                    //$('#unableHomeServiceModal').modal('show');
                }
            }
        }
    });

    $(document).on("click", ".vehicle-info", function(e) {

        $('.vehicle-info').removeClass('selected');
        $(this).addClass('selected');
        if ($('.astra-selected-vehicle') != undefined) {
            $('.astra-selected-vehicle').val($(this).find('.select-my-vehicle').val());
        }
        if ($('.payment-selected-vehicle') != undefined) {
            $('.payment-selected-vehicle').val($(this).find('.select-my-vehicle-code').val());
        }
    });

    $(document).on("click", ".close-vehicle-popup", function(e) {
        $('#myVehicleModal').modal('hide');

        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/prepopulate',
            async: true,
            data: $('#bookServiceForm').serialize(),
            type: 'GET',
            success: function(response) {
                // alert(JSON.stringify(response))

                $.each(response, function(key, value) {

                    var selectboxattr = ['type', 'brand', 'model', 'variant'];

                    if (selectboxattr.indexOf(key) > -1) {
                        if (key == 'model') {
                            loadModel();
                        }
                        if (key == 'variant') {
                            loadVariants();
                        }
                        if(value != null){
                        	if(key == 'brand')
                        	{
                        		selector2('#selected-brand',value);
                        	}
                        	else
                        	{
                        		selector2(("#" + key), value);
                        	}
                        }

                    } else {
                        	$('#' + key).val(value);
                        	var serviceCategory = $(".page-book-a-service #serviceCategory").val();                        
                        	if(serviceCategory == null){
                        	$(".page-book-a-service #select2-serviceCategory-container").empty();
                        	}   
                        	var callTime = $(".page-book-a-service #callTime").val();
                        	if(callTime == null){
                        	$(".page-book-a-service #select2-callTime-container").empty();
                        	}
                        	$(".page-book-a-service #select2-bookingType-container").empty();
                        	$(".page-book-a-service #select2-provinceSelector-container").empty();                                               
                        	$(".page-book-a-service #select2-citySelector-container").empty(); 
                        	$(".page-book-a-service #select2-branch-container").empty();
                    }                    	
                    if ($('#bookServiceForm .form-group').hasClass("error-element")) {
                        $('#bookServiceForm .form-group').removeClass("error-element");
                        $('#bookServiceForm .form-group input').removeClass("error");
                        $('#bookServiceForm .form-group label.error').remove();
                    }
                });
                loadBranch();

            }
        });
    });

    $(document).on("click", ".add-test-address", function(e) {
        e.preventDefault();
        addAddressToAddressBook({
            selectedAddressTarget: "#service-address-details",
            selectedAddressUniqueIdTarget: ".testdrive-selected-address"
        });
    });
    var selector2 = function(selector, value) {
        if ($(selector).hasClass("select2-hidden-accessible")) {
            $(selector).select2("destroy");
        }

        $(selector + " option:selected").removeAttr('selected');
        $(selector + " option[value='" + value + "']").attr('selected', 'selected');
        $(selector).select2();
    };
    var addAddressToAddressBook = function(targetElementSelector) {
        if ($('#addressForm').valid() == true) {
            $("#addressForm").ajaxSubmit({
                callbackData: targetElementSelector,
                type: 'POST',
                success: function(response) {
                    if (!$.trim(response.errorMessage)) {
                        //console.log(this);
                        //$('#service-address-details').html(response.newAddress);
                        $(this.callbackData.selectedAddressTarget).html(response.newAddress);
                        //$('.testdrive-selected-address').val(response.addressId);
                        $(this.callbackData.selectedAddressUniqueIdTarget).val(response.addressId);
                        $('#addressBookPopupWrapper .address-book-popup').html(response.addressBook);
                        $('#addNewAddressModal').modal('hide');

                    } else {
                        $('#addNewAddressModal').html(response.popup);
                    }
                },
                error: function(result) {
                    //
                }
            });
        } else {
            $('html, body').animate({
                'scrollTop': $(".form-group .error").parent().offset().top - 100,
            }, 'slow');
        }
    };

    $(document).on("change", ".testdrive-brand", function(e) {
        var options = {
            'selectedBrand': $(this).val(),
            'selectedType': $('.testdrive-type').val(),
            'testDrive':true
        };
        var branchCode = {
            'branchCode': $(this).val()
        };
        var isHomeAvailalbe = $(".testdrive-brand").select2({
            minimumResultsForSearch: 6
        }).find(":selected").data("testdrive");

        var branch = $('.testdrive-branch');
        branch.empty();

        var testDriveLocation = $('.testdrive-location');
        testDriveLocation.empty();
        testDriveLocation.append($("<option></option>").attr("value", "")
            .text(""));
        if (isHomeAvailalbe) {
            var branchCode='';
                if($('#home').val() == "true"){
                    testDriveLocation.append($("<option selected='selected'></option>").attr("value", "HOME").text("HOME"));
                    testDriveLocation.append($("<option></option>").attr("value", "BRANCH").text("BRANCH"));
                    $('.testDrive-address').show();
                    $('.testdrive-branchlocation').hide();
                }else if($('#branch').val() == "true"){
                    testDriveLocation.append($("<option></option>").attr("value", "HOME").text("HOME"));
                    testDriveLocation.append($("<option  selected='selected'></option>").attr("value", "BRANCH").text("BRANCH"));
                    branchCode = { 'branchCode':$('.testdrive-brand').val(),'orderTypeFlag': $('.orderTypeFlag').val()};
                    getBranchCodeByBrandName(branchCode);
                }else{
                    testDriveLocation.append($("<option></option>").attr("value", "HOME").text("HOME"));
                    testDriveLocation.append($("<option></option>").attr("value", "BRANCH").text("BRANCH"));
                }
            }
            else {
                testDriveLocation.append($("<option></option>").attr("value", "BRANCH").text("BRANCH"));
            }

        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-products',
            async: true,
            data: options,
            type: 'GET',
            success: function(response) {
                var productList = $('.testdrive-model');
                productList.empty();
                var modelList = $('.testdrive-variant');
                modelList.empty();
                productList.append($("<option></option>").attr("value", "")
                    .text(""));
                modelList.append($("<option></option>").attr("value", "")
                    .text(""));
                $.each(response, function(key, value) {
                    productList.append($("<option></option>").attr("value", value.code)
                        .attr("id", value.code).text(value.name));
                });
                $(".testdrive-model").select2("destroy");
                $('.testdrive-model').select2({
                    minimumResultsForSearch: 6
                });
                $(".testdrive-variant").select2("destroy");
                $('.testdrive-variant').select2({
                    minimumResultsForSearch: 6
                });
            }
        });
    });

     $(document).on("change", ".testdrive-variant", function(e) {
           branchCode = { 'branchCode':$('.testdrive-brand').val(),'orderTypeFlag': $('.orderTypeFlag').val()};

               getBranchCodeByBrandName(branchCode);
     });

    function getBranchCodeByBrandName(branchCode){
  	  $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-branches',
            async: true,
            data: branchCode,
            type: 'GET',
            success: function(response) {                
                var branchList = $('.testdrive-branch');
                branchList.empty();
                branchList.append($("<option></option>").attr("value", "")
                    .text(""));
                $.each(response, function(key, value) {
                    branchList.append($("<option></option>").attr("value", value.name)
                        .attr("id", value.name).text(value.displayName));
                });
                $('.testDrive-address').hide();
                $('.testdrive-branchlocation').show();
                $(".testdrive-branch").select2("destroy");
                $('.testdrive-branch').select2();
            },
            error: function(){
                var $input = $('#test-drive-date input');
                datePicker($input);
                $("#bookServiceForm #dob-datepicker input, #bookServiceForm .timeWrapper select").prop("disabled", false);
                $("#testDriveForm #test-drive-date input, #testDriveForm .timeWrapper select").prop("disabled", false);
            }
        });
    }
    
    $(document).on("change", ".creditcal-condition", function(e) {
    	 var options = {
    	            'selectedCondition': $(this).val()
    	        };
    	 
    	 $('.creditcal-brand').val('').trigger('change');
    	 $('.creditcal-type').empty();
    	 $('.creditcal-variant').empty()
    	 $('.creditcal-model').empty()
    	 $("#price").val('')
    	 $('#tenorval').val('1').trigger('change');
    	 $('#precentageval').val('25').trigger('change');
    	 $('#contentTableDiv').remove();
    	 $('#credit_simulation_table').hide();
    	 
    	 
    	 //$('.select-dropdown').val(null).trigger('change');
    	 if(options.selectedCondition == "USEDCAR"){
    		 $("#year_block").show();
    		 $(".creditcal-year").select2('val',' ')
    	 }else{
    		 $("#year_block").hide();
    	 }
    	 $.ajax({
             url: ACC.config.encodedContextPath + '/sevaservice/get-type',
             async: true,
             data: options,
             type: 'GET',
             success: function(response) {
                 var branchList = $('.creditcal-type');
                 branchList.empty();
                 branchList.append($("<option></option>").attr("value", "")
                     .text(""));
                 $.each(response, function(key, value) {
                     branchList.append($("<option></option>").attr("value", value.code)
                         .attr("id", value.name).text(value.name));
                 });
                 $(".creditcal-type").select2("destroy");
                 $('.creditcal-type').select2();
             }
         });
    	 getBrandsByCondition(options.selectedCondition);
    });
    
    
    function getBrandsByCondition(condition){
    	var options = { };
    	if(condition != ""){
    		options['condition']=condition;   
    	}
    	$.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-brands',
            async: true,
            data: options,
            type: 'GET',
            success: function(response) {
                var branchList = $('.creditcal-brand');
                branchList.empty();
                branchList.append($("<option></option>").attr("value", "")
                    .text(""));
                $.each(response, function(key, value) {
                    branchList.append($("<option></option>").attr("value", value.code)
                        .attr("id", value.name).text(value.name));
                });
                $(".creditcal-brand").select2("destroy");
                $('.creditcal-brand').select2();
            }
        });
    }

    $(document).on("change", ".testdrive-model", function(e) {
        var options = {
            'productCode': $(this).val(),
            'testDrive':true
        };
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-variants',
            async: true,
            data: options,
            type: 'GET',
            success: function(response) {
                var modelList = $('.testdrive-variant');
                modelList.empty();
                modelList.append($("<option></option>").attr("value", "")
                    .text(""));
                $.each(response, function(key, value) {
                    modelList.append($("<option></option>").attr("value", value.code)
                        .attr("id", value.code).text(value.name));
                });
                $(".testdrive-variant").select2("destroy");
                $('.testdrive-variant').select2({
                    minimumResultsForSearch: 6
                });
            }
        });
    });

    function checkAddress() {
        var testDriveLocation = $('.testdrive-location').val();
        if (testDriveLocation == 'HOME') {
            if (!$('.testdrive-selected-address').val()) {
                $(".testDrive-address.form-group").addClass("error-element");
                $(".testDrive-address.form-group").append("<label class='error'> Address cannot be empty </label>");
                return false;
            }
            else{
                if($(".testDrive-address.form-group").hasClass("error-element")){
                    $(".testDrive-address.form-group").removeClass("error-element");
                    $(".testDrive-address.form-group label.error").remove();
                }
            }
        }
        return true;
    }

    function checkAddressBookService() {
        var testDriveLocation = $('.js-service-bookingtype-select').val();
        if (testDriveLocation.indexOf("Home") != -1) {
            if (!$('.testdrive-selected-address').val()) {
                $(".testDrive-address.form-group").addClass("error-element");
                $(".testDrive-address.form-group").append("<label class='error'> Address cannot be empty </label>");
                return false;
            }
            else{
                if($(".testDrive-address.form-group").hasClass("error-element")){
                    $(".testDrive-address.form-group").removeClass("error-element");
                    $(".testDrive-address.form-group label.error").remove();
                }
            }
        }
        return true;
    }



    $('#verify_testdrive_otp').click(function() {
        
        verifyOTP($('#testDrive-mobileNumber').val(),$("#isdCode").attr('placeholder'),$('#otp').val(),function(data){
   		 if (data.toLowerCase().indexOf("invalid") !== -1 || data.toLowerCase().indexOf("not valid") !== -1 || data.toLowerCase().indexOf("expired") !== -1) {
               $("#server_error").hide();
               $("#invalid_otp").show();

           } else {
               $("#server_error").hide();
               $("#invalid_otp").hide();
               $('#test-drive-otppopup').modal('hide');
               $('#testDriveForm').submit();
               $('#success-message').addClass('show-error');
           }
        },function(error){
        	$("#server_error").show();
        });
    });

    $("#verifyOtpForm").on("submit", function(){
        return false;
    })

    var countTest = 1;
    $('#test_drive_otp').on("click", function(e) {
        var maxcount = parseInt($("#noOfAllowedAttemptsToSendOtp").val());
        var timeoutduration = parseInt($("#disableResendOtpLinkTimer").val());
        var cnt = countTest++;
        //console.log(cnt);
        if (cnt < maxcount) {
        	var mobileNumber=$('#testDrive-mobileNumber').val();
        	var isdCode=$("#isdCode").attr('placeholder');
        	requestForOTP(mobileNumber,isdCode,function(data){
       		 if (data === 'Invalid') {
                    $("#errorMessage").addClass("show-error");
                } else {
                    $('#test-drive-otppopup').modal('show');
                }
       	},function(error){
       		$("#serverMessage").addClass("show-error");
       	});
        } else {

            /*count = 1;
            setTimeout(function() {

            }, timeoutduration);*/
            var sec = timeoutduration;

            if (sec > 100) {
                seconds = sec / 1000;
            }

            if (seconds > 60) {
                var min = Math.floor(seconds / 60); //Get remaining minutes
                seconds -= min * 60;
            } else {
                min = 00;
            }
            $("#otp_text").show();
            document.getElementById('timer').innerHTML = ((min < 10) && (min.length < 2) ? '0' + min : min) + ":" + ((seconds < 10) && (seconds.length < 2) ? '0' + seconds : seconds);
            startTimer();
            countTest = 1;
        }
    });

    $(document).on("click", "#order_verify_otp", function(e) {
        
        verifyOTP($('#customer-mobileNumber').val(),$("#isdCode").val(),$('#order-otp').val(),function(data){

            if (data.toLowerCase().indexOf("invalid") !== -1 || data.toLowerCase().indexOf("not valid") !== -1 || data.toLowerCase().indexOf("expired") !== -1) {
                $("#server_error").hide();
                $("#invalid_otp").show();

            } else {
                $("#server_error").hide();
                $("#invalid_otp").hide();
                $('#order-otppopup').modal('hide');
                $('#placeOrderForm').submit();
                $('#success-message').addClass('show-error');
            }
        
        },function(error){
   		$("#server_error").show();
   	});
    });


    var countOrder = 1;
    $('#order-resend-otp').on("click", function(e) {
        var maxcount = parseInt($("#noOfAllowedAttemptsToSendOtp").val());
        var timeoutduration = parseInt($("#disableResendOtpLinkTimer").val());
        var cnt = countOrder++;
        //console.log(cnt);
        if (cnt < maxcount) {
            requestForOTP($('#customer-mobileNumber').val(),$("#isdCode").val(),function(data){
       		 if (data === 'Invalid') {
                    $("#errorMessage").addClass("show-error");
                } else {
                    $('#order-otppopup').modal('show');
                }
       	},function(error){
       		$("#serverMessage").addClass("show-error");
       	});
        } else {

            /*count = 1;
            setTimeout(function() {

            }, timeoutduration);*/
            var sec = timeoutduration;

            if (sec > 100) {
                seconds = sec / 1000;
            }

            if (seconds > 60) {
                var min = Math.floor(seconds / 60); //Get remaining minutes
                seconds -= min * 60;
            } else {
                min = 00;
            }
            $("#otp_text").show();
            document.getElementById('timer').innerHTML = ((min < 10) && (min.length < 2) ? '0' + min : min) + ":" + ((seconds < 10) && (seconds.length < 2) ? '0' + seconds : seconds);
            startTimer();
            countOrder = 1;
        }
    });

    $(document).on("click", ".placeOrder", function(e) {
        e.preventDefault();
        var validation = $(".validation-from").valid();
        var emailPhoneValidationresult = false;
        if($('#email').valid() && $('#customer-mobileNumber').valid()){
            emailPhoneValidationresult = validateCustomerEmailAndPhone($('#email').val(), $('#customer-mobileNumber').val());
        }
        $('#autoService_gaClientId').val(ga.getAll()[0].get('clientId'));
        var bundleValidationResult = validateCartAndBundle();
        if (!validation) {
            var personalInfoValidation = validatePersonalInfo();
            if(personalInfoValidation){
                if($("#paymentDetail_isTradeInByCashPayment").val()){
                    $(".TRADEIN_CASH-heading-wrapper").get(0).scrollIntoView();
                } else {
                    $(".TRADEIN_CREDIT-heading-wrapper").get(0).scrollIntoView();
                }
            } else {
                $(".checkout-heading").get(0).scrollIntoView();
            }
        } else if (emailPhoneValidationresult) {
            $('#customer-mobileNumber').val('');
            $('#loginModal').modal('show');
        } else if(!bundleValidationResult) {
            if ($("#globalErrorBundle").hasClass("hide")){
                $("#globalErrorBundle").removeClass("hide");
                $('<div class="alert alert-danger alert-dismissable getAccAlert"><button id="globalErrorBundleCloseButton" class="close closeAccAlert" type="button" data-dismiss="alert" aria-hidden="true">×</button>Silakan pilih salah satu bundel produk yang tersedia sebelum melanjutkan ke langkah berikutnya.</div>').appendTo("#globalErrorBundle");
            }
            window.scrollTo(0, 0);
        } else if(validation) {
            if ($('#placeOrderOTPRequired').val() == 'false') {
                $('#placeOrderForm').submit();
            } else {
                requestForOTP($('#customer-mobileNumber').val(),$("#isdCode").val(),function(data){
                     if (data === 'Invalid') {
                           $("#errorMessage").addClass("show-error");
                       } else {
                           $('#order-otppopup').modal('show');
                       }
                },function(error){
                    $("#serverMessage").addClass("show-error");
                });
            }
        }
    });

    $(document).on("click", ".paymentmethod", function(e) {
        e.preventDefault();
        var validation = $(".validation-from").valid();
        
       if(validation) {
            $(".checkout-personalinfo").hide();
            $(".checkout-paymentmethod").fadeIn("300");
            $(".payment-method").addClass("active");
            $(".personal-info").removeClass("active");
            $(".separator").addClass("separator-left");
            $(".separator").removeClass("separator-right");
        }
    });


    $('.close-testdrive-modal').click(function() {
        $('#test-drive-otppopup').modal('hide');
    });



    $(document).on("click", ".change-service-address", function(e) {
        var address = $('.testdrive-selected-address').val();
        $('#addressBookPopupWrapper .address-id-' + address).addClass('address-details--selected');
    });
    $(document).on("click", ".address-book.address-details", function(e) {
        $('.address-details').removeClass('address-details--selected');
        $(this).addClass('address-details--selected');
        $('.testdrive-selected-address').val($(this).find('.select-address-id').val());
        $('.addressbook-select').prop("disabled", false);
    });
    $(document).on("click", ".addressbook-select", function(e) {
        $('#service-address-details').html($('.address-details--selected').html());
        $('#addressBookPopupWrapper').modal('hide');
    });

    //Credit Calculator

    $(document).on("change", ".creditcal-variant", function(e) {
        var options = {
            'productCode': $(this).val()
        };
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-productprice',
            async: true,
            data: options,
            type: 'GET',
            success: function(response) {
                //console.log(response);
                $('#price').val(response);
            }
        });
    });
    $(document).on("change", ".creditcal-model", function(e) {
        var options = {
            'productCode': $(this).val()
        };
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-variants',
            async: true,
            data: options,
            type: 'GET',
            success: function(response) {
                //console.log(response);
                var modelList = $('.creditcal-variant');
                modelList.empty();
                modelList.append($("<option></option>").attr("value", "")
                    .text(ACC.astra.testDriveLocation));
                $.each(response, function(key, value) {
                    modelList.append($("<option></option>").attr("value", value.code)
                        .attr("id", value.code).text(value.name));
                });
                $(".select-dropdown").select2();  
            }
        });
    });
    $(document).on("change", ".creditcal-brand", function(e) {
        var options = {
            'selectedBrand': $(this).val(),
            'selectedType': $('.creditcal-type').val()
        };

        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-products',
            async: true,
            data: options,
            type: 'GET',
            success: function(response) {
                var productList = $('.creditcal-model');
                productList.empty();
                var modelList = $('.creditcal-variant');
                modelList.empty();
                productList.append($("<option></option>").attr("value", "")
                    .text(ACC.astra.testDriveLocation));
                modelList.append($("<option></option>").attr("value", "")
                    .text(ACC.astra.testDriveLocation));
                $.each(response, function(key, value) {
                    productList.append($("<option></option>").attr("value", value.code)
                        .attr("id", value.code).text(value.name));
                });
	           $(".select-dropdown").select2();     
            }
        });
    });

    $(document).on("change", ".creditcal-type", function(e) {

        var brand = $('.creditcal-brand').val();
        if (brand != null) {
            var options = {
                'selectedBrand': $('.creditcal-brand').val(),
                'selectedType': $('.creditcal-type').val()
            };

            $.ajax({
                url: ACC.config.encodedContextPath + '/sevaservice/get-products',
                async: true,
                data: options,
                type: 'GET',
                success: function(response) {
                    var productList = $('.creditcal-model');
                    productList.empty();
                    var modelList = $('.creditcal-variant');
                    modelList.empty();
                    productList.append($("<option></option>").attr("value", "")
                        .text(ACC.astra.testDriveLocation));
                    modelList.append($("<option></option>").attr("value", "")
                        .text(ACC.astra.testDriveLocation));
                    $.each(response, function(key, value) {
                        productList.append($("<option></option>").attr("value", value.code)
                            .attr("id", value.code).text(value.name));
                    });
                    $(".select-dropdown").select2();  
                }
            });
        }
    });

    $(document).on("click", ".service-address", function(e) {
        $('#addressForm').trigger("reset");
        $('.select-new-address').val('').trigger('change');
    });

    $(document).on("click", ".cart-Payment", function(e) {
        $('#addressForm').trigger("reset");
        $('.select-new-address').val('').trigger('change');
        $('.address-details').removeClass('address-details--selected');
        $('.selected-div-address').val('cart-Payment');
        var address = $('.payment-selected-address').val();
        $('#addressBookPopupWrapper .address-id-' + address).addClass('address-details--selected');
    });
    $(document).on("click", ".cart-shipping", function(e) {
        $('#addressForm').trigger("reset");
        $('.select-new-address').val('').trigger('change');
        $('.address-details').removeClass('address-details--selected');
        $('.selected-div-address').val('cart-shipping');
        var address = $('.delivery-selected-address').val();
        $('#addressBookPopupWrapper .address-id-' + address).addClass('address-details--selected');
    });
    $(document).on("click", ".cart-document", function(e) {
        $('#addressForm').trigger("reset");
        $('.select-new-address').val('').trigger('change');
        $('.address-details').removeClass('address-details--selected');
        $('.selected-div-address').val('cart-document');
        var address = $('.document-selected-address').val();
        $('#addressBookPopupWrapper .address-id-' + address).addClass('address-details--selected');
    });
    $(document).on("click", ".address-book.address-details", function(e) {

        if ($('.selected-div-address').val() == 'cart-Payment') {
            $('.address-details').removeClass('address-details--selected');
            $(this).addClass('address-details--selected');
            $('.payment-selected-address').val($(this).find('.select-address-id').val());
        }
        if ($('.selected-div-address').val() == 'cart-shipping') {
            $('.address-details').removeClass('address-details--selected');
            $(this).addClass('address-details--selected');
            $('.delivery-selected-address').val($(this).find('.select-address-id').val());
        }
        if ($('.selected-div-address').val() == 'cart-document') {
            $('.address-details').removeClass('address-details--selected');
            $(this).addClass('address-details--selected');
            $('.document-selected-address').val($(this).find('.select-address-id').val());
        }

    });
    $(document).on("click", ".addressbook-select", function(e) {
        if ($('.selected-div-address').val() == 'cart-Payment') {
            $('#payment-address-details').html($('.address-details--selected').html());
        }
        if ($('.selected-div-address').val() == 'cart-shipping') {
            $('#delivery-address-details').html($('.address-details--selected').html());
        }
        if ($('.selected-div-address').val() == 'cart-document') {
            $('#document-address-details').html($('.address-details--selected').html());
        }
        $('#addressBookPopupWrapper').modal('hide');
    });
    $(document).on("click", ".checkout-add-test-address", function(e) {
        e.preventDefault();
        if ($('.selected-div-address').val() == 'cart-Payment') {
            addAddressToAddressBook({
                selectedAddressTarget: "#payment-address-details",
                selectedAddressUniqueIdTarget: ".payment-selected-address"
            });
        }
        if ($('.selected-div-address').val() == 'cart-shipping') {
            addAddressToAddressBook({
                selectedAddressTarget: "#delivery-address-details",
                selectedAddressUniqueIdTarget: ".delivery-selected-address"
            });
        }
        if ($('.selected-div-address').val() == 'cart-document') {
            addAddressToAddressBook({
                selectedAddressTarget: "#document-address-details",
                selectedAddressUniqueIdTarget: ".document-selected-address"
            });
        }
    });
    $(document).on("change", ".general-appintment-brand", function(e) {
        var options = {
            'selectedBrand': $(this).val(),
            'selectedType': $('.general-appointment-type').val()
        };
        var branchCode = {
            'branchCode': $(this).val()
        };
        var isHomeAvailalbe = $(".general-appintment-brand").select2().find(":selected").data("testdrive");

        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-branches-general-appointment',
            async: true,
            data: branchCode,
            type: 'GET',
            success: function(response) {
                var branchList = $('.testdrive-branch');
                branchList.empty();
                branchList.append($("<option></option>").attr("value", "")
                    .text(ACC.astra.testDriveLocation));
                $.each(response, function(key, value) {
                    branchList.append($("<option></option>").attr("value", value.name)
                        .attr("id", value.name).text(value.displayName));
                });

            },
            error: function(result) {
                var branchList = $('.testdrive-branch');
                branchList.empty();
            }
        });


        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/get-products-general-appointment',
            async: true,
            data: options,
            type: 'GET',
            success: function(response) {
                var productList = $('.general-appintment-model');
                productList.empty();
                var modelList = $('.general-appintment-model');
                modelList.empty();
                productList.append($("<option></option>").attr("value", "")
                    .text(ACC.astra.testDriveLocation));
                modelList.append($("<option></option>").attr("value", "")
                    .text(ACC.astra.testDriveLocation));
                $.each(response, function(key, value) {
                    productList.append($("<option></option>").attr("value", value.code)
                        .attr("id", value.code).text(value.name));
                });

            }
        });
    });
    /*if ($('#checkoutPreferredDate').length > 0) {
                            $('#checkoutPreferredDate').datepicker({
                                format: 'dd-mm-yyyy',
                                autoclose: true,
                                startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                            });
                        }
                        if ($('#trade-preferred-date').length > 0) {
                            $('#trade-preferred-date').datepicker({
                                format: 'dd-mm-yyyy',
                                autoclose: true,
                                startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
                            });
                        }*/
    $('#submit_general_appointment').click(function(e) {
        e.preventDefault();

        $("#server_error").hide();
        $("#invalid_otp").hide();
        $(".otp-popup-input-value").val("");
        if ($('#generalAppointmentForm').valid() == true) {
            requestForOTP($('#change_phone_number').val(),$("#isdCode").attr('placeholder'),function(data){
       		 if (data === 'Invalid') {
                    $("#errorMessage").addClass("show-error");
                } else {
                    $('#otp-popup-Modal').modal('show');
                }
       	},function(error){
       		$("#serverMessage").addClass("show-error");
       	});
        } else {
            $('html, body').animate({
                'scrollTop': $(".form-group .error").parent().offset().top - 100,
            }, 'slow');
        }
    });
    $('#gnrl-appnt-verify_otp').click(function() {
        verifyOTP($('#change_phone_number').val(),$("#isdCode").attr('placeholder'),$('#otp').val(),function(data){
    	   if (data.toLowerCase().indexOf("invalid") !== -1 || data.toLowerCase().indexOf("not valid") !== -1 || data.toLowerCase().indexOf("expired") !== -1) {
               $("#server_error").hide();
               $("#invalid_otp").show();

           } else {
               $("#server_error").hide();
               $("#invalid_otp").hide();
               $('#test-drive-otppopup').modal('hide');
               $('#generalAppointmentForm').submit();
               $('#success-message').addClass('show-error');
           }
   	},function(error){
   		$("#server_error").show();
   	});
    });




    //TRadeInCash
    var loadTradeInCashVariants = function() {
        var options = {
            'brandCode': $(".js-servicetype-selecttradeInCash").val(),
            'typeCode': $(".js-type1-selecttradeInCash").val(),
            'modelCode': $(".js-serviceModel-selecttradeInCash").val()
        };

        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/getVariantList',
            async: false,
            data: options,
            type: 'GET',
            success: function(response) {

                var variantList = $('.js-serviceVariant-selecttradeInCash');
                variantList.empty();
                variantList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    variantList.append($("<option></option>").attr("value", value.code)
                        .attr("code", value.code).text(value.name));
                });
                //$(".js-serviceVariant-selecttradeInCash").select2("destroy");
                // $('.js-serviceModel-title-filter').select2();
            }
        });
    };

    $(document).on("change", ".js-serviceModel-selecttradeInCash", function() {
        loadTradeInCashVariants();
    });

    var loadTradeInCashModels = function() {
        var options = {
            'brandCode': $(".js-servicetype-selecttradeInCash").val(),
            'typeCode': $(".js-type1-selecttradeInCash").val()
        };

        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/getModelList',
            async: false,
            data: options,
            type: 'GET',
            success: function(response) {

                var modelList = $('.js-serviceModel-selecttradeInCash');
                modelList.empty();
                modelList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    modelList.append($("<option></option>").attr("value", value.code)
                        .attr("code", value.code).text(value.name));
                });
                //  $(".js-serviceModel-selecttradeInCash").select2("destroy");
                // $('.js-serviceModel-title-filter').select2();
            }
        });
    };

    $(document).on("change", ".js-servicetype-selecttradeInCash", function() {
        loadTradeInCashModels();
    });

    //tradeInCredit
    var loadTradeInCreditModels = function() {
        var options = {
            'brandCode': $(".js-servicetype-selecttradeInCredit").val(),
            'typeCode': $(".js-type1-selecttradeInCredit").val()
        };
        //console.log(JSON.stringify(options) + "sds " + $(".js-type1-selecttradeInCredit").val());
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/getModelList',
            async: false,
            data: options,
            type: 'GET',
            success: function(response) {

                var modelList = $('.js-serviceModel-selecttradeInCredit');
                modelList.empty();
                modelList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    modelList.append($("<option></option>").attr("value", value.code)
                        .attr("code", value.code).text(value.name));
                });
                //$(".js-serviceModel-selecttradeInCredit").select2("destroy");
                //$('.js-serviceModel-title-filter').select2();
            }
        });
    };

    $(document).on("change", ".js-servicetype-selecttradeInCredit", function() {
        loadTradeInCreditModels();
    });

    var loadTradeInCreditVariants = function() {
        var options = {
            'brandCode': $(".js-servicetype-selecttradeInCredit").val(),
            'typeCode': $(".js-type1-selecttradeInCredit").val(),
            'modelCode': $(".js-serviceModel-selecttradeInCredit").val()
        };
        //console.log(JSON.stringify(options) + "sds " + $(".js-type1-selecttradeInCredit").val());
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/getVariantList',
            async: false,
            data: options,
            type: 'GET',
            success: function(response) {

                var variantList = $('.js-serviceVariant-selecttradeInCredit');
                variantList.empty();
                variantList.append($("<option value=''></option>").text(""));
                $.each(response, function(key, value) {
                    variantList.append($("<option></option>").attr("value", value.code)
                        .attr("code", value.code).text(value.name));
                });
                // $(".js-serviceVariant-selecttradeInCredit").select2("destroy");
                // $('.js-serviceModel-title-filter').select2();
            }
        });
    };

    $(document).on("change", ".js-serviceModel-selecttradeInCredit", function() {
        loadTradeInCreditVariants();
    });

    $(document).on("click", ".payment-tradeInCredit", function(e) {
        $('#payment-trade-type').val('tradeInCredit');
        if($("#myVehicleModal .modal-body").find(".vehicle-section").html().trim() == ""){
            $("#myVehicleModal .modal-body").find("#emptyVehicleList").removeClass("hide");
            $("#myVehicleModal .modal-footer").find(".__button-holder button[type='submit']").addClass("hide");
            $("#myVehicleModal .modal-footer").find(".__button-holder button[type='button']").removeClass("hide");
        }else{
            $("#myVehicleModal .modal-footer").find(".__button-holder button[type='submit']").removeClass("hide");
            $("#myVehicleModal .modal-footer").find(".__button-holder button[type='button']").addClass("hide");
        }
    });

    $(document).on("click", ".payment-tradeInCash", function(e) {
        $('#payment-trade-type').val('tradeInCash');
        if($("#myVehicleModal .modal-body").find(".vehicle-section").html().trim() == ""){
            $("#myVehicleModal .modal-body").find("#emptyVehicleList").removeClass("hide");
            $("#myVehicleModal .modal-footer").find(".__button-holder button[type='submit']").addClass("hide");
            $("#myVehicleModal .modal-footer").find(".__button-holder button[type='button']").removeClass("hide");
        }else{
            $("#myVehicleModal .modal-footer").find(".__button-holder button[type='submit']").removeClass("hide");
            $("#myVehicleModal .modal-footer").find(".__button-holder button[type='button']").addClass("hide");
        }
    });

    $(document).on("click", ".payment-close-vehicle-popup", function(e) {
        //var $this = $(this);
        $('#myVehicleModal').modal('hide');
        //console.log($('#paymentDetailsForm').serialize());
        $(".image-uploaded").empty();
        $.ajax({
            url: ACC.config.encodedContextPath + '/sevaservice/payment-vehicle-simple-checkout',
            async: true,
            data: $('#placeOrderForm').serialize(),
            type: 'GET',
            success: function(response) {
                console.log(response);
                var tradeType = $('#payment-trade-type').val();
                console.log(tradeType);
                if(response.type!=null){
                    selector2("#" + tradeType + "compareType", response.type);
                } else {
                    selector2("#" + tradeType + "compareType", "");
                }
                selector2("#" + tradeType + "compareBrand", response.brand);
                if ($('#payment-trade-type').val() == 'tradeInCash') {
                    loadTradeInCashModels();
                }
                if ($('#payment-trade-type').val() == 'tradeInCredit') {
                    loadTradeInCreditModels();
                }
                // $("#"+tradeType+"comparemodel").select2("destroy");
                selector2("#" + tradeType + "comparemodel", response.model);
                if ($('#payment-trade-type').val() == 'tradeInCash') {
                    loadTradeInCashVariants();
                }
                if ($('#payment-trade-type').val() == 'tradeInCredit') {
                    loadTradeInCreditVariants();
                }
                selector2("#" + tradeType + "compareVariant", response.variant);
                selector2("#" + tradeType + "year", response.year);
                $("#" + tradeType + "licensNumber").val(response.licensePlateNumber);
                $("#" + tradeType + "chasisNumber").val(response.chasisNumber);
                $("#" + tradeType + "engineNumber").val(response.engineNumber);
                $("#" + tradeType + "stnkExpiryDate").val(response.stnkExpiryDate);
                $("#" + tradeType + "mileage").val(response.mileage);
                $("#" + tradeType + "odometer").val(response.odometer);
                $("#" + tradeType + "transmission").find("option").each(function(){
                	if($(this).attr("value") == response.transmission){
                		$(this).prop("selected", true);
                	}
                });
                
                $("#" + tradeType + "transmission").select2();
                
                $("#" + tradeType + "cylinderCapacity").val(response.cylinderCapacity);

                //selector2("#" + tradeType + "fueltype", response.fueltype);
                $("#" + tradeType + "fuelType").find("option").each(function(){
                	if($(this).attr("value") == response.fuelType){
                		$(this).prop("selected", true);
                	}
                });
                $("#" + tradeType + "fuelType").select2();
                // $("#"+tradeType+"fueltype").val(response.fuelType);
                $("#" + tradeType + "color").val(response.color);
                $("#" + tradeType + "expectedCarPrice").val(response.expectedCarPrice);
                $("#" + tradeType + "hand").val(response.hand);
                $("#" + tradeType + "callDate").val(response.callDate);
                $("#" + tradeType + "callTime").val(response.callTime);
                $("#" + tradeType + "price").val(response.price);
                $("#" + tradeType + "shareContactDetails").val(response.shareContactDetails);
                $("#" + tradeType + "code").val($('.payment-selected-vehicle').val());
                $("#" + tradeType + "countryIso").val(response.countryIso);
                $("#" + tradeType + "cityCode").val(response.cityCode);
                $("#" + tradeType + "regionIso").val(response.regionIso);
                $("#" + tradeType + "sellingTerms").val(response.sellingTerms);
                $("#" + tradeType + "manualBook").val(response.manualBook);
                $("#" + tradeType + "serviceBook").val(response.serviceBook);
                $("#" + tradeType + "spareKey").val(response.spareKey);
                $("#" + tradeType + "backupKey").val(response.backupKey);
                $("#" + tradeType + "taxesUpto").val(response.taxesUpto);
                $("#" + tradeType + "ownership").val(response.ownership);
                $("#" + tradeType + "isNegotiable").val(response.isNegotiable);
                

                for (var i = 0; i < response.images.length; i++){
                    $(".activePanel").next(".accordionContent").find(".image-uploaded").append('<li class="success-img"> <img src= ' + response.images[i].downloadUrl + ' alt="product image"> <i class="icon-Error remove-upload-image"></i> ' + '' +
                    '<input id="vehicle-upload'+i+'" class="operation-value" value="2" type="hidden"><input type="file" name="" class="vehicle-myupload-files" />');
                }
            }
        });
    });


    var imageUploadnotNeeded = $(".image-uploaded").parents(".accordionContent").prev().not(".activePanel");    
    if($(".image-uploaded").parents(".accordionContent").prev().not(".activePanel")){
        imageUploadnotNeeded.next().find(".image-uploaded").html("");
    }

    var submitNewsletterSubscribtionForm = function(that) {
        var subscriptionEmailId = $(that).closest('form').find('.js-newsletter-subscription-emailid').val();
        $(".js-newsletter-subscription-form-emailid").val(subscriptionEmailId);
        $(".js-newsletter-subscription-form").submit();
        //console.log("subscriptionEmailId",subscriptionEmailId);
    }

    $('.js-newsletter-subscription-btn').on("click", function() {
        submitNewsletterSubscribtionForm(this);
    });

    $(".js-newsletter-subscription-emailid").keypress(function(e){
        var key = e.which;
        if(key == 13)  // the enter key code
            {
                submitNewsletterSubscribtionForm(this);
            }
    });
    
    $('.js-notification-mark-read').on("click", function(event) {
    	event.preventDefault();
    	if($(this).hasClass("js-marking-notification-read")) {
    		return false;
    	} else {
    		$(this).addClass("js-marking-notification-read");
    	}
    	$.ajax({
            url: ACC.config.encodedContextPath + '/my-account/mark-notification-read/',
            async: true,
            cache: false,
            data: { notificationCode : $(this).data("notification-code") },
            type: 'GET',
            context: this,
            success: function() {
                markParentNotificationAsRead($(this).data("notificationcenter-id"));
            	window.location.href = $(this).attr("href");
            },
            error: function() {
            	window.location.href = $(this).attr("href");
            }
        });
    	return false;
    });

    function markParentNotificationAsRead(notificationCenterId) {
        $.ajax({
            url : '/wp-admin/admin-ajax.php?action=notification_read',
            type: 'GET',
            async: true,
            cache: false,
            xhrFields: {
                  withCredentials: true
             },
            data: { message_id : notificationCenterId }
        });
    }

     /*
     * On cart validation confirmation, submitting the addToCartForm from
     */
    $(document).on("click", "#addToCartConfirmButton", function() {
         $('#addToCartForm').submit();
    });
    
    
    $(document).on("click", ".bestOfferButton", function() {
    	
    	$("input[name='productCodePost']").val($(this).attr("data-productcode"));
    	$("input[name='productCodeVariant']").val($(this).attr("data-productcode"));
    	 
    	$.ajax({
              url: ACC.config.encodedContextPath + '/sevaservice/cart-count',
              type: 'GET',
              data: {},
              success: function(data) {
                  /** Base on SEVA - 4596 need to skip pop up modal, go trough checkout page */
                  /**
                  if (data) {
                      $('#confirm-popup-Modal').modal('show');
                  } else {
                	  $('#addToCartForm').submit();
                  }
                  */
                  $('#addToCartForm').submit();
              }
          });
    	
   });
    
    
    /*
     * On cart validation confirmation for bundle, submitting the addBundleToCartForm from
     */
    $(document).on("click", "#addBundleCartConfirmation", function() {
    	var currentCode = $(".bundleForm-active").find("input[name='serviceProductCode']").val();
    	$('#addBundleToCartForm_'+currentCode).submit();
    });
        
    //City dropdown
    if($('.testdrive-city').length > 0 || $("#cityValue").length > 0) {
		$.ajax({ 
		    url: ACC.config.encodedContextPath + '/sevaservice/get-city',
		    async: true,
		    type: 'GET',
		    success: function(response){
		        var branchList = $('.testdrive-city');
		            branchList.empty();
		            branchList.append($("<option value=''></option>").text(""));
		            $.each(response, function(key, value) {
		                branchList.append($("<option></option>").attr("value", value.isocode).text(value.name));
		            });
		
		        var checkout_city = $("#cityValue").val();
		        if($("#cityValue").length > 0 && $("#cityValue").val() != null){
		            $(".testdrive-city").find("option").each(function(){
		                if($(this).attr("value") == checkout_city){
		                    $(this).prop("selected", true);
		                }
		            });
		            $(".testdrive-city").select2()
		        }
		    }
		});
    }
    
    
	  $('.js-service-province-select').on("change", function() {
		  loadCityByProvince($(this).val());
      });

    $(document).on("change", ".js-servicecity-select", function() {
        loadBranchByCity();
    });
    
    var loadCityByProvince = function(province){
    	var options = {
                'regionIsoCode': province
            };
            $.ajax({
                url: ACC.config.encodedContextPath + '/sevaservice/get-cities',
                async: false,
                data: options,
                type: 'GET',
                success: function(response) {
                   
                    var cityList = $('.js-servicecity-select');
                    cityList.empty();
                    var branchList = $('.js-service-branch-select');
                    branchList.empty();
                    cityList.append($("<option value=''></option>").text(""));
                    $.each(response, function(key, value) {
                        cityList.append($("<option></option>").attr("value", value.isocode)
                            .attr("id", value.isocode).text(value.name));
                    });
                    //  $(".js-servicecity-select").select2("destroy");
                    $('.js-servicecity-select').select2({
                        dropdownParent: $('.js-servicecity-select').parent()
                    });
                }
            });
    };

    var loadBranchByCity = function() {
            var branchCode = {
                'cityCode': $('.js-servicecity-select').val(),
                'brandCode': $('#selected-brand').val(),
                'isbookAServicePage':$('#selected-page').val()
            };
            //console.log("---->TypeName"+$('.js-servicetype-select').val());
            $.ajax({
                url: ACC.config.encodedContextPath + '/sevaservice/get-branches-by-city',
                async: true,
                data: branchCode,
                type: 'GET',
                success: function(response) {
                    var branchList = $('.js-service-branch-select');
                    branchList.empty();
                    branchList.append($("<option value=''></option>").text(""));
                    if(response.toString().length < 1){
                        $('.branch-not-found').show();
                        $('.branch-not-found').css("display", "inline-flex");
                        $('#branch-text').removeClass('hide-this');
                        $('#new-car-branch').find(".select2-selection--single").css("border-color", "#F90013");
                        $('#new-car-branch').find(".select2-selection--single").prop("disabled", "true");

                    }else{
                        $.each(response, function(key, value) {
                            $('.branch-not-found').hide();
                            $('#branch-text').addClass('hide-this');
                            $('#new-car-branch').find(".select2-selection--single").css("border-color", "#d8d8d8");
                            $('#new-car-branch').find(".select2-selection--single").prop("disabled", "true");
                            branchList.append($("<option></option>").attr("value", value.name)
                                .attr("code", value.name).text(value.displayName));
                        });
                    }

                },
                error: function(response) {
                	//
                }

            });
        };

    $('#email').on("focusout", function(event) {
        var result = false;
        if($('#email').valid() && $('#customer-mobileNumber').valid()){
            result = validateCustomerEmailAndPhone($('#email').val(), $('#customer-mobileNumber').val());
        }
        if(result){
            $('#customer-mobileNumber').val('');
            $('#loginModal').modal('show');
        }
    });

    $('#customer-mobileNumber').on("focusout", function(event) {
        var result = false;
        if($('#email').valid() && $('#customer-mobileNumber').valid()){
            result = validateCustomerEmailAndPhone($('#email').val(), $('#customer-mobileNumber').val());
        }
        if(result){
            $('#customer-mobileNumber').val('');
            $('#loginModal').modal('show');
        }
    });

    $('#service-email').on("focusout", function(event) {
        var result = false;
        if($('#service-email').valid() && $('#service-mobileNumber').valid()){
            result = validateCustomerEmailAndPhone($('#service-email').val(), $('#service-mobileNumber').val());
        }
        if(result){
            $('#service-mobileNumber').val('');
            $('#loginModal').modal('show');
        }
    });

    $('.service-mobileNumber').on("focusout", function(event) {
        var result = false;
        if($('#service-email').valid() && $('#service-mobileNumber').valid()){
            result = validateCustomerEmailAndPhone($('#service-email').val(), $('#service-mobileNumber').val());
        }
        if(result){
            $('#service-mobileNumber').val('');
            $('#loginModal').modal('show');
        }
    });

    function validateCustomerEmailAndPhone(email, phone) {
        var result = false;
        var options = {
            'email': email,
            'phone': phone
        };
        $.ajax({
            url: ACC.config.encodedContextPath + '/checkout/multi/summary/validate-customer',
            async: false,
            data: options,
            type: 'POST',
            success: function(response) {
                result = response;
            }
        });
        return result;
    };

    function validateCartAndBundle() {
        var result = false;
        $.ajax({
            url: ACC.config.encodedContextPath + '/cart/cart-validation-ajax',
            async: false,
            data: {},
            type: 'GET',
            success: function(response) {
                result = response;
            }
        });
        return result;
    };

    function validatePersonalInfo() {
        if (!$("#email").valid()){
            return false;
        }
        if (!$("#customer-mobileNumber").valid()){
            return false;
        }
        if (!$("#title").valid()){
            return false;
        }
        if (!$("#firstName").valid()){
            return false;
        }
        if (!$("#lastName").valid()){
            return false;
        }
        if (!$("#city").valid()){
            return false;
        }
        if($("#branch").length != 0) {
            if (!$("#branch").valid()){
                return false;
            }
        }
        return true;
    };

    $(document).on("submit", ".addToEntryGroupForm", function (e) {
        e.preventDefault();
        $.ajax({
            url: ACC.config.encodedContextPath + '/entrygroups/cart/addToEntryGroup-ajax',
            async: false,
            data: $(this).serialize(),
            type: 'POST',
            success: function(response) {
                if(response!=null){
                    var benefits = $('#benefits1');
                    var bundlePopupButton = $('#bundlePopupLink1');
                    var otherbundlePopupButton = null;
                    if($("#bundlePopupLink2").length != 0) {
                        otherbundlePopupButton = $('#bundlePopupLink2');
                    }
                    if(response.component.id.endsWith('AddonBenefitByAFFCOComponent')){
                        benefits = $('#benefits2');
                        bundlePopupButton = $('#bundlePopupLink2');
                        if($("#bundlePopupLink1").length != 0) {
                            otherbundlePopupButton = $('#bundlePopupLink1');
                        }
                    }
                    if(benefits.hasClass("hide")){
                        benefits.removeClass("hide");
                        bundlePopupButton.text("Ganti");
                        bundlePopupButton.get(0).href = bundlePopupButton.get(0).href+'/'+response.entryNumber;
                    } else {
                        var lastIndexOfSlash = bundlePopupButton.get(0).href.lastIndexOf('/');
                        var urlLength = bundlePopupButton.get(0).href.length;
                        var bundlePopupUrl = bundlePopupButton.get(0).href;
                        var lastEntryNumber = bundlePopupUrl.substring(lastIndexOfSlash+1,urlLength);
                        if(lastEntryNumber!=response.entryNumber){
                            bundlePopupButton.get(0).href = bundlePopupUrl.substring(0,lastIndexOfSlash+1)+response.entryNumber;
                            if(otherbundlePopupButton!=null){
                                var otherLastIndexOfSlash = otherbundlePopupButton.get(0).href.lastIndexOf('/');
                                var otherbundlePopupUrl = otherbundlePopupButton.get(0).href;
                                otherbundlePopupButton.get(0).href = otherbundlePopupUrl.substring(0,otherLastIndexOfSlash+1)+lastEntryNumber;
                            }
                        }
                    }
                    benefits.text(response.product.name);
                }
                $('#cboxClose').click();
            }
        });
    });

    $(document).on("click", "#globalErrorBundleCloseButton", function(e) {
        $("#globalErrorBundle").addClass("hide");
    });

});