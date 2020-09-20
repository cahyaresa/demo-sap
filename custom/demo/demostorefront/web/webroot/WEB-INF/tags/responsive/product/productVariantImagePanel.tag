<%@ tag body-content="empty" trimDirectiveWhitespaces="true" %>
<%@ attribute name="galleryImages" required="true" type="java.util.List" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="product" tagdir="/WEB-INF/tags/responsive/product" %>
<%@ taglib prefix="common" tagdir="/WEB-INF/tags/responsive/common"%>

<div class="__left-content">
    <c:choose>
        <c:when test="${galleryImages == null || galleryImages.size() == 0 || galleryImages[0].product == null }">
            <figure class="__product-img">
                <spring:theme code="img.missingProductImage.responsive.product" text="/" var="imagePath"/>
                <c:choose>
                    <c:when test="${originalContextPath ne null}">
                        <c:url value="${imagePath}" var="imageUrl" context="${originalContextPath}"/>
                    </c:when>
                    <c:otherwise>
                        <c:url value="${imagePath}" var="imageUrl" />
                    </c:otherwise>
                </c:choose>
            </figure>
        </c:when>
        <c:otherwise>
            <figure class="__product-img">
                <img src="${galleryImages[0].product.url}" alt="${fn:escapeXml(galleryImages[0].product.altText)}">
            </figure>
        </c:otherwise>
    </c:choose>
</div>
