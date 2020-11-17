/*
 * ----------------------------------------------------------------
 * --- WARNING: THIS FILE IS GENERATED AND WILL BE OVERWRITTEN! ---
 * --- Generated at Nov 18, 2020, 12:19:26 AM                   ---
 * ----------------------------------------------------------------
 */
package org.demo.core.jalo;

import de.hybris.platform.jalo.Item.AttributeMode;
import de.hybris.platform.jalo.SessionContext;
import de.hybris.platform.variants.jalo.VariantProduct;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.demo.core.constants.DemoCoreConstants;

/**
 * Generated class for type {@link de.hybris.platform.variants.jalo.VariantProduct BedSizeVariantProduct}.
 */
@SuppressWarnings({"deprecation","unused","cast"})
public abstract class GeneratedBedSizeVariantProduct extends VariantProduct
{
	/** Qualifier of the <code>BedSizeVariantProduct.width</code> attribute **/
	public static final String WIDTH = "width";
	/** Qualifier of the <code>BedSizeVariantProduct.length</code> attribute **/
	public static final String LENGTH = "length";
	/** Qualifier of the <code>BedSizeVariantProduct.height</code> attribute **/
	public static final String HEIGHT = "height";
	protected static final Map<String, AttributeMode> DEFAULT_INITIAL_ATTRIBUTES;
	static
	{
		final Map<String, AttributeMode> tmp = new HashMap<String, AttributeMode>(VariantProduct.DEFAULT_INITIAL_ATTRIBUTES);
		tmp.put(WIDTH, AttributeMode.INITIAL);
		tmp.put(LENGTH, AttributeMode.INITIAL);
		tmp.put(HEIGHT, AttributeMode.INITIAL);
		DEFAULT_INITIAL_ATTRIBUTES = Collections.unmodifiableMap(tmp);
	}
	@Override
	protected Map<String, AttributeMode> getDefaultAttributeModes()
	{
		return DEFAULT_INITIAL_ATTRIBUTES;
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedSizeVariantProduct.height</code> attribute.
	 * @return the height - Bed Size height
	 */
	public String getHeight(final SessionContext ctx)
	{
		return (String)getProperty( ctx, HEIGHT);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedSizeVariantProduct.height</code> attribute.
	 * @return the height - Bed Size height
	 */
	public String getHeight()
	{
		return getHeight( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedSizeVariantProduct.height</code> attribute. 
	 * @param value the height - Bed Size height
	 */
	public void setHeight(final SessionContext ctx, final String value)
	{
		setProperty(ctx, HEIGHT,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedSizeVariantProduct.height</code> attribute. 
	 * @param value the height - Bed Size height
	 */
	public void setHeight(final String value)
	{
		setHeight( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedSizeVariantProduct.length</code> attribute.
	 * @return the length - Bed Size length
	 */
	public String getLength(final SessionContext ctx)
	{
		return (String)getProperty( ctx, LENGTH);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedSizeVariantProduct.length</code> attribute.
	 * @return the length - Bed Size length
	 */
	public String getLength()
	{
		return getLength( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedSizeVariantProduct.length</code> attribute. 
	 * @param value the length - Bed Size length
	 */
	public void setLength(final SessionContext ctx, final String value)
	{
		setProperty(ctx, LENGTH,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedSizeVariantProduct.length</code> attribute. 
	 * @param value the length - Bed Size length
	 */
	public void setLength(final String value)
	{
		setLength( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedSizeVariantProduct.width</code> attribute.
	 * @return the width - Bed Size width
	 */
	public String getWidth(final SessionContext ctx)
	{
		return (String)getProperty( ctx, WIDTH);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>BedSizeVariantProduct.width</code> attribute.
	 * @return the width - Bed Size width
	 */
	public String getWidth()
	{
		return getWidth( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedSizeVariantProduct.width</code> attribute. 
	 * @param value the width - Bed Size width
	 */
	public void setWidth(final SessionContext ctx, final String value)
	{
		setProperty(ctx, WIDTH,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>BedSizeVariantProduct.width</code> attribute. 
	 * @param value the width - Bed Size width
	 */
	public void setWidth(final String value)
	{
		setWidth( getSession().getSessionContext(), value );
	}
	
}
