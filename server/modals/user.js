const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const user_schema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "e-mail missing"],
    unique: true,
    validate: [validator.isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "password missing"],
    select: false,
  },
  recover: { type: String, select: false },
  role: { type: String, default: "student" },
  status: { type: Boolean, default: false },
 current_batch:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "batch",
 },
});

user_schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

user_schema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

user_schema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

module.exports = mongoose.model("user", user_schema);
