<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="ycommerce" uri="http://hybris.com/tld/ycommercetags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

	                    <div class="ease-1">
                           <div class="__image-container">
                                <img src="${component.backGroundImage.url}"/>
                           </div>
                        </div>
                        <div class="ease-2">
                            <div class="maintanence-links " data-title="${component.title}">
                         		<spring:url var="encodedUrl" value="${component.footerUrl}"/>
                         		<a href="${encodedUrl}"><i class="${component.desclink}"></i><p>${component.title}</p></a>
                            </div>
                            <div class="maintanence-content">
                                <div class="content">
                                    ${component.description}
                                </div>
                                <!--
                                <div class="footer-link ease-of-anywhere" data-title="${component.title}">
                                	<spring:url var="encodedUrl" value="${component.footerUrl}"/>
                                    <a href="${encodedUrl}"> ${component.description}</a>
                                </div>
                                -->
                            </div>
                        </div>
                    