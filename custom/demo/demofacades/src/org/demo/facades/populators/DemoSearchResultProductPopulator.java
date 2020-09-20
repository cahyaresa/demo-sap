package org.demo.facades.populators;

import de.hybris.platform.category.CategoryService;
import de.hybris.platform.category.model.CategoryModel;
import de.hybris.platform.commercefacades.product.data.CategoryData;
import de.hybris.platform.commercefacades.product.data.ImageData;
import de.hybris.platform.commercefacades.product.data.ProductData;
import de.hybris.platform.commercefacades.search.converters.populator.SearchResultProductPopulator;
import de.hybris.platform.commerceservices.search.resultdata.SearchResultValueData;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;
import de.hybris.platform.servicelayer.dto.converter.Converter;
import org.apache.commons.collections.CollectionUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

public class DemoSearchResultProductPopulator extends SearchResultProductPopulator {
    /** The category converter. */
    private Converter<CategoryModel, CategoryData> categoryConverter;

    @Resource(name = "categoryService")
    private CategoryService categoryService;

    /**
     * Gets the category converter.
     *
     * @return the categoryConverter
     */
    public Converter<CategoryModel, CategoryData> getCategoryConverter()
    {
        return categoryConverter;
    }

    /**
     * Sets the category converter.
     *
     * @param categoryConverter
     *           the categoryConverter to set
     */
    public void setCategoryConverter(final Converter<CategoryModel, CategoryData> categoryConverter)
    {
        this.categoryConverter = categoryConverter;
    }

    @Override
    public void populate(final SearchResultValueData source, final ProductData target) throws ConversionException
    {
        target.setWidth(this.<String> getValue(source, "width"));
        target.setLength(this.<String> getValue(source, "length"));
        target.setHeight(this.<String> getValue(source, "height"));
        target.setBrand(this.<String> getValue(source, "brand"));
        target.setCategories(this.populateCategories(source));
        final ArrayList<String> brandNameList = this.<ArrayList> getValue(source, "brandName");

        //Below extra check is to make sure "BRAND" is not populated as brand name.This can also be avoided by not giving the name to the BRAND category in db.
        if (CollectionUtils.isNotEmpty(brandNameList))
        {
            target.setManufacturer(this.<ArrayList> getValue(source, "brandName").get(0).toString());
        }

        final List<ImageData> images = createImageData(source);
        if (CollectionUtils.isNotEmpty(images))
        {
            target.setImages(images);
        }
    }

    private List<CategoryData> populateCategories(final SearchResultValueData source)
    {
        final List<String> categoryList = this.<ArrayList> getValue(source, "category");
        final List<CategoryData> categoryDataList = new ArrayList<>();
        if(CollectionUtils.isNotEmpty(categoryList)){
            final CategoryModel categoryModel = categoryService.getCategoryForCode(categoryList.get(0));
            final CategoryData categoryData = new CategoryData();
            getCategoryConverter().convert(categoryModel, categoryData);
            categoryDataList.add(categoryData);
        }
        return categoryDataList;
    }
}
