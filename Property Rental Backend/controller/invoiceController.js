const Invoice = require("../model/Invoice"); // Import the Invoice model
const Tenant = require('../model/Tenant');
const { logger } = require("../config/logger"); // Import the logger
const sequelize = require("../config/db_config.js");
// Create a new invoice
// exports.createInvoice = async (req, res) => {
  
//   try {
//     console.log("tenant data at backend",req.body);  
//     const {
//       tenantId,
//       PropertyId,
//       date,
//       companyName,
//       companyAddress,
//       landlordName,
//       landlordAddress,
//       GSTNo,
//       amount,
//       incrementPercentage,
//       incrementedAmount,
//       companyBankDetails,
//       createdBy,
//     } = req.body;

//     // Fetch the tenant to get the lastInvoiceNumber
//     const tenant = await Tenant.findByPk(tenantId);
//     if (!tenant) {
//       return res.status(404).json({ message: "Tenant not found" });
//     }

//     // Generate the new invoice number
//     const lastInvoiceNumber = tenant.invoice_number; // Default to 0 if null
//     const newInvoiceNumber = lastInvoiceNumber + 1;

//     const newInvoice = await Invoice.create({
//       InvoiceNumber: newInvoiceNumber,
//       tenantId,
//       PropertyId,
//       Date: date, // Map camelCase to PascalCase
//       CompanyName: companyName, // Map camelCase to PascalCase
//       CompanyAddress: companyAddress, // Map camelCase to PascalCase
//       LandlordName: landlordName, // Map camelCase to PascalCase
//       LandlordAddress: landlordAddress, // Map camelCase to PascalCase
//       GSTNo,
//       Amount: amount, // Map camelCase to PascalCase
//       IncrementPercentage: incrementPercentage, // Map camelCase to PascalCase
//       IncrementedAmount: incrementedAmount, // Map camelCase to PascalCase
//       CompanyBankDetails: companyBankDetails, // Map camelCase to PascalCase
//       createdBy,
//       createdDate: new Date(),
//       isActive: true,
//     });

//     res.status(201).json(newInvoice);
//   } catch (error) {
//     logger.error("Error creating invoice:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Create a new invoice
exports.createInvoice = async (req, res) => {
  const transaction = await sequelize.transaction(); // Start transaction

  try {
    console.log("tenant data at backend", req.body);
    const {
      tenantId,
      PropertyId,
      date,
      companyName,
      companyAddress,
      landlordName,
      landlordAddress,
      GSTNo,
      amount,
      incrementPercentage,
      incrementedAmount,
      companyBankDetails,
      createdBy,
    } = req.body;

    // Fetch the tenant to get the lastInvoiceNumber
    const tenant = await Tenant.findByPk(tenantId, { transaction });
    if (!tenant) {
      await transaction.rollback();
      return res.status(404).json({ message: "Tenant not found" });
    }

    // Generate the new invoice number
    // const lastInvoiceNumber = tenant.invoice_number || 0; // Default to 0 if null
    // const newInvoiceNumber = lastInvoiceNumber + 1;

    // Create a new invoice record
    const newInvoice = await Invoice.create(
      {
        // InvoiceNumber: newInvoiceNumber,
        tenantId,
        PropertyId,
        Date: date,
        CompanyName: companyName,
        CompanyAddress: companyAddress,
        LandlordName: landlordName,
        LandlordAddress: landlordAddress,
        GSTNo,
        Amount: amount,
        IncrementPercentage: incrementPercentage,
        IncrementedAmount: incrementedAmount,
        CompanyBankDetails: companyBankDetails,
        createdBy,
        createdDate: new Date(),
        isActive: true,
      },
      { transaction }
    );

    // Update the tenant's invoice_number
    // await Tenant.update(
    //   { invoice_number: newInvoiceNumber },
    //   { where: { tenantId }, transaction }
    // );

    await transaction.commit(); // Commit the transaction

    res.status(201).json(newInvoice);
  } catch (error) {
    await transaction.rollback(); // Rollback on error
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// exports.createInvoice = async (req, res) => {
//   try {
//     const {
//       tenantId,
//       PropertyId,
//       date, // Match the field name in the request body
//       companyName, // Match the field name in the request body
//       companyAddress, // Match the field name in the request body
//       landlordName, // Match the field name in the request body
//       landlordAddress, // Match the field name in the request body
//       GSTNo, // Match the field name in the request body
//       amount, // Match the field name in the request body
//       incrementPercentage, // Match the field name in the request body
//       incrementedAmount, // Match the field name in the request body
//       companyBankDetails, // Match the field name in the request body
//       createdBy,
//     } = req.body;

//     const newInvoice = await Invoice.create({
//       tenantId,
//       PropertyId,
//       date, // Use the correct field name
//       companyName, // Use the correct field name
//       companyAddress, // Use the correct field name
//       landlordName, // Use the correct field name
//       landlordAddress, // Use the correct field name
//       GSTNo, // Use the correct field name
//       amount, // Use the correct field name
//       incrementPercentage, // Use the correct field name
//       incrementedAmount, // Use the correct field name
//       companyBankDetails, // Use the correct field name
//       createdBy,
//       createdDate: new Date(), // Add the current date and time
//       isActive: true,
//     });

//     res.status(201).json(newInvoice);
//   } catch (error) {
//     logger.error("Error creating invoice:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Get invoices by tenant ID
exports.getInvoicesByTenant = async (req, res) => {
  try {
    const tenantId = req.params.tenantId;
    const invoices = await Invoice.findAll({ where: { tenantId } });

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No invoices found for this tenant." });
    }

    res.status(200).json(invoices);
  } catch (error) {
    logger.error("Error fetching invoices by tenant:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();

    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: "No invoices found." });
    }

    res.status(200).json(invoices);
  } catch (error) {
    logger.error("Error fetching all invoices:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await Invoice.findByPk(invoiceId);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    logger.error("Error fetching invoice by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get invoice by invoice number
exports.getInvoiceByInvoiceNo = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    const invoice = await Invoice.findOne({ where: { invoiceNumber } });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    logger.error("Error fetching invoice by invoice number:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const {
      InvoiceNumber,
      tenantId,
      PropertyId,
      Date: InvoiceDate,
      CompanyName,
      CompanyAddress,
      LandlordName,
      LandlordAddress,
      GSTNo,
      Amount,
      IncrementPercentage,
      IncrementedAmount,
      CompanyBankDetails,
      modifiedBy,
    } = req.body;

    const invoice = await Invoice.findByPk(InvoiceNumber);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (InvoiceDate) {
      const parsedDate = new Date(InvoiceDate);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ message: "Invalid Date format" });
      }
      invoice.Date = parsedDate;
    }

    invoice.tenantId = tenantId || invoice.tenantId;
    invoice.PropertyId = PropertyId || invoice.PropertyId;
    invoice.CompanyName = CompanyName || invoice.CompanyName;
    invoice.CompanyAddress = CompanyAddress || invoice.CompanyAddress;
    invoice.LandlordName = LandlordName || invoice.LandlordName;
    invoice.LandlordAddress = LandlordAddress || invoice.LandlordAddress;
    invoice.GSTNo = GSTNo || invoice.GSTNo;
    invoice.Amount = Amount || invoice.Amount;
    invoice.IncrementPercentage = IncrementPercentage || invoice.IncrementPercentage;
    invoice.IncrementedAmount = IncrementedAmount || invoice.IncrementedAmount;
    invoice.CompanyBankDetails = CompanyBankDetails || invoice.CompanyBankDetails;
    invoice.modifiedBy = modifiedBy || invoice.modifiedBy;
    invoice.modifiedDate = new Date();

    await invoice.save();
    res.status(200).json(invoice);
  } catch (error) {
    logger.error("Error updating invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;
    const invoice = await Invoice.findByPk(invoiceNumber);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    await invoice.destroy();
    res.status(200).json({ message: "Invoice Deleted Successfully" });
  } catch (error) {
    logger.error("Error deleting invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get invoices created by the owner
exports.getInvoicesCreatedByOwner = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({ where: { createdBy: "system" } });

    res.status(200).json(invoices);
  } catch (error) {
    logger.error("Error fetching invoices created by owner:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};