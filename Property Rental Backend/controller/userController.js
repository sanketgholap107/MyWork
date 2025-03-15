const User = require("../model/User.js"); // Import the User model
const { logger } = require("../config/logger.js"); // Import the logger
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { where } = require("sequelize");
require("dotenv").config();


// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
    logger.info("Fetched all users successfully"); // Log success
  } catch (error) {
    logger.error("Error fetching users:", error); // Log error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.UserId);
    if (!user) {
      logger.warn("User not found with ID:", req.body.UserId); // Log warning when user not found
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
    logger.info("Fetched user successfully by ID", { userId: req.body.UserId }); // Log success
  } catch (error) {
    logger.error("Error fetching user by ID:", error); // Log error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const {
      Username,
      Password,
      Email,
      FirstName,
      LastName,
      PhoneNumber,
      Role,
      modifiedBy, // Assuming modifiedBy will be passed
    } = req.body;

    const user = await User.findByPk(req.body.UserId);
    if (!user) {
      logger.warn("User not found with ID:", req.body.UserId); // Log warning when user not found
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's fields
    user.Username = Username || user.Username;
    user.Password = Password || user.Password;
    user.Email = Email || user.Email;
    user.FirstName = FirstName || user.FirstName;
    user.LastName = LastName || user.LastName;
    user.PhoneNumber = PhoneNumber || user.PhoneNumber;
    user.Role = Role || user.Role;
    user.modifiedBy = modifiedBy || user.modifiedBy;
    user.modifiedDate = new Date(); // Set the modified date to current date

    // Save the updated user
    await user.save();

    res.status(200).json(user);
    logger.info("User updated successfully", {
      userId: req.body.UserId,
      updatedFields: req.body,
    }); // Log success
  } catch (error) {
    logger.error("Error updating user:", error); // Log error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.UserId);
    if (!user) {
      logger.warn("User not found with ID:", req.body.UserId); // Log warning when user not found
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.status(200).json({ message: "User Deleted Successfully" }); // No content to return for deletion
    logger.info("User deleted successfully", { userId: req.body.UserId }); // Log success
  } catch (error) {
    logger.error("Error deleting user:", error); // Log error
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;
    console.log(req.body);

    if (!(fullName && email && password && confirmPassword)) {
      return res.status(401).json("all fields are compulsory !");
    }

    if (password !== confirmPassword) {
      return res.status(401).json("password should be same");
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(401).json("user already exists");
    }

    // const myEncPassword = await bcrypt.hashSync(password, 10);
    const myEncPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", myEncPassword);

    const newUser = await User.create({
      fullName,
      email,
      password: myEncPassword,
      // confirmPassword: myEncPassword,
    });

    console.log("newUser created: ", newUser);

    const token = jwt.sign(
      { id: newUser.userId },
      process.env.JWT_PRIVATE_KEY,
      {
        expiresIn: "2h",
      }
    );

    console.log("Token:", token);

    newUser.Token = token;
    // await newUser.save();
    newUser.password = undefined;

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    logger.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const checkUserExists = await User.findOne({ where: { email } });

    if (!checkUserExists) {
      return res.status(401).json({ message: "Register first tot login" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      checkUserExists.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (checkUserExists && passwordMatch) {
      // return res.status(401).json({message:"Enter Correct passowrd"});
      const token = jwt.sign(
        { id: checkUserExists.userId },
        process.env.JWT_PRIVATE_KEY,
        {
          expiresIn: "2h",
        }
      );

      // checkUserExists.Token = await checkUserExists.findOne({Token});
      // const checkToken = await User.findOne({Token});

      // if(!checkToken){
      //   return res.status(401).json({message:"token expired"});
      // }else{
      //   checkUserExists.Token = Token;
      // }
      checkUserExists.token = token;
      checkUserExists.password = undefined;
      console.log("user credentials matched !");

      //cookie section
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true
      };


      return res.status(200).cookie("token",token,options).json({
        // success:true,
        // Token,
        // checkUserExists
        success: true,
        message: "Login successful",
        token,
        user: checkUserExists,
      });
    }
  } catch (error) {
    logger.error("Error creating user:", error);
    return res.status(401).json({ message: "Invalid email or password" });
  }
};
