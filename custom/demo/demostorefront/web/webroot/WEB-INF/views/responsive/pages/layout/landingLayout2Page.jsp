<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="template" tagdir="/WEB-INF/tags/responsive/template"%>
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags"%>

<template:page pageTitle="${pageTitle}">
<%-- Section 1 : Main Banner Start --%>
    <div class="col-12 main-banner">
        <cms:pageSlot position="Section1" var="feature">
            <cms:component component="${feature}" element="div" class="Home-banner"/>
        </cms:pageSlot>
    </div>
<%-- Section 1 : Main Banner End --%>


<%-- Section 2 : Best Selling & New Product Start --%>
    <div class="container">
    <div class="row section-2">
        <div class="container col-xs-12 col-md-12 no-space">
            <cms:pageSlot position="Section2A" var="feature" element="div" class="row no-margin">
                <cms:component component="${feature}" element="div" class="col-12 paragraph-inthebox yComponentWrapper"/>
            </cms:pageSlot>
        </div>
        <div class="container col-xs-12 col-md-12 no-space">
            <cms:pageSlot position="Section2B" var="feature" element="div" class="row no-margin">
                <cms:component component="${feature}" element="div" class="col-12 best-selling yComponentWrapper"/>
            </cms:pageSlot>
        </div>
    </div>
    </div>
<%-- Section 2 : Best Selling & New Product End --%>

<%-- Section 3A: Unboxing Inthe Box Start --%>
    <div class="container">
        <div class="row section-3A">
        <cms:pageSlot position="Section3A" var="feature">
            <cms:component component="${feature}" element="div" class="yComponentWrapper"/>
        </cms:pageSlot>
        </div>
    </div>
<%-- Section 3A: Unboxing Inthe Box End --%>
<%-- Section 3B: Step Unboxing Inthe Box Start --%>
    <div class="container">
        <div class="row section-3B">
            <div class="container col-xs-12 col-md-6 no-space">
                <cms:pageSlot position="Section3B" var="feature" element="div" class="row no-margin">
                    <cms:component component="${feature}" element="div" class="col-xs-12 col-sm-6 ease-of-anywhere yComponentWrapper"/>
                </cms:pageSlot>
            </div>
            <div class="container col-xs-12 col-md-6 no-space">
                <cms:pageSlot position="Section3C" var="feature" element="div" class="row no-margin">
                    <cms:component component="${feature}" element="div" class="col-xs-12 col-sm-6 ease-of-anywhere yComponentWrapper"/>
                </cms:pageSlot>
            </div>
        </div>
    </div>
<%-- Section 3B: Step Unboxing Inthe Box End --%>

<%-- Section4: Video Section Start --%>
    <div class="container">
        <div class="row section-4">
            <cms:pageSlot position="Section4" var="feature" element="div" class="row video-promo ">
                <cms:component component="${feature}" element="div" class="yComponentWrapper"/>
            </cms:pageSlot>
        </div>
    </div>
<%-- Section4: Video Section End --%>

<%-- Section5: Material Section Paragraph Start --%>
    <div class="container">
        <div class="row section-5">
            <cms:pageSlot position="Section5" var="feature" element="div" class="row material-paragraph ">
                <cms:component component="${feature}" element="div" class="container yComponentWrapper"/>
            </cms:pageSlot>
        </div>
    </div>
<%-- Section5: Material Section Paragraph End --%>

<%-- Section6: Material Section Image Start --%>
    <div class="container">
        <div class="row section-6 no-margin">
            <cms:pageSlot position="Section6" var="feature" element="div" class="row forming-material">
                <cms:component component="${feature}" element="div" class="container yComponentWrapper"/>
            </cms:pageSlot>
        </div>
    </div>
<%-- Section6: Material Section image End --%>

<%-- Section7: Material Section Image Start --%>
    <div class="container">
        <div class="row section-7">
            <cms:pageSlot position="Section7" var="feature" element="div" class="storefinder">
                    <cms:component component="${feature}" element="div" class="yComponentWrapper"/>
            </cms:pageSlot>
        </div>
    </div>
<%-- Section7: Material Section image End --%>






</template:page>
