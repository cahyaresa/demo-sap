<%@ tag body-content="empty" trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="theme" tagdir="/WEB-INF/tags/shared/theme" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="format" tagdir="/WEB-INF/tags/shared/format" %>
<%@ taglib prefix="product" tagdir="/WEB-INF/tags/responsive/product" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ attribute name="product" required="true" type="de.hybris.platform.commercefacades.product.data.ProductData" %>
<%@ taglib prefix="common" tagdir="/WEB-INF/tags/responsive/common"%>

<c:if test="${product.variantType eq 'BedSizeVariantProduct'}">
	<c:set var="variantOptions" value="${product.variantOptions}"/>
</c:if>
<c:if test="${(empty variantOptions) and (not empty product.baseOptions[0].options) and (product.baseOptions[0].variantType eq 'BedSizeVariantProduct')}">
	<c:set var="variantOptions" value="${product.baseOptions[0].options}"/>
	<c:set var="currentStyleUrl" value="${product.url}"/>
</c:if>
<c:if test="${(empty variantOptions) and (not empty product.baseOptions[1].options) and (product.baseOptions[1].variantType eq 'BedSizeVariantProduct')}">
	<c:set var="variantOptions" value="${product.baseOptions[1].options}"/>
	<c:set var="currentStyleUrl" value="${product.baseOptions[1].selected.url}"/>
</c:if>

<c:if test="${not empty variantOptions}">
	<div class="four-colum pdp__like-slider">
		<c:forEach items="${variantOptions}" var="variantOption">
			<div class="slide-box">
				<div class="product-list-component">
					<c:set var="optionsString" value=""/>
					<%--<c:forEach items="${variantOption.variantOptionQualifiers}" var="variantOptionQualifier">
						<c:set var="optionsString">${optionsString}&nbsp;${fn:escapeXml(variantOptionQualifier.name)}&nbsp;${fn:escapeXml(variantOptionQualifier.value)}, </c:set>
					</c:forEach>--%>
					<c:set var="images" value="${variantImages[variantOption.code]}"/>
					<product:productVariantImagePanel galleryImages="${images}" />

					<div class="_product-info">
						<a href="${encodedContextPath}${variantOption.url}" title="" tabindex="0">
							<div><span class="_brand-name prod_name"> ${variantOption.name}</span></div>
							<span class="_brand-name _marketing-name"> ${variantOption.marketingName}</span>
							<span class="_brand-name _size"> ${variantOption.size}</span>
							<span class="_brand-name _rp"> <format:price priceData="${variantOption.priceData}" /></span>
						</a>
					</div>
				</div>
			</div>
		</c:forEach>
	</div>
</c:if>