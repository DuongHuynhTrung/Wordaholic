const mongoose = require("mongoose");

const toolSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    quantity: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tool", toolSchema);
