const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      maxLength: 255,
    },
    email: {
      type: String,
      maxLength: 255,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    stamina: {
      type: Number,
      default: 200,
    },
    coins: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
