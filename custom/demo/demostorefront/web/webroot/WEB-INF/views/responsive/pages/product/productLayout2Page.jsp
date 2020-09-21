<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="template" tagdir="/WEB-INF/tags/responsive/template"%>
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags"%>
<%@ taglib prefix="product" tagdir="/WEB-INF/tags/responsive/product"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<template:page pageTitle="${pageTitle}">
	<cms:pageSlot position="Section1" var="comp" element="div" class="productDetailsPageSection1">
		<cms:component component="${comp}" element="div" class="productDetailsPageSection1-component"/>
	</cms:pageSlot>
	<product:productDetailsPanel />
	<cms:pageSlot position="CrossSelling" var="comp" element="div" class="productDetailsPageSectionCrossSelling">
		<cms:component component="${comp}" element="div" class="productDetailsPageSectionCrossSelling-component"/>
	</cms:pageSlot>
	<cms:pageSlot position="Section3" var="comp" element="div" class="productDetailsPageSection3">
		<cms:component component="${comp}" element="div" class="productDetailsPageSection3-component"/>
	</cms:pageSlot>
	<cms:pageSlot position="UpSelling" var="comp" element="div" class="productDetailsPageSectionUpSelling">
		<cms:component component="${comp}" element="div" class="productDetailsPageSectionUpSelling-component"/>
	</cms:pageSlot>
	<product:productPageTabs />
	<cms:pageSlot position="Section4" var="comp" element="div" class="productDetailsPageSection4">
		<cms:component component="${comp}" element="div" class="productDetailsPageSection4-component"/>
	</cms:pageSlot>


	<%-- ---------------------------------------- You Might Like Section - Start ------------------------------------ --%>

	<section class="pdp-scroll__data">
		<div class="container">
			<div class="row">
				<div class="col-lg-12">
					<div class="product-variant-slider new-pdp-variant">
						<product:productVariantListerGridItem product="${product}" />
					</div>
					<div class="btn-lihat-semua">
						<a href="${encodedContextPath}/c/BED" class="btn btn-primary"><spring:theme code="product.view.all" /></a>
					</div>
				</div>
			</div>
		</div>
	</section>
</template:page>