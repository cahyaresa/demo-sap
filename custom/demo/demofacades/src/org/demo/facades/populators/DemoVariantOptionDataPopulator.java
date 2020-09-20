package org.demo.facades.populators;

import de.hybris.platform.commercefacades.product.data.VariantOptionData;
import de.hybris.platform.converters.Populator;
import de.hybris.platform.variants.model.VariantProductModel;
import org.apache.commons.lang.StringUtils;
import org.demo.core.model.BedSizeVariantProductModel;

/**
 * The Class DemoVariantOptionDataPopulator
 *
 * @author kris.sunu.purnandaru
 */
public class DemoVariantOptionDataPopulator implements Populator<VariantProductModel, VariantOptionData>
{
    private static final String KASUR = "Kasur ";
    private static final String SPACE = " ";
    private static final String CROSS = " X ";
    private static final String CENTIMETER = " cm";

    @Override
    public void populate(final VariantProductModel source, final VariantOptionData target)
    {
        BedSizeVariantProductModel bedSizeVariantProductModel = (BedSizeVariantProductModel) source;
        if (StringUtils.isNotBlank(source.getName()))
        {
            target.setName(source.getName());
        }
        target.setSize(bedSizeVariantProductModel.getWidth().concat(CROSS).concat(bedSizeVariantProductModel.getLength()).concat(CENTIMETER));
        target.setMarketingName(KASUR.concat(source.getBaseProduct().getName()).concat(SPACE).concat(source.getName()));
    }
}
