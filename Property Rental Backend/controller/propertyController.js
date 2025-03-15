const Property = require('../model/Property'); // Import the Property model
const { logger } = require('../config/logger'); // Import the logger

// Create a new property
exports.createProperty = async (req, res) => {
  try {
    const { propertyData } = req.body;
    logger.info('Incoming Request:', req.body);

    const {
      Property_Name,
      Property_Address,
      Property_Description,
      Type_Of_Property,
      Country,
      State,
      City,
      Zipcode,
      General_Rent,
      Security_Deposit,
      createdBy, // Optional, can be set manually
    } = propertyData;

    // Validate required fields
    if (!Property_Name || !Property_Address || !General_Rent || !Security_Deposit) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new property in the database
    const newProperty = await Property.create({
      Property_Name,
      Property_Address,
      Property_Description,
      Type_Of_Property,
      Country,
      State,
      City,
      Zipcode,
      General_Rent,
      Security_Deposit,
      createdBy, // Assume createdBy will be passed when creating the property
    });

    // Respond with the newly created property data
    res.status(201).json(newProperty);
    logger.info('New property created successfully', { property: newProperty });
  } catch (error) {
    logger.error('Error creating property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.findAll();
    res.status(200).json(properties);
    logger.info('Fetched all properties successfully');
  } catch (error) {
    logger.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);
    if (!property) {
      logger.warn('Property not found with ID:', id);
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
    logger.info('Fetched property successfully by ID', { propertyId: id });
  } catch (error) {
    logger.error('Error fetching property by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  const {
    tenantId,
    Property_Name,
    Property_Address,
    Property_Description,
    Type_Of_Property,
    Country,
    State,
    City,
    Zipcode,
    General_Rent,
    Security_Deposit,
    modifiedBy, // Assuming modifiedBy will be passed
  } = req.body;

  try {
    const property = await Property.findByPk(id);
    if (!property) {
      logger.warn('Property not found with ID:', id);
      return res.status(404).json({ message: 'Property not found' });
    }

    // Update the property's fields
    property.tenantId = tenantId || property.tenantId;
    property.Property_Name = Property_Name || property.Property_Name;
    property.Property_Address = Property_Address || property.Property_Address;
    property.Property_Description = Property_Description || property.Property_Description;
    property.Type_Of_Property = Type_Of_Property || property.Type_Of_Property;
    property.Country = Country || property.Country;
    property.State = State || property.State;
    property.City = City || property.City;
    property.Zipcode = Zipcode || property.Zipcode;
    property.General_Rent = General_Rent || property.General_Rent;
    property.Security_Deposit = Security_Deposit || property.Security_Deposit;
    property.modifiedBy = modifiedBy || property.modifiedBy;
    property.modifiedDate = new Date(); // Set the modified date to current date

    // Save the updated property
    await property.save();

    res.status(200).json(property);
    logger.info('Property updated successfully', { propertyId: id, updatedFields: req.body });
  } catch (error) {
    logger.error('Error updating property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findByPk(id);
    if (!property) {
      logger.warn('Property not found with ID:', id);
      return res.status(404).json({ message: 'Property not found' });
    }

    await property.destroy();
    res.status(200).json({ message: 'Property deleted successfully' });
    logger.info('Property deleted successfully', { propertyId: id });
  } catch (error) {
    logger.error('Error deleting property:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get property details by ID
exports.getPropertyDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findOne({ where: { PropertyId: id } });
    if (!property) {
      logger.warn('Property not found with ID:', id);
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json(property);
    logger.info('Fetched property details successfully', { propertyId: id });
  } catch (error) {
    logger.error('Error fetching property details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};