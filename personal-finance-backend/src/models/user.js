const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error("Age must be a positive number");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password cannot contain 'password'");
      }
    },
  },
  // Array of authentication tokens for the user
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});
// Modify the `toJSON` method to hide sensitive information when sending user data
userSchema.methods.toJSON = function () {
  const user = this; // Get the current user instance
  const userObject = user.toObject(); // Convert the user instance to a plain object

  // Remove the password and tokens fields from the object
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

// Generate an authentication token for the user
userSchema.methods.generateAuthToken = async function () {
  const user = this; // Get the current user instance
  // Generate a token with the user's ID and a secret key
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  // Add the generated token to the user's tokens array
  user.tokens = user.tokens.concat({ token });
  await user.save(); // Save the updated user to the database

  return token;
};

// Static method to find a user by email and password for login
userSchema.statics.findByCredentials = async (email, password) => {
  // Find a user with the given email
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  // Compare the given password with the user's hashed password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// Middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    // Check if the password field was modified
    // Hash the password with a salt factor of 8
    user.password = await bcrypt.hash(user.password, 8);
  }
  // Proceed to the next middleware or save operation
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
