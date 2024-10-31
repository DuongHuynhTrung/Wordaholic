const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    item_name: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Item", itemSchema);
