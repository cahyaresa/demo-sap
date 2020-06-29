/**
 *
 */
package org.demo.core.tasks;

import de.hybris.platform.acceleratorservices.dataimport.batch.BatchHeader;
import de.hybris.platform.acceleratorservices.dataimport.batch.task.HeaderSetupTask;
import org.apache.commons.lang.StringUtils;

import java.io.File;


/**
 * The Class DemoHeaderTask.
 *
 * @author kris.sunu.purnandaru
 */
public class DemoHeaderTask extends HeaderSetupTask
{

	/** The product catalog. */
/* (non-Javadoc)
 * @see de.hybris.platform.acceleratorservices.dataimport.batch.task.HeaderSetupTask#execute(java.io.File)
 *
 */
	private static final String PRODUCT_CATALOG = "ProductCatalog";

	/** The catalog name seperator. */
	private static final String CATALOG_NAME_SEPERATOR = "-";

	/*
	 * (non-Javadoc)
	 *
	 * @see de.hybris.platform.acceleratorservices.dataimport.batch.task.HeaderSetupTask#execute(java.io.File)
	 */
   @Override
   public BatchHeader execute(final File file)
   {
   	final String fileName=file.getName();
   	final String[] catalogName=fileName.split(CATALOG_NAME_SEPERATOR);
   	if(!StringUtils.isBlank(catalogName[0]))
   	{
   		setCatalog(catalogName[0]+PRODUCT_CATALOG);
   	}
   	return super.execute(file);
   }
}
