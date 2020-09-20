package org.demo.facades.populators;

import de.hybris.platform.commercefacades.product.data.VariantOptionData;
import de.hybris.platform.converters.Populator;
import de.hybris.platform.variants.model.VariantProductModel;
import org.apache.commons.lang.StringUtils;

/**
 * The Class DemoVariantOptionDataPopulator
 *
 * @author kris.sunu.purnandaru
 */
public class DemoVariantOptionDataPopulator implements Populator<VariantProductModel, VariantOptionData>
{
    @Override
    public void populate(final VariantProductModel source, final VariantOptionData target)
    {
        if (StringUtils.isNotBlank(source.getName()))
        {
            target.setName(source.getName());
        }
    }
}
