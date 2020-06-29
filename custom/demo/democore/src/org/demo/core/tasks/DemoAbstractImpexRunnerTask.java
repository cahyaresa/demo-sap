/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2017 hybris AG
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information").
 *
 * You shall not disclose such Confidential
 * Information and shall use it only in accordance with the
 * terms of the license agreement you entered into with SAP Hybris.
 *
 */
package org.demo.core.tasks;

import de.hybris.platform.acceleratorservices.dataimport.batch.task.AbstractImpexRunnerTask;
import de.hybris.platform.servicelayer.impex.ImpExResource;
import de.hybris.platform.servicelayer.impex.ImportConfig;
import de.hybris.platform.servicelayer.impex.ImportResult;
import de.hybris.platform.servicelayer.impex.impl.StreamBasedImpExResource;
import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.demo.core.util.DemoUtils;

import java.io.FileInputStream;


/**
 * The Class DemoAbstractImpexRunnerTask.
 *
 * @author kris.sunu.purnandaru
 */

public abstract class DemoAbstractImpexRunnerTask extends AbstractImpexRunnerTask
{

	/** The Constant LOG. */
	private static final Logger LOG = Logger.getLogger(DemoAbstractImpexRunnerTask.class);



	/* (non-Javadoc)
	 * @see de.hybris.platform.acceleratorservices.dataimport.batch.task.AbstractImpexRunnerTask#processFile(java.io.File, java.lang.String)
	 */
	@Override
	protected void processFile(final java.io.File file, final String encoding) throws java.io.FileNotFoundException{
		FileInputStream fis = null;
		try
		{
			fis = new FileInputStream(file);
			final ImportConfig config = getImportConfig();
			if (config == null)
			{
				LOG.error(String.format("Import config not found. The file %s won't be imported.",
						file == null ? null : file.getName()));
				return;
			}
			final ImpExResource resource = new StreamBasedImpExResource(fis, encoding);
			config.setScript(resource);
			final ImportResult importResult = getImportService().importData(config);
			if (importResult.isError() && importResult.hasUnresolvedLines())
			{
				final String unresolvedLines = importResult.getUnresolvedLines().getPreview();
				sendEmail(file,unresolvedLines);
				LOG.error(unresolvedLines);
			}
		}
		finally
		{
			IOUtils.closeQuietly(fis);
		}
		//
	}


	/**
	 * This method is used to customize the email information for hot folder failure.
	 *
	 * @param file
	 *           name of the file imported
	 * @param unresolvedLines
	 *           error lines
	 *  <code>
	 *  	final String subject = DemoUtils.getDemoHotFolderErrorSubject();
	 *	final String fileName = file.getName();
	 *	String message = DemoUtils.getDemoHotFolderErrorMessage() + "\n" + fileName;
	 *	message=message + '\n' + unresolvedLines;
	 *	final String toEmail = DemoUtils.getDemoHotFolderErrorEmail();
	 *	final String[] toEmails = toEmail.split(DemoUtils.EMAIL_ID_SEPERATOR);
	 *	DemoUtils.sendNotificationEmail(subject,message,toEmails);
	 *  </code>         
	 */
	private void sendEmail(final java.io.File file, final String unresolvedLines)
	{
		final String subject = DemoUtils.getDemoHotFolderErrorSubject();
		final String fileName = file.getName();
		String message = DemoUtils.getDemoHotFolderErrorMessage() + "\n" + fileName;
		message=message + '\n' + unresolvedLines;
		final String toEmail = DemoUtils.getDemoHotFolderErrorEmail();
		final String[] toEmails = toEmail.split(DemoUtils.EMAIL_ID_SEPERATOR);
		DemoUtils.sendNotificationEmail(subject,message,toEmails);
	}


}
