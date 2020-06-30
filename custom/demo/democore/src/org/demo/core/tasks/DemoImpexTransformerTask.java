/**
 *
 */
package org.demo.core.tasks;

import de.hybris.platform.acceleratorservices.dataimport.batch.BatchHeader;
import de.hybris.platform.acceleratorservices.dataimport.batch.converter.ImpexConverter;
import de.hybris.platform.acceleratorservices.dataimport.batch.task.ImpexTransformerTask;
import de.hybris.platform.acceleratorservices.dataimport.batch.util.BatchDirectoryUtils;
import org.apache.log4j.Logger;
import org.demo.core.util.DemoUtils;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;
import java.util.stream.Stream;


/**
 * The Class DemoImpexTransformerTask.
 *
 * @author nalini.ramarao
 */
public class DemoImpexTransformerTask extends ImpexTransformerTask
{

	/** The Constant LOG. */
	private static final Logger LOG = Logger.getLogger(DemoImpexTransformerTask.class);

	/** The Constant ERROR_FILE_PREFIX. */
	private static final String ERROR_FILE_PREFIX = "error_";

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * de.hybris.platform.acceleratorservices.dataimport.batch.task.ImpexTransformerTask#convertFile(de.hybris.platform.
	 * acceleratorservices.dataimport.batch.BatchHeader, java.io.File, java.io.File,
	 * de.hybris.platform.acceleratorservices.dataimport.batch.converter.ImpexConverter)
	 */
	@Override
	protected boolean convertFile(final BatchHeader header, final File file, final File impexFile, final ImpexConverter converter)
			throws UnsupportedEncodingException, FileNotFoundException
	{
		final boolean result = super.convertFile(header, file, impexFile, converter);
		final String errorFileName = BatchDirectoryUtils.getRelativeErrorDirectory(file) + File.separator + ERROR_FILE_PREFIX
				+ file.getName();
		if (!result || Paths.get(errorFileName).toFile().exists())
		{
			sendEmail(file, errorFileName);
		}
		return result;
	}

	/**
	 * Send email.
	 *
	 * @param file
	 *           the file
	 * @param errorFileName
	 *           the error file name
	 */
	private void sendEmail(final File file, final String errorFileName)
	{

		final String subject = DemoUtils.getDemoHotFolderErrorSubject();
		final String fileName = file.getName();
		String message = DemoUtils.getDemoHotFolderErrorMessage() + "\n" + fileName;
		message = message + '\n' + getFileContent(errorFileName);
		final String toEmail = DemoUtils.getDemoHotFolderErrorEmail();
		final String[] toEmails = toEmail.split(DemoUtils.EMAIL_ID_SEPERATOR);
		DemoUtils.sendNotificationEmail(subject, message, toEmails);
	}

	/**
	 * Gets the file content.
	 *
	 * @param errorFileName
	 *           the error file name
	 * @return the file content
	 */
	private String getFileContent(final String errorFileName)
	{
		try (Stream<String> stream = Files.lines(Paths.get(errorFileName)))
		{
			return stream.collect(Collectors.joining("\n"));
		}
		catch (final IOException e)
		{
			//e.printStackTrace()
			LOG.error("Exception Occured:", e);

		}

		return null;
	}

}
