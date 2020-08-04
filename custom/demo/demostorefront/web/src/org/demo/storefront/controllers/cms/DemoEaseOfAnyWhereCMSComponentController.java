package org.demo.storefront.controllers.cms;


import org.demo.core.model.DemoEaseOfAnyWhereCMSComponentModel;
import org.demo.storefront.controllers.ControllerConstants;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller("TrainingComponentController")
@RequestMapping(value = ControllerConstants.Actions.Cms.DemoEaseOfAnyWhereCMSComponent)
public class DemoEaseOfAnyWhereCMSComponentController extends AbstractAcceleratorCMSComponentController<DemoEaseOfAnyWhereCMSComponentModel> {

    @Override
    protected void fillModel(HttpServletRequest request, Model model, DemoEaseOfAnyWhereCMSComponentModel component) {

    }
}
