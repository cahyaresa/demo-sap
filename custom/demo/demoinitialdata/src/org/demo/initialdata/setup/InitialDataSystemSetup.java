/*
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 */
package org.demo.initialdata.setup;

import de.hybris.platform.commerceservices.dataimport.impl.CoreDataImportService;
import de.hybris.platform.commerceservices.dataimport.impl.SampleDataImportService;
import de.hybris.platform.commerceservices.setup.AbstractSystemSetup;
import de.hybris.platform.commerceservices.setup.data.ImportData;
import de.hybris.platform.commerceservices.setup.events.CoreDataImportedEvent;
import de.hybris.platform.commerceservices.setup.events.SampleDataImportedEvent;
import de.hybris.platform.core.initialization.SystemSetup;
import de.hybris.platform.core.initialization.SystemSetup.Process;
import de.hybris.platform.core.initialization.SystemSetup.Type;
import de.hybris.platform.core.initialization.SystemSetupContext;
import de.hybris.platform.core.initialization.SystemSetupParameter;
import de.hybris.platform.core.initialization.SystemSetupParameterMethod;
import de.hybris.platform.util.Config;
import org.demo.initialdata.constants.DemoInitialDataConstants;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Required;


/**
 * This class provides hooks into the system's initialization and update processes.
 */
@SystemSetup(extension = DemoInitialDataConstants.EXTENSIONNAME)
public class InitialDataSystemSetup extends AbstractSystemSetup
{
	/**
	 * The Constant LOG.
	 */
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(InitialDataSystemSetup.class);

	/**
	 * The Constant DEMO.
	 */
	private static final String DEMO = "demo";

	/**
	 * The Constant DEMO_ESSENTIAL_DATA_IMPEXES.
	 */
	private static final String DEMO_ESSENTIAL_DATA_IMPEXES = "demoinitialdata.essentialdata.impexes";

	/**
	 * The Constant DEMO_SAMPLE_DATA_IMPEXES.
	 */
	private static final String DEMO_SAMPLE_DATA_IMPEXES = "demoinitialdata.sampledata.impexes";

	/**
	 * The Constant IMPORT_CORE_DATA.
	 */
	private static final String IMPORT_CORE_DATA = "importCoreData";

	/**
	 * The Constant IMPORT_SAMPLE_DATA.
	 */
	private static final String IMPORT_SAMPLE_DATA = "importSampleData";

	/**
	 * The Constant ACTIVATE_SOLR_CRON_JOBS.
	 */
	private static final String ACTIVATE_SOLR_CRON_JOBS = "activateSolrCronJobs";

	/**
	 * The Constant EXEC_LOCAL_IMPEX.
	 */
	private static final String EXEC_LOCAL_IMPEX = "LOCAL";

	/** The Constant EXEC_DEV_IMPEX. */
	private static final String EXEC_DEV_IMPEX = "DEV";

	/** The Constant EXEC_QA_IMPEX. */
	private static final String EXEC_QA_IMPEX = "QA";

	/** The Constant EXEC_PRE_PROD_IMPEX. */
	private static final String EXEC_PRE_PROD_IMPEX = "PRE-PROD";

	/** The Constant EXEC_PRODUCTION_IMPEX. */
	private static final String EXEC_PRODUCTION_IMPEX = "PRODUCTION";

	/**
	 * The Constant SELECTED_FALSE.
	 */
	private static final boolean SELECTED_FALSE = false;

	/**
	 * The Constant SELECTED_TRUE.
	 */
	private static final boolean SELECTED_TRUE = true;

	/**
	 * The Constant RUN_ENVIRONMENT_IMPEX.
	 */
	private static final String RUN_ENVIRONMENT_IMPEX = "runEnvironmentImpex";

	/**
	 * The core data import service.
	 */
	private CoreDataImportService coreDataImportService;

	/**
	 * The sample data import service.
	 */
	private SampleDataImportService sampleDataImportService;

	/**
	 * Generates the Dropdown and Multi-select boxes for the project data import
	 */
	@Override
	@SystemSetupParameterMethod
	public List<SystemSetupParameter> getInitializationOptions()
	{
		final List<SystemSetupParameter> params = new ArrayList<SystemSetupParameter>();

		params.add(createBooleanSystemSetupParameter(IMPORT_CORE_DATA, "Import Core Data", true));
		params.add(createBooleanSystemSetupParameter(IMPORT_SAMPLE_DATA, "Import Sample Data", true));
		params.add(createBooleanSystemSetupParameter(ACTIVATE_SOLR_CRON_JOBS, "Activate Solr Cron Jobs", true));
		params.add(createEnvironmentSystemSetupParameter(RUN_ENVIRONMENT_IMPEX, "Run Environment Impex"));
		// Add more Parameters here as you require

		return params;
	}

	/**
	 * Implement this method to create initial objects. This method will be called by system creator during
	 * initialization and system update. Be sure that this method can be called repeatedly.
	 * 
	 * @param context
	 *           the context provides the selected parameters and values
	 */
	@SystemSetup(type = Type.ESSENTIAL, process = Process.ALL)
	public void createEssentialData(final SystemSetupContext context)
	{
		// Add Essential Data here as you require
	}

	/**
	 * Implement this method to create data that is used in your project. This method will be called during the system
	 * initialization. <br>
	 * Add import data for each site you have configured
	 *
	 * <pre>
	 * final List<ImportData> importData = new ArrayList<ImportData>();
	 *
	 * final ImportData sampleImportData = new ImportData();
	 * sampleImportData.setProductCatalogName(SAMPLE_PRODUCT_CATALOG_NAME);
	 * sampleImportData.setContentCatalogNames(Arrays.asList(SAMPLE_CONTENT_CATALOG_NAME));
	 * sampleImportData.setStoreNames(Arrays.asList(SAMPLE_STORE_NAME));
	 * importData.add(sampleImportData);
	 *
	 * getCoreDataImportService().execute(this, context, importData);
	 * getEventService().publishEvent(new CoreDataImportedEvent(context, importData));
	 *
	 * getSampleDataImportService().execute(this, context, importData);
	 * getEventService().publishEvent(new SampleDataImportedEvent(context, importData));
	 * </pre>
	 *
	 * @param context
	 *           the context provides the selected parameters and values
	 */
	@SystemSetup(type = Type.PROJECT, process = Process.ALL)
	public void createProjectData(final SystemSetupContext context)
	{
		LOG.info("::: Demo Project Data Update. :::");
		final List<ImportData> importData = new ArrayList<>();

		final ImportData sampleImportData = new ImportData();
		sampleImportData.setProductCatalogName(DEMO);
		sampleImportData.setContentCatalogNames(Arrays.asList(DEMO));
		sampleImportData.setStoreNames(Arrays.asList(DEMO));
		importData.add(sampleImportData);

		//update Solr endPoint based on Current Environment before Solr corn job runs in case it selected .
		executeEnvironmentImpex(context, DEMO);

		// Core data
		final boolean importCoreData = getBooleanSystemSetupParameter(context, IMPORT_CORE_DATA);
		if (importCoreData) {
			getCoreDataImportService().execute(this, context, importData);

			importDEMOCoreData(context);

			getEventService().publishEvent(new CoreDataImportedEvent(context, importData));
			getCoreDataImportService().synchronizeContentCatalog(this, context, DEMO, true);
			getCoreDataImportService().synchronizeProductCatalog(this, context, DEMO, true);
		}

		// Sample data
		final boolean importSampleData = getBooleanSystemSetupParameter(context, IMPORT_SAMPLE_DATA);
		if (importSampleData) {
			getSampleDataImportService().execute(this, context, importData);

			importDEMOSampleData(context);

			getEventService().publishEvent(new SampleDataImportedEvent(context, importData));
			getSampleDataImportService().synchronizeContentCatalog(this, context, DEMO, true);
			getSampleDataImportService().synchronizeProductCatalog(this, context, DEMO, true);
		}
	}

	/**
	 * Custom method to import the demo core data.
	 *
	 * @param context context
	 */
	protected void importDEMOCoreData(final SystemSetupContext context) {
		final String extensionName = context.getExtensionName();
		final String impexFiles = Config.getParameter(DEMO_ESSENTIAL_DATA_IMPEXES);
		if (impexFiles != null) {
			final String[] impexFileArray = impexFiles.split(",");
			for (final String impexFile : impexFileArray) {
				if (impexFile != null) {
					getSetupImpexService().importImpexFile(String.format("/%s/import/coredata/contentCatalogs/%sContentCatalog/%s",
							extensionName, DEMO, impexFile), false);
					getSetupImpexService().importImpexFile(String.format("/%s/import/coredata/productCatalogs/%sProductCatalog/%s",
							extensionName, DEMO, impexFile), false);
					getSetupImpexService().importImpexFile(String.format("/%s/import/coredata/common/%s", extensionName, impexFile),
							false);
					getSetupImpexService()
							.importImpexFile(String.format("/%s/import/coredata/stores/demo/%s", extensionName, impexFile), false);
				}
			}
		}
	}

	/**
	 * Custom method to import the demo sample data.
	 *
	 * @param context the context
	 */
	protected void importDEMOSampleData(final SystemSetupContext context) {
		final String extensionName = context.getExtensionName();
		final String impexFiles = Config.getParameter(DEMO_SAMPLE_DATA_IMPEXES);
		if (impexFiles != null) {
			final String[] impexFileArray = impexFiles.split(",");
			for (final String impexFile : impexFileArray) {
				if (impexFile != null) {
					getSetupImpexService().importImpexFile(String.format("/%s/import/sampledata/contentCatalogs/%sContentCatalog/%s",
							extensionName, DEMO, impexFile), false);
					getSetupImpexService().importImpexFile(String.format("/%s/import/sampledata/productCatalogs/%sProductCatalog/%s",
							extensionName, DEMO, impexFile), false);
					getSetupImpexService().importImpexFile(
							String.format("/%s/import/sampledata/backoffice/customersupport/%s", extensionName, impexFile), false);
					getSetupImpexService().importImpexFile(
							String.format("/%s/import/sampledata/cockpits/cmscockpit/%s", extensionName, impexFile), false);
					getSetupImpexService().importImpexFile(
							String.format("/%s/import/sampledata/cockpits/cscockpit/%s", extensionName, impexFile), false);
					getSetupImpexService().importImpexFile(
							String.format("/%s/import/sampledata/cockpits/productcockpit/%s", extensionName, impexFile), false);
					getSetupImpexService().importImpexFile(
							String.format("/%s/import/sampledata/cockpits/reportcockpit/%s", extensionName, impexFile), false);
					getSetupImpexService().importImpexFile(
							String.format("/%s/import/sampledata/stores/demo/%s", extensionName, impexFile), false);
				}
			}
		}
	}

	/**
	 * This method will help to setup UI for drop down to choose listed Env in HAC.
	 * Note by Yusuf Adiputera
	 * this method will add value to drop down in demoinitialdata init/update
	 * see below that wee add EXEC_LOCAL_IMPEX/currentDeploymentEnv as parameter
	 * hence we can get the data as String[] (see executeEnvironmentImpex method below this method)
	 * this method will only create one option in run environment impex
	 * we can add more by adding more value using syncProductsParam.addValue();
	 * end note
	 *
	 * @param key   Key
	 * @param label Value
	 * @return SystemSetupParameter
	 */
	private SystemSetupParameter createEnvironmentSystemSetupParameter(final String key, final String label) {
		final SystemSetupParameter syncProductsParam = new SystemSetupParameter(key);
		syncProductsParam.setMultiSelect(SELECTED_FALSE);
		syncProductsParam.setLabel(label);
		//First setting all to false here
		syncProductsParam.addValue(EXEC_LOCAL_IMPEX, SELECTED_FALSE);
		syncProductsParam.addValue(EXEC_DEV_IMPEX, SELECTED_FALSE);
		syncProductsParam.addValue(EXEC_QA_IMPEX, SELECTED_FALSE);
		syncProductsParam.addValue(EXEC_PRE_PROD_IMPEX, SELECTED_FALSE);
		syncProductsParam.addValue(EXEC_PRODUCTION_IMPEX, SELECTED_FALSE);

		//Now based on Current deployment env setting, one of them true.
		final String currentDeploymentEnv = Config.getString("current.deployment.env", EXEC_LOCAL_IMPEX);
		switch (currentDeploymentEnv)
		{
			case EXEC_DEV_IMPEX:
				syncProductsParam.addValue(EXEC_DEV_IMPEX, SELECTED_TRUE);
				break;
			case EXEC_QA_IMPEX:
				syncProductsParam.addValue(EXEC_QA_IMPEX, SELECTED_TRUE);
				break;
			case EXEC_PRE_PROD_IMPEX:
				syncProductsParam.addValue(EXEC_PRE_PROD_IMPEX, SELECTED_TRUE);
				break;
			case EXEC_PRODUCTION_IMPEX:
				syncProductsParam.addValue(EXEC_PRODUCTION_IMPEX, SELECTED_TRUE);
				break;
			default:
				syncProductsParam.addValue(EXEC_LOCAL_IMPEX, SELECTED_TRUE);
		}
		return syncProductsParam;
	}

	/**
	 * Execute environment impex.
	 * note by Yusuf Adiputera
	 * to get data from HAC selection, use
	 * final String[] parameters = context.getParameters(context.getExtensionName() + "_" + RUN_ENVIRONMENT_IMPEX);
	 * RUN_ENVIRONMENT_IMPEX here defined the name of context that we added in getInitializationOptions() method
	 * it return String[] because in createEnvironmentSystemSetupParameter we add String value into param
	 * end note
	 *
	 * @param context the context
	 * @param store   the store
	 */
	protected void executeEnvironmentImpex(final SystemSetupContext context, final String store) {
		final String[] parameters = context.getParameters(context.getExtensionName() + "_" + RUN_ENVIRONMENT_IMPEX);
		if (parameters == null || parameters.length == 0)
		{
			//nothing selected. Move on
			return;
		}

		final List<String> executeImpex = Arrays.asList(parameters);
		// Run solr impex for environment wise.
		executeImpexForEnv(executeImpex, EXEC_DEV_IMPEX,
				String.format("/%s/import/coredata/stores/%s/DEV/solr.impex", context.getExtensionName(), store));
		executeImpexForEnv(executeImpex, EXEC_QA_IMPEX,
				String.format("/%s/import/coredata/stores/%s/QA/solr.impex", context.getExtensionName(), store));
		executeImpexForEnv(executeImpex, EXEC_PRE_PROD_IMPEX,
				String.format("/%s/import/coredata/stores/%s/PRE_PROD/solr.impex", context.getExtensionName(), store));
		executeImpexForEnv(executeImpex, EXEC_PRODUCTION_IMPEX,
				String.format("/%s/import/coredata/stores/%s/PROD/solr.impex", context.getExtensionName(), store));
	}

	/**
	 * Execute impex for env.
	 *
	 * @param executeImpex
	 *           the execute impex
	 * @param execImpex
	 *           the exec impex
	 * @param format
	 *           the format
	 */
	private void executeImpexForEnv(final List<String> executeImpex, final String execImpex, final String format)
	{
		if (executeImpex.contains(execImpex))
		{
			LOG.info("Executing impex for {} Environment", execImpex);
			getSetupImpexService().importImpexFile(format, SELECTED_FALSE);
		}
	}

	public CoreDataImportService getCoreDataImportService()
	{
		return coreDataImportService;
	}

	@Required
	public void setCoreDataImportService(final CoreDataImportService coreDataImportService)
	{
		this.coreDataImportService = coreDataImportService;
	}

	public SampleDataImportService getSampleDataImportService()
	{
		return sampleDataImportService;
	}

	@Required
	public void setSampleDataImportService(final SampleDataImportService sampleDataImportService)
	{
		this.sampleDataImportService = sampleDataImportService;
	}
}
