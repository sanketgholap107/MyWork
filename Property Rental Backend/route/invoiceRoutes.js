const express = require("express");
const invoiceController = require("../controller/invoiceController"); // Import the controller
const router = express.Router();

// Create a new invoice
router.post("/create", invoiceController.createInvoice);

// Get invoices by tenant ID
router.get("/getbytenant/:tenantId", invoiceController.getInvoicesByTenant);

// Get all invoices
router.get("/getallinvoices", invoiceController.getAllInvoices);

// Get invoice by ID
router.get("/getinvoice/:id", invoiceController.getInvoiceById);

// Get invoice by invoice number
router.get("/getinvoicebyno/:invoiceNumber", invoiceController.getInvoiceByInvoiceNo);

// Update an invoice
router.put("/update/:invoiceNumber", invoiceController.updateInvoice);

// Delete an invoice
router.delete("/delete/:invoiceNumber", invoiceController.deleteInvoice);

// Get invoices created by the owner
router.get("/invoices/owner", invoiceController.getInvoicesCreatedByOwner);

module.exports = router;