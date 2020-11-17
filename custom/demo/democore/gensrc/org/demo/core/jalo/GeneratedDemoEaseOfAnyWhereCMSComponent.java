/*
 * ----------------------------------------------------------------
 * --- WARNING: THIS FILE IS GENERATED AND WILL BE OVERWRITTEN! ---
 * --- Generated at Nov 18, 2020, 12:19:26 AM                   ---
 * ----------------------------------------------------------------
 */
package org.demo.core.jalo;

import de.hybris.platform.cms2.jalo.contents.components.SimpleCMSComponent;
import de.hybris.platform.jalo.Item.AttributeMode;
import de.hybris.platform.jalo.JaloInvalidParameterException;
import de.hybris.platform.jalo.SessionContext;
import de.hybris.platform.jalo.c2l.C2LManager;
import de.hybris.platform.jalo.c2l.Language;
import de.hybris.platform.jalo.media.Media;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.demo.core.constants.DemoCoreConstants;

/**
 * Generated class for type {@link org.demo.core.jalo.DemoEaseOfAnyWhereCMSComponent DemoEaseOfAnyWhereCMSComponent}.
 */
@SuppressWarnings({"deprecation","unused","cast"})
public abstract class GeneratedDemoEaseOfAnyWhereCMSComponent extends SimpleCMSComponent
{
	/** Qualifier of the <code>DemoEaseOfAnyWhereCMSComponent.backGroundImage</code> attribute **/
	public static final String BACKGROUNDIMAGE = "backGroundImage";
	/** Qualifier of the <code>DemoEaseOfAnyWhereCMSComponent.hoverOverImage</code> attribute **/
	public static final String HOVEROVERIMAGE = "hoverOverImage";
	/** Qualifier of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute **/
	public static final String TITLE = "title";
	/** Qualifier of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute **/
	public static final String DESCRIPTION = "description";
	/** Qualifier of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute **/
	public static final String FOOTERURL = "footerUrl";
	/** Qualifier of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute **/
	public static final String FOOTERURLNAME = "footerUrlName";
	/** Qualifier of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute **/
	public static final String DESCLINK = "desclink";
	protected static final Map<String, AttributeMode> DEFAULT_INITIAL_ATTRIBUTES;
	static
	{
		final Map<String, AttributeMode> tmp = new HashMap<String, AttributeMode>(SimpleCMSComponent.DEFAULT_INITIAL_ATTRIBUTES);
		tmp.put(BACKGROUNDIMAGE, AttributeMode.INITIAL);
		tmp.put(HOVEROVERIMAGE, AttributeMode.INITIAL);
		tmp.put(TITLE, AttributeMode.INITIAL);
		tmp.put(DESCRIPTION, AttributeMode.INITIAL);
		tmp.put(FOOTERURL, AttributeMode.INITIAL);
		tmp.put(FOOTERURLNAME, AttributeMode.INITIAL);
		tmp.put(DESCLINK, AttributeMode.INITIAL);
		DEFAULT_INITIAL_ATTRIBUTES = Collections.unmodifiableMap(tmp);
	}
	@Override
	protected Map<String, AttributeMode> getDefaultAttributeModes()
	{
		return DEFAULT_INITIAL_ATTRIBUTES;
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.backGroundImage</code> attribute.
	 * @return the backGroundImage - Localized media that is displayed Ease Of Any Where.
	 */
	public Media getBackGroundImage(final SessionContext ctx)
	{
		return (Media)getProperty( ctx, BACKGROUNDIMAGE);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.backGroundImage</code> attribute.
	 * @return the backGroundImage - Localized media that is displayed Ease Of Any Where.
	 */
	public Media getBackGroundImage()
	{
		return getBackGroundImage( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.backGroundImage</code> attribute. 
	 * @param value the backGroundImage - Localized media that is displayed Ease Of Any Where.
	 */
	public void setBackGroundImage(final SessionContext ctx, final Media value)
	{
		setProperty(ctx, BACKGROUNDIMAGE,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.backGroundImage</code> attribute. 
	 * @param value the backGroundImage - Localized media that is displayed Ease Of Any Where.
	 */
	public void setBackGroundImage(final Media value)
	{
		setBackGroundImage( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute.
	 * @return the desclink - Link
	 */
	public String getDesclink(final SessionContext ctx)
	{
		if( ctx == null || ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.getDesclink requires a session language", 0 );
		}
		return (String)getLocalizedProperty( ctx, DESCLINK);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute.
	 * @return the desclink - Link
	 */
	public String getDesclink()
	{
		return getDesclink( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute. 
	 * @return the localized desclink - Link
	 */
	public Map<Language,String> getAllDesclink(final SessionContext ctx)
	{
		return (Map<Language,String>)getAllLocalizedProperties(ctx,DESCLINK,C2LManager.getInstance().getAllLanguages());
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute. 
	 * @return the localized desclink - Link
	 */
	public Map<Language,String> getAllDesclink()
	{
		return getAllDesclink( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute. 
	 * @param value the desclink - Link
	 */
	public void setDesclink(final SessionContext ctx, final String value)
	{
		if ( ctx == null) 
		{
			throw new JaloInvalidParameterException( "ctx is null", 0 );
		}
		if( ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.setDesclink requires a session language", 0 );
		}
		setLocalizedProperty(ctx, DESCLINK,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute. 
	 * @param value the desclink - Link
	 */
	public void setDesclink(final String value)
	{
		setDesclink( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute. 
	 * @param value the desclink - Link
	 */
	public void setAllDesclink(final SessionContext ctx, final Map<Language,String> value)
	{
		setAllLocalizedProperties(ctx,DESCLINK,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.desclink</code> attribute. 
	 * @param value the desclink - Link
	 */
	public void setAllDesclink(final Map<Language,String> value)
	{
		setAllDesclink( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute.
	 * @return the description - Description
	 */
	public String getDescription(final SessionContext ctx)
	{
		if( ctx == null || ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.getDescription requires a session language", 0 );
		}
		return (String)getLocalizedProperty( ctx, DESCRIPTION);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute.
	 * @return the description - Description
	 */
	public String getDescription()
	{
		return getDescription( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute. 
	 * @return the localized description - Description
	 */
	public Map<Language,String> getAllDescription(final SessionContext ctx)
	{
		return (Map<Language,String>)getAllLocalizedProperties(ctx,DESCRIPTION,C2LManager.getInstance().getAllLanguages());
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute. 
	 * @return the localized description - Description
	 */
	public Map<Language,String> getAllDescription()
	{
		return getAllDescription( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute. 
	 * @param value the description - Description
	 */
	public void setDescription(final SessionContext ctx, final String value)
	{
		if ( ctx == null) 
		{
			throw new JaloInvalidParameterException( "ctx is null", 0 );
		}
		if( ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.setDescription requires a session language", 0 );
		}
		setLocalizedProperty(ctx, DESCRIPTION,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute. 
	 * @param value the description - Description
	 */
	public void setDescription(final String value)
	{
		setDescription( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute. 
	 * @param value the description - Description
	 */
	public void setAllDescription(final SessionContext ctx, final Map<Language,String> value)
	{
		setAllLocalizedProperties(ctx,DESCRIPTION,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.description</code> attribute. 
	 * @param value the description - Description
	 */
	public void setAllDescription(final Map<Language,String> value)
	{
		setAllDescription( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute.
	 * @return the footerUrl - footer Url
	 */
	public String getFooterUrl(final SessionContext ctx)
	{
		if( ctx == null || ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.getFooterUrl requires a session language", 0 );
		}
		return (String)getLocalizedProperty( ctx, FOOTERURL);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute.
	 * @return the footerUrl - footer Url
	 */
	public String getFooterUrl()
	{
		return getFooterUrl( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute. 
	 * @return the localized footerUrl - footer Url
	 */
	public Map<Language,String> getAllFooterUrl(final SessionContext ctx)
	{
		return (Map<Language,String>)getAllLocalizedProperties(ctx,FOOTERURL,C2LManager.getInstance().getAllLanguages());
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute. 
	 * @return the localized footerUrl - footer Url
	 */
	public Map<Language,String> getAllFooterUrl()
	{
		return getAllFooterUrl( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute. 
	 * @param value the footerUrl - footer Url
	 */
	public void setFooterUrl(final SessionContext ctx, final String value)
	{
		if ( ctx == null) 
		{
			throw new JaloInvalidParameterException( "ctx is null", 0 );
		}
		if( ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.setFooterUrl requires a session language", 0 );
		}
		setLocalizedProperty(ctx, FOOTERURL,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute. 
	 * @param value the footerUrl - footer Url
	 */
	public void setFooterUrl(final String value)
	{
		setFooterUrl( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute. 
	 * @param value the footerUrl - footer Url
	 */
	public void setAllFooterUrl(final SessionContext ctx, final Map<Language,String> value)
	{
		setAllLocalizedProperties(ctx,FOOTERURL,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrl</code> attribute. 
	 * @param value the footerUrl - footer Url
	 */
	public void setAllFooterUrl(final Map<Language,String> value)
	{
		setAllFooterUrl( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute.
	 * @return the footerUrlName - footer Url Name
	 */
	public String getFooterUrlName(final SessionContext ctx)
	{
		if( ctx == null || ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.getFooterUrlName requires a session language", 0 );
		}
		return (String)getLocalizedProperty( ctx, FOOTERURLNAME);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute.
	 * @return the footerUrlName - footer Url Name
	 */
	public String getFooterUrlName()
	{
		return getFooterUrlName( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute. 
	 * @return the localized footerUrlName - footer Url Name
	 */
	public Map<Language,String> getAllFooterUrlName(final SessionContext ctx)
	{
		return (Map<Language,String>)getAllLocalizedProperties(ctx,FOOTERURLNAME,C2LManager.getInstance().getAllLanguages());
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute. 
	 * @return the localized footerUrlName - footer Url Name
	 */
	public Map<Language,String> getAllFooterUrlName()
	{
		return getAllFooterUrlName( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute. 
	 * @param value the footerUrlName - footer Url Name
	 */
	public void setFooterUrlName(final SessionContext ctx, final String value)
	{
		if ( ctx == null) 
		{
			throw new JaloInvalidParameterException( "ctx is null", 0 );
		}
		if( ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.setFooterUrlName requires a session language", 0 );
		}
		setLocalizedProperty(ctx, FOOTERURLNAME,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute. 
	 * @param value the footerUrlName - footer Url Name
	 */
	public void setFooterUrlName(final String value)
	{
		setFooterUrlName( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute. 
	 * @param value the footerUrlName - footer Url Name
	 */
	public void setAllFooterUrlName(final SessionContext ctx, final Map<Language,String> value)
	{
		setAllLocalizedProperties(ctx,FOOTERURLNAME,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.footerUrlName</code> attribute. 
	 * @param value the footerUrlName - footer Url Name
	 */
	public void setAllFooterUrlName(final Map<Language,String> value)
	{
		setAllFooterUrlName( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.hoverOverImage</code> attribute.
	 * @return the hoverOverImage - Localized media that is displayed Ease Of Any Where.
	 */
	public Media getHoverOverImage(final SessionContext ctx)
	{
		return (Media)getProperty( ctx, HOVEROVERIMAGE);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.hoverOverImage</code> attribute.
	 * @return the hoverOverImage - Localized media that is displayed Ease Of Any Where.
	 */
	public Media getHoverOverImage()
	{
		return getHoverOverImage( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.hoverOverImage</code> attribute. 
	 * @param value the hoverOverImage - Localized media that is displayed Ease Of Any Where.
	 */
	public void setHoverOverImage(final SessionContext ctx, final Media value)
	{
		setProperty(ctx, HOVEROVERIMAGE,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.hoverOverImage</code> attribute. 
	 * @param value the hoverOverImage - Localized media that is displayed Ease Of Any Where.
	 */
	public void setHoverOverImage(final Media value)
	{
		setHoverOverImage( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute.
	 * @return the title - title
	 */
	public String getTitle(final SessionContext ctx)
	{
		if( ctx == null || ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.getTitle requires a session language", 0 );
		}
		return (String)getLocalizedProperty( ctx, TITLE);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute.
	 * @return the title - title
	 */
	public String getTitle()
	{
		return getTitle( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute. 
	 * @return the localized title - title
	 */
	public Map<Language,String> getAllTitle(final SessionContext ctx)
	{
		return (Map<Language,String>)getAllLocalizedProperties(ctx,TITLE,C2LManager.getInstance().getAllLanguages());
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute. 
	 * @return the localized title - title
	 */
	public Map<Language,String> getAllTitle()
	{
		return getAllTitle( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute. 
	 * @param value the title - title
	 */
	public void setTitle(final SessionContext ctx, final String value)
	{
		if ( ctx == null) 
		{
			throw new JaloInvalidParameterException( "ctx is null", 0 );
		}
		if( ctx.getLanguage() == null )
		{
			throw new JaloInvalidParameterException("GeneratedDemoEaseOfAnyWhereCMSComponent.setTitle requires a session language", 0 );
		}
		setLocalizedProperty(ctx, TITLE,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute. 
	 * @param value the title - title
	 */
	public void setTitle(final String value)
	{
		setTitle( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute. 
	 * @param value the title - title
	 */
	public void setAllTitle(final SessionContext ctx, final Map<Language,String> value)
	{
		setAllLocalizedProperties(ctx,TITLE,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>DemoEaseOfAnyWhereCMSComponent.title</code> attribute. 
	 * @param value the title - title
	 */
	public void setAllTitle(final Map<Language,String> value)
	{
		setAllTitle( getSession().getSessionContext(), value );
	}
	
}
