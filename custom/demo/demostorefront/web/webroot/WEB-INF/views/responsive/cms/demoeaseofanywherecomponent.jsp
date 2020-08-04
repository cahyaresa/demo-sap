<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="ycommerce" uri="http://hybris.com/tld/ycommercetags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
	               <div>
                           <div class="__image-container">
                            <img src="${component.backGroundImage.url}"/>
                        </div>
                        <div class="">

                         <div class="maintanence-links ease-of-anywhere" data-title="${component.title}">
                         		<spring:url var="encodedUrl" value="${component.footerUrl}"/>
                         		<a href="${encodedUrl}"><i class="${component.desclink}"></i><p>${component.title}</p></a>
                            </div>
                            <div class="maintanence-content">
                                <div class="content">
                                    ${component.description}
                                </div>
                                <div class="footer-link ease-of-anywhere" data-title="${component.title}">
                                	<spring:url var="encodedUrl" value="${component.footerUrl}"/>
                                    <a href="${encodedUrl}"> ${component.footerUrlName}</a>
                                </div>
                            </div>
                        </div>
                  	   </div>
