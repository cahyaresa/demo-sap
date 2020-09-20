package org.demo.facades.populators;

import de.hybris.platform.commercefacades.product.data.ProductData;
import de.hybris.platform.converters.Populator;
import de.hybris.platform.core.model.product.ProductModel;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;
import org.demo.core.model.BedSizeVariantProductModel;

/**
 * The Class DemoProductPopulator
 *
 * @author kris.sunu.purnandaru
 */
public class DemoProductPopulator implements Populator<ProductModel, ProductData>
{
    @Override
    public void populate(ProductModel source, ProductData target) throws ConversionException
    {
        if(source instanceof BedSizeVariantProductModel) {
            BedSizeVariantProductModel bedSizeVariantProductModel = (BedSizeVariantProductModel) source;
            target.setWidth(bedSizeVariantProductModel.getWidth());
            target.setLength(bedSizeVariantProductModel.getLength());
            target.setHeight(bedSizeVariantProductModel.getHeight());
            target.setManufacturer(bedSizeVariantProductModel.getBaseProduct().getName());
        }
    }
}
