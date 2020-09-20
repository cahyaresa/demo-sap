module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'sass/main.scss'
                }
            }
        },
        includes: {
            build: {
                cwd: 'html',
                src: ['*.html'],
                dest: 'build/',
                options: {
                    flatten: true,
                    includePath: 'html',
                }
            }
        },
		
		cssmin : {
			 options: {
				style: 'compressed',
			  },
			target : {
				src : ["css/main.css"],
				dest: 'combined-css/combined.min.css'
			}
		},
		
	
		uglify: {
		  options: {
			beautify:false,	
			mangle: false
		  },
		  build: {
			files: {
				'combined-js/combined-vendor.min.js': [
					'../common/js/jquery-3.2.1.min.js',
					'../common/js/jquery.mask.min.js',
					'js/vendor/lazyload.min.js',
					'../common/js/enquire.min.js',
					'../common/js/Imager.min.js',
					'../common/js/jquery.blockUI-2.66.js',
					'../common/js/jquery.colorbox-min.js',
					'../common/js/jquery.form.min.js',
					'../common/js/jquery.hoverIntent.js',
					'../common/js/jquery.pstrength.custom-1.2.0.js',
					'../common/js/jquery.syncheight.custom.js',
					'../common/js/jquery.tabs.custom.js',
					'../common/js/jquery-ui-1.12.1.min.js',
					'../common/js/jquery.ui.touch-punch.min.js',
					'../common/js/jquery.zoom.custom.js',
					'../common/js/owl.carousel.custom.js',
					'../common/js/jquery.tmpl-1.0.0pre.min.js',
					'../common/js/jquery.currencies.min.js',
					'../common/js/jquery.waitforimages.min.js',
					'../common/js/jquery.slideviewer.custom.1.2.js',
					'js/vendor/tether.min.js',
					'js/vendor/slick.min.js',
					'js/vendor/bootstrap.min.js',
					'js/vendor/bootstrap-datepicker.min.js',
					'js/vendor/jquery.validate.min.js',
					'js/vendor/jquery.tinyscrollbar.min.js',
					'js/vendor/picturefill.min.js',
					'js/vendor/select2.min.js',

				],
				
				'combined-js/combined-acc.min.js': [
					'../common/js/acc.address.js',
					'../common/js/acc.autocomplete.js',
					'../common/js/acc.carousel.js',
					'../common/js/acc.cart.js',
					'../common/js/acc.cartitem.js',
					'../common/js/acc.checkout.js',
					'../common/js/acc.checkoutaddress.js',
					'../common/js/acc.checkoutsteps.js',
					'../common/js/acc.cms.js',
					'../common/js/acc.colorbox.js',
					'../common/js/acc.common.js',
					'../common/js/acc.forgottenpassword.js',
					'../common/js/acc.global.js',
					'../common/js/acc.hopdebug.js',
					'../common/js/acc.imagegallery.js',
					'../common/js/acc.langcurrencyselector.js',
					'../common/js/acc.minicart.js',
					'../common/js/acc.navigation.js',
					'../common/js/acc.order.js',
					'../common/js/acc.paginationsort.js',
					'../common/js/acc.payment.js',
					'../common/js/acc.paymentDetails.js',
					'../common/js/acc.pickupinstore.js',
					'../common/js/acc.product.js',
					'../common/js/acc.productDetail.js',
					'../common/js/acc.quickview.js',
					'../common/js/acc.ratingstars.js',
					'../common/js/acc.refinements.js',
					'../common/js/acc.sanitizer.js',
					'../common/js/acc.silentorderpost.js',
					'../common/js/acc.tabs.js',
					'../common/js/acc.termsandconditions.js',
					'../common/js/acc.track.js',
					'../common/js/acc.storefinder.js',
					'../common/js/acc.futurelink.js',
					'../common/js/acc.productorderform.js',
					'../common/js/acc.savedcarts.js',
					'../common/js/acc.multidgrid.js',
					'../common/js/acc.quickorder.js',
					'../common/js/acc.quote.js',
					'../common/js/acc.consent.js',
					'../common/js/acc.cookienotification.js',
					'../common/js/acc.closeaccount.js',
					'../common/js/acc.csv-import.js',
					'../common/js/acc.subscription.js',
					'js/astra-auto.js',
					'js/astra-service.js',
					'js/exif.js',
					'../../../../../../../astracommons/bornrecentvieweditemsaddon/acceleratoraddon/web/webroot/_ui/responsive/common/js/bornrecentvieweditemsaddon.js',
					'../../../../../../../astracommons/productcomparison/acceleratoraddon/web/webroot/_ui/responsive/common/js/productcomparison.js',
					'../../../../../../../locateuser/locateuser/acceleratoraddon/web/webroot/_ui/responsive/common/js/locateuser.js',
					'../../../../../../../astracommons/astrawishlistaddon/acceleratoraddon/web/webroot/_ui/responsive/common/js/astrawishlistaddon.js',
					'../../../../../../../astracommons/astracouponaddon/acceleratoraddon/web/webroot/_ui/responsivecommon/js/astracouponaddon.js',
					'../../../../../../../bornsocialnetworkaddon/acceleratoraddon/web/webroot/_ui/responsive/common/js/bornsocialnetworkaddon.js',
					'../../addons/smarteditaddon/shared/common/js/webApplicationInjector.js',
					'../../addons/smarteditaddon/shared/common/js/reprocessPage.js',
					'../../addons/smarteditaddon/shared/common/js/adjustComponentRenderingToSE.js',
					'../../addons/smarteditaddon/responsive/common/js/smarteditaddon.js',
					'../../../../../../../bornnewsandarticlesaddon/acceleratoraddon/web/webroot/_ui/responsive/common/js/bornnewsandarticlesaddon.js',
					'../../../../../../../astracommons/astramyassetaddon/acceleratoraddon/web/webroot/_ui/responsive/common/js/astramyassetaddon.js',
					'../../../../../../../c2cusedcaraddon/acceleratoraddon/web/webroot/_ui/responsive/common/js/c2cusedcaraddon.js',
					'../common/js/_autoload.js',
				], 
				
			}
		  }
		},
        watch: {
            html: {
                files: ['html/*.html'],
                tasks: ['includes'],
                options: { livereload: true },
                event: ['added', 'deleted']
            },
            css: {
                files: 'sass/**/*.scss',
                tasks: ['sass','cssmin']
            },
			js: {
				files: ['js/*.js', 'js/vendor/*.js', '../common/js/*.js'],
				tasks: ['uglify']
			},
        },
    });

    // Load required modules
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-includes');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Task definitions
    grunt.registerTask('default', ['includes', 'cssmin', 'uglify', 'watch']);
};
