/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2018 SAP SE
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * Hybris ("Confidential Information").
 *
 * You shall not disclose such Confidential
 * Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with SAP Hybris.
 *
 */
package org.demo.core.search.solrfacetsearch.provider.impl;

import de.hybris.platform.core.model.c2l.LanguageModel;
import de.hybris.platform.core.model.product.ProductModel;
import de.hybris.platform.servicelayer.i18n.CommonI18NService;
import de.hybris.platform.solrfacetsearch.config.IndexConfig;
import de.hybris.platform.solrfacetsearch.config.IndexedProperty;
import de.hybris.platform.solrfacetsearch.config.exceptions.FieldValueProviderException;
import de.hybris.platform.solrfacetsearch.provider.FieldNameProvider;
import de.hybris.platform.solrfacetsearch.provider.FieldValue;
import de.hybris.platform.solrfacetsearch.provider.FieldValueProvider;
import de.hybris.platform.solrfacetsearch.provider.impl.AbstractPropertyFieldValueProvider;
import org.demo.core.model.BedProductModel;
import org.demo.core.model.BedSizeVariantProductModel;
import org.springframework.beans.factory.annotation.Required;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Locale;


/**
 * Provider to index the base products.
 *
 * @author kris.sunu.purnandaru
 *
 */
public class DemoProductModelNameValueProvider extends AbstractPropertyFieldValueProvider implements FieldValueProvider
{

	/** The field name provider. */
	private FieldNameProvider fieldNameProvider;

	/** The common I 18 N service. */
	private CommonI18NService commonI18NService;


	@SuppressWarnings("deprecation")
	@Override
	public Collection<FieldValue> getFieldValues(final IndexConfig indexConfig, final IndexedProperty indexedProperty,
                                                 final Object model) throws FieldValueProviderException
	{

		if (model instanceof ProductModel && model instanceof BedSizeVariantProductModel)
		{
			final BedSizeVariantProductModel product = (BedSizeVariantProductModel) model;

			final BedProductModel baseProduct = (BedProductModel) product.getBaseProduct();

			final Collection<FieldValue> fieldValues = new ArrayList<>();

			if (indexedProperty.isLocalized())
			{
				final Collection<LanguageModel> languages = indexConfig.getLanguages();
				for (final LanguageModel language : languages)
				{
					fieldValues.addAll(createFieldValue(baseProduct, language, indexedProperty));
				}
			}
			else
			{
				fieldValues.addAll(createFieldValue(baseProduct, null, indexedProperty));
			}
			return fieldValues;
		}
		else
		{
			return Collections.emptyList();

		}
	}

	/**
	 * Creates the field value.
	 *
	 * @param product
	 *           the product
	 * @param language
	 *           the language
	 * @param indexedProperty
	 *           the indexed property
	 * @return the list
	 */
	protected List<FieldValue> createFieldValue(final BedProductModel product, final LanguageModel language,
                                                final IndexedProperty indexedProperty)
	{
		final List<FieldValue> fieldValues = new ArrayList<>();

		if (language != null)
		{
			final Locale locale = i18nService.getCurrentLocale();
			Object value = null;
			try
			{
				i18nService.setCurrentLocale(getCommonI18NService().getLocaleForLanguage(language));
				value = getPropertyValue(product);
			}
			finally
			{
				i18nService.setCurrentLocale(locale);
			}

			final Collection<String> fieldNames = getFieldNameProvider().getFieldNames(indexedProperty, language.getIsocode());
			for (final String fieldName : fieldNames)
			{
				fieldValues.add(new FieldValue(fieldName, value));
			}
		}
		else
		{
			final Object value = getPropertyValue(product);
			final Collection<String> fieldNames = getFieldNameProvider().getFieldNames(indexedProperty, null);
			for (final String fieldName : fieldNames)
			{
				fieldValues.add(new FieldValue(fieldName, value));
			}
		}

		return fieldValues;
	}


	/**
	 * Gets the property value.
	 *
	 * @param model
	 *           the model
	 * @return the property value
	 */
	protected Object getPropertyValue(final Object model)
	{
		return getPropertyValue(model, "name");
	}

	/**
	 * Gets the property value.
	 *
	 * @param model
	 *           the model
	 * @param propertyName
	 *           the property name
	 * @return the property value
	 */
	protected Object getPropertyValue(final Object model, final String propertyName)
	{
		return modelService.getAttributeValue(model, propertyName);
	}



	/**
	 * Gets the field name provider.
	 *
	 * @return the fieldNameProvider
	 */
	public FieldNameProvider getFieldNameProvider()
	{
		return fieldNameProvider;
	}

	/**
	 * Sets the field name provider.
	 *
	 * @param fieldNameProvider
	 *           the fieldNameProvider to set
	 */
	@Required
	public void setFieldNameProvider(final FieldNameProvider fieldNameProvider)
	{
		this.fieldNameProvider = fieldNameProvider;
	}

	/**
	 * Gets the common I18N service.
	 *
	 * @return the commonI18NService
	 */
	public CommonI18NService getCommonI18NService()
	{
		return commonI18NService;
	}

	/**
	 * Sets the common I18N service.
	 *
	 * @param commonI18NService
	 *           the commonI18NService to set
	 */
	@Required
	public void setCommonI18NService(final CommonI18NService commonI18NService)
	{
		this.commonI18NService = commonI18NService;
	}



}
