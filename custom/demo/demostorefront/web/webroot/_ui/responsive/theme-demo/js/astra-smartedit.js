$(document).ready(function(){
	$('.maintenance-banner').slick('unslick');
	
	$('.maintenance-banner > [data-smartedit-component-id="EaseOfAnyWhereContentSlot"]').slick(maintenance_object);

    $('[data-smartedit-component-id="MaintenanceContentSlot"]').slick(maintenance_object);

    // Recommendation part

    var $swipeTabsContainer = $('.swipe-tabs'),
        $swipeTabs = $('.swipe-tab'),
        $swipeTabsContentContainer = $('.swipe-tabs-container'),
        $swipetabcontent = $('.swipe-tab-content .smartEditComponent'),
        currentIndex = 0,
        activeTabClassName = 'active-tab';    

    $('.swipe-tab-content').slick('unslick');
    $swipetabcontent.slick(swipeSlickObject);

    //supported by section

    $(".supported-banner").slick("unslick");
    $(".supported-banner > .smartEditComponent").slick(supportBannerObject);
    
});