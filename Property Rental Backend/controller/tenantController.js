const Tenant = require('../model/Tenant'); // Import the Tenant model
const { logger } = require('../config/logger'); // Import the logger

// Create a new tenant
exports.createTenant = async (req, res) => {
  try {
    const { newTenant } = req.body;
    logger.info('Incoming Request:', req.body);

    const {
      // invoice_number,
      company_name,
      company_address,
      property_landlord,
      rent,
      years_of_agreement,
      date_of_agreement,
      annual_rent_increment,
      Description,
      createdBy, // Optional, can be set manually
    } = newTenant;

    // Validate required fields
    if (!company_name || !rent || !date_of_agreement) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new tenant in the database
    const newTenantRecord = await Tenant.create({
      // invoice_number,
      company_name,
      company_address,
      property_landlord,
      rent,
      years_of_agreement,
      date_of_agreement,
      annual_rent_increment,
      Description,
      createdBy, // Assume createdBy will be passed when creating the tenant
    });

    // Respond with the newly created tenant data
    res.status(201).json(newTenantRecord);
    logger.info('New tenant created successfully', { tenant: newTenantRecord });
  } catch (error) {
    logger.error('Error creating tenant:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all tenants
exports.getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.findAll({
      attributes: [
        'tenantId',
        // 'invoice_number',
        'company_name',
        'property_landlord',
        'rent',
        'date_of_agreement',
        'annual_rent_increment',
        'payment_status',
      ],
    });

    res.status(200).json(tenants);
    logger.info('Fetched all tenants successfully');
  } catch (error) {
    logger.error('Error fetching tenants:', error);
    res.status(500).json({ message: 'Failed to fetch tenants', error: error.message });
  }
};

// Get tenant by ID
exports.getTenantById = async (req, res) => {
  const { tenantId } = req.params;

  try {
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      logger.warn('Tenant not found with ID:', tenantId);
      return res.status(404).json({ message: 'Tenant not found' });
    }

    res.status(200).json(tenant);
    logger.info('Fetched tenant successfully by ID', { tenantId });
  } catch (error) {
    logger.error('Error fetching tenant by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update tenant
exports.updateTenant = async (req, res) => {
  const { tenantId } = req.params;
  const { payment_status } = req.body;

  try {
    const tenant = await Tenant.findOne({ where: { tenantId } });
    if (!tenant) {
      logger.warn('Tenant not found with ID:', tenantId);
      return res.status(404).json({ message: 'Tenant not found' });
    }

    // Update the payment status
    tenant.payment_status = payment_status || tenant.payment_status; // Fallback to existing status if not provided
    await tenant.save();

    res.status(200).json({
      message: 'Payment status updated successfully',
      tenant: {
        tenantId: tenant.tenantId,
        company_name: tenant.company_name,
        // tenant_name: tenant.tenant_name,
        payment_status: tenant.payment_status,
      },
    });
    logger.info('Tenant updated successfully', { tenantId, updatedFields: req.body });
  } catch (error) {
    logger.error('Error updating tenant:', error);
    res.status(500).json({ message: 'Failed to update tenant', error: error.message });
  }
};

// Delete tenant
exports.deleteTenant = async (req, res) => {
  const { tenantId } = req.params;

  try {
    const deletedTenant = await Tenant.destroy({ where: { tenantId } });
    if (!deletedTenant) {
      logger.warn('Tenant not found with ID:', tenantId);
      return res.status(404).json({ message: 'Tenant not found' });
    }

    res.status(200).json({ message: 'Tenant deleted successfully' });
    logger.info('Tenant deleted successfully', { tenantId });
  } catch (error) {
    logger.error('Error deleting tenant:', error);
    res.status(500).json({ message: 'Failed to delete tenant', error: error.message });
  }
};

// Get tenant details by ID
exports.getTenantDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const tenant = await Tenant.findOne({ where: { tenantId: id } });
    if (!tenant) {
      logger.warn('Tenant not found with ID:', id);
      return res.status(404).json({ message: 'Tenant not found' });
    }

    res.status(200).json({
      tenantId: tenant.tenantId,
      company_name: tenant.company_name,
      company_address: tenant.company_address,
      // invoice_number: tenant.invoice_number,
      rent: tenant.rent,
      annual_rent_increment: tenant.annual_rent_increment,
    });
    logger.info('Fetched tenant details successfully', { tenantId: id });
  } catch (error) {
    logger.error('Error fetching tenant details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all company names
exports.getAllCompanyNames = async (req, res) => {
  try {
    const companies = await Tenant.findAll({
      attributes: ['tenantId', 'company_name', 'Amount', 'IncrementedAmount'],
    });

    res.status(200).json(companies);
    logger.info('Fetched all company names successfully');
  } catch (error) {
    logger.error('Error fetching company names:', error);
    res.status(500).json({ message: 'Failed to fetch company names', error: error.message });
  }
};