/**
 *
 */
package org.demo.core.util;

import de.hybris.platform.util.Config;
import de.hybris.platform.util.mail.MailUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.mail.Email;
import org.apache.commons.mail.EmailException;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.DateFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.regex.Pattern;


/**
 * The Class DemoAutoUtils.
 *
 * @author mathialagan.r
 */
public class DemoUtils
{

	/** The Constant EMAIL_ID_SEPERATOR. */
	public static final String EMAIL_ID_SEPERATOR = ",";

	/** The Constant DD_MM_YYYY_HH_MM_SS. */
	private static final String DD_MM_YYYY_HH_MM_SS = "dd-MM-yyyy";

	/** The Constant DEMO_LOCALE_KEY. */
	private static final String DEMO_LOCALE_KEY = "id";

	/** The Constant HOTFOLDER_ERROR_MESSAGE. */
	private static final String HOTFOLDER_ERROR_MESSAGE = "hotfolder.error.msg";

	/** The Constant HOTFOLDER_ERROR_EMAIL. */
	private static final String HOTFOLDER_ERROR_EMAIL = "hotfolder.error.notification.toaddress";

	/** The Constant HOTFOLDER_ERROR_SUBJECT. */
	private static final String HOTFOLDER_ERROR_SUBJECT = "hotfolder.error.subject";

	/** The Constant MOBILE_NUMBER_PATTERN_KEY. */
	private static final String MOBILE_NUMBER_PATTERN_KEY = "^8[\\d]{9,12}";

	/** The Constant INVALID. */
	private static final String INVALID = "Invalid";

	/** The Constant VALID. */
	private static final String VALID = "valid";

	/** The mobile number pattern. */
	static Pattern MOBILE_NUMBER_PATTERN = Pattern.compile(MOBILE_NUMBER_PATTERN_KEY);

	/**
	 * Instantiates a new demo utils.
	 */
	private DemoUtils()
	{
		//To hide implicit public constructor
	}

	/** The Constant LOG. */
	private static final Logger LOG = Logger.getLogger(DemoUtils.class);

	/**
	 * Gets the demo date format.
	 *
	 * @return the demo date format
	 */
	public static DateFormat getDemoDateFormat()
	{
		final DateFormat format = new SimpleDateFormat(DD_MM_YYYY_HH_MM_SS);
		return format;
	}

	/**
	 * Gets the demo hot folder error message.
	 *
	 * @return the demo hot folder error message
	 */
	public static String getDemoHotFolderErrorMessage()
	{
		return Config.getString(HOTFOLDER_ERROR_MESSAGE, " Import is Failed for");
	}

	/**
	 * Gets the demo hot folder error subject.
	 *
	 * @return the demo hot folder error subject
	 */
	public static String getDemoHotFolderErrorSubject()
	{
		return Config.getString(HOTFOLDER_ERROR_SUBJECT, "Hotfolder Import Failed");
	}

	/**
	 * Gets the demo hot folder error email.
	 *
	 * @return the demo hot folder error email
	 */
	public static String getDemoHotFolderErrorEmail()
	{
		return Config.getParameter(HOTFOLDER_ERROR_EMAIL);
	}


	/**
	 * Common util method to send notification email with pre-configured settings.
	 *
	 * @param subject
	 *           the subject
	 * @param message
	 *           the message
	 * @param toEmails
	 *           the to emails
	 */
	public static void sendNotificationEmail(final String subject, final String message, final String[] toEmails)
	{
		try
		{
			final Email email = MailUtils.getPreConfiguredEmail();
			email.addTo(toEmails);
			email.setSubject(subject);
			email.setMsg(message);
			email.send();
		}
		catch (final EmailException e)
		{
			LOG.error("Make sure your mail properties  are correctly set.", e);
		}
	}

	/**
	 * This method to format Indonesian Rupiah format.
	 *
	 * @param priceValue
	 *           price value for Product
	 * @param locale
	 *           locale of site
	 * @return formatted price value
	 */

	@SuppressWarnings("static-access")
	public static String toRupiahFormat(final String priceValue, final Locale locale)
	{
		//TODO:After language Selector done below parameter locale will be dynamic

		String rupiah = "";
		final Locale localeval = new Locale(DEMO_LOCALE_KEY, DEMO_LOCALE_KEY);
		final NumberFormat rupiahFormat = NumberFormat.getCurrencyInstance(localeval);
		rupiahFormat.setMaximumFractionDigits(0);
		rupiah = rupiahFormat.getCurrency().getSymbol(localeval) + ". "
				+ rupiahFormat.getIntegerInstance(localeval).format(Double.valueOf(priceValue));
		return rupiah;
	}

	/**
	 * Gets the mobile no validation.
	 *
	 * @param mobileNo
	 *           the mobile no
	 * @param isocode
	 *           the isocode
	 * @return the mobile no validation
	 */
	public static String getMobileNoValidation(final String mobileNo, final String isocode)
	{
		if (!MOBILE_NUMBER_PATTERN.matcher(mobileNo).matches() || StringUtils.isBlank(isocode))
		{
			return INVALID;
		}
		else
		{
			return "";
		}

	}


	/**
	 * Target url from session attribute.
	 *
	 * @param request
	 *           the request
	 * @return the string
	 */
	public static String targetUrlFromSessionAttribute(final HttpServletRequest request)
	{
		final HttpSession session = request.getSession(true);
		final String redirectionUri = (String) session.getAttribute("uri");
		session.removeAttribute("uri");
		return redirectionUri;
	}

	/**
	 * Gets the demo date format.
	 *
	 * @return the demo date format
	 */
	public static DateFormat getDemoNotificationDateFormat()
	{
		return new SimpleDateFormat(Config.getString("demo.notification.date.format", "DD-MMM-YYYY HH:MM AA"));
	}
}
