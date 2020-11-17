/*
 * ----------------------------------------------------------------
 * --- WARNING: THIS FILE IS GENERATED AND WILL BE OVERWRITTEN! ---
 * --- Generated at Nov 18, 2020, 12:19:26 AM                   ---
 * ----------------------------------------------------------------
 */
package org.demo.core.jalo;

import de.hybris.platform.category.jalo.Category;
import de.hybris.platform.jalo.Item.AttributeMode;
import de.hybris.platform.jalo.SessionContext;
import de.hybris.platform.jalo.product.Product;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.demo.core.constants.DemoCoreConstants;

/**
 * Generated class for type {@link de.hybris.platform.jalo.product.Product BedProduct}.
 */
@SuppressWarnings({"deprecation","unused","cast"})
public abstract class GeneratedBedProduct extends Product
{
	/** Qualifier of the <code>BedProduct.category</code> attribute **/
	public static final String CATEGORY = "category";
	/** Qualifier of the <code>BedProduct.searchable</code> attribute **/
	public static final String SEARCHABLE = "searchable";
	protected static final Map<String, AttributeMode> DEFAULT_INITIAL_ATTRIBUTES;
	static
	{
		final Map<String, AttributeMode> tmp = new HashMap<String, AttributeMode>(Product.DEFAULT_INITIAL_ATTRIBUTES);
		tmp.put(CATEGORY, AttributeMode.INITIAL);
		tmp.put(SEARCHABLE, AttributeMode.INITIAL);
		DEFAULT_INITIAL_ATTRIBUTES = Collections.unmodifiableMap(tmp);
	}
	@Override
	protected Map<String, AttributeMode> getDefaultAttributeModes()
	{
		return DEFAULT_INITIAL_ATTRIBUTES;
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedProduct.category</code> attribute.
	 * @return the category - Bed category
	 */
	public Category getCategory(final SessionContext ctx)
	{
		return (Category)getProperty( ctx, CATEGORY);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedProduct.category</code> attribute.
	 * @return the category - Bed category
	 */
	public Category getCategory()
	{
		return getCategory( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedProduct.category</code> attribute. 
	 * @param value the category - Bed category
	 */
	public void setCategory(final SessionContext ctx, final Category value)
	{
		setProperty(ctx, CATEGORY,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedProduct.category</code> attribute. 
	 * @param value the category - Bed category
	 */
	public void setCategory(final Category value)
	{
		setCategory( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedProduct.searchable</code> attribute.
	 * @return the searchable - Is searchable brand
	 */
	public Boolean isSearchable(final SessionContext ctx)
	{
		return (Boolean)getProperty( ctx, SEARCHABLE);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedProduct.searchable</code> attribute.
	 * @return the searchable - Is searchable brand
	 */
	public Boolean isSearchable()
	{
		return isSearchable( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedProduct.searchable</code> attribute. 
	 * @return the searchable - Is searchable brand
	 */
	public boolean isSearchableAsPrimitive(final SessionContext ctx)
	{
		Boolean value = isSearchable( ctx );
		return value != null ? value.booleanValue() : false;
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedProduct.searchable</code> attribute. 
	 * @return the searchable - Is searchable brand
	 */
	public boolean isSearchableAsPrimitive()
	{
		return isSearchableAsPrimitive( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedProduct.searchable</code> attribute. 
	 * @param value the searchable - Is searchable brand
	 */
	public void setSearchable(final SessionContext ctx, final Boolean value)
	{
		setProperty(ctx, SEARCHABLE,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedProduct.searchable</code> attribute. 
	 * @param value the searchable - Is searchable brand
	 */
	public void setSearchable(final Boolean value)
	{
		setSearchable( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedProduct.searchable</code> attribute. 
	 * @param value the searchable - Is searchable brand
	 */
	public void setSearchable(final SessionContext ctx, final boolean value)
	{
		setSearchable( ctx,Boolean.valueOf( value ) );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedProduct.searchable</code> attribute. 
	 * @param value the searchable - Is searchable brand
	 */
	public void setSearchable(final boolean value)
	{
		setSearchable( getSession().getSessionContext(), value );
	}
	
}
