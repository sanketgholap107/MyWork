const express = require('express');
const tenantController = require('../controller/tenantController'); // Correct import path
const router = express.Router();
const Tenant = require('../model/Tenant');
const {authenticate} = require('../middleware/authentication.js')

// Routes for Tenant CRUD
router.post('/create',tenantController.createTenant); // Create a new tenant
router.get('/getalltenant',tenantController.getAllTenants); // Get all tenants
router.get('/getTenantById/:tenantId',tenantController.getTenantById); // Get tenant by ID
router.put('/update/:tenantId',tenantController.updateTenant); // Update tenant
router.delete('/delete/:tenantId', tenantController.deleteTenant); // Delete tenant
router.get('/gettenant/:id',tenantController.getTenantDetails); // Get tenant details by ID
router.get('/companynames',tenantController.getAllCompanyNames); // Get all company names

// router.post('/create', authenticate,tenantController.createTenant); // Create a new tenant
// router.get('/getalltenant', authenticate,tenantController.getAllTenants); // Get all tenants
// router.get('/getTenantById/:tenantId', authenticate,tenantController.getTenantById); // Get tenant by ID
// router.put('/update/:tenantId', authenticate,tenantController.updateTenant); // Update tenant
// router.delete('/delete/:tenantId',authenticate, tenantController.deleteTenant); // Delete tenant
// router.get('/gettenant/:id', authenticate,tenantController.getTenantDetails); // Get tenant details by ID
// router.get('/companynames', authenticate,tenantController.getAllCompanyNames); // Get all company names

module.exports = router;